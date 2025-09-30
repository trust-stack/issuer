import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { resolve } from 'node:path';
import * as schema from 'src/db/schema';
import { defaultSqliteOptions } from 'src/infra/sqlite/options';

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

    it('can create a credential', async () => {
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
  });
});
