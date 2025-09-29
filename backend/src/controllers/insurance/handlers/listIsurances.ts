import { FastifyRequest, FastifyReply } from 'fastify';
import prisma from '../../../prisma';
import { insuranceParamsSchema } from '../insurance.schema';

export const listInsurances = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { simId } = insuranceParamsSchema.pick({ simId: true }).parse(request.params);

    const insurances = await prisma.insurance.findMany({
      where: { simulationId: simId },
      orderBy: { startDate: 'asc' },
    });

    return reply.status(200).send(insurances);
  } catch (err) {
    if (err) {
      return reply.status(400).send({ error: 'ID de simulação inválido.' });
    }
    console.error(err);
    return reply.status(500).send({ error: 'Erro ao listar seguros.' });
  }
};
