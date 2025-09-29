import { FastifyReply } from 'fastify';
import {
  assetParamsSchema,
  CreateAssetRecordRequest,
  createAssetRecordSchema,
} from '../asset.schema';
import prisma from '../../../prisma';
import { Prisma } from '@prisma/client';

export const createAssetRecord = async (request: CreateAssetRecordRequest, reply: FastifyReply) => {
  try {
    const { id: assetId } = assetParamsSchema.pick({ id: true }).parse(request.params);
    const { value, date, isFinanced, financeDetails } = createAssetRecordSchema.parse(request.body);

    // 1. Verificar se o Asset existe
    const asset = await prisma.asset.findUnique({ where: { id: assetId } });
    if (!asset) {
      return reply.status(404).send({ error: 'Alocação (Asset) não encontrada.' });
    }

    // 2. Cria o novo AssetRecord
    const newRecord = await prisma.assetRecord.create({
      data: {
        assetId: asset.id,
        value,
        date,
        isFinanced,
        financeDetails: financeDetails as Prisma.JsonValue,
      },
    });

    return reply.status(201).send(newRecord);
  } catch (err) {
    if (err) {
      return reply.status(400).send({ error: 'Dados de entrada inválidos.' });
    }
    console.error(err);
    return reply.status(500).send({ error: 'Erro ao adicionar registro de valor.' });
  }
};
