import { FastifyInstance } from 'fastify';
import { createSimulationSchema } from './simulation.schema';
import { listSimulations } from './handlers/listSimulations';
import { updateSimulation } from './handlers/updateSimulation';
import { deleteSimulation } from './handlers/deleteSimulation';
import { createSimulation } from './handlers/createSimulation';

export const simulationRoutes = (fastify: FastifyInstance) => {
  fastify.post('/criar-simulacao', createSimulation);
  fastify.get('/listar-simulacoes', listSimulations);
  fastify.put('/atualizar-simulacao/:id', updateSimulation);
  fastify.delete('/simulations/:id', deleteSimulation);
};
