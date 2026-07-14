import type { Request, Response } from 'express';

import { statusService } from '../services/status.service';

export const statusController = {
  list: async (_req: Request, res: Response) => {
    const data = await statusService.list();
    res.json({ success: true, data });
  },

  getById: async (req: Request, res: Response) => {
    const data = await statusService.getById(Number(req.params.id));
    res.json({ success: true, data });
  },

  create: async (req: Request, res: Response) => {
    const data = await statusService.create(req.body);
    res.status(201).json({ success: true, data });
  },

  update: async (req: Request, res: Response) => {
    const data = await statusService.update(Number(req.params.id), req.body);
    res.json({ success: true, data });
  },

  remove: async (req: Request, res: Response) => {
    await statusService.remove(Number(req.params.id));
    res.status(204).send();
  },
};
