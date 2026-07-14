import type { Request, Response } from 'express';

import { reportService } from '../services/report.service';

export const dashboardController = {
  stats: async (_req: Request, res: Response) => {
    const data = await reportService.getDashboardStats();
    res.json({ success: true, data });
  },

  byCategory: async (_req: Request, res: Response) => {
    const data = await reportService.getReportsByCategory();
    res.json({ success: true, data });
  },

  byStatus: async (_req: Request, res: Response) => {
    const data = await reportService.getReportsByStatus();
    res.json({ success: true, data });
  },

  byMonth: async (_req: Request, res: Response) => {
    const data = await reportService.getReportsByMonth();
    res.json({ success: true, data });
  },
};
