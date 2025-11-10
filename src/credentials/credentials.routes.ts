import { createRoute, z } from '@hono/zod-openapi';
import { CreateCredentialSchema, CredentialSchema } from './credentials.dto';

export const createCredentialRoute = createRoute({
  method: 'post',
  path: '/',
  request: {
    body: {
      content: {
        'application/json': { schema: CreateCredentialSchema },
      },
    },
  },
  responses: {
    201: {
      description: 'Credential created',
      content: {
        'application/json': { schema: CredentialSchema },
      },
    },
  },
});

export const getCredentialRoute = createRoute({
  method: 'get',
  path: '/{id}',
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
  responses: {
    200: {
      description: 'Credential fetched',
      content: {
        'application/json': { schema: CredentialSchema },
      },
    },
    404: {
      description: 'Credential not found',
    },
  },
});

export const listCredentialsRoute = createRoute({
  method: 'get',
  path: '/',
  request: {
    query: z.object({
      offset: z.coerce.number().int().min(0).default(0).openapi({
        description: 'Number of credentials to skip',
        example: 0,
      }),
      limit: z.coerce.number().int().min(1).max(100).default(20).openapi({
        description: 'Maximum number of credentials to return',
        example: 20,
      }),
      issuerDid: z.string().optional().openapi({
        description: 'Filter by issuer DID',
        example: 'did:web:example',
      }),
    }),
  },
  responses: {
    200: {
      description: 'List of credentials',
      content: {
        'application/json': {
          schema: z.array(CredentialSchema),
        },
      },
    },
  },
});

export const deleteCredentialRoute = createRoute({
  method: 'delete',
  path: '/{id}',
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
  responses: {
    200: {
      description: 'Credential deleted',
    },
    404: {
      description: 'Credential not found',
    },
  },
});
