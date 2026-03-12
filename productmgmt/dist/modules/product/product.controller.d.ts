import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    validateProduct(data: {
        productId: string;
    }): Promise<{
        id: string;
        name: string;
        price: number;
        inventoryId: string;
        exists: boolean;
    } | {
        exists: boolean;
        id?: undefined;
        name?: undefined;
        price?: undefined;
        inventoryId?: undefined;
    }>;
    create(createProductDto: CreateProductDto): Promise<import("./entities/product.entity").Product>;
    findAll(): Promise<import("./entities/product.entity").Product[]>;
    findOne(id: string): Promise<import("./entities/product.entity").Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<import("./entities/product.entity").Product>;
    remove(id: string): Promise<void>;
    addVariant(id: string, createVariantDto: CreateProductVariantDto): Promise<import("./entities/product-variant.entity").ProductVariant>;
    removeVariant(id: string, variantId: string): Promise<void>;
}
