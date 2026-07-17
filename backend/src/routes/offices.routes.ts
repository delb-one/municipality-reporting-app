import { Router } from 'express';

import { officeController } from '../controllers/office.controller';
import { asyncHandler } from '../utils/async-handler';
import { validateBody, validateParams } from '../middleware/validate';
import { officeBodySchema, officeIdParamsSchema } from '../validators/office.validators';
import { authMiddleware } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorize.middleware';

export const officesRouter = Router();

officesRouter.get('/', asyncHandler(officeController.list));
officesRouter.get('/:id', validateParams(officeIdParamsSchema), asyncHandler(officeController.getById));
officesRouter.post('/', authMiddleware, authorize(['AMMINISTRATORE']), validateBody(officeBodySchema), asyncHandler(officeController.create));
officesRouter.put('/:id', authMiddleware, authorize(['AMMINISTRATORE']), validateParams(officeIdParamsSchema), validateBody(officeBodySchema), asyncHandler(officeController.update));
officesRouter.delete('/:id', authMiddleware, authorize(['AMMINISTRATORE']), validateParams(officeIdParamsSchema), asyncHandler(officeController.remove));
