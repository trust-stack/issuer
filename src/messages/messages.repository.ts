import type { InferInsertModel } from 'drizzle-orm';
import { messages } from 'src/db/schema';

export type MessageInsert = InferInsertModel<typeof messages>;
export type MessageRecord = typeof messages.$inferSelect;

export interface MessageStoreRepository {
  saveMessage(message: MessageInsert): Promise<void>;
  findMessageById(id: string): Promise<MessageRecord | null>;
  findCredentialHashesByMessageId(messageId: string): Promise<string[]>;
  deleteByCredentialHash(credentialHash: string): Promise<void>;
}
