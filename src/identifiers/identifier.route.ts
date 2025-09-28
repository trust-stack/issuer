import { createRoute } from '@hono/zod-openapi';
import {
  CreateIdentifierSchema,
  IdentifierHeadersSchema,
  IdentifierParamsSchema,
  IdentifierSchema,
  UpdateIdentifierSchema,
} from './identifier.schema';

export const createIdentifierRoute = createRoute({
  method: 'post',
  path: '/',
  request: {
    headers: IdentifierHeadersSchema,
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
  path: '/{did}',
  request: {
    headers: IdentifierHeadersSchema,
    params: IdentifierParamsSchema,
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

export const updateIdentifierRoute = createRoute({
  method: 'patch',
  path: '/{did}',
  request: {
    headers: IdentifierHeadersSchema,
    params: IdentifierParamsSchema,
    body: {
      content: {
        'application/json': { schema: UpdateIdentifierSchema },
      },
    },
  },
  responses: {
    200: {
      description: 'Identifier updated',
      content: {
        'application/json': { schema: IdentifierSchema },
      },
    },
    404: {
      description: 'Identifier not found',
    },
  },
});
