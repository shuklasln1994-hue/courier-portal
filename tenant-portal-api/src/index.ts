import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import pinoHttp from 'pino-http';
import { logger } from './lib/logger';
import { loadEnv } from './config/env';

const env = loadEnv();

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(pinoHttp({ logger }));

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(env.PORT, () => {
  logger.info({ port: env.PORT }, 'API listening');
});
