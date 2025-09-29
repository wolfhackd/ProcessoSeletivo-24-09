import Fastify from 'fastify';
import { healthCheck } from './routes/Helth.js';
import fastifyCors from '@fastify/cors';

const app = Fastify({ logger: true });

app.register(fastifyCors);
app.register(healthCheck);

export default app;
