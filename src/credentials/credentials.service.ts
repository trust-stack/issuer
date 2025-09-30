import { VerifiableCredential } from '@veramo/core';
import { getAgent } from 'src/agent';
import { Identifier } from 'src/identifiers/identifiers.service';
import { getRequestContext } from 'src/request-context';
import { CreateCredentialDto } from './credentials.dto';

/**
 * Create a credential
 * @param dto - The credential data
 * @returns The credential
 */
export async function createCredential(dto: CreateCredentialDto): Promise<VerifiableCredential> {
  const { identifiersRepository } = getRequestContext();
  let identifier: Identifier | null = null;
  const agent = getAgent();

  // Load identifier from alias or did
  if (dto.issuerDid.alias)
    identifier = await identifiersRepository.findIdentifier({ alias: dto.issuerDid.alias });
  else if (dto.issuerDid.did)
    identifier = await identifiersRepository.findIdentifier({ did: dto.issuerDid.did });

  if (!identifier) throw new Error('Identifier not found');

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
