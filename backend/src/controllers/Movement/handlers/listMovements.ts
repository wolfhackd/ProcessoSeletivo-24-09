import { FastifyReply, FastifyRequest } from 'fastify';
import { movementParamsSchema } from '../movement.schema';
import prisma from '../../../prisma';

export const listMovements = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { simId } = movementParamsSchema.pick({ simId: true }).parse(request.params);

    const movements = await prisma.movement.findMany({
      where: { simulationId: simId },
      orderBy: { startDate: 'asc' },
    });

    return reply.status(200).send(movements);
  } catch (err) {
    if (err) {
      return reply.status(400).send({ error: 'ID de simulação inválido.' });
    }
    console.error(err);
    return reply.status(500).send({ error: 'Erro ao listar movimentações.' });
  }
};
