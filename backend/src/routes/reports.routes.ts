import { Router } from 'express';

import { reportController } from '../controllers/report.controller';
import { asyncHandler } from '../utils/async-handler';

export const reportsRouter = Router();

reportsRouter.get('/', asyncHandler(reportController.list));
reportsRouter.get('/practice/:code', asyncHandler(reportController.getByPracticeCode));
reportsRouter.get('/:id/history', asyncHandler(reportController.getHistory));
reportsRouter.get('/:id', asyncHandler(reportController.getById));
reportsRouter.post('/', asyncHandler(reportController.create));
reportsRouter.put('/:id', asyncHandler(reportController.update));
reportsRouter.patch('/:id/status', asyncHandler(reportController.updateStatus));
reportsRouter.patch('/:id/assignment', asyncHandler(reportController.assignOffice));
reportsRouter.delete('/:id', asyncHandler(reportController.remove));
