import { index, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { uuid } from 'src/utils';
import { identifiers } from './identifiers';

export const credentials = sqliteTable(
  'credentials',
  {
    hash: text('hash').primaryKey(),
    id: text('id')
      .notNull()
      .$defaultFn(() => uuid()),
    organizationId: text('organization_id').notNull(),
    revocationList: integer('revocation_list'),
    revocationIndex: integer('revocation_index'),
    context: text('context', { mode: 'json' }).$type<unknown[]>(),
    issuanceDate: text('issuance_date', { mode: 'text' }).notNull(),
    expirationDate: text('expiration_date', { mode: 'text' }),
    raw: text('raw', { mode: 'json' }).notNull(),
    issuerId: text('issuer_id').references(() => identifiers.did, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
    subjectId: text('subject_id').references(() => identifiers.did, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    type: text('type', { mode: 'json' }).$type<unknown[]>(),
  },
  (table) => [
    uniqueIndex('credentials_id_unique').on(table.id),
    uniqueIndex('credentials_revocation_unique').on(table.revocationList, table.revocationIndex),
    index('credentials_org_idx').on(table.organizationId),
  ],
);
