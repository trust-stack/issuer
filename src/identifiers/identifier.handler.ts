import { OpenAPIHono } from '@hono/zod-openapi';
import { IdentifierNotFoundError } from './identifier.errors';
import {
  createIdentifierRoute,
  getIdentifierRoute,
  updateIdentifierRoute,
} from './identifier.route';
import { createIdentifier, getIdentifier, updateIdentifier } from './identifier.service';

const app = new OpenAPIHono();

app.openapi(createIdentifierRoute, async (c) => {
  const identifier = await createIdentifier(c.req.valid('json'));
  return c.json(identifier, 201);
});

app.openapi(getIdentifierRoute, async (c) => {
  const { did } = c.req.valid('param');

  try {
    const identifier = await getIdentifier(did);
    return c.json(identifier, 200);
  } catch (error) {
    if (error instanceof IdentifierNotFoundError) {
      return c.json({ message: error.message }, 404);
    }

    throw error;
  }
});

app.openapi(updateIdentifierRoute, async (c) => {
  const { did } = c.req.valid('param');
  const payload = c.req.valid('json');

  try {
    const identifier = await updateIdentifier(did, payload);
    return c.json(identifier, 200);
  } catch (error) {
    if (error instanceof IdentifierNotFoundError) {
      return c.json({ message: error.message }, 404);
    }

    throw error;
  }
});

export default app;
