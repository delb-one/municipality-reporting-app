import { Router } from 'express';

import { dashboardController } from '../controllers/dashboard.controller';
import { asyncHandler } from '../utils/async-handler';

export const dashboardRouter = Router();

dashboardRouter.get('/stats', asyncHandler(dashboardController.stats));
dashboardRouter.get('/reports-by-category', asyncHandler(dashboardController.byCategory));
dashboardRouter.get('/reports-by-status', asyncHandler(dashboardController.byStatus));
dashboardRouter.get('/reports-by-month', asyncHandler(dashboardController.byMonth));
