# issuer

This service provides APIs for managing DIDs and verifiable credentials built with Hono, Veramo, and Drizzle.

## Authentication Headers

All requests must include the following headers:

- `x-organization-id` – Required. Identifies the organization context for the request.
- `x-tenant-id` – Required. Represents the tenant (often same as organization) and is used for multi-tenant isolation.
- `x-user-id` – Optional. Identifies the user making the request.

Requests missing the required headers will be rejected with an error.

## Tests

- `pnpm run test:unit` – Unit tests
- `pnpm run test:e2e` – End-to-end tests
- `pnpm test` – Runs both suites

## OpenAPI schema

Generate the schema with:

```bash
pnpm run openapi:generate
```

The output is written to `openapi.json`.

## Formatting

Prettier runs automatically via Husky on commits. You can also run it manually:

```bash
pnpm run format
pnpm run format:check
```
