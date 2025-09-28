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
  const auth: AuthContext = {
    tenantId: "tenant-abc",
    organizationId: "org-123",
  };

  const context: RequestContext = {auth};

  return runWithRequestContext(context, next);
};
