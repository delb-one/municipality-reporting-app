import type { Request, Response } from 'express';

import { officeService } from '../services/office.service';

export const officeController = {
  list: async (_req: Request, res: Response) => {
    const data = await officeService.list();
    res.json({ success: true, data });
  },

  getById: async (req: Request, res: Response) => {
    const data = await officeService.getById(Number(req.params.id));
    res.json({ success: true, data });
  },

  create: async (req: Request, res: Response) => {
    const data = await officeService.create(req.body);
    res.status(201).json({ success: true, data });
  },

  update: async (req: Request, res: Response) => {
    const data = await officeService.update(Number(req.params.id), req.body);
    res.json({ success: true, data });
  },

  remove: async (req: Request, res: Response) => {
    await officeService.remove(Number(req.params.id));
    res.status(204).send();
  },
};
