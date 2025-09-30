import { OpenAPIHono } from '@hono/zod-openapi';
import { contextStorage } from 'hono/context-storage';
import { CredentialMessagesRepository } from './credential-messages';
import { CredentialsRepository } from './credentials';
import credentials from './credentials/credentials.handler';
import { EncryptedCredentialsRepository } from './encrypted-credentials';
import { IdentifiersRepository } from './identifiers';
import identifiers from './identifiers/identifiers.handler';
import { KeysRepository } from './keys';
import { MessagesRepository } from './messages';
import { PresentationCredentialsRepository } from './presentation-credentials';
import { PresentationMessagesRepository } from './presentation-messages';
import { PresentationVerifiersRepository } from './presentation-verifiers';
import { PresentationsRepository } from './presentations';
import { PrivateKeyRepository } from './private-key';
import { authMiddleware, dependencyMiddlewareFactory } from './request-context';
import { VcClaimsRepository } from './vc-claims';

export type AppOptions = {
  credentialMessagesRepository: CredentialMessagesRepository;
  credentialsRepository: CredentialsRepository;
  encryptedCredentialsRepository: EncryptedCredentialsRepository;
  identifiersRepository: IdentifiersRepository;
  keysRepository: KeysRepository;
  messagesRepository: MessagesRepository;
  presentationCredentialsRepository: PresentationCredentialsRepository;
  presentationMessagesRepository: PresentationMessagesRepository;
  presentationsRepository: PresentationsRepository;
  presentationVerifiersRepository: PresentationVerifiersRepository;
  privateKeyRepository: PrivateKeyRepository;
  vcClaimsRepository: VcClaimsRepository;
};

export function createApp(options: AppOptions) {
  const app = new OpenAPIHono();

  app.get('/', (c) => c.text('Hello World'));

  app.use(contextStorage());
  app.use(authMiddleware);
  app.use(dependencyMiddlewareFactory(options));

  app.route('/identifiers', identifiers);
  app.route('/credentials', credentials);

  return app;
}

export type App = ReturnType<typeof createApp>;
