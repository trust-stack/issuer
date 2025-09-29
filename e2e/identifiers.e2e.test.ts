import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { resolve } from 'node:path';

const dbRef = vi.hoisted(() => ({ current: undefined as ReturnType<typeof drizzle> | undefined }));

vi.mock('src/db/instance', () => ({
  getDb: () => {
    if (!dbRef.current) {
      throw new Error('Test database has not been initialised');
    }
    return dbRef.current;
  },
}));

import app from 'src/index';
import { resetData } from './utils';

let sqlite: Database.Database;

describe('Identifiers (e2e)', () => {
  beforeAll(async () => {
    sqlite = new Database(':memory:');
    dbRef.current = drizzle(sqlite);
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
});
