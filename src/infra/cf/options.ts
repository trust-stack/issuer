import { drizzle } from 'drizzle-orm/d1';
import * as schema from 'src/db/schema';
import { AppOptions } from 'src/index';
import { CredentialMessagesRepositorySqlite } from '../sqlite/credential-messages.repository.sqlite';
import { EncryptedCredentialsRepositorySqlite } from '../sqlite/encrypted-credentials.repository.sqlite';
import { IdentifiersRepositorySqlite } from '../sqlite/identifiers.repository.sqlite';
import { KeysRepositorySqlite } from '../sqlite/keys.repository.sqlite';
import { MessagesRepositorySqlite } from '../sqlite/messages.repository.sqlite';
import { PresentationCredentialsRepositorySqlite } from '../sqlite/presentation-credentials.repository.sqlite';
import { PresentationMessagesRepositorySqlite } from '../sqlite/presentation-messages.repository.sqlite';
import { PresentationVerifiersRepositorySqlite } from '../sqlite/presentation-verifiers.repository.sqlite';
import { PresentationsRepositorySqlite } from '../sqlite/presentations.repository.sqlite';
import { PrivateKeysRepositorySqlite } from '../sqlite/private-keys.repository.sqlite';
import { VcClaimsRepositorySqlite } from '../sqlite/vc-claims.repository.sqlite';
import { CredentialR2Repository, CredentialsRepositoryCf } from './credentials.repository.cf';

export function defaultCfOptions(d1: any, r2: CredentialR2Repository): AppOptions {
  // Construct D1 database
  const db = drizzle(d1, { schema });

  return {
    credentialsRepository: new CredentialsRepositoryCf(r2, db),
    credentialMessagesRepository: new CredentialMessagesRepositorySqlite(db),
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
