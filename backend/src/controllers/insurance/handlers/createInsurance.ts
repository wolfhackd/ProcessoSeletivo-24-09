import { FastifyReply } from 'fastify';
import {
  CreateInsuranceRequest,
  createInsuranceSchema,
  insuranceParamsSchema,
} from '../insurance.schema';
import prisma from '../../../prisma';

export const createInsurance = async (request: CreateInsuranceRequest, reply: FastifyReply) => {
  try {
    const { simId } = insuranceParamsSchema.pick({ simId: true }).parse(request.params);
    const data = createInsuranceSchema.parse(request.body);

    const newInsurance = await prisma.insurance.create({
      data: {
        simulationId: simId,
        ...data,
      },
    });

    return reply.status(201).send(newInsurance);
  } catch (err) {
    if (err) {
      return reply.status(400).send({ error: 'Dados de entrada inválidos.' });
    }
    console.error(err);
    return reply.status(500).send({ error: 'Erro ao criar seguro.' });
  }
};
