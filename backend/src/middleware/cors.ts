import type { NextFunction, Request, Response } from 'express';
import { env } from '../config/env';

export function corsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {

  const requestOrigin = req.headers.origin;

  if (
    requestOrigin &&
    env.corsOrigins.includes(requestOrigin)
  ) {
    res.header(
      'Access-Control-Allow-Origin',
      requestOrigin
    );
  }

  res.header(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,PATCH,DELETE,OPTIONS'
  );

  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, X-Requested-With'
  );

  
  res.header(
    'Access-Control-Allow-Credentials',
    'true'
  );

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }

  next();
}