import { FastifyInstance } from 'fastify';
import { createProjection } from './handlers/createProjection';

export const insuranceRoutes = (fastify: FastifyInstance) => {
  fastify.post('/projections', createProjection);
};
