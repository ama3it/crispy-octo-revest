import { Repository } from 'typeorm';
import { Inventory } from './entities/inventory.entity';
import { AdjustInventoryDto, ReserveInventoryDto } from './dto/inventory.dto';
export declare class InventoryService {
    private inventoryRepository;
    constructor(inventoryRepository: Repository<Inventory>);
    findBySku(sku: string): Promise<Inventory>;
    adjustStock(id: string, adjustDto: AdjustInventoryDto): Promise<Inventory>;
    reserveStock(id: string, reserveDto: ReserveInventoryDto): Promise<Inventory>;
}
