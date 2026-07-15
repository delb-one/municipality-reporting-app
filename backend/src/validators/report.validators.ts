import { z } from 'zod';

export const reportIdParamsSchema = z.object({
  id: z.string().uuid('Id segnalazione non valido'),
});

export const reportPracticeCodeParamsSchema = z.object({
  code: z
    .string()
    .regex(/^SEG-\d{4}-\d{6}$/, 'Codice pratica non valido'),
});

const reportTextSchema = (label: string, min = 2, max = 120) =>
  z.string().trim().min(min, `${label} troppo corto`).max(max, `${label} troppo lungo`);

export const reportCreateBodySchema = z.object({
  firstname: reportTextSchema('Nome'),
  lastname: reportTextSchema('Cognome'),
  email: z.string().trim().email('Email non valida').max(150, 'Email troppo lunga'),
  phone: z
    .string()
    .trim()
    .min(6, 'Telefono troppo corto')
    .max(20, 'Telefono troppo lungo')
    .optional()
    .nullable(),
  street: reportTextSchema('Indirizzo', 5, 150),
  description: z.string().trim().min(10, 'Descrizione troppo corta').max(2000, 'Descrizione troppo lunga'),
  privacyConsent: z.boolean().refine((value) => value === true, {
    message: 'Consenso privacy obbligatorio',
  }),
  categoryId: z.coerce.number().int().positive('Categoria non valida'),
  officeId: z.coerce.number().int().positive('Ufficio non valido').nullable().optional(),
  statusId: z.coerce.number().int().positive('Stato non valido'),
});

export const reportUpdateBodySchema = z
  .object({
    firstname: reportTextSchema('Nome').optional(),
    lastname: reportTextSchema('Cognome').optional(),
    email: z.string().trim().email('Email non valida').max(150, 'Email troppo lunga').optional(),
    phone: z
      .string()
      .trim()
      .min(6, 'Telefono troppo corto')
      .max(20, 'Telefono troppo lungo')
      .optional()
      .nullable(),
    street: reportTextSchema('Indirizzo', 5, 150).optional(),
    description: z.string().trim().min(10, 'Descrizione troppo corta').max(2000, 'Descrizione troppo lunga').optional(),
    privacyConsent: z.boolean().optional(),
    categoryId: z.coerce.number().int().positive('Categoria non valida').optional(),
    officeId: z.coerce.number().int().positive('Ufficio non valido').nullable().optional(),
  })
  .refine((data) => Object.values(data).some((value) => value !== undefined), {
    message: 'Almeno un campo deve essere fornito',
  });

export const reportStatusBodySchema = z.object({
  statusId: z.coerce.number().int().positive('Stato non valido'),
  note: z
    .string()
    .trim()
    .min(1, 'Nota troppo corta')
    .max(500, 'Nota troppo lunga')
    .optional(),
});

export const reportAssignmentBodySchema = z.object({
  officeId: z.coerce.number().int().positive('Ufficio non valido').nullable(),
});
