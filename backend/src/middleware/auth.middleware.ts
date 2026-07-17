import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { AppError } from '../utils/app-error';
import { env } from '../config/env';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: string;
  };
}

export function authMiddleware(
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    next(new AppError('Token di autenticazione mancante', 401));
    return;
  }

  const token = authHeader.substring(7);

  try {
    const payload = jwt.verify(token, env.jwtSecret, {
      issuer: env.jwtIssuer,
    }) as jwt.JwtPayload;

    req.user = {
      userId: payload.userId as string,
      email: payload.email as string,
      role: payload.role as string,
    };

    next();
  } catch {
    next(new AppError('Token non valido o scaduto', 401));
  }
}