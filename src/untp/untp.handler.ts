import { OpenAPIHono } from '@hono/zod-openapi';
import { UNTP_VERSIONS } from './registry';
import { createUntpRoute } from './untp.routes';
import { createUntpCredential } from './untp.service';
import { validateCredentialSubject } from './untp.validation';

export function createUntpHandler(): OpenAPIHono {
  const root = new OpenAPIHono();

  for (const versionConfig of UNTP_VERSIONS) {
    const versionApp = new OpenAPIHono();

    for (const credType of versionConfig.credentialTypes) {
      const route = createUntpRoute(versionConfig, credType);

      // @ts-ignore OpenAPI handler inference
      versionApp.openapi(route, async (c) => {
        const dto = c.req.valid('json');

        const validation = validateCredentialSubject(
          versionConfig.version,
          credType.code,
          dto.credentialSubject,
        );

        if (!validation.valid) {
          return c.json({ message: 'Validation failed', errors: validation.errors }, 400);
        }

        try {
          const vc = await createUntpCredential({ dto, versionConfig, credentialType: credType });
          return c.json({ id: vc.id! }, 201);
        } catch (error: unknown) {
          console.error(`Failed to create UNTP ${credType.code}`, error);
          const message = error instanceof Error ? error.message : 'Failed to create credential';
          return c.json({ message }, 500);
        }
      });
    }

    root.route(`/${versionConfig.version}`, versionApp);
  }

  return root;
}
