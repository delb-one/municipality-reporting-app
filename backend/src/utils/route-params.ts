import type { Params } from 'express-serve-static-core';

import { AppError } from './app-error';

export function readStringParam(params: Params, key: string): string {
  const value = params[key];

  if (typeof value !== 'string' || !value.trim()) {
    throw new AppError(`Parametro ${key} non valido`, 400);
  }

  return value.trim();
}
