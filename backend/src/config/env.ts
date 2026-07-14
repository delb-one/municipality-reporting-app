import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const port = Number.parseInt(process.env.PORT ?? '4000', 10);

export const env = {
  port: Number.isNaN(port) ? 4000 : port,
  nodeEnv: process.env.NODE_ENV ?? 'development',
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
};
