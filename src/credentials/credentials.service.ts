import { VerifiableCredential } from '@veramo/core';

import { getAgent } from 'src/agent';
import { Identifier } from 'src/identifiers/identifiers.service';
import { getIdentifierByAlias, getIdentifierByDid } from '../identifiers';
import { CreateCredentialDto } from './credentials.dto';

/**
 * Create a credential
 * @param dto - The credential data
 * @returns The credential
 */
export async function createCredential(dto: CreateCredentialDto): Promise<VerifiableCredential> {
  let identifier: Identifier | null = null;
  const agent = getAgent();

  // Load identifier from alias or did
  if (dto.issuerDid.alias) identifier = await getIdentifierByAlias(dto.issuerDid.alias);
  else if (dto.issuerDid.did) identifier = await getIdentifierByDid(dto.issuerDid.did);

  if (!identifier) throw new Error('Identifier not found');

  // Issue credential
  const credential = await agent.createVerifiableCredential({
    credential: {
      issuer: { id: identifier.did },
      credentialSubject: dto.credential,
    },
    proofFormat: 'jwt',
  });

  // Save credential
  await agent.dataStoreSaveVerifiableCredential({
    verifiableCredential: credential,
  });

  return credential;
}
