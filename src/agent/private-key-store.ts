import { AbstractPrivateKeyStore, ManagedPrivateKey } from '@veramo/key-manager';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { KeyType, privateKeys } from '../db/schema';
import { uuid } from '../db/schema/utils';

export class PrivateKeyStore implements AbstractPrivateKeyStore {
  public async getKey(args: { alias: string }): Promise<ManagedPrivateKey> {
    const [key] = await db
      .select()
      .from(privateKeys)
      .where(eq(privateKeys.alias, args.alias))
      .limit(1);

    if (!key) throw new Error('Key not found');

    return key;
  }

  public async deleteKey(args: { alias: string }): Promise<boolean> {
    await db.delete(privateKeys).where(eq(privateKeys.alias, args.alias));

    return true;
  }

  public async importKey(args: {
    alias?: string;
    privateKeyHex: string;
    type: string;
  }): Promise<ManagedPrivateKey> {
    const [key] = await db.insert(privateKeys).values({
      alias: args.alias || uuid(),
      privateKeyHex: args.privateKeyHex,
      type: args.type as KeyType,
    });

    return key as ManagedPrivateKey;
  }

  public async listKeys(): Promise<ManagedPrivateKey[]> {
    const keys = await db.select().from(privateKeys);
    return keys;
  }
}
