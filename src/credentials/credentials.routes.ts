import { createRoute } from '@hono/zod-openapi';
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
