import { categoryRepository } from '../repositories/category.repository';
import { AppError } from '../utils/app-error';
import type { CatalogInput } from '../types/api';

export const categoryService = {
  async list() {
    return categoryRepository.findMany();
  },

  async getById(id: number) {
    const category = await categoryRepository.findById(id);

    if (!category) {
      throw new AppError('Categoria non trovata', 404);
    }

    return category;
  },

  async create(input: CatalogInput) {
    if (!input.name.trim()) {
      throw new AppError('Nome categoria obbligatorio', 400);
    }

    return categoryRepository.create({
      name: input.name.trim(),
      description: input.description?.trim() || null,
    });
  },

  async update(id: number, input: CatalogInput) {
    await this.getById(id);

    return categoryRepository.update(id, {
      name: input.name.trim(),
      description: input.description?.trim() || null,
    });
  },

  async remove(id: number) {
    await this.getById(id);
    return categoryRepository.delete(id);
  },
};
