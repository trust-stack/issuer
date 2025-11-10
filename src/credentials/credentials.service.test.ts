import { beforeEach, describe, expect, it, vi } from 'vitest';

const mocks = vi.hoisted(() => {
  const createVerifiableCredentialMock = vi.fn();
  const dataStoreSaveVerifiableCredentialMock = vi.fn();
  const getAgentMock = vi.fn();
  const identifiersRepository = {
    findIdentifier: vi.fn(),
    listIdentifiers: vi.fn(),
    findIdentifierDetails: vi.fn(),
  };
  const getRequestContextMock = vi.fn();

  return {
    createVerifiableCredentialMock,
    dataStoreSaveVerifiableCredentialMock,
    getAgentMock,
    identifiersRepository,
    getRequestContextMock,
  };
});

vi.mock('src/agent', () => ({
  getAgent: mocks.getAgentMock,
}));

vi.mock('src/request-context', () => ({
  getRequestContext: mocks.getRequestContextMock,
}));

import type { Identifier } from '../identifiers/identifiers.service';
import { createCredential } from './credentials.service';

describe('createCredential', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mocks.getAgentMock.mockReturnValue({
      createVerifiableCredential: mocks.createVerifiableCredentialMock,
      dataStoreSaveVerifiableCredential: mocks.dataStoreSaveVerifiableCredentialMock,
    });
    mocks.getRequestContextMock.mockReturnValue({
      identifiersRepository: mocks.identifiersRepository,
    });
  });

  describe('when issuerDid is provided', () => {
    it('should use identifier found by alias', async () => {
      const identifier: Identifier = {
        id: 'id-1',
        did: 'did:web:example.com',
        alias: 'test-alias',
      };
      const identifierDetails = {
        did: identifier.did,
        alias: identifier.alias,
        provider: 'did:web',
        controllerKeyId: 'key-1',
        keys: [
          {
            kid: 'key-1',
            kms: 'local',
            type: 'Ed25519',
            publicKeyHex: '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
            meta: {},
          },
        ],
        services: [],
      };
      const credential = {
        id: 'credential-id',
        issuer: { id: identifier.did },
        credentialSubject: { name: 'test' },
      };

      mocks.identifiersRepository.findIdentifier.mockResolvedValue(identifier);
      mocks.identifiersRepository.findIdentifierDetails.mockResolvedValue(identifierDetails);
      mocks.createVerifiableCredentialMock.mockResolvedValue(credential);

      const result = await createCredential({
        issuerDid: { alias: 'test-alias' },
        credential: { name: 'test' },
      });

      expect(mocks.identifiersRepository.findIdentifier).toHaveBeenCalledWith({
        alias: 'test-alias',
      });
      expect(mocks.createVerifiableCredentialMock).toHaveBeenCalledWith({
        credential: {
          issuer: { id: identifier.did },
          credentialSubject: { name: 'test' },
        },
        proofFormat: 'jwt',
      });
      expect(result).toEqual(credential);
    });

    it('should use identifier found by did', async () => {
      const identifier: Identifier = {
        id: 'id-1',
        did: 'did:web:example.com',
        alias: 'test-alias',
      };
      const identifierDetails = {
        did: identifier.did,
        alias: identifier.alias,
        provider: 'did:web',
        controllerKeyId: 'key-1',
        keys: [
          {
            kid: 'key-1',
            kms: 'local',
            type: 'Ed25519',
            publicKeyHex: '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
            meta: {},
          },
        ],
        services: [],
      };
      const credential = {
        id: 'credential-id',
        issuer: { id: identifier.did },
        credentialSubject: { name: 'test' },
      };

      mocks.identifiersRepository.findIdentifier.mockResolvedValue(identifier);
      mocks.identifiersRepository.findIdentifierDetails.mockResolvedValue(identifierDetails);
      mocks.createVerifiableCredentialMock.mockResolvedValue(credential);

      const result = await createCredential({
        issuerDid: { did: 'did:web:example.com' },
        credential: { name: 'test' },
      });

      expect(mocks.identifiersRepository.findIdentifier).toHaveBeenCalledWith({
        did: 'did:web:example.com',
      });
      expect(mocks.createVerifiableCredentialMock).toHaveBeenCalledWith({
        credential: {
          issuer: { id: identifier.did },
          credentialSubject: { name: 'test' },
        },
        proofFormat: 'jwt',
      });
      expect(result).toEqual(credential);
    });

    it('should throw error if identifier not found', async () => {
      mocks.identifiersRepository.findIdentifier.mockResolvedValue(null);

      await expect(
        createCredential({
          issuerDid: { alias: 'non-existent' },
          credential: { name: 'test' },
        }),
      ).rejects.toThrow('Identifier not found');
    });
  });

  describe('when issuerDid is not provided', () => {
    it('should use default identifier when organization has exactly one', async () => {
      const identifier: Identifier = {
        id: 'id-1',
        did: 'did:web:example.com',
        alias: 'default-alias',
      };
      const identifierDetails = {
        did: identifier.did,
        alias: identifier.alias,
        provider: 'did:web',
        controllerKeyId: 'key-1',
        keys: [
          {
            kid: 'key-1',
            kms: 'local',
            type: 'Ed25519',
            publicKeyHex: '0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef',
            meta: {},
          },
        ],
        services: [],
      };
      const credential = {
        id: 'credential-id',
        issuer: { id: identifier.did },
        credentialSubject: { name: 'test' },
      };

      mocks.identifiersRepository.listIdentifiers.mockResolvedValue([identifier]);
      mocks.identifiersRepository.findIdentifierDetails.mockResolvedValue(identifierDetails);
      mocks.createVerifiableCredentialMock.mockResolvedValue(credential);

      const result = await createCredential({
        credential: { name: 'test' },
      });

      expect(mocks.identifiersRepository.listIdentifiers).toHaveBeenCalledWith({});
      expect(mocks.createVerifiableCredentialMock).toHaveBeenCalledWith({
        credential: {
          issuer: { id: identifier.did },
          credentialSubject: { name: 'test' },
        },
        proofFormat: 'jwt',
      });
      expect(result).toEqual(credential);
    });

    it('should throw error when organization has no identifiers', async () => {
      mocks.identifiersRepository.listIdentifiers.mockResolvedValue([]);

      await expect(
        createCredential({
          credential: { name: 'test' },
        }),
      ).rejects.toThrow('No identifiers found for organization');
    });

    it('should throw error when organization has multiple identifiers', async () => {
      const identifier1: Identifier = {
        id: 'id-1',
        did: 'did:web:example.com',
        alias: 'alias-1',
      };
      const identifier2: Identifier = {
        id: 'id-2',
        did: 'did:web:example2.com',
        alias: 'alias-2',
      };

      mocks.identifiersRepository.listIdentifiers.mockResolvedValue([identifier1, identifier2]);

      await expect(
        createCredential({
          credential: { name: 'test' },
        }),
      ).rejects.toThrow(
        'Multiple identifiers found for organization. Please specify issuerDid when organization has more than one identifier.',
      );
    });
  });
});
