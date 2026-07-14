import { officeRepository } from '../repositories/office.repository';
import { AppError } from '../utils/app-error';
import type { CatalogInput } from '../types/api';

export const officeService = {
  async list() {
    return officeRepository.findMany();
  },

  async getById(id: number) {
    const office = await officeRepository.findById(id);

    if (!office) {
      throw new AppError('Ufficio non trovato', 404);
    }

    return office;
  },

  async create(input: CatalogInput) {
    if (!input.name.trim()) {
      throw new AppError('Nome ufficio obbligatorio', 400);
    }

    return officeRepository.create({
      name: input.name.trim(),
    });
  },

  async update(id: number, input: CatalogInput) {
    await this.getById(id);

    return officeRepository.update(id, {
      name: input.name.trim(),
    });
  },

  async remove(id: number) {
    await this.getById(id);
    return officeRepository.delete(id);
  },
};
