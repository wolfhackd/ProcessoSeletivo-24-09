import { FastifyReply, FastifyRequest } from 'fastify';

import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { NewSimulationData, NewVersionRequest, simulationParamsSchema } from '../simulation.schema';
import prisma from '../../../prisma';
import { cloneSimulation } from './cloneSimulation';

export const createNewVersion = async (request: NewVersionRequest, reply: FastifyReply) => {
  try {
    const { id: originalId } = simulationParamsSchema.parse(request.params);

    const originalSimulation = await prisma.simulation.findUnique({
      where: { id: originalId },
    });

    if (!originalSimulation) {
      return reply.status(404).send({ error: 'Simulação original não encontrada.' });
    }

    if (originalSimulation.isCurrent) {
      return reply
        .status(403)
        .send({ error: 'Proibido. Não é possível criar uma nova versão da "Situação Atual".' });
    }

    const newSimulation = await prisma.$transaction(async (tx) => {
      await tx.simulation.update({
        where: { id: originalId },
        data: {
          isLegacy: true,
        },
      });

      const newVersionData: NewSimulationData = {
        name: originalSimulation.name,
        startDate: originalSimulation.startDate,
        realRate: originalSimulation.realRate,
        status: originalSimulation.status,

        version: originalSimulation.version + 1,
        originalId: originalSimulation.originalId ?? originalSimulation.id,
        isCurrent: false,
      };

      const clonedSim = await cloneSimulation(originalId, newVersionData);

      return clonedSim;
    });

    return reply.status(201).send(newSimulation);
  } catch (error: any) {
    if (error) {
      return reply.status(400).send({ error: 'ID de simulação inválido.' });
    }
    console.error(error);
    return reply.status(500).send({ error: 'Erro ao criar nova versão.' });
  }
};
