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

export const listIdentifiersRoute = createRoute({
  method: 'get',
  path: '/',
  request: {
    query: z.object({
      offset: z.coerce.number().int().min(0).default(0).openapi({
        description: 'Number of identifiers to skip',
        example: 0,
      }),
      limit: z.coerce.number().int().min(1).max(100).default(20).openapi({
        description: 'Maximum number of identifiers to return',
        example: 20,
      }),
      alias: z.string().optional().openapi({
        description: 'Filter by alias',
        example: 'my-alias',
      }),
      provider: z.string().optional().openapi({
        description: 'Filter by provider',
        example: 'did:web',
      }),
    }),
  },
  responses: {
    200: {
      description: 'List of identifiers',
      content: {
        'application/json': {
          schema: z.array(IdentifierSchema),
        },
      },
    },
  },
});
