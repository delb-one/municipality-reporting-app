import type { Request, Response } from 'express';

import { categoryService } from '../services/category.service';

export const categoryController = {
  list: async (_req: Request, res: Response) => {
    const data = await categoryService.list();
    res.json({ success: true, data });
  },

  getById: async (req: Request, res: Response) => {
    const data = await categoryService.getById(Number(req.params.id));
    res.json({ success: true, data });
  },

  create: async (req: Request, res: Response) => {
    const data = await categoryService.create(req.body);
    res.status(201).json({ success: true, data });
  },

  update: async (req: Request, res: Response) => {
    const data = await categoryService.update(Number(req.params.id), req.body);
    res.json({ success: true, data });
  },

  remove: async (req: Request, res: Response) => {
    await categoryService.remove(Number(req.params.id));
    res.status(204).send();
  },
};
