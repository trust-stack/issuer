import { IKey, ManagedKeyInfo } from '@veramo/core';
import { AbstractKeyStore } from '@veramo/key-manager';
import { eq } from 'drizzle-orm';

import { getDb } from 'src/db/instance';
import { cryptoKeys } from '../db/schema';

export class KeyStore implements AbstractKeyStore {
  public async importKey(args: Partial<IKey>): Promise<boolean> {
    const db = getDb();
    await db.insert(cryptoKeys).values({
      // @ts-ignore
      kid: args.kid,
      publicKeyHex: args.publicKeyHex,
      privateKeyHex: args.privateKeyHex,
      type: args.type,
      kms: args.kms,
      meta: args.meta,
    });
    return true;
  }

  public async getKey(args: { kid: string }): Promise<IKey> {
    const db = getDb();
    const [key] = await db.select().from(cryptoKeys).where(eq(cryptoKeys.kid, args.kid)).limit(1);
    if (!key) throw new Error('Key not found');
    return key as IKey;
  }

  public async deleteKey(args: { kid: string }): Promise<boolean> {
    const db = getDb();
    await db.delete(cryptoKeys).where(eq(cryptoKeys.kid, args.kid));
    return true;
  }

  public async listKeys(args: {}): Promise<Array<ManagedKeyInfo>> {
    const db = getDb();
    const keys = await db.select().from(cryptoKeys);
    return keys as Array<ManagedKeyInfo>;
  }
}
