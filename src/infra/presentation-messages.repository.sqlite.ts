import { eq } from 'drizzle-orm';
import { Database } from 'src/db';
import { getDb } from 'src/db/instance';
import { presentationMessages } from 'src/db/schema/links';
import { PresentationMessagesRepository } from 'src/presentation-messages';

export class PresentationMessagesRepositorySqlite implements PresentationMessagesRepository {
  private readonly db: Database;

  constructor() {
    this.db = getDb();
  }

  async findPresentationHashesByMessageId(messageId: string): Promise<string[]> {
    const rows = await this.db
      .select({ hash: presentationMessages.presentationHash })
      .from(presentationMessages)
      .where(eq(presentationMessages.messageId, messageId));

    return rows.map((row) => row.hash);
  }
}
