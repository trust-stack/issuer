import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from 'src/db/schema';
import { AppOptions } from 'src/index';
import { CredentialMessagesRepositorySqlite } from './credential-messages.repository.sqlite';
import { CredentialsRepositorySqlite } from './credentials.repository.sqlite';
import { EncryptedCredentialsRepositorySqlite } from './encrypted-credentials.repository.sqlite';
import { IdentifiersRepositorySqlite } from './identifiers.repository.sqlite';
import { KeysRepositorySqlite } from './keys.repository.sqlite';
import { MessagesRepositorySqlite } from './messages.repository.sqlite';
import { PresentationCredentialsRepositorySqlite } from './presentation-credentials.repository.sqlite';
import { PresentationMessagesRepositorySqlite } from './presentation-messages.repository.sqlite';
import { PresentationVerifiersRepositorySqlite } from './presentation-verifiers.repository.sqlite';
import { PresentationsRepositorySqlite } from './presentations.repository.sqlite';
import { PrivateKeysRepositorySqlite } from './private-keys.repository.sqlite';
import { VcClaimsRepositorySqlite } from './vc-claims.repository.sqlite';

export function defaultSqliteOptions(defaultDatabase?: any): AppOptions {
  // TODO: Improve typings between D1 and other sqlite drivers
  const db = defaultDatabase ?? (drizzle(process.env.DATABASE_URL!, { schema }) as any);

  return {
    credentialMessagesRepository: new CredentialMessagesRepositorySqlite(db),
    credentialsRepository: new CredentialsRepositorySqlite(db),
    encryptedCredentialsRepository: new EncryptedCredentialsRepositorySqlite(db),
    identifiersRepository: new IdentifiersRepositorySqlite(db),
    keysRepository: new KeysRepositorySqlite(db),
    messagesRepository: new MessagesRepositorySqlite(db),
    presentationCredentialsRepository: new PresentationCredentialsRepositorySqlite(db),
    presentationMessagesRepository: new PresentationMessagesRepositorySqlite(db),
    presentationsRepository: new PresentationsRepositorySqlite(db),
    presentationVerifiersRepository: new PresentationVerifiersRepositorySqlite(db),
    privateKeyRepository: new PrivateKeysRepositorySqlite(db),
    vcClaimsRepository: new VcClaimsRepositorySqlite(db),
  };
}
