import { sql } from 'drizzle-orm';
import { index, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { keyTypeEnum } from './enums';
import { uuid } from './utils';

export const identifiers = sqliteTable('identifiers', {
  id: text('id').unique().default(uuid()).notNull(),
  did: text('did').unique().notNull(),
  organizationId: text('organization_id').notNull(),
  provider: text('provider').notNull(),
  alias: text('alias').notNull(),
  controllerKeyId: text('controller_key_id'),
  createdAt: text('created_at', { mode: 'text' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at', { mode: 'text' })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});

export const cryptoKeys = sqliteTable(
  'crypto_keys',
  {
    kid: text('kid').primaryKey(),
    kms: text('kms').notNull(),
    type: text('type', { enum: keyTypeEnum }).notNull(),
    publicKeyHex: text('public_key_hex').notNull(),
    privateKeyHex: text('private_key_hex'),
    meta: text('meta', { mode: 'json' }).$type<Record<string, unknown> | null>(),
    identifierDid: text('identifier_did').references(() => identifiers.did, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
  },
  (table) => [index('crypto_keys_identifier_did_idx').on(table.identifierDid)],
);

export const privateKeys = sqliteTable('private_keys', {
  alias: text('alias').primaryKey(),
  type: text('type', { enum: keyTypeEnum }).notNull(),
  privateKeyHex: text('private_key_hex').notNull(),
});

export const services = sqliteTable(
  'services',
  {
    id: text('id').primaryKey().default(uuid()),
    type: text('type').notNull(),
    serviceEndpoint: text('service_endpoint', { mode: 'json' }).notNull().$type<string[]>(),
    description: text('description'),
    identifierDid: text('identifier_did').references(() => identifiers.did, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    tenantId: text('tenant_id').notNull(),
  },
  (table) => [index('services_tenant_idx').on(table.tenantId)],
);
