import { FastifyInstance } from 'fastify';
import { createMovement } from './handlers/createMovement';
import { listMovements } from './handlers/listMovements';
import { updateMovement } from './handlers/updateMovement';
import { deleteMovement } from './handlers/deleteMovements';

export const movementRoutes = (fastify: FastifyInstance) => {
  fastify.post('/simulations/:simId/movements', createMovement);
  fastify.get('/simulations/:simId/movements', listMovements);
  fastify.post('/movements/:id', updateMovement);
  fastify.delete('/movements/:id', deleteMovement);
};
