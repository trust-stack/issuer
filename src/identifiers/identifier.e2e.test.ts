import {beforeEach, describe, expect, it, vi} from 'vitest';
import {Hono} from 'hono';
import type {IdentifierRepository} from './identifier.repository';
import {setIdentifierRepository} from './identifier.repository';
import {mapAgentIdentifierToDto} from './identifier.mapper';
import type {IIdentifier} from '@veramo/core';
import identifierApp from './identifier.handler';
import {requestContext} from '../request-context';
import type {IdentifierResponse} from './identifier.dto';

vi.mock('../agent/agent', () => {
  const store = new Map<string, IIdentifier>();
  let counter = 0;

  const didManagerCreate = async ({alias}: {alias?: string}): Promise<IIdentifier> => {
    counter += 1;
    const identifier: IIdentifier = {
      did: `did:web:test-${counter}`,
      provider: 'did:web',
      alias,
      controllerKeyId: `controller-key-${counter}`,
      keys: [],
      services: [],
    };
    store.set(identifier.did, identifier);
    return identifier;
  };

  const didManagerSetAlias = async ({did, alias}: {did: string; alias?: string}) => {
    const existing = store.get(did);
    if (!existing) throw new Error('Identifier not found');
    existing.alias = alias;
    return existing;
  };

  const didManagerGet = async ({did}: {did: string}) => {
    const existing = store.get(did);
    if (!existing) throw new Error('Identifier not found');
    return existing;
  };

  const agent = {
    didManagerCreate,
    didManagerSetAlias,
    didManagerGet,
  };

  (agent as any).__reset = () => {
    store.clear();
    counter = 0;
  };

  return {agent};
});

const {agent} = await import('../agent/agent');

class InMemoryIdentifierRepository implements IdentifierRepository {
  private readonly store = new Map<string, IdentifierResponse>();

  async upsertIdentifierFromAgent(identifier: IIdentifier): Promise<void> {
    this.store.set(identifier.did, mapAgentIdentifierToDto(identifier));
  }

  async findIdentifierByDid(did: string): Promise<IdentifierResponse | null> {
    return this.store.get(did) ?? null;
  }

  async updateIdentifierRecord(
    did: string,
    updates: {alias?: string}
  ): Promise<void> {
    const existing = this.store.get(did);
    if (!existing) return;
    this.store.set(did, {...existing, ...updates});
  }
}

const app = new Hono();
app.use('*', requestContext);
app.route('/', identifierApp);

const defaultHeaders = {
  'x-organization-id': 'org-e2e',
  'x-tenant-id': 'tenant-e2e',
  'x-user-id': 'user-e2e',
};

const makeRequest = (input: RequestInfo, init?: RequestInit) =>
  app.request(input, {
    ...init,
    headers: {
      ...defaultHeaders,
      ...(init?.headers as Record<string, string> | undefined),
    },
  });

const resetAgentStore = () => {
  if (typeof (agent as any).__reset === 'function') {
    (agent as any).__reset();
  }
};

describe('identifier routes (e2e)', () => {
  beforeEach(() => {
    setIdentifierRepository(new InMemoryIdentifierRepository());
    resetAgentStore();
  });

  afterEach(() => {
    setIdentifierRepository();
  });

  it('creates and retrieves an identifier', async () => {
    const createResponse = await makeRequest('http://test/', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({alias: 'issuer-app'}),
    });

    expect(createResponse.status).toBe(201);
    const created = await createResponse.json();
    expect(created).toMatchObject({
      did: expect.stringContaining('did:web:'),
      alias: 'issuer-app',
    });

    const did = created.did as string;

    const getResponse = await makeRequest(`http://test/${encodeURIComponent(did)}`, {
      method: 'GET',
    });

    expect(getResponse.status).toBe(200);
    const fetched = await getResponse.json();
    expect(fetched).toMatchObject({did, alias: 'issuer-app'});
  });

  it('updates identifier alias', async () => {
    const createResponse = await makeRequest('http://test/', {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({alias: 'issuer-app'}),
    });
    const created = await createResponse.json();
    const did = created.did as string;

    const updateResponse = await makeRequest(`http://test/${encodeURIComponent(did)}`, {
      method: 'PATCH',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({alias: 'updated-alias'}),
    });

    expect(updateResponse.status).toBe(200);
    const updated = await updateResponse.json();
    expect(updated).toMatchObject({did, alias: 'updated-alias'});

    const getResponse = await makeRequest(`http://test/${encodeURIComponent(did)}`, {
      method: 'GET',
    });

    expect(await getResponse.json()).toMatchObject({did, alias: 'updated-alias'});
  });
});
