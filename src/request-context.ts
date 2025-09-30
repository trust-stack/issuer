import { MiddlewareHandler } from 'hono';
import { getContext } from 'hono/context-storage';
import { AsyncLocalStorage } from 'node:async_hooks';
import { AppOptions } from '.';
import type { AuthContext } from './auth';
import { CredentialMessagesRepository } from './credential-messages';
import { CredentialsRepository } from './credentials';
import { EncryptedCredentialsRepository } from './encrypted-credentials';
import { IdentifiersRepository } from './identifiers';
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
} from './infra';
import { KeysRepository } from './keys';
import { MessagesRepository } from './messages';
import { PresentationCredentialsRepository } from './presentation-credentials';
import { PresentationMessagesRepository } from './presentation-messages';
import { PresentationVerifiersRepository } from './presentation-verifiers';
import { PresentationsRepository } from './presentations';
import { PrivateKeyRepository } from './private-key';
import { VcClaimsRepository } from './vc-claims';

export type RequestContext = {
  auth: AuthContext;
  identifiersRepository: IdentifiersRepository;
  keysRepository: KeysRepository;
  credentialsRepository: CredentialsRepository;
  credentialMessagesRepository: CredentialMessagesRepository;
  encryptedCredentialsRepository: EncryptedCredentialsRepository;
  presentationCredentialsRepository: PresentationCredentialsRepository;
  presentationMessagesRepository: PresentationMessagesRepository;
  presentationVerifiersRepository: PresentationVerifiersRepository;
  presentationsRepository: PresentationsRepository;
  vcClaimsRepository: VcClaimsRepository;
  messagesRepository: MessagesRepository;
  privateKeyRepository: PrivateKeyRepository;
};

const storage = new AsyncLocalStorage<RequestContext>();

export const runWithRequestContext = async <T>(context: RequestContext, fn: () => Promise<T>) => {
  return storage.run(context, fn);
};

export const getRequestContext = (): RequestContext => {
  const context = getContext<{ Variables: RequestContext }>();
  return context.var;
};

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const organizationId = c.req.header('x-organization-id');
  const tenantId = c.req.header('x-tenant-id');
  const userId = c.req.header('x-user-id') ?? undefined;

  if (!organizationId) {
    throw new Error("Missing required header 'x-organization-id'");
  }

  if (!tenantId) {
    throw new Error("Missing required header 'x-tenant-id'");
  }

  const auth: AuthContext = {
    organizationId,
    tenantId: tenantId ?? organizationId,
    userId,
  };

  c.set('auth', auth);

  return next();
};

export const dependencyMiddlewareFactory = (options: AppOptions) => {
  const middleware: MiddlewareHandler = async (c, next) => {
    const credentialsRepository =
      options.credentialsRepository || new CredentialsRepositorySqlite();
    const credentialMessagesRepository =
      options.credentialMessagesRepository || new CredentialMessagesRepositorySqlite();
    const encryptedCredentialsRepository =
      options.encryptedCredentialsRepository || new EncryptedCredentialsRepositorySqlite();
    const presentationCredentialsRepository =
      options.presentationCredentialsRepository || new PresentationCredentialsRepositorySqlite();
    const presentationMessagesRepository =
      options.presentationMessagesRepository || new PresentationMessagesRepositorySqlite();
    const presentationVerifiersRepository =
      options.presentationVerifiersRepository || new PresentationVerifiersRepositorySqlite();
    const presentationsRepository =
      options.presentationsRepository || new PresentationsRepositorySqlite();
    const vcClaimsRepository = options.vcClaimsRepository || new VcClaimsRepositorySqlite();
    const messagesRepository = options.messagesRepository || new MessagesRepositorySqlite();
    const identifiersRepository =
      options.identifiersRepository || new IdentifiersRepositorySqlite();
    const keysRepository = options.keysRepository || new KeysRepositorySqlite();
    const privateKeyRepository = options.privateKeyRepository || new PrivateKeysRepositorySqlite();

    c.set('credentialsRepository', credentialsRepository);
    c.set('credentialMessagesRepository', credentialMessagesRepository);
    c.set('encryptedCredentialsRepository', encryptedCredentialsRepository);
    c.set('presentationCredentialsRepository', presentationCredentialsRepository);
    c.set('presentationMessagesRepository', presentationMessagesRepository);
    c.set('presentationVerifiersRepository', presentationVerifiersRepository);
    c.set('presentationsRepository', presentationsRepository);
    c.set('vcClaimsRepository', vcClaimsRepository);
    c.set('messagesRepository', messagesRepository);
    c.set('identifiersRepository', identifiersRepository);
    c.set('keysRepository', keysRepository);
    c.set('privateKeyRepository', privateKeyRepository);
    return next();
  };

  return middleware;
};
