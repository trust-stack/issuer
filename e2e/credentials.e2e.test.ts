import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { resolve } from 'node:path';
import * as schema from 'src/db/schema';
import { defaultSqliteOptions } from 'src/infra/sqlite/options';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

const dbRef = vi.hoisted(() => ({ current: undefined as ReturnType<typeof drizzle> | undefined }));

import { App, createApp } from 'src';
import { resetData } from './db';

let sqlite: Database.Database;

describe('Credentials (e2e)', () => {
  let app: App;
  beforeAll(async () => {
    sqlite = new Database(':memory:');
    dbRef.current = drizzle(sqlite, { schema });
    await migrate(dbRef.current, {
      migrationsFolder: resolve(process.cwd(), 'drizzle'),
    });

    app = createApp(defaultSqliteOptions(dbRef.current as any));
  });

  afterAll(() => {
    sqlite.close();
  });

  beforeEach(() => {
    resetData(sqlite);
    // Silence console.error during tests
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('POST /credentials', () => {
    beforeEach(async () => {
      // Arrange: Create test did
      await app.request(
        new Request('http://localhost/identifiers', {
          method: 'POST',
          body: JSON.stringify({
            alias: 'test-did',
          }),
          headers: {
            'x-tenant-id': 'test-tenant',
            'x-organization-id': 'test-org',
            'Content-Type': 'application/json',
          },
        }),
      );
    });

    it('can create a credential with issuerDid', async () => {
      // Arrange: Create a request to create a credential
      const request = new Request('http://localhost/credentials', {
        method: 'POST',
        body: JSON.stringify({
          issuerDid: {
            alias: 'test.truststack.dev:test-org:test-did',
          },
          credential: {
            name: 'test-credential',
          },
        }),
        headers: {
          'x-tenant-id': 'test-tenant',
          'x-organization-id': 'test-org',
          'Content-Type': 'application/json',
        },
      });

      // Act: Send the request
      const response = await app.request(request);

      // Assert: The response is successful
      expect(response.status).toBe(201);
    });

    it('can create a credential without issuerDid when organization has exactly one identifier', async () => {
      // Arrange: Create a request to create a credential without issuerDid
      const request = new Request('http://localhost/credentials', {
        method: 'POST',
        body: JSON.stringify({
          credential: {
            name: 'test-credential-default',
          },
        }),
        headers: {
          'x-tenant-id': 'test-tenant',
          'x-organization-id': 'test-org',
          'Content-Type': 'application/json',
        },
      });

      // Act: Send the request
      const response = await app.request(request);

      // Assert: The response is successful
      expect(response.status).toBe(201);
    });

    it('should fail when issuerDid is not provided and organization has no identifiers', async () => {
      // Arrange: Create a request without issuerDid for an organization with no identifiers
      const request = new Request('http://localhost/credentials', {
        method: 'POST',
        body: JSON.stringify({
          credential: {
            name: 'test-credential',
          },
        }),
        headers: {
          'x-tenant-id': 'test-tenant',
          'x-organization-id': 'empty-org',
          'Content-Type': 'application/json',
        },
      });

      // Act: Send the request
      const response = await app.request(request);

      // Assert: The response is an error
      expect(response.status).toBe(500);
      const body = await response.json();
      expect(body.message).toContain('No identifiers found for organization');
    });

    it('should fail when issuerDid is not provided and organization has multiple identifiers', async () => {
      // Arrange: Create a second identifier for the organization
      await app.request(
        new Request('http://localhost/identifiers', {
          method: 'POST',
          body: JSON.stringify({
            alias: 'test-did-2',
          }),
          headers: {
            'x-tenant-id': 'test-tenant',
            'x-organization-id': 'test-org',
            'Content-Type': 'application/json',
          },
        }),
      );

      // Arrange: Create a request without issuerDid
      const request = new Request('http://localhost/credentials', {
        method: 'POST',
        body: JSON.stringify({
          credential: {
            name: 'test-credential',
          },
        }),
        headers: {
          'x-tenant-id': 'test-tenant',
          'x-organization-id': 'test-org',
          'Content-Type': 'application/json',
        },
      });

      // Act: Send the request
      const response = await app.request(request);

      // Assert: The response is an error
      expect(response.status).toBe(500);
      const body = await response.json();
      expect(body.message).toContain('Multiple identifiers found for organization');
    });
  });
});
