import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductVariantDto } from './dto/create-product-variant.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @MessagePattern({ cmd: 'validate_product' })
  async validateProduct(data: { productId: string }) {
    try {
      const product = await this.productService.findOne(data.productId);
      return { 
        id: product.id, 
        name: product.name, 
        price: product.basePrice, 
        inventoryId: product.variants?.[0]?.inventory?.id,
        exists: true 
      };
    } catch (error) {
      return { exists: false };
    }
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }

  @Post(':id/variants')
  addVariant(@Param('id') id: string, @Body() createVariantDto: CreateProductVariantDto) {
     return this.productService.addVariant(id, createVariantDto);
  }

  @Delete(':id/variants/:variantId')
  removeVariant(@Param('id') id: string, @Param('variantId') variantId: string) {
     return this.productService.removeVariant(id, variantId);
  }
}
