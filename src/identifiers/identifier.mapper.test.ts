import {describe, expect, it} from 'vitest';
import {mapAgentIdentifierToDto, mapIdentifierRecordToDto} from './identifier.mapper';
import type {IdentifierRow, IdentifierKeyRow, IdentifierServiceRow} from './identifier.mapper';

const baseIdentifier: IdentifierRow = {
  id: 'uuid-1',
  did: 'did:web:example.com',
  organizationId: 'org-123',
  provider: 'did:web',
  alias: '  example ',
  controllerKeyId: 'controller-key',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-02T00:00:00.000Z',
};

const baseKey: IdentifierKeyRow = {
  kid: 'key-1',
  kms: 'local',
  type: 'Ed25519',
  publicKeyHex: 'abcd',
  privateKeyHex: null,
  meta: null,
  identifierDid: 'did:web:example.com',
};

const baseService: IdentifierServiceRow = {
  id: 'svc-1',
  type: 'LinkedDomains',
  serviceEndpoint: ['https://example.com/.well-known/did.json'],
  description: 'Primary service',
  identifierDid: 'did:web:example.com',
  tenantId: 'tenant-abc',
};

describe('identifier.mapper', () => {
  it('maps database rows to DTO', () => {
    const dto = mapIdentifierRecordToDto(baseIdentifier, [baseKey], [baseService]);

    expect(dto).toEqual({
      did: 'did:web:example.com',
      provider: 'did:web',
      controllerKeyId: 'controller-key',
      alias: 'example',
      keys: [
        {
          kid: 'key-1',
          type: 'Ed25519',
          kms: 'local',
          publicKeyHex: 'abcd',
          meta: undefined,
        },
      ],
      services: [
        {
          id: 'svc-1',
          type: 'LinkedDomains',
          serviceEndpoint: ['https://example.com/.well-known/did.json'],
          description: 'Primary service',
        },
      ],
    });
  });

  it('maps agent identifier fallback to DTO', () => {
    const dto = mapAgentIdentifierToDto({
      did: 'did:web:demo',
      provider: 'did:web',
      alias: undefined,
      controllerKeyId: undefined,
      keys: [
        {
          kid: 'key',
          type: 'Ed25519',
          kms: 'local',
          publicKeyHex: 'abcd',
          meta: {usage: 'auth'},
        },
      ],
      services: [
        {
          id: 'svc',
          type: 'LinkedDomains',
          serviceEndpoint: ['https://demo.example/did.json'],
          description: 'demo',
        },
      ],
    });

    expect(dto).toEqual({
      did: 'did:web:demo',
      provider: 'did:web',
      controllerKeyId: undefined,
      alias: undefined,
      keys: [
        {
          kid: 'key',
          type: 'Ed25519',
          kms: 'local',
          publicKeyHex: 'abcd',
          meta: {usage: 'auth'},
        },
      ],
      services: [
        {
          id: 'svc',
          type: 'LinkedDomains',
          serviceEndpoint: ['https://demo.example/did.json'],
          description: 'demo',
        },
      ],
    });
  });
});
