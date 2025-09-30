import type { FastifyInstance } from 'fastify';

export async function healthCheck(fastify: FastifyInstance) {
  fastify.get('/health', async (request, reply) => {
    return reply.status(200).send({ status: 'OK' });
  });
}
