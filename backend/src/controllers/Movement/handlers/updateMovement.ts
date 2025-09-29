import { FastifyReply } from 'fastify';
import {
  movementParamsSchema,
  UpdateMovementRequest,
  updateMovementSchema,
} from '../movement.schema';
import prisma from '../../../prisma';

export const updateMovement = async (request: UpdateMovementRequest, reply: FastifyReply) => {
  try {
    const { id } = movementParamsSchema.pick({ id: true }).parse(request.params);
    const dataToUpdate = updateMovementSchema.parse(request.body);

    const updatedMovement = await prisma.movement.update({
      where: { id },
      data: dataToUpdate,
    });

    return reply.status(200).send(updatedMovement);
  } catch (err) {
    if (err) {
      return reply.status(400).send({ error: 'Dados de entrada inválidos.' });
    }
    // Tratar erro not found ou outro erro do Prisma
    console.error(err);
    return reply.status(500).send({ error: 'Erro ao atualizar movimentação.' });
  }
};
