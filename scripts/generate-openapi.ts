import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createApp } from '../src';
import {
  CredentialMessagesRepositorySqlite,
  CredentialsRepositorySqlite,
  EncryptedCredentialsRepositorySqlite,
  IdentifiersRepositorySqlite,
  KeysRepositorySqlite,
  MessagesRepositorySqlite,
  PresentationCredentialsRepositorySqlite,
  PresentationMessagesRepositorySqlite,
  PresentationsRepositorySqlite,
  PresentationVerifiersRepositorySqlite,
  PrivateKeysRepositorySqlite,
  VcClaimsRepositorySqlite,
} from '../src/infra';

const app = createApp({
  credentialsRepository: new CredentialsRepositorySqlite(),
  credentialMessagesRepository: new CredentialMessagesRepositorySqlite(),
  encryptedCredentialsRepository: new EncryptedCredentialsRepositorySqlite(),
  presentationCredentialsRepository: new PresentationCredentialsRepositorySqlite(),
  presentationMessagesRepository: new PresentationMessagesRepositorySqlite(),
  presentationVerifiersRepository: new PresentationVerifiersRepositorySqlite(),
  presentationsRepository: new PresentationsRepositorySqlite(),
  vcClaimsRepository: new VcClaimsRepositorySqlite(),
  messagesRepository: new MessagesRepositorySqlite(),
  identifiersRepository: new IdentifiersRepositorySqlite(),
  keysRepository: new KeysRepositorySqlite(),
  privateKeyRepository: new PrivateKeysRepositorySqlite(),
});

const document = app.getOpenAPIDocument({
  openapi: '3.0.0',
  info: {
    title: 'Issuer API',
    version: '1.0.0',
  },
});

const outputPath = resolve(process.cwd(), 'openapi.json');
writeFileSync(outputPath, JSON.stringify(document, null, 2));

console.log(`OpenAPI schema generated at ${outputPath}`);
