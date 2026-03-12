import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';
import { Product } from './entities/product.entity';
import { ProductVariant } from './entities/product-variant.entity';
import { Category } from '../category/entities/category.entity';
import { Inventory } from '../inventory/entities/inventory.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(ProductVariant)
    private variantRepository: Repository<ProductVariant>,
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { categoryIds, ...productData } = createProductDto;
    const product = this.productRepository.create(productData);

    if (categoryIds && categoryIds.length > 0) {
      // Note: In a real app we'd inject CategoryService or Repository here to fetch them.
      // We'll create shell entities for the relationship mapping.
      product.categories = categoryIds.map(id => ({ id } as Category));
    }

    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({
      relations: ['categories', 'variants', 'images'],
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['categories', 'variants', 'variants.inventory', 'images'],
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    const { categoryIds, ...updateData } = updateProductDto as any;

    Object.assign(product, updateData);

    if (categoryIds !== undefined) {
      product.categories = categoryIds.map((catId: string) => ({ id: catId } as Category));
    }

    return this.productRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }

  async addVariant(productId: string, createVariantDto: CreateProductVariantDto): Promise<ProductVariant> {
    const product = await this.findOne(productId);

    // Create inventory record with 0 stock implicitly
    const inventory = new Inventory();
    inventory.sku = createVariantDto.sku;

    const variant = this.variantRepository.create({
      ...createVariantDto,
      product,
      inventory,
    });

    return this.variantRepository.save(variant);
  }

  async removeVariant(productId: string, variantId: string): Promise<void> {
    const variant = await this.variantRepository.findOne({
      where: { id: variantId, product: { id: productId } }
    });

    if (!variant) {
      throw new NotFoundException(`Variant ${variantId} on Product ${productId} not found`);
    }

    await this.variantRepository.remove(variant);
  }
}
