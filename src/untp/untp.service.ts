import { CredentialPayload, VerifiableCredential } from '@veramo/core';
import { getAgent } from 'src/agent';
import { getEnv } from 'src/env';
import { Identifier } from 'src/identifiers/identifiers.service';
import { getRequestContext } from 'src/request-context';
import { uuid } from 'src/utils';
import type { CredentialTypeMeta, UntpVersionConfig } from './registry';
import type { CreateUntpCredentialDto } from './untp.dto';

const W3C_VC_V2_CONTEXT = 'https://www.w3.org/ns/credentials/v2';

function ensureTypeIncludes(
  subject: Record<string, unknown>,
  requiredType: string,
): Record<string, unknown> {
  const existing = subject.type;
  const list = Array.isArray(existing) ? existing.map(String) : [];
  if (list.includes(requiredType)) {
    return { ...subject, type: list };
  }
  return { ...subject, type: [requiredType, ...list] };
}

async function resolveIssuer(dto: CreateUntpCredentialDto): Promise<Identifier> {
  const { identifiersRepository } = getRequestContext();

  if (dto.issuerDid) {
    let identifier: Identifier | null = null;
    if (dto.issuerDid.alias)
      identifier = await identifiersRepository.findIdentifier({ alias: dto.issuerDid.alias });
    else if (dto.issuerDid.did)
      identifier = await identifiersRepository.findIdentifier({ did: dto.issuerDid.did });
    if (!identifier) throw new Error('Identifier not found');
    return identifier;
  }

  const organizationIdentifiers = await identifiersRepository.listIdentifiers({});
  if (organizationIdentifiers.length === 0) {
    throw new Error('No identifiers found for organization');
  }
  if (organizationIdentifiers.length > 1) {
    throw new Error(
      'Multiple identifiers found for organization. Please specify issuerDid when organization has more than one identifier.',
    );
  }
  return organizationIdentifiers[0];
}

/**
 * Prepare the credentialSubject for JWT signing.
 *
 * JWT VCs (did-jwt-vc) do not support array credentialSubject.
 * For DTE (array of lifecycle events):
 *   - Single event: unwrap to a plain object
 *   - Multiple events: wrap in a container object with an `events` array
 */
function prepareCredentialSubject(
  input: Record<string, unknown> | Record<string, unknown>[],
  credentialType: CredentialTypeMeta,
): Record<string, unknown> {
  if (!Array.isArray(input)) {
    return ensureTypeIncludes(input, credentialType.subjectType);
  }

  const patched = input.map((item) => ensureTypeIncludes(item, credentialType.subjectType));

  if (patched.length === 1) {
    return patched[0];
  }

  // Multiple events — wrap in a container for JWT compatibility
  return {
    type: ['TraceabilityEventList', credentialType.subjectType],
    events: patched,
  };
}

export async function createUntpCredential(params: {
  dto: CreateUntpCredentialDto;
  versionConfig: UntpVersionConfig;
  credentialType: CredentialTypeMeta;
}): Promise<VerifiableCredential> {
  const { dto, versionConfig, credentialType } = params;
  const identifier = await resolveIssuer(dto);
  const agent = getAgent();
  const { WEB_DID_DOMAIN } = getEnv();
  const validFrom = new Date().toISOString();
  const credentialId = `https://${WEB_DID_DOMAIN}/credentials/${uuid()}`;

  const credentialSubject = prepareCredentialSubject(
    dto.credentialSubject as Record<string, unknown> | Record<string, unknown>[],
    credentialType,
  );

  const subjectName = String(credentialSubject.name ?? credentialType.description);

  const credential = {
    '@context': [W3C_VC_V2_CONTEXT, versionConfig.contextUri],
    type: credentialType.vcTypes,
    id: credentialId,
    name: subjectName,
    validFrom,
    issuer: {
      type: ['CredentialIssuer'],
      id: identifier.did,
      name: identifier.alias,
    },
    credentialSubject,
  };

  const verifiableCredential = await agent.createVerifiableCredential({
    credential: credential as CredentialPayload,
    proofFormat: 'jwt',
  });

  await agent.dataStoreSaveVerifiableCredential({
    verifiableCredential,
  });

  return verifiableCredential;
}
