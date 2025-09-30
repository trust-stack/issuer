import type { InferInsertModel } from 'drizzle-orm';
import { messages } from 'src/db/schema';

export type MessageInsert = InferInsertModel<typeof messages>;
export type MessageRecord = typeof messages.$inferSelect;

export interface MessagesRepository {
  saveMessage(message: MessageInsert): Promise<void>;
  findMessageById(id: string): Promise<MessageRecord | null>;
}
