import { eq } from 'drizzle-orm';
import { encryptedCredentials } from 'src/db/schema/credentials';
import {
  EncryptedCredentialUpsert,
  EncryptedCredentialsRepository,
} from 'src/encrypted-credentials/encrypted-credentials.repository';
import { SqliteDb } from './sqlite-drizzle';

export class EncryptedCredentialsRepositorySqlite implements EncryptedCredentialsRepository {
  constructor(private db: SqliteDb) {}

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
