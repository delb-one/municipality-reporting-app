import { Router } from 'express';

import { authController } from '../controllers/auth.controller';
import { asyncHandler } from '../utils/async-handler';
import { validateBody } from '../middleware/validate';
import { loginSchema } from '../validators/auth.validators';

export const authRouter = Router();

authRouter.post('/login', validateBody(loginSchema), asyncHandler(authController.login));