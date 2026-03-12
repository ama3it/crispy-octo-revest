import { Product } from './product.entity';
export declare class ProductImage {
    id: string;
    product: Product;
    url: string;
    altText: string;
    isPrimary: boolean;
    sortOrder: number;
    createdAt: Date;
}
