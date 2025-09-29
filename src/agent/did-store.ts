import type { IIdentifier } from '@veramo/core';
import { AbstractDIDStore } from '@veramo/did-manager';
import { eq, InferSelectModel } from 'drizzle-orm';
import { Database } from 'src/db';
import { getDb } from 'src/db/instance';
import { cryptoKeys, identifiers, services as servicesTable } from '../db/schema/identifiers';
import { getRequestContext } from '../request-context';

export class DidStore implements AbstractDIDStore {
  private db: Database;

  constructor() {
    this.db = getDb();
  }

  /**
   * Import a DID into the database
   * @param did
   * @param keys
   * @param provider
   * @param alias
   * @param controllerKeyId
   * @returns
   */
  public async importDID({
    did,
    services,
    keys,
    provider,
    alias,
    controllerKeyId,
  }: IIdentifier): Promise<boolean> {
    const context = getRequestContext();

    // Upsert identifier
    await this.db.insert(identifiers).values({
      did,
      controllerKeyId,
      provider,
      alias: alias ?? '',
      organizationId: context.auth.organizationId,
    });

    // Connect or create keys with proper relation
    for (const key of keys) {
      await this.db
        .insert(cryptoKeys)
        .values({
          kid: key.kid,
          publicKeyHex: key.publicKeyHex,
          kms: key.kms,
          meta: key.meta,
          type: key.type,
          privateKeyHex: key.privateKeyHex,
          identifierDid: did, // Ensure the relation is established
        })
        .onConflictDoUpdate({
          target: cryptoKeys.kid,
          set: {
            publicKeyHex: key.publicKeyHex,
            kms: key.kms,
            meta: key.meta,
            type: key.type,
            privateKeyHex: key.privateKeyHex,
            identifierDid: did, // Update the relation on conflict too
          },
        });
    }

    // Connect or create services with proper relation
    for (const service of services) {
      // Convert serviceEndpoint to string array format expected by database
      const serviceEndpoints = Array.isArray(service.serviceEndpoint)
        ? service.serviceEndpoint.map((ep) => (typeof ep === 'string' ? ep : JSON.stringify(ep)))
        : [
            typeof service.serviceEndpoint === 'string'
              ? service.serviceEndpoint
              : JSON.stringify(service.serviceEndpoint),
          ];

      await this.db.insert(servicesTable).values({
        id: service.id,
        type: service.type,
        serviceEndpoint: serviceEndpoints,
        identifierDid: did, // Ensure the relation is established
        tenantId: context.auth.organizationId, // Use organizationId as tenantId
        description: service.description,
      });
    }

    return true;
  }

  /**
   * Get a DID from the database
   * @param did
   * @param alias
   * @returns
   */
  public async getDID({ did, alias }: { did?: string; alias?: string }): Promise<IIdentifier> {
    const whereClause = did ? eq(identifiers.did, did) : eq(identifiers.alias, alias!);

    const result = await this.db.query.identifiers.findFirst({
      where: whereClause,
      with: {
        cryptoKeys: true,
        services: true,
      },
    });

    if (!result) {
      throw new Error('Identifier not found');
    }

    return this.toIdentifier(result);
  }

  public async deleteDID({ did }: { did: string }): Promise<boolean> {
    await this.db.delete(identifiers).where(eq(identifiers.did, did));
    return true;
  }

  public async listDIDs({
    alias,
    provider,
  }: {
    alias?: string;
    provider?: string;
  } = {}): Promise<IIdentifier[]> {
    const context = getRequestContext();

    // Build where conditions
    const conditions = [eq(identifiers.organizationId, context.auth.organizationId)];
    if (alias) conditions.push(eq(identifiers.alias, alias));
    if (provider) conditions.push(eq(identifiers.provider, provider));

    const whereClause =
      conditions.length > 1
        ? conditions.reduce((acc, condition) => acc && condition)
        : conditions[0];

    const results = await this.db.query.identifiers.findMany({
      where: whereClause,
      with: {
        cryptoKeys: true,
        services: true,
      },
    });

    return results.map(this.toIdentifier);
  }

  private toIdentifier(
    result: InferSelectModel<typeof identifiers> & {
      cryptoKeys: InferSelectModel<typeof cryptoKeys>[];
      services: InferSelectModel<typeof servicesTable>[];
    },
  ): IIdentifier {
    return {
      did: result.did,
      provider: result.provider,
      alias: result.alias,
      controllerKeyId: result.controllerKeyId ?? undefined,
      services: result.services.map((service) => ({
        id: service.id,
        type: service.type,
        serviceEndpoint:
          service.serviceEndpoint.length === 1
            ? service.serviceEndpoint[0]
            : service.serviceEndpoint,
        description: service.description ?? undefined,
      })),
      keys: result.cryptoKeys.map((key) => ({
        kid: key.kid,
        kms: key.kms,
        type: key.type,
        publicKeyHex: key.publicKeyHex,
        privateKeyHex: key.privateKeyHex ?? undefined,
        meta: key.meta,
      })),
    };
  }
}
