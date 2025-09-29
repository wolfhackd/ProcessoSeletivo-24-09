import { FastifyReply } from 'fastify';
import z from 'zod';
import prisma from '../../../prisma';
import { ProjectionRequest, projectionSchema } from '../projection.schema';
import { calculateProjection } from './calculateProjection';

export const createProjection = async (request: ProjectionRequest, reply: FastifyReply) => {
  try {
    const { simulationId, status } = projectionSchema.parse(request.body);

    const simulation = await prisma.simulation.findUnique({
      where: { id: simulationId },
      include: {
        allocations: {
          include: { records: true },
        },
        movements: true,
        insurances: true,
      },
    });

    if (!simulation) {
      return reply.status(404).send({ error: 'Simulação não encontrada.' });
    }

    const projectionResult = calculateProjection(simulation, status);

    return reply.status(200).send(projectionResult);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return reply.status(400).send({ error: 'Dados de entrada inválidos.' });
    }
    console.error('Erro no cálculo de projeção:', err);
    return reply.status(500).send({ error: 'Erro interno ao calcular a projeção.' });
  }
};
