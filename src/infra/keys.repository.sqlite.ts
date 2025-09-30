import type { IKey, ManagedKeyInfo } from '@veramo/core';
import { eq } from 'drizzle-orm';
import { Database } from 'src/db';
import { getDb } from 'src/db/instance';
import { cryptoKeys } from 'src/db/schema/identifiers';
import { KeysRepository } from 'src/keys';

export class KeysRepositorySqlite implements KeysRepository {
  private readonly db: Database;

  constructor() {
    this.db = getDb();
  }

  async saveKey(key: Partial<IKey>): Promise<void> {
    if (!key.kid || !key.type || !key.kms || !key.publicKeyHex) {
      throw new Error('Missing required key properties');
    }

    await this.db
      .insert(cryptoKeys)
      .values({
        kid: key.kid,
        publicKeyHex: key.publicKeyHex,
        privateKeyHex: key.privateKeyHex,
        type: key.type,
        kms: key.kms,
        meta: key.meta,
        identifierDid: key.meta?.identifierDid as string | null | undefined,
      })
      .onConflictDoUpdate({
        target: cryptoKeys.kid,
        set: {
          publicKeyHex: key.publicKeyHex,
          privateKeyHex: key.privateKeyHex,
          type: key.type,
          kms: key.kms,
          meta: key.meta,
          identifierDid: key.meta?.identifierDid as string | null | undefined,
        },
      });
  }

  async findKey(kid: string): Promise<IKey | null> {
    const [result] = await this.db
      .select()
      .from(cryptoKeys)
      .where(eq(cryptoKeys.kid, kid))
      .limit(1);
    if (!result) return null;
    return this.toKey(result);
  }

  async deleteKey(kid: string): Promise<void> {
    await this.db.delete(cryptoKeys).where(eq(cryptoKeys.kid, kid));
  }

  async listKeys(): Promise<ManagedKeyInfo[]> {
    const results = await this.db.select().from(cryptoKeys);
    return results.map((key) => this.toManagedKeyInfo(key));
  }

  private toKey(key: typeof cryptoKeys.$inferSelect): IKey {
    return {
      kid: key.kid,
      kms: key.kms,
      type: key.type,
      publicKeyHex: key.publicKeyHex,
      privateKeyHex: key.privateKeyHex ?? undefined,
      meta: key.meta ?? undefined,
    };
  }

  private toManagedKeyInfo(key: typeof cryptoKeys.$inferSelect): ManagedKeyInfo {
    return this.toKey(key);
  }
}
