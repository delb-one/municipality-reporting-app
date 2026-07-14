import { app } from './app';
import { env } from './config/env';

const server = app.listen(env.port, () => {
  console.log(`Backend listening on http://localhost:${env.port}`);
});

server.on('error', (error) => {
  console.error('Failed to start backend server:', error);
  process.exitCode = 1;
});
