import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';
import { AdjustInventoryDto, ReserveInventoryDto } from './dto/inventory.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
  ) {}

  async findBySku(sku: string): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findOne({ where: { sku } });
    if (!inventory) {
       throw new NotFoundException(`Inventory for SKU ${sku} not found`);
    }
    return inventory;
  }

  async adjustStock(id: string, adjustDto: AdjustInventoryDto): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findOne({ where: { id } });
    if (!inventory) {
      throw new NotFoundException(`Inventory record ${id} not found`);
    }

    const newQuantity = inventory.quantityAvailable + adjustDto.quantityToAdjust;
    
    // Prevent negative available stock through adjustments
    if (newQuantity < 0) {
      throw new BadRequestException(`Adjustment would result in negative available inventory (Current: ${inventory.quantityAvailable}, Adjustment: ${adjustDto.quantityToAdjust})`);
    }

    inventory.quantityAvailable = newQuantity;
    return this.inventoryRepository.save(inventory);
  }

  async reserveStock(id: string, reserveDto: ReserveInventoryDto): Promise<Inventory> {
     if (reserveDto.quantityToReserve <= 0) {
        throw new BadRequestException('Reservation quantity must be greater than 0');
     }

     const inventory = await this.inventoryRepository.findOne({ where: { id } });
     if (!inventory) {
        throw new NotFoundException(`Inventory record ${id} not found`);
     }

     if (inventory.quantityAvailable < reserveDto.quantityToReserve) {
         throw new BadRequestException(`Insufficient stock available to reserve ${reserveDto.quantityToReserve} items.`);
     }

     // Move items from available to reserved
     inventory.quantityAvailable -= reserveDto.quantityToReserve;
     inventory.quantityReserved += reserveDto.quantityToReserve;

     return this.inventoryRepository.save(inventory);
  }
}
