import { eq } from 'drizzle-orm';
import { messages } from 'src/db/schema';
import { credentialMessages } from 'src/db/schema/links';
import { MessageInsert, MessageRecord, MessageStoreRepository } from 'src/messages';
import { SqliteDb } from './sqlite-drizzle';

export class MessageStoreRepositorySqlite implements MessageStoreRepository {
  constructor(private db: SqliteDb) {}

  async saveMessage(message: MessageInsert): Promise<void> {
    const { id, ...update } = message;
    await this.db.insert(messages).values(message).onConflictDoUpdate({
      target: messages.id,
      set: update,
    });
  }

  async findMessageById(id: string): Promise<MessageRecord | null> {
    const [result] = await this.db.select().from(messages).where(eq(messages.id, id)).limit(1);
    return result ?? null;
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
