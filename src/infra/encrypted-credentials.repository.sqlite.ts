import { eq } from 'drizzle-orm';
import { Database } from 'src/db';
import { getDb } from 'src/db/instance';
import { encryptedCredentials } from 'src/db/schema/credentials';
import {
  EncryptedCredentialUpsert,
  EncryptedCredentialsRepository,
} from 'src/encrypted-credentials/encrypted-credentials.repository';

export class EncryptedCredentialsRepositorySqlite implements EncryptedCredentialsRepository {
  private readonly db: Database;

  constructor() {
    this.db = getDb();
  }

  async upsertEncryptedCredential(data: EncryptedCredentialUpsert): Promise<void> {
    const payload: typeof encryptedCredentials.$inferInsert = {
      credentialId: data.credentialId,
      cipherText: data.cipherText,
      iv: data.iv,
      tag: data.tag,
      key: data.key,
      algorithm: data.algorithm,
    };

    const { credentialId, ...update } = payload;

    await this.db.insert(encryptedCredentials).values(payload).onConflictDoUpdate({
      target: encryptedCredentials.credentialId,
      set: update,
    });
  }

  async deleteByCredentialId(credentialId: string): Promise<void> {
    await this.db
      .delete(encryptedCredentials)
      .where(eq(encryptedCredentials.credentialId, credentialId));
  }
}
