import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { Product } from './entities/product.entity';
import { ProductVariant } from './entities/product-variant.entity';
export declare class ProductService {
    private productRepository;
    private variantRepository;
    constructor(productRepository: Repository<Product>, variantRepository: Repository<ProductVariant>);
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(id: string): Promise<Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
    remove(id: string): Promise<void>;
    addVariant(productId: string, createVariantDto: CreateProductVariantDto): Promise<ProductVariant>;
    removeVariant(productId: string, variantId: string): Promise<void>;
}
