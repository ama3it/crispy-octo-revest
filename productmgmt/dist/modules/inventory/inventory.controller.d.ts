import { InventoryService } from './inventory.service';
import { AdjustInventoryDto, ReserveInventoryDto } from './dto/inventory.dto';
export declare class InventoryController {
    private readonly inventoryService;
    constructor(inventoryService: InventoryService);
    reserveStockInternal(data: {
        inventoryId: string;
        quantityToReserve: number;
    }): Promise<{
        success: boolean;
        inventory: import("./entities/inventory.entity").Inventory;
        message?: undefined;
    } | {
        success: boolean;
        message: any;
        inventory?: undefined;
    }>;
    adjustStockInternal(data: {
        inventoryId: string;
        quantityToAdjust: number;
    }): Promise<{
        success: boolean;
        inventory: import("./entities/inventory.entity").Inventory;
        message?: undefined;
    } | {
        success: boolean;
        message: any;
        inventory?: undefined;
    }>;
    findBySku(sku: string): Promise<import("./entities/inventory.entity").Inventory>;
    adjustStock(id: string, adjustDto: AdjustInventoryDto): Promise<import("./entities/inventory.entity").Inventory>;
    reserveStock(id: string, reserveDto: ReserveInventoryDto): Promise<import("./entities/inventory.entity").Inventory>;
}
