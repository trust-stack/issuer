import { MiddlewareHandler } from 'hono';
import { getContext } from 'hono/context-storage';
import { AppOptions } from '.';
import type { AuthContext } from './auth';
import { CredentialsRepository } from './credentials';
import { IdentifiersRepository } from './identifiers';
import { MessageStoreRepository } from './messages';
import { PrivateKeyRepository } from './private-key';

export type RequestContext = {
  auth: AuthContext;
  credentialsRepository: CredentialsRepository;
  identifiersRepository: IdentifiersRepository;
  messageStoreRepository: MessageStoreRepository;
  privateKeyRepository: PrivateKeyRepository;
  kmsSecretKey: string | undefined;
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
    c.set('identifiersRepository', options.identifiersRepository);
    c.set('messageStoreRepository', options.messageStoreRepository);
    c.set('privateKeyRepository', options.privateKeyRepository);
    c.set('kmsSecretKey', options.kmsSecretKey);
    return next();
  };

  return middleware;
};
