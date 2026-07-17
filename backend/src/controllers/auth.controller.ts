import type { Request, Response } from 'express';

import { authService } from '../services/auth.service';

export const authController = {
  login: async (req: Request, res: Response) => {
    const data = await authService.login(req.body);
    res.json({ success: true, data });
  },
};