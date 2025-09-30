import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const didManagerCreateMock = vi.fn();
  const getAgentMock = vi.fn();
  const toIdentifierDtoMock = vi.fn();
  const constructAliasMock = vi.fn();
  const uuidMock = vi.fn();
  const identifiersRepository = {
    findIdentifier: vi.fn(),
    updateIdentifier: vi.fn(),
    saveIdentifierDetails: vi.fn(),
    findIdentifierDetails: vi.fn(),
    deleteIdentifierByDid: vi.fn(),
    listIdentifierDetails: vi.fn(),
  };
  const keysRepository = {
    saveKey: vi.fn(),
    findKey: vi.fn(),
    deleteKey: vi.fn(),
    listKeys: vi.fn(),
  };
  const credentialMessagesRepository = {
    findCredentialHashesByMessageId: vi.fn(),
    deleteByCredentialHash: vi.fn(),
  };
  const credentialsRepository = {
    saveCredential: vi.fn(),
    findCredentialByHash: vi.fn(),
    findCredentialsByHashes: vi.fn(),
    deleteCredentialByHash: vi.fn(),
  };
  const encryptedCredentialsRepository = {
    upsertEncryptedCredential: vi.fn(),
    deleteByCredentialId: vi.fn(),
  };
  const messagesRepository = {
    saveMessage: vi.fn(),
    findMessageById: vi.fn(),
  };
  const presentationCredentialsRepository = {
    deleteByCredentialHash: vi.fn(),
  };
  const presentationMessagesRepository = {
    findPresentationHashesByMessageId: vi.fn(),
  };
  const presentationVerifiersRepository = {
    replaceVerifiers: vi.fn(),
  };
  const presentationsRepository = {
    savePresentation: vi.fn(),
    findPresentationByHash: vi.fn(),
    findPresentationsByHashes: vi.fn(),
  };
  const privateKeyRepository = {
    createPrivateKey: vi.fn(),
    listPrivateKeys: vi.fn(),
    deletePrivateKey: vi.fn(),
    getPrivateKey: vi.fn(),
  };
  const vcClaimsRepository = {
    deleteByCredentialHash: vi.fn(),
  };
  const getRequestContextMock = vi.fn();

  return {
    didManagerCreateMock,
    getAgentMock,
    toIdentifierDtoMock,
    constructAliasMock,
    uuidMock,
    identifiersRepository,
    keysRepository,
    credentialMessagesRepository,
    credentialsRepository,
    encryptedCredentialsRepository,
    messagesRepository,
    presentationCredentialsRepository,
    presentationMessagesRepository,
    presentationVerifiersRepository,
    presentationsRepository,
    privateKeyRepository,
    vcClaimsRepository,
    getRequestContextMock,
  };
});

vi.mock('../agent', () => ({
  getAgent: mocks.getAgentMock,
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

vi.mock('src/request-context', () => ({
  getRequestContext: mocks.getRequestContextMock,
}));

import { getAgent } from '../agent';
import { uuid } from 'src/utils';
import { getRequestContext } from 'src/request-context';
import { toIdentifierDto } from './identifiers.dto';
import { createIdentifier } from './identifiers.service';

describe('createIdentifier', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getAgentMock.mockReturnValue({ didManagerCreate: mocks.didManagerCreateMock });
    mocks.getRequestContextMock.mockReturnValue({
      auth: {
        organizationId: 'org-123',
        tenantId: 'tenant-456',
        userId: 'user-789',
      },
      identifiersRepository: mocks.identifiersRepository,
      keysRepository: mocks.keysRepository,
      credentialMessagesRepository: mocks.credentialMessagesRepository,
      credentialsRepository: mocks.credentialsRepository,
      encryptedCredentialsRepository: mocks.encryptedCredentialsRepository,
      presentationCredentialsRepository: mocks.presentationCredentialsRepository,
      presentationMessagesRepository: mocks.presentationMessagesRepository,
      presentationVerifiersRepository: mocks.presentationVerifiersRepository,
      presentationsRepository: mocks.presentationsRepository,
      messagesRepository: mocks.messagesRepository,
      privateKeyRepository: mocks.privateKeyRepository,
      vcClaimsRepository: mocks.vcClaimsRepository,
    });
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
    mocks.identifiersRepository.findIdentifier.mockResolvedValue(expectedIdentifier);
    mocks.toIdentifierDtoMock.mockReturnValue(dtoResult);

    const result = await createIdentifier({ alias: 'friendly-alias' });

    expect(getAgent).toHaveBeenCalledTimes(1);
    expect(getRequestContext).toHaveBeenCalledTimes(1);
    expect(mocks.constructAliasMock).toHaveBeenCalledWith('friendly-alias');
    expect(mocks.didManagerCreateMock).toHaveBeenCalledWith({
      alias: 'constructed-alias',
      provider: 'did:web',
    });
    expect(mocks.identifiersRepository.findIdentifier).toHaveBeenCalledWith({
      alias: 'constructed-alias',
    });
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
    mocks.identifiersRepository.findIdentifier.mockResolvedValue(expectedIdentifier);
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
    expect(mocks.identifiersRepository.findIdentifier).toHaveBeenCalledWith({
      alias: 'constructed-from-uuid',
    });
    expect(vi.mocked(toIdentifierDto)).toHaveBeenCalledWith(expectedIdentifier);
    expect(result).toEqual(dtoResult);
  });

  it('throws when the identifier cannot be found after creation', async () => {
    mocks.constructAliasMock.mockReturnValue('missing-alias');
    mocks.didManagerCreateMock.mockResolvedValue({ alias: 'missing-alias' } as never);
    mocks.identifiersRepository.findIdentifier.mockResolvedValue(null);

    await expect(createIdentifier({ alias: 'missing' })).rejects.toThrow('Identifier not found');
    expect(mocks.identifiersRepository.findIdentifier).toHaveBeenCalledWith({
      alias: 'missing-alias',
    });
  });
});
