import { OpenAPIHono } from '@hono/zod-openapi';
import { createCredentialRoute } from './credentials.routes';
import { createCredential } from './credentials.service';

const app = new OpenAPIHono();

app.openapi(createCredentialRoute, async (c) => {
  const credential = await createCredential(c.req.valid('json'));

  return c.json({ id: credential.id! }, 201);
});

export default app;
