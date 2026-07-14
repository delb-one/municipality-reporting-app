import type { NextFunction, Request, Response } from 'express';

import { env } from '../config/env';

export function corsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.header('Access-Control-Allow-Origin', env.corsOrigin);
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With',
  );

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }

  next();
}
