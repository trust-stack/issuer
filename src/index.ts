import { OpenAPIHono } from '@hono/zod-openapi';
import { contextStorage } from 'hono/context-storage';
import { CredentialsRepository } from './credentials';
import credentials from './credentials/credentials.handler';
import { getEnv } from './env';
import { IdentifiersRepository } from './identifiers';
import identifiers from './identifiers/identifiers.handler';
import { MessageStoreRepository } from './messages';
import { PrivateKeyRepository } from './private-key';
import { registerPublicCredentialRoute } from './public/credentials.routes';
import { registerDidRoute } from './public/did.routes';
import { authMiddleware, dependencyMiddlewareFactory } from './request-context';
import { createUntpHandler } from './untp';

export type AppOptions = {
  credentialsRepository: CredentialsRepository;
  identifiersRepository: IdentifiersRepository;
  messageStoreRepository: MessageStoreRepository;
  privateKeyRepository: PrivateKeyRepository;
  kmsSecretKey?: string;
};

export function createApp(options: AppOptions) {
  const app = new OpenAPIHono();

  app.get('/', (c) => c.text('Hello World'));
  app.get('/health', (c) => c.json({ status: 'ok' }));

  app.use(contextStorage());

  // Public routes (no auth required) - MUST be registered BEFORE authMiddleware
  registerDidRoute(app, options.credentialsRepository, getEnv().WEB_DID_DOMAIN);
  registerPublicCredentialRoute(app, options.credentialsRepository);

  // Protected routes (require auth)
  app.use(authMiddleware);
  app.use(dependencyMiddlewareFactory(options));

  app.route('/identifiers', identifiers);
  app.route('/credentials', credentials);
  app.route('/untp', createUntpHandler());

  return app;
}

export type App = ReturnType<typeof createApp>;
