import { eq } from 'drizzle-orm';
import { Database } from 'src/db';
import { getDb } from 'src/db/instance';
import { messages } from 'src/db/schema';
import { MessageInsert, MessageRecord, MessagesRepository } from 'src/messages';

export class MessagesRepositorySqlite implements MessagesRepository {
  private readonly db: Database;

  constructor() {
    this.db = getDb();
  }

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
}
