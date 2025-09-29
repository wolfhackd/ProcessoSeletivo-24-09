import { FastifyReply, FastifyRequest } from 'fastify';
import { assetParamsSchema } from '../asset.schema';
import prisma from '../../../prisma';

export const deleteAsset = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = assetParamsSchema.pick({ id: true }).parse(request.params);

    await prisma.asset.delete({
      where: { id },
    });

    return reply.status(204).send(); // 204 No Content para deleção bem-sucedida
  } catch (err) {
    if (err) {
      return reply.status(400).send({ error: 'ID de alocação inválido.' });
    }
    // Tratar erro not found (P2025)
    console.error(err);
    return reply.status(500).send({ error: 'Erro ao deletar alocação.' });
  }
};
