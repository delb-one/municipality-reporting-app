import { Router } from 'express';

import { reportController } from '../controllers/report.controller';
import { asyncHandler } from '../utils/async-handler';
import { validateBody, validateParams } from '../middleware/validate';
import {
  reportAssignmentBodySchema,
  reportCreateBodySchema,
  reportIdParamsSchema,
  reportPracticeCodeParamsSchema,
  reportStatusBodySchema,
  reportUpdateBodySchema,
} from '../validators/report.validators';

export const reportsRouter = Router();

reportsRouter.get('/', asyncHandler(reportController.list));
reportsRouter.get('/practice/:code', validateParams(reportPracticeCodeParamsSchema), asyncHandler(reportController.getByPracticeCode));
reportsRouter.get('/:id/history', validateParams(reportIdParamsSchema), asyncHandler(reportController.getHistory));
reportsRouter.get('/:id', validateParams(reportIdParamsSchema), asyncHandler(reportController.getById));
reportsRouter.post('/', validateBody(reportCreateBodySchema), asyncHandler(reportController.create));
reportsRouter.put('/:id', validateParams(reportIdParamsSchema), validateBody(reportUpdateBodySchema), asyncHandler(reportController.update));
reportsRouter.patch('/:id/status', validateParams(reportIdParamsSchema), validateBody(reportStatusBodySchema), asyncHandler(reportController.updateStatus));
reportsRouter.patch('/:id/assignment', validateParams(reportIdParamsSchema), validateBody(reportAssignmentBodySchema), asyncHandler(reportController.assignOffice));
reportsRouter.delete('/:id', validateParams(reportIdParamsSchema), asyncHandler(reportController.remove));
