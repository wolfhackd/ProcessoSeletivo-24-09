import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import prisma from '../../../prisma';
import { assetParamsSchema, CreateAssetRequest, createAssetSchema } from '../asset.schema.js';
import { Prisma } from '@prisma/client';

export const createAsset = async (request: CreateAssetRequest, reply: FastifyReply) => {
  try {
    const { simId } = assetParamsSchema.parse(request.params);
    const { name, assetType, initialValue, recordDate, isFinanced, financeDetails } =
      createAssetSchema.parse(request.body);

    // Garante que a operação de criação seja atômica
    const asset = await prisma.$transaction(async (tx) => {
      // 1. Cria o Asset (Alocação)
      const newAsset = await tx.asset.create({
        data: {
          simulationId: simId,
          name,
          assetType,
        },
      });

      // 2. Cria o primeiro AssetRecord (Histórico de Valor)
      await tx.assetRecord.create({
        data: {
          assetId: newAsset.id,
          value: initialValue,
          date: recordDate,
          isFinanced: isFinanced,
          financeDetails: financeDetails as Prisma.JsonValue,
        },
      });

      return newAsset;
    });

    return reply.status(201).send(asset);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return reply.status(400).send({ error: 'Dados de entrada inválidos.' });
    }
    console.error(err);
    return reply.status(500).send({ error: 'Erro ao criar alocação.' });
  }
};
