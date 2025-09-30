import { index, integer, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { uuid } from 'src/utils';
import { encryptionAlgorithmEnum } from './enums';
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

export const encryptedCredentials = sqliteTable(
  'encrypted_credentials',
  {
    id: text('id')
      .primaryKey()
      .$defaultFn(() => uuid()),
    version: integer('version').notNull().default(1),
    credentialId: text('credential_id')
      .notNull()
      .references(() => credentials.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
    cipherText: text('cipher_text').notNull(),
    iv: text('iv').notNull(),
    tag: text('tag').notNull(),
    key: text('key').notNull(),
    algorithm: text('algorithm', { enum: encryptionAlgorithmEnum }).notNull(),
  },
  (table) => [uniqueIndex('encrypted_credentials_credential_unique').on(table.credentialId)],
);

export const vcClaims = sqliteTable('vc_claims', {
  hash: text('hash').primaryKey(),
  issuerId: text('issuer_id')
    .notNull()
    .references(() => identifiers.did, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  subjectId: text('subject_id').references(() => identifiers.did, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  credentialId: text('credential_id')
    .notNull()
    .references(() => credentials.hash, {
      onDelete: 'cascade',
      onUpdate: 'cascade',
    }),
  context: text('context', { mode: 'json' }).$type<string[]>(),
  credentialType: text('credential_type', { mode: 'json' }).$type<string[]>(),
  type: text('type').notNull(),
  value: text('value'),
  isObj: integer('is_obj').notNull().default(0),
});
