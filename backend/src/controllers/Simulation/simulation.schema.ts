import { FastifyRequest } from 'fastify';
import { z } from 'zod';

//Criação
export const createSimulationSchema = z.object({
  name: z.string('O nome da simulação é obrigatório.').min(1, 'O nome não pode estar vazio.'),

  startDate: z
    .string('A data de início é obrigatória.')
    .pipe(z.coerce.date('A data de início deve ser uma data válida.')),

  realRate: z
    .number('A taxa real deve ser um número.')
    .min(0, 'A taxa real deve ser não negativa.')
    .optional(),

  status: z.enum(['Vivo', 'Morto', 'Inválido'], "O status deve ser 'Vivo', 'Morto' ou 'Inválido'."),

  sourceSimulationId: z
    .number()
    .int('O ID da simulação fonte deve ser um número inteiro.')
    .optional(),
});

export type CreateSimulationPayload = z.infer<typeof createSimulationSchema>;

//Atualização
export const updateSimulationSchema = z.object({
  name: z.string().min(1, 'O nome não pode estar vazio.').optional(),

  startDate: z
    .string()
    .pipe(z.coerce.date('A data de início deve ser uma data válida.'))
    .optional(),

  realRate: z.number().min(0, 'A taxa real deve ser não negativa.').optional(),

  status: z.enum(['Vivo', 'Morto', 'Inválido']).optional(),
});

export type UpdateSimulationPayload = z.infer<typeof updateSimulationSchema>;

//Projeção
export const projectionQuerySchema = z.object({
  simulationId: z.coerce.number().int('O ID da simulação deve ser um número inteiro.'),

  status: z.enum(['Vivo', 'Morto', 'Inválido'], 'O status de vida é obrigatório para a projeção.'),
});

export type ProjectionQueryPayload = z.infer<typeof projectionQuerySchema>;

export type NewSimulationData = {
  name: string;
  startDate: Date;
  realRate: number;
  status: string;
  // Campos de controle de versão
  version: number;
  originalId: number;
  isCurrent?: boolean;
};

export const simulationParamsSchema = z.object({
  id: z.coerce.number().int('O ID da simulação deve ser um número inteiro.'),
});

export type NewVersionRequest = FastifyRequest<{
  Params: z.infer<typeof simulationParamsSchema>;
}>;
