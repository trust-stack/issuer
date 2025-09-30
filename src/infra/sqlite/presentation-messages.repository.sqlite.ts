import { eq } from 'drizzle-orm';
import { presentationMessages } from 'src/db/schema/links';
import { PresentationMessagesRepository } from 'src/presentation-messages';
import { SqliteDb } from './sqlite-drizzle';

export class PresentationMessagesRepositorySqlite implements PresentationMessagesRepository {
  constructor(private db: SqliteDb) {}

  async findPresentationHashesByMessageId(messageId: string): Promise<string[]> {
    const rows = await this.db
      .select({ hash: presentationMessages.presentationHash })
      .from(presentationMessages)
      .where(eq(presentationMessages.messageId, messageId));

    return rows.map((row) => row.hash);
  }
}
