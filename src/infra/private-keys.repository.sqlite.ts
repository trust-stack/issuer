import { ManagedPrivateKey } from '@veramo/key-manager';
import { eq } from 'drizzle-orm';
import { Database } from 'src/db';
import { getDb } from 'src/db/instance';
import { KeyType, privateKeys } from 'src/db/schema';
import {
  CreatePrivateKeyArgs,
  DeletePrivateKeyArgs,
  GetPrivateKeyArgs,
  PrivateKeyRepository,
} from 'src/private-key';
import { uuid } from 'src/utils';

export class PrivateKeysRepositorySqlite implements PrivateKeyRepository {
  private db: Database;
  constructor() {
    this.db = getDb();
  }

  public async createPrivateKey(args: CreatePrivateKeyArgs): Promise<ManagedPrivateKey> {
    const { alias, privateKeyHex, type } = args;

    const [key] = await this.db
      .insert(privateKeys)
      .values({ alias: alias || uuid(), privateKeyHex, type: type as KeyType })
      .returning();

    return key;
  }

  public async listPrivateKeys(): Promise<ManagedPrivateKey[]> {
    return await this.db.select().from(privateKeys);
  }

  public async deletePrivateKey({ alias }: DeletePrivateKeyArgs): Promise<void> {
    await this.db.delete(privateKeys).where(eq(privateKeys.alias, alias));
  }

  public async getPrivateKey(args: GetPrivateKeyArgs): Promise<ManagedPrivateKey> {
    const [key] = await this.db
      .select()
      .from(privateKeys)
      .where(eq(privateKeys.alias, args.alias))
      .limit(1);

    if (!key) throw new Error('Key not found');

    return key;
  }
}
