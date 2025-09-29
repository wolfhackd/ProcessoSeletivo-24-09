import { FastifyInstance } from 'fastify';
import { createInsurance } from './handlers/createInsurance';
import { listInsurances } from './handlers/listIsurances';
import { updateInsurance } from './handlers/updateInsurance';
import { deleteInsurance } from './handlers/deleteInsurances';

export const insuranceRoutes = (fastify: FastifyInstance) => {
  fastify.post('/simulations/:simId/insurances', createInsurance);
  fastify.get('/simulations/:simId/insurances', listInsurances);
  fastify.patch('/insurances/:id', updateInsurance);
  fastify.delete('/insurances/:id', deleteInsurance);
};
