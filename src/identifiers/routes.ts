import { Hono } from 'hono';
import { agent } from '../agent';

type DidWebCreateRequest = {
  alias?: string;
  domain: string;
  path?: string;
  keyType?: string;
};

const identifiers = new Hono();

identifiers.post('/', async (c) => {
  let payload: DidWebCreateRequest;
  try {
    payload = (await c.req.json()) as DidWebCreateRequest;
  } catch (error) {
    return c.json({ error: 'Invalid JSON payload', details: (error as Error).message }, 400);
  }

  if (!payload?.domain) {
    return c.json({ error: 'Missing domain for did:web creation' }, 400);
  }

  try {
    const createdDid = await agent.didManagerCreate({
      alias: payload.alias,
      provider: 'did:web',
      kms: 'local',
      options: {
        domain: payload.domain,
        path: payload.path,
        keyType: payload.keyType,
      },
    });

    return c.json(createdDid, 201);
  } catch (error) {
    return c.json({ error: 'Failed to create did:web', details: (error as Error).message }, 500);
  }
});

export default identifiers;
