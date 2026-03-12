import { Category } from '../../category/entities/category.entity';
import { ProductVariant } from './product-variant.entity';
import { ProductImage } from './product-image.entity';
export declare class Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    basePrice: number;
    isActive: boolean;
    categories: Category[];
    variants: ProductVariant[];
    images: ProductImage[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}
