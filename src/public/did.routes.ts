import { eq } from 'drizzle-orm';
import { getAgent } from 'src/agent';
import * as schema from 'src/db/schema';

/**
 * Helper function to resolve a DID document
 * First tries to get from our database (for DIDs we manage), then falls back to Veramo's web resolver
 */
async function resolveDidDocument(did: string, db: any): Promise<any> {
  // First, try to get the DID from our database (for DIDs we manage)
  try {
    const [identifier] = await db
      .select()
      .from(schema.identifiers)
      .where(eq(schema.identifiers.did, did))
      .limit(1);

    if (!identifier) {
      throw new Error('DID not found in database');
    }

    // Fetch associated keys
    const keys = await db
      .select()
      .from(schema.cryptoKeys)
      .where(eq(schema.cryptoKeys.identifierDid, did));

    // Fetch associated services
    const didServices = await db
      .select()
      .from(schema.services)
      .where(eq(schema.services.identifierDid, did));

    // Construct DID document
    const verificationMethod = keys.map((key: any) => ({
      id: `${did}#${key.kid}`,
      type: key.type === 'Ed25519' ? 'Ed25519VerificationKey2020' : 'JsonWebKey2020',
      controller: did,
      publicKeyHex: key.publicKeyHex,
    }));

    const services = didServices.map((service: any) => ({
      id: `${did}#${service.id}`,
      type: service.type,
      serviceEndpoint:
        Array.isArray(service.serviceEndpoint) && service.serviceEndpoint.length === 1
          ? service.serviceEndpoint[0]
          : service.serviceEndpoint,
    }));

    return {
      '@context': [
        'https://www.w3.org/ns/did/v1',
        'https://w3id.org/security/suites/ed25519-2020/v1',
      ],
      id: did,
      verificationMethod,
      ...(services.length > 0 && { service: services }),
    };
  } catch (error) {
    // If not found in our database, try Veramo's web resolver
    const agent = getAgent();
    const resolutionResult = await agent.resolveDid({ didUrl: did });
    if (!resolutionResult.didDocument) {
      throw new Error('DID document not found');
    }
    return resolutionResult.didDocument;
  }
}

/**
 * Registers the DID resolution route on the app
 * @param app - Hono app instance
 * @param credentialsRepository - Credentials repository (used to access db)
 * @param webDidDomain - Web DID domain from environment
 */
export function registerDidRoute(app: any, credentialsRepository: any, webDidDomain: string): void {
  const db = credentialsRepository.db;

  // Route for default organization DID: /:organizationId/did.json
  app.get('/:organizationId/did.json', async (c: any) => {
    const { organizationId } = c.req.param();

    if (!db) {
      return c.json({ error: 'Database not available' }, 500);
    }

    try {
      // Construct DID from path: did:web:domain:organizationId
      const did = `did:web:${webDidDomain}:${organizationId}`;

      const didDocument = await resolveDidDocument(did, db);
      return c.json(didDocument, 200);
    } catch (error: any) {
      console.error('Failed to resolve DID', error);
      return c.json({ error: 'Failed to resolve DID' }, 500);
    }
  });

  // Route for organization DID with alias: /:organizationId/:alias/did.json
  app.get('/:organizationId/:alias/did.json', async (c: any) => {
    const { organizationId, alias } = c.req.param();

    if (!db) {
      return c.json({ error: 'Database not available' }, 500);
    }

    try {
      // Construct DID from path: did:web:domain:organizationId:alias
      const did = `did:web:${webDidDomain}:${organizationId}:${alias}`;

      const didDocument = await resolveDidDocument(did, db);
      return c.json(didDocument, 200);
    } catch (error: any) {
      console.error('Failed to resolve DID', error);
      return c.json({ error: 'Failed to resolve DID' }, 500);
    }
  });
}
