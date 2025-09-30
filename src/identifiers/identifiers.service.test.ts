import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const didManagerCreateMock = vi.fn();
  const getAgentMock = vi.fn();
  const getIdentifierByAliasMock = vi.fn();
  const toIdentifierDtoMock = vi.fn();
  const constructAliasMock = vi.fn();
  const uuidMock = vi.fn();

  return {
    didManagerCreateMock,
    getAgentMock,
    getIdentifierByAliasMock,
    toIdentifierDtoMock,
    constructAliasMock,
    uuidMock,
  };
});

vi.mock('../agent', () => ({
  getAgent: mocks.getAgentMock,
}));

vi.mock('./identifiers.repository', () => ({
  getIdentifierByAlias: mocks.getIdentifierByAliasMock,
}));

vi.mock('./identifiers.dto', () => ({
  toIdentifierDto: mocks.toIdentifierDtoMock,
}));

vi.mock('./identifiers.utils', () => ({
  constructAlias: mocks.constructAliasMock,
}));

vi.mock('src/utils', () => ({
  uuid: mocks.uuidMock,
}));

import { uuid } from 'src/utils';
import { getAgent } from '../agent';
import { toIdentifierDto } from './identifiers.dto';
import { getIdentifierByAlias } from './identifiers.repository';
import { createIdentifier } from './identifiers.service';

describe('createIdentifier', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getAgentMock.mockReturnValue({ didManagerCreate: mocks.didManagerCreateMock });
  });

  it('creates an identifier with a provided alias', async () => {
    const expectedIdentifier = {
      id: 'identifier-id',
      did: 'did:web:example#123',
      alias: 'constructed-alias',
    };
    const dtoResult = { did: 'did:web:example#123', alias: 'constructed-alias' };

    mocks.constructAliasMock.mockReturnValue('constructed-alias');
    mocks.didManagerCreateMock.mockResolvedValue({ alias: 'constructed-alias' } as never);
    mocks.getIdentifierByAliasMock.mockResolvedValue(expectedIdentifier);
    mocks.toIdentifierDtoMock.mockReturnValue(dtoResult);

    const result = await createIdentifier({ alias: 'friendly-alias' });

    expect(getAgent).toHaveBeenCalledTimes(1);
    expect(mocks.constructAliasMock).toHaveBeenCalledWith('friendly-alias');
    expect(mocks.didManagerCreateMock).toHaveBeenCalledWith({
      alias: 'constructed-alias',
      provider: 'did:web',
    });
    expect(mocks.getIdentifierByAliasMock).toHaveBeenCalledWith('constructed-alias');
    expect(vi.mocked(toIdentifierDto)).toHaveBeenCalledWith(expectedIdentifier);
    expect(result).toEqual(dtoResult);
  });

  it('creates an identifier using a generated alias when none provided', async () => {
    const expectedIdentifier = {
      id: 'identifier-id',
      did: 'did:web:example#456',
      alias: 'constructed-from-uuid',
    };
    const dtoResult = { did: 'did:web:example#456', alias: 'constructed-from-uuid' };

    mocks.uuidMock.mockReturnValue('generated-alias');
    mocks.constructAliasMock.mockReturnValue('constructed-from-uuid');
    mocks.didManagerCreateMock.mockResolvedValue({ alias: 'constructed-from-uuid' } as never);
    mocks.getIdentifierByAliasMock.mockResolvedValue(expectedIdentifier);
    mocks.toIdentifierDtoMock.mockReturnValue(dtoResult);

    const result = await createIdentifier({});

    expect(uuid).toHaveBeenCalledTimes(1);

    const [aliasArg] = mocks.constructAliasMock.mock.calls[0];
    const uuidResult = mocks.uuidMock.mock.results[0]?.value;

    expect(aliasArg).toBe(uuidResult);
    expect(mocks.didManagerCreateMock).toHaveBeenCalledWith({
      alias: 'constructed-from-uuid',
      provider: 'did:web',
    });
    expect(getIdentifierByAlias).toHaveBeenCalledWith('constructed-from-uuid');
    expect(vi.mocked(toIdentifierDto)).toHaveBeenCalledWith(expectedIdentifier);
    expect(result).toEqual(dtoResult);
  });

  it('throws when the identifier cannot be found after creation', async () => {
    mocks.constructAliasMock.mockReturnValue('missing-alias');
    mocks.didManagerCreateMock.mockResolvedValue({ alias: 'missing-alias' } as never);
    mocks.getIdentifierByAliasMock.mockResolvedValue(null);

    await expect(createIdentifier({ alias: 'missing' })).rejects.toThrow('Identifier not found');
    expect(mocks.getIdentifierByAliasMock).toHaveBeenCalledWith('missing-alias');
  });
});
