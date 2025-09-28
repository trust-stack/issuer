import { Hono } from 'hono';
import { agent } from '../agent';

type CredentialVerifyRequest = {
  credential?: unknown;
  policies?: Record<string, unknown>;
};

const credentials = new Hono();

credentials.post('/verify', async (c) => {
  let payload: CredentialVerifyRequest = {};
  try {
    payload = (await c.req.json()) as CredentialVerifyRequest;
  } catch (error) {
    return c.json({ error: 'Invalid JSON payload', details: (error as Error).message }, 400);
  }

  if (!payload.credential) {
    return c.json({ error: 'Missing credential in request body' }, 400);
  }

  try {
    const verification = await agent.verifyCredential({
      credential: payload.credential,
      policies: payload.policies,
    });

    return c.json(verification);
  } catch (error) {
    return c.json({ error: 'Credential verification failed', details: (error as Error).message }, 400);
  }
});

export default credentials;
