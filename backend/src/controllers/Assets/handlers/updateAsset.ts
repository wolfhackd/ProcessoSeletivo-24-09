import { FastifyReply } from 'fastify';
import { assetParamsSchema, UpdateAssetRequest, updateAssetSchema } from '../asset.schema';
import prisma from '../../../prisma';

export const updateAsset = async (request: UpdateAssetRequest, reply: FastifyReply) => {
  try {
    const { id } = assetParamsSchema.pick({ id: true }).parse(request.params);
    const dataToUpdate = updateAssetSchema.parse(request.body);

    const updatedAsset = await prisma.asset.update({
      where: { id },
      data: dataToUpdate,
    });

    return reply.status(200).send(updatedAsset);
  } catch (err) {
    if (err) {
      return reply.status(400).send({ error: 'Dados de entrada inválidos.' });
    }
    // Tratar erro not found ou outro erro do Prisma
    console.error(err);
    return reply.status(500).send({ error: 'Erro ao atualizar alocação.' });
  }
};
