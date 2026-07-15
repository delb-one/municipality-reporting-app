import { z } from 'zod';

export const categoryIdParamsSchema = z.object({
  id: z.string().regex(/^\d+$/, 'Id categoria non valido'),
});

export const categoryBodySchema = z.object({
  name: z.string().trim().min(2, 'Nome categoria troppo corto').max(100, 'Nome categoria troppo lungo'),
  description: z
    .string()
    .trim()
    .max(255, 'Descrizione categoria troppo lunga')
    .optional()
    .nullable(),
});
