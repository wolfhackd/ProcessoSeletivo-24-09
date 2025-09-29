import { FastifyRequest } from 'fastify';
import { z } from 'zod';

export const projectionSchema = z.object({
  simulationId: z.number().int('O ID da simulação deve ser um número inteiro.'),

  status: z.enum(['Vivo', 'Morto'], {
    message: "O status deve ser 'Vivo' ou 'Morto' para a projeção.",
  }),
});
export type ProjectionPayload = z.infer<typeof projectionSchema>;

export type ProjectionRequest = FastifyRequest<{
  Body: ProjectionPayload;
}>;
