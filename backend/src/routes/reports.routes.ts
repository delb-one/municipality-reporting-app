import { Router } from 'express';

import { reportController } from '../controllers/report.controller';
import { asyncHandler } from '../utils/async-handler';
import { validateBody, validateParams } from '../middleware/validate';
import { authMiddleware } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorize.middleware';
import {
  reportAssignmentBodySchema,
  reportCreateBodySchema,
  reportIdParamsSchema,
  reportPracticeCodeParamsSchema,
  reportStatusBodySchema,
  reportUpdateBodySchema,
} from '../validators/report.validators';

export const reportsRouter = Router();

reportsRouter.get('/', authMiddleware, authorize(['OPERATORE', 'RESPONSABILE', 'AMMINISTRATORE']), asyncHandler(reportController.list));
reportsRouter.get('/practice/:code', validateParams(reportPracticeCodeParamsSchema), asyncHandler(reportController.getByPracticeCode));
reportsRouter.get('/:id/history', authMiddleware, authorize(['OPERATORE', 'RESPONSABILE', 'AMMINISTRATORE']), validateParams(reportIdParamsSchema), asyncHandler(reportController.getHistory));
reportsRouter.get('/:id', authMiddleware, authorize(['OPERATORE', 'RESPONSABILE', 'AMMINISTRATORE']), validateParams(reportIdParamsSchema), asyncHandler(reportController.getById));
reportsRouter.post('/', validateBody(reportCreateBodySchema), asyncHandler(reportController.create));
reportsRouter.put('/:id', authMiddleware, authorize(['OPERATORE', 'RESPONSABILE', 'AMMINISTRATORE']), validateParams(reportIdParamsSchema), validateBody(reportUpdateBodySchema), asyncHandler(reportController.update));
reportsRouter.patch('/:id/status', authMiddleware, authorize(['OPERATORE', 'RESPONSABILE', 'AMMINISTRATORE']), validateParams(reportIdParamsSchema), validateBody(reportStatusBodySchema), asyncHandler(reportController.updateStatus));
reportsRouter.patch('/:id/assignment', authMiddleware, authorize(['OPERATORE', 'RESPONSABILE', 'AMMINISTRATORE']), validateParams(reportIdParamsSchema), validateBody(reportAssignmentBodySchema), asyncHandler(reportController.assignOffice));
reportsRouter.delete('/:id', authMiddleware, authorize(['RESPONSABILE', 'AMMINISTRATORE']), validateParams(reportIdParamsSchema), asyncHandler(reportController.remove));
