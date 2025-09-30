import { FastifyRequest } from 'fastify';
import { z } from 'zod';

export const assetParamsSchema = z.object({
  simId: z.coerce.number().int('O ID da simulação deve ser um número inteiro.'),
  id: z.coerce.number().int('O ID do ativo deve ser um número inteiro.').optional(),
});
export type AssetParams = z.infer<typeof assetParamsSchema>;

export const createAssetSchema = z.object({
  name: z.string().min(1, 'O nome do ativo é obrigatório.'),
  assetType: z.string().min(1, 'O tipo de ativo é obrigatório.'),

  initialValue: z.number().min(0, 'O valor inicial deve ser não negativo.'),
  recordDate: z.string().pipe(z.coerce.date('A data do registro deve ser válida.')),

  isFinanced: z.boolean().optional().default(false),
  financeDetails: z.record(z.any()).optional().nullable(),
});
export type CreateAssetPayload = z.infer<typeof createAssetSchema>;

export const updateAssetSchema = z
  .object({
    name: z.string().min(1, 'O nome não pode estar vazio.').optional(),
    assetType: z.string().min(1, 'O tipo de ativo é obrigatório.').optional(),
  })
  .refine(
    (data) => Object.keys(data).length > 0,
    'Pelo menos um campo deve ser fornecido para atualização.',
  );
export type UpdateAssetPayload = z.infer<typeof updateAssetSchema>;

export const createAssetRecordSchema = z.object({
  value: z.number().min(0, 'O valor deve ser não negativo.'),
  date: z.string().pipe(z.coerce.date('A data do registro deve ser válida.')),
  isFinanced: z.boolean().optional().default(false),
  financeDetails: z.record(z.any()).optional().nullable(),
});
export type CreateAssetRecordPayload = z.infer<typeof createAssetRecordSchema>;

export type CreateAssetRequest = FastifyRequest<{
  Params: z.infer<typeof assetParamsSchema>;
  Body: z.infer<typeof createAssetSchema>;
}>;

export type UpdateAssetRequest = FastifyRequest<{
  Params: { id: string };
  Body: z.infer<typeof updateAssetSchema>;
}>;

export type CreateAssetRecordRequest = FastifyRequest<{
  Params: { id: string };
  Body: z.infer<typeof createAssetRecordSchema>;
}>;
