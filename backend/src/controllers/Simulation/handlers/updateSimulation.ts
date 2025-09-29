import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { simulationParamsSchema, updateSimulationSchema } from '../simulation.schema';
import prisma from '../../../prisma';

export const updateSimulation = async (
  request: FastifyRequest<{
    Params: z.infer<typeof simulationParamsSchema>;
  }>,
  reply: FastifyReply,
) => {
  try {
    const { id } = simulationParamsSchema.parse(request.params);
    const updateData = updateSimulationSchema.parse(request.body);

    if (Object.keys(updateData).length === 0) {
      return reply.status(400).send({ error: 'Nenhum campo fornecido para atualização.' });
    }

    const currentSimulation = await prisma.simulation.findUnique({
      where: { id: id },
    });

    if (!currentSimulation) {
      return reply.status(404).send({ error: 'Simulação não encontrada.' });
    }

    if (currentSimulation.isCurrent) {
      // Não pode ter nome alterado.
      if (updateData.name && updateData.name !== currentSimulation.name) {
        return reply.status(403).send({ error: 'Situação Atual: O nome não pode ser alterado.' });
      }

      // Regra: Não pode ter data alterada.
      if (
        updateData.startDate &&
        updateData.startDate.getTime() !== currentSimulation.startDate.getTime()
      ) {
        return reply
          .status(403)
          .send({ error: 'Situação Atual: A data de início não pode ser alterada.' });
      }
    }

    const updatedSimulation = await prisma.simulation.update({
      where: { id: id },
      data: updateData,
    });

    return reply.status(200).send(updatedSimulation);
  } catch (error) {
    if (error) {
      return reply.status(400).send({ error: 'Dados de entrada inválidos.' });
    }
    console.error(error);
    return reply.status(500).send({ error: 'Erro ao atualizar a simulação.' });
  }
};
