import { VerifiableCredential } from '@veramo/core';
import { getAgent } from 'src/agent';
import { Identifier } from 'src/identifiers/identifiers.service';
import { getRequestContext } from 'src/request-context';
import { CreateCredentialDto, CredentialDto, toCredentialDto } from './credentials.dto';

/**
 * Create a credential
 * @param dto - The credential data
 * @returns The credential
 */
export async function createCredential(dto: CreateCredentialDto): Promise<VerifiableCredential> {
  const { identifiersRepository } = getRequestContext();
  let identifier: Identifier | null = null;
  const agent = getAgent();

  // Load identifier from alias or did if provided
  if (dto.issuerDid) {
    if (dto.issuerDid.alias)
      identifier = await identifiersRepository.findIdentifier({ alias: dto.issuerDid.alias });
    else if (dto.issuerDid.did)
      identifier = await identifiersRepository.findIdentifier({ did: dto.issuerDid.did });

    if (!identifier) throw new Error('Identifier not found');
  } else {
    // No issuerDid provided - use default DID for organization
    // Default DID only exists if organization has exactly one DID
    const organizationIdentifiers = await identifiersRepository.listIdentifiers({});

    if (organizationIdentifiers.length === 0) {
      throw new Error('No identifiers found for organization');
    }

    if (organizationIdentifiers.length > 1) {
      throw new Error(
        'Multiple identifiers found for organization. Please specify issuerDid when organization has more than one identifier.',
      );
    }

    identifier = organizationIdentifiers[0];
  }

  // Issue credential
  const credential = await agent.createVerifiableCredential({
    credential: {
      issuer: { id: identifier.did },
      credentialSubject: dto.credential as Record<string, unknown>,
    },
    proofFormat: 'jwt',
  });

  // Save credential
  await agent.dataStoreSaveVerifiableCredential({
    verifiableCredential: credential,
  });

  return credential;
}

export type GetCredentialParams = {
  id: string;
};

export async function getCredential({ id }: GetCredentialParams): Promise<CredentialDto | null> {
  const { credentialsRepository } = getRequestContext();
  const credential = await credentialsRepository.findCredentialById(id);

  if (!credential) return null;

  return toCredentialDto(credential);
}

export type ListCredentialsParams = {
  offset?: number;
  limit?: number;
  issuerDid?: string;
};

export async function listCredentials(
  params: ListCredentialsParams = {},
): Promise<CredentialDto[]> {
  const { credentialsRepository } = getRequestContext();
  const credentials = await credentialsRepository.listCredentials({
    offset: params.offset,
    limit: params.limit,
    issuerDid: params.issuerDid,
  });
  return credentials.map(toCredentialDto);
}

export type DeleteCredentialParams = {
  id: string;
};

export async function deleteCredential({ id }: DeleteCredentialParams): Promise<void> {
  const { credentialsRepository } = getRequestContext();
  await credentialsRepository.deleteCredentialById(id);
}
