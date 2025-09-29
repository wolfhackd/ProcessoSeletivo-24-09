import { FastifyReply, FastifyRequest } from 'fastify';

import { z } from 'zod';
import { Prisma } from '@prisma/client';
import prisma from '../../../prisma';
import { simulationParamsSchema } from '../simulation.schema';

type DeleteSimulationRequest = FastifyRequest<{
  Params: z.infer<typeof simulationParamsSchema>;
}>;

export const deleteSimulation = async (request: DeleteSimulationRequest, reply: FastifyReply) => {
  try {
    const { id } = simulationParamsSchema.parse(request.params);

    const simulation = await prisma.simulation.findUnique({
      where: { id },
    });

    if (!simulation) {
      return reply.status(404).send({ error: 'Simulação não encontrada.' });
    }

    if (simulation.isCurrent) {
      return reply
        .status(403)
        .send({ error: 'Proibido. A "Situação Atual" não pode ser deletada.' });
    }

    await prisma.simulation.delete({
      where: { id },
    });

    return reply.status(204).send({ message: 'Deletado com sucesso.' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return reply.status(400).send({ error: 'ID de simulação inválido.' });
    }
    console.error(error);
    return reply.status(500).send({ error: 'Erro ao deletar a simulação.' });
  }
};
