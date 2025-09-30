import { FastifyReply, FastifyRequest } from 'fastify';
import { cloneSimulation } from './cloneSimulation';
import { CreateSimulationPayload, createSimulationSchema } from '../simulation.schema';
import prisma from '../../../prisma';
import { ZodError } from 'zod';

async function createCurrentStatus(originalSim: any, tx: any) {
  const currentStatusData = {
    name: 'Situação Atual',
    startDate: new Date(),
    realRate: originalSim.realRate,
    status: originalSim.status,

    version: originalSim.version,
    originalId: originalSim.id,
    isCurrent: true,
  };

  const currentStatusSim = await cloneSimulation(originalSim.id, currentStatusData, tx);
  return currentStatusSim;
}

export const createSimulation = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { sourceSimulationId, name, startDate, realRate, status }: CreateSimulationPayload =
      createSimulationSchema.parse(request.body);

    const existingSim = await prisma.simulation.findFirst({
      where: { name },
    });

    if (existingSim) {
      return reply.status(409).send({
        error:
          'Já existe uma simulação com este nome. Use "Criar Nova Versão" ou escolha outro nome.',
      });
    }

    let newSimulation;

    if (sourceSimulationId) {
      const originalSimulation = await prisma.simulation.findUnique({
        where: { id: sourceSimulationId },
      });
      if (!originalSimulation) {
        return reply.status(404).send({ error: 'Simulação fonte não encontrada.' });
      }

      const copyData = {
        name,
        startDate,
        realRate: realRate ?? originalSimulation.realRate,
        status,
        version: 1,
        originalId: originalSimulation.originalId ?? originalSimulation.id,
      };

      newSimulation = await cloneSimulation(sourceSimulationId, copyData);
    } else {
      newSimulation = await prisma.$transaction(async (tx) => {
        const originalSim = await tx.simulation.create({
          data: {
            name,
            startDate,
            realRate: realRate ?? 0.04,
            status,
            version: 1,
          },
        });
        await createCurrentStatus(originalSim, tx);

        return originalSim;
      });
    }

    return reply.status(201).send(newSimulation);
  } catch (err) {
    if (err instanceof ZodError) {
      return reply.status(400).send({
        error: 'Dados de entrada inválidos.',
        details: err.errors, // mostra quais campos falharam
      });
    }
    console.error(err);
    return reply.status(500).send({ error: 'Erro ao criar a simulação.' });
  }
};
