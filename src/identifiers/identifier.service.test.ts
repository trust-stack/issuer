import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {createIdentifier, getIdentifier, updateIdentifier} from './identifier.service';
import {IdentifierNotFoundError} from './identifier.errors';
import type {IIdentifier} from '@veramo/core';

vi.mock('../agent/agent', () => ({
  agent: {
    didManagerCreate: vi.fn(),
    didManagerGet: vi.fn(),
    didManagerSetAlias: vi.fn(),
  },
}));

vi.mock('../request-context', () => ({
  getRequestContext: vi.fn(),
}));

vi.mock('./identifier.mapper', () => ({
  mapAgentIdentifierToDto: vi.fn(),
}));

const {agent} = await import('../agent/agent');
const {getRequestContext} = await import('../request-context');
const {
  setIdentifierRepository,
} = await import('./identifier.repository');
const {mapAgentIdentifierToDto} = await import('./identifier.mapper');

const authContext = {tenantId: 'tenant-1', organizationId: 'org-1'};

const repositoryStub = {
  upsertIdentifierFromAgent: vi.fn(),
  findIdentifierByDid: vi.fn(),
  updateIdentifierRecord: vi.fn(),
};

const sampleIdentifier: IIdentifier = {
  did: 'did:web:example.com',
  provider: 'did:web',
  alias: 'example',
  controllerKeyId: 'controller-key',
  keys: [
    {
      kid: 'key-1',
      type: 'Ed25519',
      kms: 'local',
      publicKeyHex: 'abcd',
      meta: null,
    },
  ],
  services: [
    {
      id: 'svc',
      type: 'LinkedDomains',
      serviceEndpoint: ['https://example.com/.well-known/did.json'],
      description: 'primary',
    },
  ],
};

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(getRequestContext).mockReturnValue({auth: authContext});
  repositoryStub.upsertIdentifierFromAgent.mockReset();
  repositoryStub.findIdentifierByDid.mockReset();
  repositoryStub.updateIdentifierRecord.mockReset();
  setIdentifierRepository(repositoryStub);
});

afterEach(() => {
  setIdentifierRepository();
});

describe('identifier.service', () => {
  it('creates an identifier and returns persisted record when available', async () => {
    const stored = {did: sampleIdentifier.did, provider: 'did:web', keys: [], services: []};

    vi.mocked(agent.didManagerCreate).mockResolvedValue(sampleIdentifier);
    repositoryStub.findIdentifierByDid.mockResolvedValue(stored);

    const result = await createIdentifier({alias: 'example'});

    expect(agent.didManagerCreate).toHaveBeenCalledWith({alias: 'example'});
    expect(repositoryStub.upsertIdentifierFromAgent).toHaveBeenCalledWith(
      sampleIdentifier,
      authContext
    );
    expect(result).toEqual(stored);
    expect(mapAgentIdentifierToDto).not.toHaveBeenCalled();
  });

  it('falls back to agent-mapped DTO when persistence layer has no record yet', async () => {
    const mapped = {did: sampleIdentifier.did, provider: 'did:web', keys: [], services: []};

    vi.mocked(agent.didManagerCreate).mockResolvedValue(sampleIdentifier);
    repositoryStub.findIdentifierByDid.mockResolvedValue(null);
    vi.mocked(mapAgentIdentifierToDto).mockReturnValue(mapped);

    const result = await createIdentifier({alias: 'example'});

    expect(mapAgentIdentifierToDto).toHaveBeenCalledWith(sampleIdentifier);
    expect(result).toEqual(mapped);
  });

  it('gets an identifier when present', async () => {
    const stored = {did: sampleIdentifier.did, provider: 'did:web', keys: [], services: []};
    repositoryStub.findIdentifierByDid.mockResolvedValue(stored);

    const result = await getIdentifier(sampleIdentifier.did);

    expect(repositoryStub.findIdentifierByDid).toHaveBeenCalledWith(
      sampleIdentifier.did,
      authContext
    );
    expect(result).toEqual(stored);
  });

  it('throws IdentifierNotFoundError when identifier missing', async () => {
    repositoryStub.findIdentifierByDid.mockResolvedValue(null);

    await expect(getIdentifier(sampleIdentifier.did)).rejects.toBeInstanceOf(
      IdentifierNotFoundError
    );
  });

  it('updates alias when provided and returns updated record', async () => {
    const updatedRecord = {
      did: sampleIdentifier.did,
      provider: 'did:web',
      alias: 'new-alias',
      keys: [],
      services: [],
    };

    repositoryStub.findIdentifierByDid.mockResolvedValue(updatedRecord);

    const result = await updateIdentifier(sampleIdentifier.did, {alias: 'new-alias'});

    expect(agent.didManagerSetAlias).toHaveBeenCalledWith({
      did: sampleIdentifier.did,
      alias: 'new-alias',
    });
    expect(repositoryStub.updateIdentifierRecord).toHaveBeenCalledWith(
      sampleIdentifier.did,
      {alias: 'new-alias'},
      authContext
    );
    expect(result).toEqual(updatedRecord);
  });

  it('returns existing record when no changes provided', async () => {
    const stored = {did: sampleIdentifier.did, provider: 'did:web', keys: [], services: []};
    repositoryStub.findIdentifierByDid.mockResolvedValue(stored);

    const result = await updateIdentifier(sampleIdentifier.did, {});

    expect(agent.didManagerSetAlias).not.toHaveBeenCalled();
    expect(repositoryStub.updateIdentifierRecord).not.toHaveBeenCalled();
    expect(result).toEqual(stored);
  });
});
