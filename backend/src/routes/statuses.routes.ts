import { Router } from 'express';

import { statusController } from '../controllers/status.controller';
import { asyncHandler } from '../utils/async-handler';

export const statusesRouter = Router();

statusesRouter.get('/', asyncHandler(statusController.list));
statusesRouter.get('/:id', asyncHandler(statusController.getById));
statusesRouter.post('/', asyncHandler(statusController.create));
statusesRouter.put('/:id', asyncHandler(statusController.update));
statusesRouter.delete('/:id', asyncHandler(statusController.remove));
