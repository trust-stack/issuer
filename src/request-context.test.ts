import { Hono } from "hono";
import { describe, expect, it } from "vitest";
import { getRequestContext, requestContext } from "./request-context";

const createApp = () => {
  const app = new Hono();
  app.use("*", requestContext);
  app.get("/", (c) => {
    const {auth} = getRequestContext();
    return c.json(auth);
  });
  app.onError((err) => {
    throw err;
  });
  return app;
};

describe("requestContext middleware", () => {
  it("populates auth context when headers are present", async () => {
    const app = createApp();

    const response = await app.request("http://test/", {
      headers: {
        "x-organization-id": "org-123",
        "x-tenant-id": "tenant-456",
        "x-user-id": "user-789",
      },
    });

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({
      organizationId: "org-123",
      tenantId: "tenant-456",
      userId: "user-789",
    });
  });

  it("throws when x-organization-id header is missing", async () => {
    const app = createApp();

    await expect(
      app.request("http://test/", {
        headers: {
          "x-tenant-id": "tenant-456",
        },
      })
    ).rejects.toThrow("Missing required header 'x-organization-id'");
  });

  it("throws when x-tenant-id header is missing", async () => {
    const app = createApp();

    await expect(
      app.request("http://test/", {
        headers: {
          "x-organization-id": "org-123",
        },
      })
    ).rejects.toThrow("Missing required header 'x-tenant-id'");
  });
});
