import { IsString, IsNumber, IsOptional, IsObject } from 'class-validator';

export class CreateProductVariantDto {
  @IsString()
  sku: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  compareAtPrice?: number;

  @IsObject()
  @IsOptional()
  attributes?: Record<string, any>;
}
