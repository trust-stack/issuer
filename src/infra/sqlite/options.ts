import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from 'src/db/schema';
import { AppOptions } from 'src/index';
import { CredentialsRepositorySqlite } from './credentials.repository.sqlite';
import { EncryptedCredentialsRepositorySqlite } from './encrypted-credentials.repository.sqlite';
import { IdentifiersRepositorySqlite } from './identifiers.repository.sqlite';
import { MessageStoreRepositorySqlite } from './message-store.repository.sqlite';
import { PrivateKeysRepositorySqlite } from './private-keys.repository.sqlite';

export function defaultSqliteOptions(defaultDatabase?: any): AppOptions {
  // TODO: Improve typings between D1 and other sqlite drivers
  const db = defaultDatabase ?? (drizzle(process.env.DATABASE_URL!, { schema }) as any);

  return {
    credentialsRepository: new CredentialsRepositorySqlite(db),
    encryptedCredentialsRepository: new EncryptedCredentialsRepositorySqlite(db),
    identifiersRepository: new IdentifiersRepositorySqlite(db),
    messageStoreRepository: new MessageStoreRepositorySqlite(db),
    privateKeyRepository: new PrivateKeysRepositorySqlite(db),
  };
}
