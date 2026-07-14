import type { Request, Response } from 'express';

import { reportService } from '../services/report.service';
import { readStringParam } from '../utils/route-params';

export const reportController = {
  list: async (_req: Request, res: Response) => {
    const data = await reportService.list();
    res.json({ success: true, data });
  },

  getById: async (req: Request, res: Response) => {
    const data = await reportService.getById(readStringParam(req.params, 'id'));
    res.json({ success: true, data });
  },

  getByPracticeCode: async (req: Request, res: Response) => {
    const data = await reportService.getByPracticeCode(readStringParam(req.params, 'code'));
    res.json({ success: true, data });
  },

  getHistory: async (req: Request, res: Response) => {
    const data = await reportService.getHistoryById(readStringParam(req.params, 'id'));
    res.json({ success: true, data });
  },

  create: async (req: Request, res: Response) => {
    const data = await reportService.create(req.body);
    res.status(201).json({ success: true, data });
  },

  update: async (req: Request, res: Response) => {
    const data = await reportService.update(readStringParam(req.params, 'id'), req.body);
    res.json({ success: true, data });
  },

  updateStatus: async (req: Request, res: Response) => {
    const data = await reportService.updateStatus(readStringParam(req.params, 'id'), req.body);
    res.json({ success: true, data });
  },

  assignOffice: async (req: Request, res: Response) => {
    const data = await reportService.assignOffice(readStringParam(req.params, 'id'), req.body);
    res.json({ success: true, data });
  },

  remove: async (req: Request, res: Response) => {
    await reportService.remove(readStringParam(req.params, 'id'));
    res.status(204).send();
  },
};
