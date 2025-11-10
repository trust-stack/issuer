import { OpenAPIHono } from '@hono/zod-openapi';
import {
  createCredentialRoute,
  deleteCredentialRoute,
  getCredentialRoute,
  listCredentialsRoute,
} from './credentials.routes';
import {
  createCredential,
  deleteCredential,
  getCredential,
  listCredentials,
} from './credentials.service';

const app = new OpenAPIHono();

app.openapi(createCredentialRoute, async (c) => {
  try {
    const credential = await createCredential(c.req.valid('json'));

    return c.json({ id: credential.id! }, 201);
  } catch (error: any) {
    console.error('Failed to create credential', error);
    throw new Error('Failed to create credential');
  }
});

app.openapi(getCredentialRoute, async (c) => {
  const { id } = c.req.valid('param');
  const credential = await getCredential({ id });

  if (!credential) return c.json({ error: 'Credential not found' }, 404);

  return c.json(credential, 200);
});

app.openapi(listCredentialsRoute, async (c) => {
  const query = c.req.valid('query');
  const credentials = await listCredentials({
    offset: query.offset,
    limit: query.limit,
    issuerDid: query.issuerDid,
  });
  return c.json(credentials, 200);
});

app.openapi(deleteCredentialRoute, async (c) => {
  const { id } = c.req.valid('param');
  await deleteCredential({ id });
  return c.json({ success: true }, 200);
});

export default app;
