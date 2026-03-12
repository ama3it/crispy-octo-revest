import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { InventoryService } from './inventory.service';
import { AdjustInventoryDto, ReserveInventoryDto } from './dto/inventory.dto';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @MessagePattern({ cmd: 'reserve_stock' })
  async reserveStockInternal(data: { inventoryId: string, quantityToReserve: number }) {
    try {
      const result = await this.inventoryService.reserveStock(data.inventoryId, { quantityToReserve: data.quantityToReserve });
      return { success: true, inventory: result };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @MessagePattern({ cmd: 'adjust_stock' })
  async adjustStockInternal(data: { inventoryId: string, quantityToAdjust: number }) {
    try {
      const result = await this.inventoryService.adjustStock(data.inventoryId, { 
        inventoryId: data.inventoryId, 
        quantityToAdjust: data.quantityToAdjust 
      });
      return { success: true, inventory: result };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @Get(':sku')
  findBySku(@Param('sku') sku: string) {
    return this.inventoryService.findBySku(sku);
  }

  @Patch(':id/adjust')
  adjustStock(@Param('id') id: string, @Body() adjustDto: AdjustInventoryDto) {
    // Override the DTO payload inventoryId for safety/consistency if needed, 
    // or validate they match. We'll simply use the path param here.
    return this.inventoryService.adjustStock(id, adjustDto);
  }

  @Patch(':id/reserve')
  reserveStock(@Param('id') id: string, @Body() reserveDto: ReserveInventoryDto) {
     return this.inventoryService.reserveStock(id, reserveDto);
  }
}
