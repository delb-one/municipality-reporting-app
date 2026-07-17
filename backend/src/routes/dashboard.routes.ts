import { Router } from 'express';

import { dashboardController } from '../controllers/dashboard.controller';
import { asyncHandler } from '../utils/async-handler';
import { authMiddleware } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorize.middleware';

export const dashboardRouter = Router();

dashboardRouter.get('/stats', authMiddleware, authorize(['OPERATORE', 'RESPONSABILE', 'AMMINISTRATORE']), asyncHandler(dashboardController.stats));
dashboardRouter.get('/reports-by-category', authMiddleware, authorize(['OPERATORE', 'RESPONSABILE', 'AMMINISTRATORE']), asyncHandler(dashboardController.byCategory));
dashboardRouter.get('/reports-by-status', authMiddleware, authorize(['OPERATORE', 'RESPONSABILE', 'AMMINISTRATORE']), asyncHandler(dashboardController.byStatus));
dashboardRouter.get('/reports-by-month', authMiddleware, authorize(['OPERATORE', 'RESPONSABILE', 'AMMINISTRATORE']), asyncHandler(dashboardController.byMonth));
