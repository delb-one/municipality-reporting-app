import { statusRepository } from '../repositories/status.repository';
import { AppError } from '../utils/app-error';
import type { StatusInput } from '../types/api';

export const statusService = {
  async list() {
    return statusRepository.findMany();
  },

  async getById(id: number) {
    const status = await statusRepository.findById(id);

    if (!status) {
      throw new AppError('Stato non trovato', 404);
    }

    return status;
  },

  async create(input: StatusInput) {
    if (!input.name.trim()) {
      throw new AppError('Nome stato obbligatorio', 400);
    }

    if (!input.color.trim()) {
      throw new AppError('Colore stato obbligatorio', 400);
    }

    return statusRepository.create({
      name: input.name.trim(),
      color: input.color.trim(),
    });
  },

  async update(id: number, input: StatusInput) {
    await this.getById(id);

    return statusRepository.update(id, {
      name: input.name.trim(),
      color: input.color.trim(),
    });
  },

  async remove(id: number) {
    await this.getById(id);
    return statusRepository.delete(id);
  },
};
