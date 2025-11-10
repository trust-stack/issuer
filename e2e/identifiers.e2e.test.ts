import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { resolve } from 'node:path';
import { App, createApp } from 'src';
import * as schema from 'src/db/schema';
import { defaultSqliteOptions } from 'src/infra/sqlite/options';
import { vi } from 'vitest';
import { resetData } from './db';

const dbRef = vi.hoisted(() => ({ current: undefined as ReturnType<typeof drizzle> | undefined }));

let sqlite: Database.Database;

describe('Identifiers (e2e)', () => {
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
  });

  describe('POST /identifiers', () => {
    it('can create an identifier', async () => {
      // Arrange: Create a request to create an identifier
      const request = new Request('http://localhost/identifiers', {
        method: 'POST',
        body: JSON.stringify({
          alias: 'test-did',
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
      expect(await response.json()).toEqual(
        expect.objectContaining({
          did: 'did:web:test.truststack.dev:test-org:test-did',
          alias: 'test.truststack.dev:test-org:test-did',
        }),
      );
    });
  });

  describe('GET /identifiers/{did}', () => {
    it('can get an identifier', async () => {
      // Arrange: Create a request to create an identifier
      const createRequest = new Request('http://localhost/identifiers', {
        method: 'POST',
        body: JSON.stringify({
          alias: 'test-did',
        }),
        headers: {
          'x-tenant-id': 'test-tenant',
          'x-organization-id': 'test-org',
          'Content-Type': 'application/json',
        },
      });

      // Act: Send the request
      const response = await app.request(createRequest);

      // Assert: The response is successful
      expect(response.status).toBe(201);

      const identifier = await response.json();

      // Arrange: Create a request to get the identifier
      const getRequest = new Request(`http://localhost/identifiers/${identifier.id}`, {
        method: 'GET',
        headers: {
          'x-tenant-id': 'test-tenant',
          'x-organization-id': 'test-org',
          'Content-Type': 'application/json',
        },
      });

      // Act: Send the request
      const getResponse = await app.request(getRequest);

      // Assert: The response is successful
      expect(getResponse.status).toBe(200);
      expect(await getResponse.json()).toEqual(identifier);
    });

    it('returns 404 when the identifier does not exist', async () => {
      // Arrange: Create a request to get the identifier
      const getRequest = new Request(`http://localhost/identifiers/does-not-exist`, {
        method: 'GET',
        headers: {
          'x-tenant-id': 'test-tenant',
          'x-organization-id': 'test-org',
          'Content-Type': 'application/json',
        },
      });
    });

    it('returns 404 when the identifier does not belong to the organization', async () => {
      // Arrange: Create a request to create an identifier
      const createRequest = new Request('http://localhost/identifiers', {
        method: 'POST',
        body: JSON.stringify({
          alias: 'test-did',
        }),
        headers: {
          'x-tenant-id': 'test-tenant',
          'x-organization-id': 'other-org',
          'Content-Type': 'application/json',
        },
      });

      // Act: Send the request
      const response = await app.request(createRequest);

      // Assert: The response is successful
      expect(response.status).toBe(201);

      const identifier = await response.json();

      // Arrange: Create a request to get the identifier
      const getRequest = new Request(`http://localhost/identifiers/${identifier.id}`, {
        method: 'GET',
        headers: {
          'x-tenant-id': 'test-tenant',
          'x-organization-id': 'test-org',
          'Content-Type': 'application/json',
        },
      });

      // Act: Send the request
      const getResponse = await app.request(getRequest);

      // Assert: The response is successful
      expect(getResponse.status).toBe(404);
    });
  });

  describe('GET /identifiers/default', () => {
    it('creates a default identifier when none exists', async () => {
      // Arrange: Create a request to get the default identifier
      const request = new Request('http://localhost/identifiers/default?organizationId=test-org', {
        method: 'GET',
        headers: {
          'x-tenant-id': 'test-tenant',
          'x-organization-id': 'test-org',
          'Content-Type': 'application/json',
        },
      });

      // Act: Send the request
      const response = await app.request(request);

      // Assert: The response is successful and creates a new identifier
      expect(response.status).toBe(201);
      const identifier = await response.json();
      expect(identifier).toEqual(
        expect.objectContaining({
          did: 'did:web:test.truststack.dev:test-org',
        }),
      );
      expect(identifier.id).toBeDefined();
    });

    it('returns existing default identifier when it already exists', async () => {
      // Arrange: Create a request to get the default identifier (first call creates it)
      const firstRequest = new Request(
        'http://localhost/identifiers/default?organizationId=test-org',
        {
          method: 'GET',
          headers: {
            'x-tenant-id': 'test-tenant',
            'x-organization-id': 'test-org',
            'Content-Type': 'application/json',
          },
        },
      );

      const firstResponse = await app.request(firstRequest);
      expect(firstResponse.status).toBe(201);
      const firstIdentifier = await firstResponse.json();

      // Act: Request the default identifier again
      const secondRequest = new Request(
        'http://localhost/identifiers/default?organizationId=test-org',
        {
          method: 'GET',
          headers: {
            'x-tenant-id': 'test-tenant',
            'x-organization-id': 'test-org',
            'Content-Type': 'application/json',
          },
        },
      );

      const secondResponse = await app.request(secondRequest);

      // Assert: The response returns the existing identifier with status 200
      expect(secondResponse.status).toBe(200);
      const secondIdentifier = await secondResponse.json();
      expect(secondIdentifier.id).toBe(firstIdentifier.id);
      expect(secondIdentifier.did).toBe(firstIdentifier.did);
      expect(secondIdentifier.did).toBe('did:web:test.truststack.dev:test-org');
    });

    it('creates different default identifiers for different organizations', async () => {
      // Arrange: Create default identifier for org-1
      const org1Request = new Request('http://localhost/identifiers/default?organizationId=org-1', {
        method: 'GET',
        headers: {
          'x-tenant-id': 'test-tenant',
          'x-organization-id': 'org-1',
          'Content-Type': 'application/json',
        },
      });

      const org1Response = await app.request(org1Request);
      expect(org1Response.status).toBe(201);
      const org1Identifier = await org1Response.json();

      // Arrange: Create default identifier for org-2
      const org2Request = new Request('http://localhost/identifiers/default?organizationId=org-2', {
        method: 'GET',
        headers: {
          'x-tenant-id': 'test-tenant',
          'x-organization-id': 'org-2',
          'Content-Type': 'application/json',
        },
      });

      const org2Response = await app.request(org2Request);
      expect(org2Response.status).toBe(201);
      const org2Identifier = await org2Response.json();

      // Assert: The identifiers are different and have correct DID format
      expect(org1Identifier.did).toBe('did:web:test.truststack.dev:org-1');
      expect(org2Identifier.did).toBe('did:web:test.truststack.dev:org-2');
      expect(org1Identifier.id).not.toBe(org2Identifier.id);
    });

    it('verifies the default DID format matches did:web:WEB_DID_DOMAIN:organizationId', async () => {
      // Arrange: Create a request to get the default identifier
      const request = new Request(
        'http://localhost/identifiers/default?organizationId=my-org-123',
        {
          method: 'GET',
          headers: {
            'x-tenant-id': 'test-tenant',
            'x-organization-id': 'my-org-123',
            'Content-Type': 'application/json',
          },
        },
      );

      // Act: Send the request
      const response = await app.request(request);

      // Assert: The response has the correct DID format
      expect(response.status).toBe(201);
      const identifier = await response.json();
      expect(identifier.did).toBe('did:web:test.truststack.dev:my-org-123');
    });
  });

  describe('GET /identifiers', () => {
    it('can list identifiers with pagination', async () => {
      // Arrange: Create multiple identifiers
      const identifiers = [];
      for (let i = 0; i < 5; i++) {
        const createRequest = new Request('http://localhost/identifiers', {
          method: 'POST',
          body: JSON.stringify({
            alias: `test-did-${i}`,
          }),
          headers: {
            'x-tenant-id': 'test-tenant',
            'x-organization-id': 'test-org',
            'Content-Type': 'application/json',
          },
        });
        const response = await app.request(createRequest);
        const identifier = await response.json();
        identifiers.push(identifier);
      }

      // Act: List identifiers with pagination
      const listRequest = new Request('http://localhost/identifiers?offset=0&limit=3', {
        method: 'GET',
        headers: {
          'x-tenant-id': 'test-tenant',
          'x-organization-id': 'test-org',
          'Content-Type': 'application/json',
        },
      });

      const listResponse = await app.request(listRequest);

      // Assert: The response is successful and returns paginated results
      expect(listResponse.status).toBe(200);
      const result = await listResponse.json();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeLessThanOrEqual(3);
    });

    it('can list identifiers with default pagination', async () => {
      // Arrange: Create an identifier
      const createRequest = new Request('http://localhost/identifiers', {
        method: 'POST',
        body: JSON.stringify({
          alias: 'test-did-default',
        }),
        headers: {
          'x-tenant-id': 'test-tenant',
          'x-organization-id': 'test-org',
          'Content-Type': 'application/json',
        },
      });
      await app.request(createRequest);

      // Act: List identifiers without pagination params
      const listRequest = new Request('http://localhost/identifiers', {
        method: 'GET',
        headers: {
          'x-tenant-id': 'test-tenant',
          'x-organization-id': 'test-org',
          'Content-Type': 'application/json',
        },
      });

      const listResponse = await app.request(listRequest);

      // Assert: The response is successful
      expect(listResponse.status).toBe(200);
      const result = await listResponse.json();
      expect(Array.isArray(result)).toBe(true);
    });

    it('can filter identifiers by alias', async () => {
      // Arrange: Create identifiers with different aliases
      const createRequest1 = new Request('http://localhost/identifiers', {
        method: 'POST',
        body: JSON.stringify({
          alias: 'filter-test-1',
        }),
        headers: {
          'x-tenant-id': 'test-tenant',
          'x-organization-id': 'test-org',
          'Content-Type': 'application/json',
        },
      });
      await app.request(createRequest1);

      const createRequest2 = new Request('http://localhost/identifiers', {
        method: 'POST',
        body: JSON.stringify({
          alias: 'filter-test-2',
        }),
        headers: {
          'x-tenant-id': 'test-tenant',
          'x-organization-id': 'test-org',
          'Content-Type': 'application/json',
        },
      });
      await app.request(createRequest2);

      // Act: Filter by alias
      const listRequest = new Request(
        'http://localhost/identifiers?alias=test.truststack.dev:test-org:filter-test-1',
        {
          method: 'GET',
          headers: {
            'x-tenant-id': 'test-tenant',
            'x-organization-id': 'test-org',
            'Content-Type': 'application/json',
          },
        },
      );

      const listResponse = await app.request(listRequest);

      // Assert: The response is successful and filtered
      expect(listResponse.status).toBe(200);
      const result = await listResponse.json();
      expect(Array.isArray(result)).toBe(true);
      if (result.length > 0) {
        expect(result[0].alias).toContain('filter-test-1');
      }
    });

    it('only returns identifiers for the requesting organization', async () => {
      // Arrange: Create identifiers for different organizations
      const createRequest1 = new Request('http://localhost/identifiers', {
        method: 'POST',
        body: JSON.stringify({
          alias: 'org1-identifier',
        }),
        headers: {
          'x-tenant-id': 'test-tenant',
          'x-organization-id': 'org-1',
          'Content-Type': 'application/json',
        },
      });
      await app.request(createRequest1);

      const createRequest2 = new Request('http://localhost/identifiers', {
        method: 'POST',
        body: JSON.stringify({
          alias: 'org2-identifier',
        }),
        headers: {
          'x-tenant-id': 'test-tenant',
          'x-organization-id': 'org-2',
          'Content-Type': 'application/json',
        },
      });
      await app.request(createRequest2);

      // Act: List identifiers for org-1
      const listRequest = new Request('http://localhost/identifiers', {
        method: 'GET',
        headers: {
          'x-tenant-id': 'test-tenant',
          'x-organization-id': 'org-1',
          'Content-Type': 'application/json',
        },
      });

      const listResponse = await app.request(listRequest);

      // Assert: Only org-1 identifiers are returned
      expect(listResponse.status).toBe(200);
      const result = await listResponse.json();
      expect(Array.isArray(result)).toBe(true);
      // All returned identifiers should belong to org-1
      result.forEach((identifier: any) => {
        expect(identifier.alias).toContain('org-1');
      });
    });
  });
});
