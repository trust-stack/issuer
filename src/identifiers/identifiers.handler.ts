import { OpenAPIHono } from '@hono/zod-openapi';
import { getIdentifierByDid } from './identifiers.repository';
import { createIdentifierRoute, getIdentifierRoute } from './identifiers.routes';
import { createIdentifier } from './identifiers.service';

const app = new OpenAPIHono();

app.openapi(createIdentifierRoute, async (c) => {
  const identifier = await createIdentifier(c.req.valid('json'));
  return c.json(identifier, 201);
});

app.openapi(getIdentifierRoute, async (c) => {
  const { did } = c.req.valid('param');
  const identifier = await getIdentifierByDid(did);
  return c.json(identifier, 200);
});

export default app;
