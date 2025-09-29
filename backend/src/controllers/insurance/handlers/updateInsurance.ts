import { FastifyReply } from 'fastify';
import z from 'zod';
import prisma from '../../../prisma';
import {
  UpdateInsuranceRequest,
  insuranceParamsSchema,
  updateInsuranceSchema,
} from '../insurance.schema';

export const updateInsurance = async (request: UpdateInsuranceRequest, reply: FastifyReply) => {
  try {
    const { id } = insuranceParamsSchema.pick({ id: true }).parse(request.params);
    const dataToUpdate = updateInsuranceSchema.parse(request.body);

    const updatedInsurance = await prisma.insurance.update({
      where: { id },
      data: dataToUpdate,
    });

    return reply.status(200).send(updatedInsurance);
  } catch (err) {
    if (err instanceof z.ZodError) {
      return reply.status(400).send({ error: 'Dados de entrada inválidos.' });
    }
    console.error(err);
    return reply.status(500).send({ error: 'Erro ao atualizar seguro.' });
  }
};
