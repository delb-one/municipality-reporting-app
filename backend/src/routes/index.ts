import { Router } from 'express';

import { healthRouter } from './health.routes';
import { reportsRouter } from './reports.routes';
import { categoriesRouter } from './categories.routes';
import { officesRouter } from './offices.routes';
import { statusesRouter } from './statuses.routes';
import { dashboardRouter } from './dashboard.routes';

export const apiRouter = Router();

apiRouter.use('/health', healthRouter);
apiRouter.use('/reports', reportsRouter);
apiRouter.use('/categories', categoriesRouter);
apiRouter.use('/offices', officesRouter);
apiRouter.use('/statuses', statusesRouter);
apiRouter.use('/dashboard', dashboardRouter);
