import { Product } from '../../product/entities/product.entity';
export declare class Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    parentCategory: Category;
    childCategories: Category[];
    products: Product[];
    createdAt: Date;
    updatedAt: Date;
}
