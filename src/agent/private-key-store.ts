import { AbstractPrivateKeyStore, ManagedPrivateKey } from '@veramo/key-manager';
import { eq } from 'drizzle-orm';
import { Database } from 'src/db';
import { getDb } from 'src/db/instance';
import { KeyType, privateKeys } from '../db/schema';

export class PrivateKeyStore implements AbstractPrivateKeyStore {
  private db: Database;

  constructor() {
    this.db = getDb();
  }

  public async getKey(args: { alias: string }): Promise<ManagedPrivateKey> {
    const [key] = await this.db
      .select()
      .from(privateKeys)
      .where(eq(privateKeys.alias, args.alias))
      .limit(1);

    if (!key) throw new Error('Key not found');

    return key;
  }

  public async deleteKey(args: { alias: string }): Promise<boolean> {
    await this.db.delete(privateKeys).where(eq(privateKeys.alias, args.alias));

    return true;
  }

  public async importKey(args: {
    alias?: string;
    privateKeyHex: string;
    type: string;
  }): Promise<ManagedPrivateKey> {
    const [key] = await this.db
      .insert(privateKeys)
      .values({
        alias: args.alias!,
        privateKeyHex: args.privateKeyHex,
        type: args.type as KeyType,
      })
      .returning();

    return key as ManagedPrivateKey;
  }

  public async listKeys(): Promise<ManagedPrivateKey[]> {
    return this.db.select().from(privateKeys);
  }
}
