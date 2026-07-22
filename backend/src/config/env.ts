import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const port = Number.parseInt(process.env.PORT ?? '4000', 10);

export const env = {
  port: Number.isNaN(port) ? 4000 : port,
  nodeEnv: process.env.NODE_ENV ?? 'development',
  corsOrigins: (
    process.env.CORS_ORIGIN ??
    'http://localhost:3000,http://localhost:4200'
  )
    .split(',')
    .map(origin => origin.trim()),
  databaseUrl: process.env.DATABASE_URL ?? '',
  jwtSecret: process.env.JWT_SECRET ?? 'default-secret-change-me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  jwtIssuer: process.env.JWT_ISSUER ?? 'municipality-reporting',
};
  