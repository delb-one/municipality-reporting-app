import type { NextFunction, Request, Response } from 'express';
import { Prisma } from '@prisma/client';

import { AppError } from '../utils/app-error';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      res.status(409).json({
        success: false,
        message: 'Valore duplicato non consentito',
      });
      return;
    }

    if (err.code === 'P2025') {
      res.status(404).json({
        success: false,
        message: 'Risorsa non trovata',
      });
      return;
    }
  }

  const message = err instanceof Error ? err.message : 'Unexpected server error';

  res.status(500).json({
    success: false,
    message,
  });
}
