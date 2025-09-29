import { FastifyRequest } from 'fastify';
import { z } from 'zod';

export const insuranceParamsSchema = z.object({
  simId: z.coerce.number().int('O ID da simulação deve ser um número inteiro.'),
  id: z.coerce.number().int('O ID do seguro deve ser um número inteiro.').optional(),
});
export type InsuranceParams = z.infer<typeof insuranceParamsSchema>;

export const createInsuranceSchema = z.object({
  name: z.string().min(1, 'O nome do seguro é obrigatório.'),
  startDate: z.string().pipe(z.coerce.date('A data de início deve ser válida.')),
  durationMonths: z
    .number()
    .int('A duração deve ser um número inteiro.')
    .min(1, 'A duração deve ser de pelo menos um mês.'),
  premium: z.number().min(0, 'O prêmio deve ser não negativo.'),
  insuredValue: z.number().min(0, 'O valor segurado deve ser não negativo.'),
});
export type CreateInsurancePayload = z.infer<typeof createInsuranceSchema>;

export const updateInsuranceSchema = createInsuranceSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    'Pelo menos um campo deve ser fornecido para atualização.',
  );
export type UpdateInsurancePayload = z.infer<typeof updateInsuranceSchema>;

export type CreateInsuranceRequest = FastifyRequest<{
  Params: z.infer<typeof insuranceParamsSchema>;
  Body: z.infer<typeof createInsuranceSchema>;
}>;
export type UpdateInsuranceRequest = FastifyRequest<{
  Params: { id: string }; // ID do Seguro
  Body: z.infer<typeof updateInsuranceSchema>;
}>;
