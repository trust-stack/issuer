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

describe('DID Resolution (e2e)', () => {
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

  describe('GET /:organizationId/did.json', () => {
    it('can resolve default organization DID', async () => {
      // Arrange: Create a default identifier
      const createRequest = new Request(
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

      const createResponse = await app.request(createRequest);
      expect(createResponse.status).toBe(201);
      const identifier = await createResponse.json();

      // Act: Resolve the DID document
      const resolveRequest = new Request('http://localhost/test-org/did.json', {
        method: 'GET',
      });

      const resolveResponse = await app.request(resolveRequest);

      // Assert: The response is successful and contains a valid DID document
      expect(resolveResponse.status).toBe(200);
      const didDocument = await resolveResponse.json();
      expect(didDocument).toEqual(
        expect.objectContaining({
          '@context': expect.arrayContaining(['https://www.w3.org/ns/did/v1']),
          id: 'did:web:test.truststack.dev:test-org',
          verificationMethod: expect.any(Array),
        }),
      );
      expect(didDocument.verificationMethod.length).toBeGreaterThan(0);
    });

    it('returns 500 when default organization DID does not exist', async () => {
      // Act: Try to resolve a non-existent default DID
      const resolveRequest = new Request('http://localhost/non-existent-org/did.json', {
        method: 'GET',
      });

      const resolveResponse = await app.request(resolveRequest);

      // Assert: The response indicates failure
      expect(resolveResponse.status).toBe(500);
      const error = await resolveResponse.json();
      expect(error).toEqual(
        expect.objectContaining({
          error: expect.any(String),
        }),
      );
    });

    it('resolves different default DIDs for different organizations', async () => {
      // Arrange: Create default identifiers for two organizations
      const org1Request = new Request('http://localhost/identifiers/default?organizationId=org-1', {
        method: 'GET',
        headers: {
          'x-tenant-id': 'test-tenant',
          'x-organization-id': 'org-1',
          'Content-Type': 'application/json',
        },
      });
      await app.request(org1Request);

      const org2Request = new Request('http://localhost/identifiers/default?organizationId=org-2', {
        method: 'GET',
        headers: {
          'x-tenant-id': 'test-tenant',
          'x-organization-id': 'org-2',
          'Content-Type': 'application/json',
        },
      });
      await app.request(org2Request);

      // Act: Resolve both DIDs
      const org1ResolveRequest = new Request('http://localhost/org-1/did.json', {
        method: 'GET',
      });
      const org1Response = await app.request(org1ResolveRequest);

      const org2ResolveRequest = new Request('http://localhost/org-2/did.json', {
        method: 'GET',
      });
      const org2Response = await app.request(org2ResolveRequest);

      // Assert: Both resolve successfully and have different DIDs
      expect(org1Response.status).toBe(200);
      expect(org2Response.status).toBe(200);

      const org1Doc = await org1Response.json();
      const org2Doc = await org2Response.json();

      expect(org1Doc.id).toBe('did:web:test.truststack.dev:org-1');
      expect(org2Doc.id).toBe('did:web:test.truststack.dev:org-2');
      expect(org1Doc.id).not.toBe(org2Doc.id);
    });
  });

  describe('GET /:organizationId/:alias/did.json', () => {
    it('can resolve DID with alias', async () => {
      // Arrange: Create an identifier with an alias
      const createRequest = new Request('http://localhost/identifiers', {
        method: 'POST',
        body: JSON.stringify({
          alias: 'test-alias',
        }),
        headers: {
          'x-tenant-id': 'test-tenant',
          'x-organization-id': 'test-org',
          'Content-Type': 'application/json',
        },
      });

      const createResponse = await app.request(createRequest);
      expect(createResponse.status).toBe(201);
      const identifier = await createResponse.json();

      // Act: Resolve the DID document using the alias path
      const resolveRequest = new Request('http://localhost/test-org/test-alias/did.json', {
        method: 'GET',
      });

      const resolveResponse = await app.request(resolveRequest);

      // Assert: The response is successful and contains a valid DID document
      expect(resolveResponse.status).toBe(200);
      const didDocument = await resolveResponse.json();
      expect(didDocument).toEqual(
        expect.objectContaining({
          '@context': expect.arrayContaining(['https://www.w3.org/ns/did/v1']),
          id: 'did:web:test.truststack.dev:test-org:test-alias',
          verificationMethod: expect.any(Array),
        }),
      );
      expect(didDocument.verificationMethod.length).toBeGreaterThan(0);
    });

    it('returns 500 when DID with alias does not exist', async () => {
      // Act: Try to resolve a non-existent DID
      const resolveRequest = new Request('http://localhost/test-org/non-existent-alias/did.json', {
        method: 'GET',
      });

      const resolveResponse = await app.request(resolveRequest);

      // Assert: The response indicates failure
      expect(resolveResponse.status).toBe(500);
      const error = await resolveResponse.json();
      expect(error).toEqual(
        expect.objectContaining({
          error: expect.any(String),
        }),
      );
    });

    it('distinguishes between default DID and DID with alias', async () => {
      // Arrange: Create both a default identifier and one with an alias
      const defaultRequest = new Request(
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
      await app.request(defaultRequest);

      const aliasRequest = new Request('http://localhost/identifiers', {
        method: 'POST',
        body: JSON.stringify({
          alias: 'my-alias',
        }),
        headers: {
          'x-tenant-id': 'test-tenant',
          'x-organization-id': 'test-org',
          'Content-Type': 'application/json',
        },
      });
      await app.request(aliasRequest);

      // Act: Resolve both DIDs
      const defaultResolveRequest = new Request('http://localhost/test-org/did.json', {
        method: 'GET',
      });
      const defaultResponse = await app.request(defaultResolveRequest);

      const aliasResolveRequest = new Request('http://localhost/test-org/my-alias/did.json', {
        method: 'GET',
      });
      const aliasResponse = await app.request(aliasResolveRequest);

      // Assert: Both resolve successfully and have different DIDs
      expect(defaultResponse.status).toBe(200);
      expect(aliasResponse.status).toBe(200);

      const defaultDoc = await defaultResponse.json();
      const aliasDoc = await aliasResponse.json();

      expect(defaultDoc.id).toBe('did:web:test.truststack.dev:test-org');
      expect(aliasDoc.id).toBe('did:web:test.truststack.dev:test-org:my-alias');
      expect(defaultDoc.id).not.toBe(aliasDoc.id);
    });
  });
});
