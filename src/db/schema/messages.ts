import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { identifiers } from './identifiers';

export const messages = sqliteTable('messages', {
  id: text('id').primaryKey(),
  type: text('type').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
  expiresAt: text('expires_at'),
  threadId: text('thread_id'),
  raw: text('raw'),
  data: text('data', { mode: 'json' }).$type<Record<string, unknown> | null>(),
  replyTo: text('reply_to', { mode: 'json' }).$type<string[] | null>(),
  replyUrl: text('reply_url'),
  fromId: text('from_id').references(() => identifiers.did, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  toId: text('to_id').references(() => identifiers.did, {
    onDelete: 'cascade',
    onUpdate: 'cascade',
  }),
  metaData: text('meta_data', { mode: 'json' }).$type<unknown[] | null>(),
  returnRoute: text('return_route'),
});
