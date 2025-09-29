import { FastifyRequest, FastifyReply } from 'fastify';
import z from 'zod';
import prisma from '../../../prisma';
import { insuranceParamsSchema } from '../insurance.schema';

export const deleteInsurance = async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    const { id } = insuranceParamsSchema.pick({ id: true }).parse(request.params);

    await prisma.insurance.delete({
      where: { id },
    });

    return reply.status(204).send(); // 204 No Content para deleção bem-sucedida
  } catch (err) {
    if (err instanceof z.ZodError) {
      return reply.status(400).send({ error: 'ID de seguro inválido.' });
    }
    console.error(err);
    return reply.status(500).send({ error: 'Erro ao deletar seguro.' });
  }
};
