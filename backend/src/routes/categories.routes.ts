import { Router } from 'express';

import { categoryController } from '../controllers/category.controller';
import { asyncHandler } from '../utils/async-handler';
import { validateBody, validateParams } from '../middleware/validate';
import { categoryBodySchema, categoryIdParamsSchema } from '../validators/category.validators';

export const categoriesRouter = Router();

categoriesRouter.get('/', asyncHandler(categoryController.list));
categoriesRouter.get('/:id', validateParams(categoryIdParamsSchema), asyncHandler(categoryController.getById));
categoriesRouter.post('/', validateBody(categoryBodySchema), asyncHandler(categoryController.create));
categoriesRouter.put('/:id', validateParams(categoryIdParamsSchema), validateBody(categoryBodySchema), asyncHandler(categoryController.update));
categoriesRouter.delete('/:id', validateParams(categoryIdParamsSchema), asyncHandler(categoryController.remove));
