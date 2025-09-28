import {MiddlewareHandler} from "hono";
import {AsyncLocalStorage} from "node:async_hooks";
import type {AuthContext} from "./auth";

type RequestContext = {
  auth: AuthContext;
};

const storage = new AsyncLocalStorage<RequestContext>();

export const runWithRequestContext = async <T>(
  context: RequestContext,
  fn: () => Promise<T>
) => {
  return storage.run(context, fn);
};

export const getRequestContext = () => {
  const ctx = storage.getStore();
  if (!ctx) throw new Error("Request context is unavailable");
  return ctx;
};

export const requestContext: MiddlewareHandler = async (c, next) => {
  const organizationId = c.req.header("x-organization-id");
  const tenantId = c.req.header("x-tenant-id");
  const userId = c.req.header("x-user-id") ?? undefined;

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

  const context: RequestContext = {auth};

  return runWithRequestContext(context, next);
};
