import { Router } from 'express';

import { statusController } from '../controllers/status.controller';
import { asyncHandler } from '../utils/async-handler';
import { validateBody, validateParams } from '../middleware/validate';
import { statusBodySchema, statusIdParamsSchema } from '../validators/status.validators';
import { authMiddleware } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorize.middleware';

export const statusesRouter = Router();

statusesRouter.get('/', asyncHandler(statusController.list));
statusesRouter.get('/:id', validateParams(statusIdParamsSchema), asyncHandler(statusController.getById));
statusesRouter.post('/', authMiddleware, authorize(['AMMINISTRATORE']), validateBody(statusBodySchema), asyncHandler(statusController.create));
statusesRouter.put('/:id', authMiddleware, authorize(['AMMINISTRATORE']), validateParams(statusIdParamsSchema), validateBody(statusBodySchema), asyncHandler(statusController.update));
statusesRouter.delete('/:id', authMiddleware, authorize(['AMMINISTRATORE']), validateParams(statusIdParamsSchema), asyncHandler(statusController.remove));
