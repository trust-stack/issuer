import { OpenAPIHono } from '@hono/zod-openapi';
import { getRequestContext } from 'src/request-context';
import { createIdentifierRoute, getIdentifierRoute } from './identifiers.routes';
import { createIdentifier } from './identifiers.service';

const app = new OpenAPIHono();

app.openapi(createIdentifierRoute, async (c) => {
  const identifier = await createIdentifier(c.req.valid('json'));
  return c.json(identifier, 201);
});

app.openapi(getIdentifierRoute, async (c) => {
  const { id } = c.req.valid('param');
  const { identifiersRepository } = getRequestContext();
  const identifier = await identifiersRepository.findIdentifier({ id });

  if (!identifier) return c.json({ error: 'Identifier not found' }, 404);

  return c.json(identifier, 200);
});

export default app;
