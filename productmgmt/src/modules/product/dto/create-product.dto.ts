import { IsString, IsNumber, IsBoolean, IsOptional, IsArray, IsUUID } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsString()
  slug: string;

  @IsString()
  description: string;

  @IsNumber()
  basePrice: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsArray()
  @IsUUID('all', { each: true })
  @IsOptional()
  categoryIds?: string[];
}
