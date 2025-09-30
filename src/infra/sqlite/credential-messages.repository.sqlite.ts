import { eq } from 'drizzle-orm';
import { CredentialMessagesRepository } from 'src/credential-messages';
import { credentialMessages } from 'src/db/schema/links';
import { SqliteDb } from './sqlite-drizzle';

export class CredentialMessagesRepositorySqlite implements CredentialMessagesRepository {
  constructor(private db: SqliteDb) {}

  async findCredentialHashesByMessageId(messageId: string): Promise<string[]> {
    const results = await this.db
      .select({ hash: credentialMessages.credentialHash })
      .from(credentialMessages)
      .where(eq(credentialMessages.messageId, messageId));

    return results.map((row) => row.hash);
  }

  async deleteByCredentialHash(credentialHash: string): Promise<void> {
    await this.db
      .delete(credentialMessages)
      .where(eq(credentialMessages.credentialHash, credentialHash));
  }
}
