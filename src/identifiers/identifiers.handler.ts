import { OpenAPIHono } from '@hono/zod-openapi';
import { getRequestContext } from 'src/request-context';
import {
  createIdentifierRoute,
  getDefaultIdentifierRoute,
  getIdentifierRoute,
  listIdentifiersRoute,
} from './identifiers.routes';
import { createDefaultIdentifier, createIdentifier, listIdentifiers } from './identifiers.service';

const app = new OpenAPIHono();

app.openapi(createIdentifierRoute, async (c) => {
  const identifier = await createIdentifier(c.req.valid('json'));
  return c.json(identifier, 201);
});

app.openapi(getDefaultIdentifierRoute, async (c) => {
  const { identifiersRepository } = getRequestContext();
  const identifier = await identifiersRepository.findDefaultIdentifier();

  if (!identifier) {
    const defaultIdentifier = await createDefaultIdentifier();
    return c.json(defaultIdentifier, 201);
  }

  return c.json(identifier, 200);
});

app.openapi(getIdentifierRoute, async (c) => {
  const { id } = c.req.valid('param');
  const { identifiersRepository } = getRequestContext();
  const identifier = await identifiersRepository.findIdentifier({ id });

  if (!identifier) return c.json({ error: 'Identifier not found' }, 404);

  return c.json(identifier, 200);
});

app.openapi(listIdentifiersRoute, async (c) => {
  const query = c.req.valid('query');
  const identifiers = await listIdentifiers({
    offset: query.offset,
    limit: query.limit,
    alias: query.alias,
    provider: query.provider,
  });
  return c.json(identifiers, 200);
});

export default app;
