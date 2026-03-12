import { ProductVariant } from '../../product/entities/product-variant.entity';
export declare class Inventory {
    id: string;
    variant: ProductVariant;
    sku: string;
    quantityAvailable: number;
    quantityReserved: number;
    createdAt: Date;
    updatedAt: Date;
}
