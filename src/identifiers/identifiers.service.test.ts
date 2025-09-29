import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../agent/agent', () => ({
  agent: {
    didManagerCreate: vi.fn(),
  },
}));

vi.mock('./identifiers.repository', () => ({
  getIdentifierByDid: vi.fn(),
}));

vi.mock('./identifier.dto', () => {
  const toIdentifierDto = vi.fn((identifier: { did: string; alias: string }) => ({
    did: identifier.did,
    alias: identifier.alias,
  }));

  return {
    toIdentifierDto,
  };
});

import { agent } from '../agent/agent';
import { toIdentifierDto } from './identifier.dto';
import { getIdentifierByDid } from './identifiers.repository';
import { createIdentifier } from './identifiers.service';

describe('createIdentifier', () => {
  const didManagerCreateMock = vi.mocked(agent.didManagerCreate);
  const getIdentifierByDidMock = vi.mocked(getIdentifierByDid);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates an identifier and returns DTO details when repository lookup succeeds', async () => {
    didManagerCreateMock.mockResolvedValue({ alias: 'did:web:example#123' } as never);
    getIdentifierByDidMock.mockResolvedValue({
      id: 'identifier-id',
      did: 'did:web:example#123',
      alias: 'friendly-alias',
    });

    const result = await createIdentifier({ alias: 'friendly-alias' });

    expect(didManagerCreateMock).toHaveBeenCalledWith({ alias: 'friendly-alias' });
    expect(getIdentifierByDidMock).toHaveBeenCalledWith('did:web:example#123');
    expect(vi.mocked(toIdentifierDto)).toHaveBeenCalledWith({
      id: 'identifier-id',
      did: 'did:web:example#123',
      alias: 'friendly-alias',
    });
    expect(result).toEqual({ did: 'did:web:example#123', alias: 'friendly-alias' });
  });

  it('throws when the identifier cannot be found after creation', async () => {
    didManagerCreateMock.mockResolvedValue({ alias: 'did:web:missing' } as never);
    getIdentifierByDidMock.mockResolvedValue(null);

    await expect(createIdentifier({ alias: 'missing-alias' })).rejects.toThrow(
      'Identifier not found',
    );
    expect(getIdentifierByDidMock).toHaveBeenCalledWith('did:web:missing');
  });
});
