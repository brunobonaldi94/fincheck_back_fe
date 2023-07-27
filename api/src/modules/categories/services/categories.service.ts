import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryRepository } from 'src/shared/database/repositories/categories.repositories';
import { ValidateCategoryOwnershipService } from './validate-category-ownership.service';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesService: CategoryRepository,
    private readonly validateCategoryOwnershipService: ValidateCategoryOwnershipService,
  ) {}
  create(userId: string, createCategoryDto: CreateCategoryDto) {
    const { name, icon, type } = createCategoryDto;
    return this.categoriesService.create({
      data: {
        userId,
        name,
        icon,
        type,
      },
    });
  }

  findAllByUserId(userId: string) {
    const categories = this.categoriesService.findMany({
      where: { userId },
    });
    return categories;
  }

  async findOne(userId: string, categoryId: string) {
    await this.validateCategoryOwnershipService.validate(userId, categoryId);
    return this.categoriesService.findFirst({
      where: { userId, id: categoryId },
    });
  }

  async update(
    userId: string,
    categoryId: string,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    await this.validateCategoryOwnershipService.validate(userId, categoryId);
    const { name, icon, type } = updateCategoryDto;
    return this.categoriesService.update({
      where: { id: categoryId },
      data: {
        userId,
        name,
        icon,
        type,
      },
    });
  }

  async remove(userId: string, categoryId: string) {
    await this.validateCategoryOwnershipService.validate(userId, categoryId);
    await this.categoriesService.delete({
      where: { id: categoryId },
    });
    return null;
  }
}
