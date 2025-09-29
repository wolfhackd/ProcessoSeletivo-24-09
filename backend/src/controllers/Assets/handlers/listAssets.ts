import { FastifyReply, FastifyRequest } from 'fastify';
import { assetParamsSchema } from '../asset.schema';
import prisma from '../../../prisma';

export const listAssets = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { simId } = assetParamsSchema.pick({ simId: true }).parse(request.params);

    const assets = await prisma.asset.findMany({
      where: { simulationId: simId },
      // Inclui o histórico de registros
      include: { records: { orderBy: { date: 'desc' } } },
    });

    return reply.status(200).send(assets);
  } catch (err) {
    if (err) {
      return reply.status(400).send({ error: 'ID de simulação inválido.' });
    }
    console.error(err);
    return reply.status(500).send({ error: 'Erro ao listar alocações.' });
  }
};
