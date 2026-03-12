import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);

    if (createCategoryDto.parentCategoryId) {
      const parent = await this.categoryRepository.findOne({
        where: { id: createCategoryDto.parentCategoryId },
      });
      if (!parent) {
        throw new NotFoundException(`Parent category with ID ${createCategoryDto.parentCategoryId} not found`);
      }
      category.parentCategory = parent;
    }

    return this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    // Returns categories with their nested children
    return this.categoryRepository.find({
      relations: ['childCategories'],
      where: { parentCategory: IsNull() }, // Optionally only fetch root categories
    });
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['childCategories', 'parentCategory'],
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);
    const { parentCategoryId, ...updateData } = updateCategoryDto as any; // Cast to access optional/partial properties

    if (parentCategoryId) {
       const parent = await this.categoryRepository.findOne({
        where: { id: parentCategoryId },
      });
      if (!parent) {
        throw new NotFoundException(`Parent category with ID ${parentCategoryId} not found`);
      }
      category.parentCategory = parent;
    } else if (parentCategoryId === null) {
       category.parentCategory = null as any; // Allow detaching parent
    }

    Object.assign(category, updateData);
    return this.categoryRepository.save(category);
  }

  async remove(id: string): Promise<void> {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
  }
}
