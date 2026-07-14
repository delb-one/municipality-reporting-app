import { Router } from 'express';

import { categoryController } from '../controllers/category.controller';
import { asyncHandler } from '../utils/async-handler';

export const categoriesRouter = Router();

categoriesRouter.get('/', asyncHandler(categoryController.list));
categoriesRouter.get('/:id', asyncHandler(categoryController.getById));
categoriesRouter.post('/', asyncHandler(categoryController.create));
categoriesRouter.put('/:id', asyncHandler(categoryController.update));
categoriesRouter.delete('/:id', asyncHandler(categoryController.remove));
