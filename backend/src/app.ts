import Fastify from 'fastify';
import { healthCheck } from './controllers/Helth.js';
import fastifyCors from '@fastify/cors';
import { simulationRoutes } from './controllers/Simulation/simulation.route.js';
import { assetRoutes } from './controllers/Assets/asset.route.js';
import { insuranceRoutes } from './controllers/insurance/insurance.route.js';
import { movementRoutes } from './controllers/Movement/movement.route.js';
import { projectionRoute } from './controllers/Projection/projection.route.js';

const app = Fastify({ logger: true });

app.register(fastifyCors);
app.register(healthCheck);
app.register(simulationRoutes);
app.register(assetRoutes);
app.register(insuranceRoutes);
app.register(movementRoutes);
app.register(projectionRoute);

export default app;
