import { z } from 'zod';

export const movementParamsSchema = z.object({
  simId: z.coerce.number().int('O ID da simulação deve ser um número inteiro.'),
  id: z.coerce.number().int('O ID da movimentação deve ser um número inteiro.').optional(),
});
export type MovementParams = z.infer<typeof movementParamsSchema>;

const allowedFrequencies = z.enum(['Mensal', 'Anual', 'Semestral', 'Trimestral', 'Única']);
export type AllowedFrequencies = z.infer<typeof allowedFrequencies>;

const allowedTypes = z.enum(['Entrada', 'Saída']);
export type AllowedTypes = z.infer<typeof allowedTypes>;

export const createMovementSchema = z
  .object({
    type: allowedTypes,
    description: z.string().min(1, 'A descrição da movimentação é obrigatória.'),
    value: z.number().min(0, 'O valor da movimentação deve ser não negativo.'),
    frequency: allowedFrequencies,
    startDate: z.string().pipe(z.coerce.date('A data de início deve ser válida.')),
    endDate: z.string().pipe(z.coerce.date('A data final deve ser válida.')).optional().nullable(),
  })
  .refine(
    (data) => {
      if (
        data.frequency === 'Única' &&
        data.endDate &&
        data.endDate.getTime() !== data.startDate.getTime()
      ) {
        return false;
      }
      if (data.endDate && data.endDate < data.startDate) {
        return false;
      }
      return true;
    },
    {
      message:
        'A data final deve ser igual ou posterior à data de início. Para frequência única, as datas são as mesmas.',
      path: ['endDate'],
    },
  );
export type CreateMovementPayload = z.infer<typeof createMovementSchema>;

export const updateMovementSchema = createMovementSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    'Pelo menos um campo deve ser fornecido para atualização.',
  );
export type UpdateMovementPayload = z.infer<typeof updateMovementSchema>;

export type UpdateMovementRequest = FastifyRequest<{
  Params: { id: string }; // ID da Movimentação
  Body: z.infer<typeof updateMovementSchema>;
}>;
