import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from 'src/db/schema';
import { AppOptions } from 'src/index';
import { CredentialsRepositorySqlite } from './credentials.repository.sqlite';
import { IdentifiersRepositorySqlite } from './identifiers.repository.sqlite';
import { MessageStoreRepositorySqlite } from './message-store.repository.sqlite';
import { PrivateKeysRepositorySqlite } from './private-keys.repository.sqlite';

export function defaultSqliteOptions(defaultDatabase?: any, kmsSecretKey?: string): AppOptions {
  // TODO: Improve typings between D1 and other sqlite drivers
  const db = defaultDatabase ?? (drizzle(process.env.DATABASE_URL!, { schema }) as any);

  return {
    credentialsRepository: new CredentialsRepositorySqlite(db),
    identifiersRepository: new IdentifiersRepositorySqlite(db),
    messageStoreRepository: new MessageStoreRepositorySqlite(db),
    privateKeyRepository: new PrivateKeysRepositorySqlite(db),
    kmsSecretKey,
  };
}
