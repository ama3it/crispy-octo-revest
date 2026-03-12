import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { Order, OrderStatus } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @Inject('PRODUCT_SERVICE')
    private readonly productClient: ClientProxy,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const orderItems: OrderItem[] = [];
    let totalAmount = 0;
    const reservedItems: { inventoryId: string, quantity: number }[] = [];

    try {
      for (const item of createOrderDto.items) {
        // 1. Validate Product via TCP
        const productValidation = await firstValueFrom(
          this.productClient.send({ cmd: 'validate_product' }, { productId: item.productId })
        );

        if (!productValidation || !productValidation.exists) {
          throw new BadRequestException(`Product ${item.productId} is invalid or not found`);
        }

        // Use the price from productmgmt if not provided or to ensure accuracy
        const itemPrice = productValidation.price;
        
        // 2. Reserve Stock via TCP
        // Note: For now we'll assume the productValidation returns inventoryId if we had it, 
        // but since we don't have a direct variantId in the order item DTO yet, 
        // let's assume the validate_product returns the primary inventoryId for now.
        // In a real scenario, we'd need variant mapping.
        
        // Let's assume the product has a default variant for now for simplicity of this demo
        // Re-fetching product details to get inventoryId (or assuming it comes back in validation)
        const inventoryId = productValidation.inventoryId || (await this.getInventoryIdForProduct(item.productId));

        const stockReservation = await firstValueFrom(
          this.productClient.send({ cmd: 'reserve_stock' }, { inventoryId, quantityToReserve: item.quantity })
        );

        if (!stockReservation || !stockReservation.success) {
          throw new BadRequestException(`Failed to reserve stock for product ${item.productId}: ${stockReservation?.message || 'Insufficient stock'}`);
        }

        reservedItems.push({ inventoryId, quantity: item.quantity });

        const orderItem = new OrderItem();
        orderItem.productId = item.productId;
        orderItem.quantity = item.quantity;
        orderItem.price = itemPrice;
        orderItems.push(orderItem);

        totalAmount += itemPrice * item.quantity;
      }

      const order = new Order();
      order.customerId = createOrderDto.customerId;
      order.items = orderItems;
      order.totalAmount = totalAmount;
      order.status = OrderStatus.PENDING;

      return await this.orderRepository.save(order);
    } catch (error) {
      // Basic Rollback for reserved stock on failure
      for (const reserved of reservedItems) {
        // We'd need an 'unreserve_stock' or 'adjust_stock' call here
        this.productClient.emit({ cmd: 'adjust_stock' }, { 
          inventoryId: reserved.inventoryId, 
          quantityToAdjust: reserved.quantity // adjust positive to return stock
        });
      }
      throw error;
    }
  }

  // Helper (in a real app this would be more robust)
  private async getInventoryIdForProduct(productId: string): Promise<string> {
    const productData = await firstValueFrom(
      this.productClient.send({ cmd: 'validate_product' }, { productId })
    );
    // Assuming productmgmt was updated to return inventoryId in validate_product
    return productData.inventoryId;
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['items'] });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['items'],
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    return order;
  }

  async findByCustomer(customerId: string): Promise<Order[]> {
    return this.orderRepository.find({
      where: { customerId },
      relations: ['items'],
    });
  }

  async updateStatus(
    id: string,
    updateStatusDto: UpdateOrderStatusDto,
  ): Promise<Order> {
    const order = await this.findOne(id);
    order.status = updateStatusDto.status;
    return this.orderRepository.save(order);
  }
}
