import { Product } from './product.entity';
import { Inventory } from '../../inventory/entities/inventory.entity';
export declare class ProductVariant {
    id: string;
    product: Product;
    sku: string;
    price: number;
    compareAtPrice: number;
    attributes: Record<string, any>;
    inventory: Inventory;
    createdAt: Date;
    updatedAt: Date;
}
