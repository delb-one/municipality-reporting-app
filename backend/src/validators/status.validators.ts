import { z } from 'zod';

export const statusIdParamsSchema = z.object({
  id: z.string().regex(/^\d+$/, 'Id stato non valido'),
});

export const statusBodySchema = z.object({
  name: z.string().trim().min(2, 'Nome stato troppo corto').max(100, 'Nome stato troppo lungo'),
  color: z.string().trim().min(3, 'Colore stato troppo corto').max(30, 'Colore stato troppo lungo'),
});
