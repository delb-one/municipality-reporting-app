import type { Prisma } from '@prisma/client';

import { prisma } from '../config/prisma';

export const statusRepository = {
  findMany() {
    return prisma.status.findMany({
      orderBy: { id: 'asc' },
    });
  },

  findById(id: number) {
    return prisma.status.findUnique({
      where: { id },
    });
  },

  findByName(name: string) {
    return prisma.status.findUnique({
      where: { name },
    });
  },

  create(data: Prisma.StatusCreateInput) {
    return prisma.status.create({ data });
  },

  update(id: number, data: Prisma.StatusUpdateInput) {
    return prisma.status.update({
      where: { id },
      data,
    });
  },

  delete(id: number) {
    return prisma.status.delete({
      where: { id },
    });
  },
};
