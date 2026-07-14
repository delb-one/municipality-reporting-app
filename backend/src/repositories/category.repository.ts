import type { Prisma } from '@prisma/client';

import { prisma } from '../config/prisma';

export const categoryRepository = {
  findMany() {
    return prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
  },

  findById(id: number) {
    return prisma.category.findUnique({
      where: { id },
    });
  },

  create(data: Prisma.CategoryCreateInput) {
    return prisma.category.create({ data });
  },

  update(id: number, data: Prisma.CategoryUpdateInput) {
    return prisma.category.update({
      where: { id },
      data,
    });
  },

  delete(id: number) {
    return prisma.category.delete({
      where: { id },
    });
  },
};
