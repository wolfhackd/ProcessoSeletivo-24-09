import Fastify from 'fastify';
import { healthCheck } from './routes/Helth.js';
import fastifyCors from '@fastify/cors';
import { simulationRoutes } from './controllers/Simulation/simulation.route.js';
import { assetRoutes } from './controllers/Assets/asset.route.js';
import { insuranceRoutes } from './controllers/insurance/insurance.route.js';

const app = Fastify({ logger: true });

app.register(fastifyCors);
app.register(healthCheck);
app.register(simulationRoutes);
app.register(assetRoutes);
app.register(insuranceRoutes);

export default app;
