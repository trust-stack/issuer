import { createRoute, z } from '@hono/zod-openapi';
import { CreateIdentifierSchema, IdentifierSchema } from './identifiers.dto';

export const createIdentifierRoute = createRoute({
  method: 'post',
  path: '/',
  request: {
    // headers: IdentifierHeadersSchema,
    body: {
      content: {
        'application/json': { schema: CreateIdentifierSchema },
      },
    },
  },
  responses: {
    201: {
      description: 'Identifier created',
      content: {
        'application/json': { schema: IdentifierSchema },
      },
    },
  },
});

export const getIdentifierRoute = createRoute({
  method: 'get',
  path: '/{id}',
  request: {
    // headers: IdentifierHeadersSchema,
    params: z.object({
      id: z.string(),
    }),
  },
  responses: {
    200: {
      description: 'Identifier fetched',
      content: {
        'application/json': { schema: IdentifierSchema },
      },
    },
    404: {
      description: 'Identifier not found',
    },
  },
});
