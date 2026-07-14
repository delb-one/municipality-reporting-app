import express from 'express';
import type { Express } from 'express';
import morgan from 'morgan';

import { apiRouter } from './routes';
import { corsMiddleware } from './middleware/cors';
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { env } from './config/env';

export const app: Express = express();

app.use(corsMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

app.use('/api', apiRouter);

app.use(notFound);
app.use(errorHandler);
