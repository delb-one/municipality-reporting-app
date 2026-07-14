import type { Prisma } from '@prisma/client';

import { prisma } from '../config/prisma';

export const reportRepository = {
  findMany() {
    return prisma.report.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        category: true,
        office: true,
        status: true,
        histories: {
          orderBy: { createdAt: 'asc' },
          include: {
            status: true,
          },
        },
      },
    });
  },

  findById(id: string) {
    return prisma.report.findUnique({
      where: { id },
      include: {
        category: true,
        office: true,
        status: true,
        histories: {
          orderBy: { createdAt: 'asc' },
          include: {
            status: true,
          },
        },
      },
    });
  },

  findByPracticeCode(practiceCode: string) {
    return prisma.report.findUnique({
      where: { practiceCode },
      include: {
        category: true,
        office: true,
        status: true,
        histories: {
          orderBy: { createdAt: 'asc' },
          include: {
            status: true,
          },
        },
      },
    });
  },

  countByYearPrefix(yearPrefix: string) {
    return prisma.report.count({
      where: {
        practiceCode: {
          startsWith: yearPrefix,
        },
      },
    });
  },

  create(data: Prisma.ReportCreateInput) {
    return prisma.report.create({
      data,
      include: {
        category: true,
        office: true,
        status: true,
        histories: {
          orderBy: { createdAt: 'asc' },
          include: { status: true },
        },
      },
    });
  },

  update(id: string, data: Prisma.ReportUpdateInput) {
    return prisma.report.update({
      where: { id },
      data,
      include: {
        category: true,
        office: true,
        status: true,
        histories: {
          orderBy: { createdAt: 'asc' },
          include: { status: true },
        },
      },
    });
  },

  delete(id: string) {
    return prisma.report.delete({
      where: { id },
    });
  },

  createHistory(data: Prisma.ReportHistoryCreateInput) {
    return prisma.reportHistory.create({ data });
  },

  findHistoryByReportId(reportId: string) {
    return prisma.reportHistory.findMany({
      where: { reportId },
      orderBy: { createdAt: 'asc' },
      include: {
        status: true,
      },
    });
  },
};
