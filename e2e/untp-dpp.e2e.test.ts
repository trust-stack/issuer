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

const minimalProductSubject = {
  id: 'https://id.example.com/product/test-001',
  name: 'Test Product',
  idScheme: {
    id: 'https://id.example.com',
    name: 'Example ID Scheme',
  },
  idGranularity: 'model' as const,
  productCategory: [
    {
      code: '46410',
      name: 'Primary cells and primary batteries',
      schemeId: 'https://unstats.un.org/unsd/classifications/Econ/cpc/',
      schemeName: 'UN Central Product Classification (CPC)',
    },
  ],
  producedAtFacility: {
    id: 'https://facility.example.com/fac-001',
    name: 'Example Factory',
  },
  countryOfProduction: {
    countryCode: 'DE',
    countryName: 'Germany',
  },
};

describe('UNTP DPP (e2e)', () => {
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
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('POST /untp/0.7.0/dpp', () => {
    beforeEach(async () => {
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

    it('creates a UNTP DPP credential with issuerDid and credentialSubject', async () => {
      const response = await app.request(
        new Request('http://localhost/untp/0.7.0/dpp', {
          method: 'POST',
          body: JSON.stringify({
            issuerDid: {
              alias: 'test.truststack.dev:test-org:test-did',
            },
            credentialSubject: minimalProductSubject,
          }),
          headers: {
            'x-tenant-id': 'test-tenant',
            'x-organization-id': 'test-org',
            'Content-Type': 'application/json',
          },
        }),
      );

      expect(response.status).toBe(201);
      const body = await response.json();
      expect(body).toMatchObject({
        id: expect.stringMatching(/^https:\/\//),
      });
    });

    it('creates a UNTP DPP without issuerDid when organization has one identifier', async () => {
      const response = await app.request(
        new Request('http://localhost/untp/0.7.0/dpp', {
          method: 'POST',
          body: JSON.stringify({
            credentialSubject: minimalProductSubject,
          }),
          headers: {
            'x-tenant-id': 'test-tenant',
            'x-organization-id': 'test-org',
            'Content-Type': 'application/json',
          },
        }),
      );

      expect(response.status).toBe(201);
      const body = await response.json();
      expect(body.id).toBeDefined();
    });
  });
});
