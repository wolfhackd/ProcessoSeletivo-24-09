import { FastifyReply, FastifyRequest } from 'fastify';
import prisma from '../../../prisma';

export const listSimulations = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const simulations = await prisma.simulation.findMany();
    return reply.status(200).send(simulations);
  } catch (err) {
    return reply.status(500).send({ error: 'Erro ao listar as simulações.' });
  }
};
