import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { resolve } from 'node:path';
import * as schema from 'src/db/schema';

const dbRef = vi.hoisted(() => ({ current: undefined as ReturnType<typeof drizzle> | undefined }));

vi.mock('src/db/instance', () => ({
  getDb: () => {
    if (!dbRef.current) {
      throw new Error('Test database has not been initialised');
    }
    return dbRef.current;
  },
}));

import app from 'src';
import { resetData } from './db';

let sqlite: Database.Database;

describe('Identifiers (e2e)', () => {
  beforeAll(async () => {
    sqlite = new Database(':memory:');
    dbRef.current = drizzle(sqlite, { schema });
    await migrate(dbRef.current, {
      migrationsFolder: resolve(process.cwd(), 'drizzle'),
    });
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
});
