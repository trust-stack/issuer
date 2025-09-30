import { MiddlewareHandler } from 'hono';
import { getContext } from 'hono/context-storage';
import { AsyncLocalStorage } from 'node:async_hooks';
import { AppOptions } from '.';
import type { AuthContext } from './auth';
import { CredentialMessagesRepository } from './credential-messages';
import { CredentialsRepository } from './credentials';
import { EncryptedCredentialsRepository } from './encrypted-credentials';
import { IdentifiersRepository } from './identifiers';
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
    c.set('credentialsRepository', options.credentialsRepository);
    c.set('credentialMessagesRepository', options.credentialMessagesRepository);
    c.set('encryptedCredentialsRepository', options.encryptedCredentialsRepository);
    c.set('presentationCredentialsRepository', options.presentationCredentialsRepository);
    c.set('presentationMessagesRepository', options.presentationMessagesRepository);
    c.set('presentationVerifiersRepository', options.presentationVerifiersRepository);
    c.set('presentationsRepository', options.presentationsRepository);
    c.set('vcClaimsRepository', options.vcClaimsRepository);
    c.set('messagesRepository', options.messagesRepository);
    c.set('identifiersRepository', options.identifiersRepository);
    c.set('keysRepository', options.keysRepository);
    c.set('privateKeyRepository', options.privateKeyRepository);
    return next();
  };

  return middleware;
};
