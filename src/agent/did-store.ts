import type { IIdentifier } from '@veramo/core';
import { AbstractDIDStore } from '@veramo/did-manager';
import { eq } from 'drizzle-orm';
import { Database } from 'src/db';
import { getDb } from 'src/db/instance';
import { cryptoKeys, identifiers } from '../db/schema/identifiers';
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
    // services: serv,
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

    // Connect or create keys
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
        })
        .onConflictDoUpdate({
          target: cryptoKeys.kid,
          set: {
            publicKeyHex: key.publicKeyHex,
            kms: key.kms,
            meta: key.meta,
            type: key.type,
            privateKeyHex: key.privateKeyHex,
          },
        });
    }

    //   //   Connect or create services
    //   for (const service of serv) {
    //     await tx.insert(services).values({
    //       id: service.id,
    //       type: service.type,
    //       serviceEndpoint: service.serviceEndpoint,
    //     });
    //   }

    return true;
  }

  /**
   * Get a DID from the database
   * @param did
   * @param alias
   * @returns
   */
  public async getDID({ did, alias }: { did?: string; alias?: string }): Promise<IIdentifier> {
    const context = getRequestContext();

    if (did) {
      const [result] = await this.db.select().from(identifiers).where(eq(identifiers.did, did));

      return this.toIdentifier(result);
    } else if (alias) {
      const [result] = await this.db.select().from(identifiers).where(eq(identifiers.alias, alias));

      return this.toIdentifier(result);
    } else {
      throw new Error('Did or alias is required');
    }
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
    const results = await this.db
      .select()
      .from(identifiers)
      .where(eq(identifiers.organizationId, context.auth.organizationId));

    return results
      .filter((identifier) => {
        if (alias && identifier.alias !== alias) return false;
        if (provider && identifier.provider !== provider) return false;
        return true;
      })
      .map(this.toIdentifier);
  }

  private toIdentifier(data: any): IIdentifier {
    return {
      did: data.did,
      provider: data.provider,
      alias: data.alias,
      controllerKeyId: data.controllerKeyId,
      services: [],
      keys: [],
    };
  }
}
