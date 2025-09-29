import { FastifyInstance } from 'fastify';
import { createAsset } from './handlers/createAsset';
import { listAssets } from './handlers/listAssets';
import { updateAsset } from './handlers/updateAsset';
import { createAssetRecord } from './handlers/createAssetRecord';
import { deleteAsset } from './handlers/deleteAsset';

export const assetRoutes = (fastify: FastifyInstance) => {
  fastify.post('/simulations/:simId/assets', createAsset);
  fastify.get('/simulations/:simId/assets', listAssets);
  fastify.patch('/assets/:id', updateAsset);
  fastify.post('/assets/:id/record', createAssetRecord);
  fastify.delete('/assets/:id', deleteAsset);
};
