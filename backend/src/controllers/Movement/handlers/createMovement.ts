import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';
import prisma from '../../../prisma';
import { createMovementSchema, movementParamsSchema } from '../movement.schema';

type CreateMovementRequest = FastifyRequest<{
  Params: z.infer<typeof movementParamsSchema>;
  Body: z.infer<typeof createMovementSchema>;
}>;

export const createMovement = async (request: CreateMovementRequest, reply: FastifyReply) => {
  try {
    const { simId } = movementParamsSchema.pick({ simId: true }).parse(request.params);
    const data = createMovementSchema.parse(request.body);

    const newMovement = await prisma.movement.create({
      data: {
        simulationId: simId,
        ...data,
      },
    });

    return reply.status(201).send(newMovement);
  } catch (err) {
    if (err) {
      return reply.status(400).send({ error: 'Dados de entrada inválidos.' });
    }
    console.error(err);
    return reply.status(500).send({ error: 'Erro ao criar movimentação.' });
  }
};
