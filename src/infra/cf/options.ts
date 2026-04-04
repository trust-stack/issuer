import { drizzle } from 'drizzle-orm/d1';
import * as schema from 'src/db/schema';
import { AppOptions } from 'src/index';
import { EncryptedCredentialsRepositorySqlite } from '../sqlite/encrypted-credentials.repository.sqlite';
import { IdentifiersRepositorySqlite } from '../sqlite/identifiers.repository.sqlite';
import { MessageStoreRepositorySqlite } from '../sqlite/message-store.repository.sqlite';
import { PrivateKeysRepositorySqlite } from '../sqlite/private-keys.repository.sqlite';
import { CredentialR2Repository, CredentialsRepositoryCf } from './credentials.repository.cf';

export function defaultCfOptions(d1: any, r2: CredentialR2Repository): AppOptions {
  // Construct D1 database
  const db = drizzle(d1, { schema });

  return {
    credentialsRepository: new CredentialsRepositoryCf(r2, db),
    encryptedCredentialsRepository: new EncryptedCredentialsRepositorySqlite(db),
    identifiersRepository: new IdentifiersRepositorySqlite(db),
    messageStoreRepository: new MessageStoreRepositorySqlite(db),
    privateKeyRepository: new PrivateKeysRepositorySqlite(db),
  };
}
