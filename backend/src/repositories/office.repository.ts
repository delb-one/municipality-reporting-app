import type { Prisma } from '@prisma/client';

import { prisma } from '../config/prisma';

export const officeRepository = {
  findMany() {
    return prisma.office.findMany({
      orderBy: { name: 'asc' },
    });
  },

  findById(id: number) {
    return prisma.office.findUnique({
      where: { id },
    });
  },

  create(data: Prisma.OfficeCreateInput) {
    return prisma.office.create({ data });
  },

  update(id: number, data: Prisma.OfficeUpdateInput) {
    return prisma.office.update({
      where: { id },
      data,
    });
  },

  delete(id: number) {
    return prisma.office.delete({
      where: { id },
    });
  },
};
