import { prisma } from '../config/prisma';

export const dashboardRepository = {
  getStats() {
    return prisma.report.groupBy({
      by: ['statusId'],
      _count: {
        statusId: true,
      },
    });
  },

  getReportsByCategory() {
    return prisma.report.groupBy({
      by: ['categoryId'],
      _count: {
        categoryId: true,
      },
    });
  },

  getReportsByStatus() {
    return prisma.report.groupBy({
      by: ['statusId'],
      _count: {
        statusId: true,
      },
    });
  },

  getReportsByMonth() {
    return prisma.$queryRaw<
      Array<{ month: string; total: number }>
    >`SELECT to_char(date_trunc('month', "created_at"), 'YYYY-MM') AS month, COUNT(*)::int AS total
      FROM reports
      GROUP BY 1
      ORDER BY 1 ASC`;
  },

  countReports() {
    return prisma.report.count();
  },

  countOpenReports(statusIds: number[]) {
    return prisma.report.count({
      where: {
        statusId: {
          in: statusIds,
        },
      },
    });
  },

  countClosedReports(statusIds: number[]) {
    return prisma.report.count({
      where: {
        statusId: {
          in: statusIds,
        },
      },
    });
  },
};
