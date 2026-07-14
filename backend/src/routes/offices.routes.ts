import { Router } from 'express';

import { officeController } from '../controllers/office.controller';
import { asyncHandler } from '../utils/async-handler';

export const officesRouter = Router();

officesRouter.get('/', asyncHandler(officeController.list));
officesRouter.get('/:id', asyncHandler(officeController.getById));
officesRouter.post('/', asyncHandler(officeController.create));
officesRouter.put('/:id', asyncHandler(officeController.update));
officesRouter.delete('/:id', asyncHandler(officeController.remove));
