import { primaryKey, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { credentials } from './credentials';
import { messages } from './messages';

export const credentialMessages = sqliteTable(
  'credential_messages',
  {
    credentialHash: text('credential_hash')
      .notNull()
      .references(() => credentials.hash, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    messageId: text('message_id')
      .notNull()
      .references(() => messages.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
  },
  (table) => [
    primaryKey({
      columns: [table.credentialHash, table.messageId],
    }),
  ],
);
