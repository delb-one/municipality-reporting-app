import type { NextFunction, Response } from 'express';

import { AppError } from '../utils/app-error';
import { AuthenticatedRequest } from './auth.middleware';

export function authorize(allowedRoles: string[]) {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
    if (!req.user) {
      next(new AppError('Autenticazione richiesta', 401));
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      next(new AppError('Accesso negato: ruolo non autorizzato', 403));
      return;
    }

    next();
  };
}