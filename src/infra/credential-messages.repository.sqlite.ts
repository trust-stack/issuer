import { eq } from 'drizzle-orm';
import { Database } from 'src/db';
import { getDb } from 'src/db/instance';
import { credentialMessages } from 'src/db/schema/links';
import { CredentialMessagesRepository } from 'src/credential-messages';

export class CredentialMessagesRepositorySqlite implements CredentialMessagesRepository {
  private readonly db: Database;

  constructor() {
    this.db = getDb();
  }

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
