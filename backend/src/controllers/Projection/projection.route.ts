import { FastifyInstance } from 'fastify';
import { createProjection } from './handlers/createProjection';

export const projectionRoute = (fastify: FastifyInstance) => {
  fastify.post('/projections', createProjection);
};
