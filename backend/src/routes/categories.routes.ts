import { Router } from 'express';

import { categoryController } from '../controllers/category.controller';
import { asyncHandler } from '../utils/async-handler';
import { validateBody, validateParams } from '../middleware/validate';
import { categoryBodySchema, categoryIdParamsSchema } from '../validators/category.validators';
import { authMiddleware } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorize.middleware';

export const categoriesRouter = Router();

categoriesRouter.get('/', asyncHandler(categoryController.list));
categoriesRouter.get('/:id', validateParams(categoryIdParamsSchema), asyncHandler(categoryController.getById));
categoriesRouter.post('/', authMiddleware, authorize(['AMMINISTRATORE']), validateBody(categoryBodySchema), asyncHandler(categoryController.create));
categoriesRouter.put('/:id', authMiddleware, authorize(['AMMINISTRATORE']), validateParams(categoryIdParamsSchema), validateBody(categoryBodySchema), asyncHandler(categoryController.update));
categoriesRouter.delete('/:id', authMiddleware, authorize(['AMMINISTRATORE']), validateParams(categoryIdParamsSchema), asyncHandler(categoryController.remove));
