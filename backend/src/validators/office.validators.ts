import { z } from 'zod';

export const officeIdParamsSchema = z.object({
  id: z.string().regex(/^\d+$/, 'Id ufficio non valido'),
});

export const officeBodySchema = z.object({
  name: z.string().trim().min(2, 'Nome ufficio troppo corto').max(100, 'Nome ufficio troppo lungo'),
});
