import { createRoute } from '@hono/zod-openapi';
import type { CredentialTypeMeta, UntpVersionConfig } from './registry';
import {
  CreateUntpCredentialSchema,
  UntpCredentialCreatedSchema,
  UntpValidationErrorSchema,
} from './untp.dto';

export function createUntpRoute(versionConfig: UntpVersionConfig, credType: CredentialTypeMeta) {
  return createRoute({
    method: 'post',
    path: `/${credType.code}`,
    tags: ['UNTP'],
    summary: `Issue ${credType.description} (UNTP ${versionConfig.version})`,
    description: `Issue a UNTP ${credType.description} Verifiable Credential. The credentialSubject is validated against the UNTP v${versionConfig.version} JSON Schema.`,
    request: {
      body: {
        content: {
          'application/json': { schema: CreateUntpCredentialSchema },
        },
      },
    },
    responses: {
      201: {
        description: `${credType.description} credential created`,
        content: {
          'application/json': { schema: UntpCredentialCreatedSchema },
        },
      },
      400: {
        description: 'Validation error',
        content: {
          'application/json': { schema: UntpValidationErrorSchema },
        },
      },
    },
  });
}
