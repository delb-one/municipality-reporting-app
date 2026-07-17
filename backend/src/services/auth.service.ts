import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { userRepository } from '../repositories/user.repository';
import { AppError } from '../utils/app-error';
import { env } from '../config/env';
import type { LoginInput } from '../validators/auth.validators';

type AuthResponse = {
  token: string;
  user: {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    role: string;
  };
};

export const authService = {
  async login(input: LoginInput): Promise<AuthResponse> {
    const user = await userRepository.findByEmail(input.email);

    if (!user) {
      throw new AppError('Credenziali non valide', 401);
    }

    if (!user.isActive) {
      throw new AppError('Utente non attivo', 401);
    }

    const isValidPassword = await bcrypt.compare(input.password, user.passwordHash);

    if (!isValidPassword) {
      throw new AppError('Credenziali non valide', 401);
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      env.jwtSecret,
      {
        expiresIn: env.jwtExpiresIn as jwt.SignOptions['expiresIn'],
        issuer: env.jwtIssuer,
      }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
      },
    };
  },
};