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

const minimalFacility = {
  id: 'https://facility-register.example.com/fac-001',
  name: 'Sample Copper Mine',
  countryOfOperation: {
    countryCode: 'ZM',
    countryName: 'Zambia',
  },
  processCategory: [
    {
      code: '14110',
      name: 'Copper ores and concentrates',
      schemeId: 'https://unstats.un.org/unsd/classifications/Econ/cpc/',
      schemeName: 'UN Central Product Classification (CPC)',
    },
  ],
  locationInformation: {
    geoLocation: {
      latitude: -12.17,
      longitude: 26.4,
    },
  },
  address: {
    streetAddress: 'Sample Mine Road',
    postalCode: '10101',
    addressLocality: 'Solwezi',
    addressRegion: 'North-Western Province',
    addressCountry: {
      countryCode: 'ZM',
      countryName: 'Zambia',
    },
  },
};

describe('UNTP DFR (e2e)', () => {
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

  describe('POST /untp/0.7.0/dfr', () => {
    beforeEach(async () => {
      await app.request(
        new Request('http://localhost/identifiers', {
          method: 'POST',
          body: JSON.stringify({ alias: 'test-did' }),
          headers: {
            'x-tenant-id': 'test-tenant',
            'x-organization-id': 'test-org',
            'Content-Type': 'application/json',
          },
        }),
      );
    });

    it('creates a DFR credential with issuerDid', async () => {
      const response = await app.request(
        new Request('http://localhost/untp/0.7.0/dfr', {
          method: 'POST',
          body: JSON.stringify({
            issuerDid: { alias: 'test.truststack.dev:test-org:test-did' },
            credentialSubject: minimalFacility,
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

    it('creates a DFR credential without issuerDid', async () => {
      const response = await app.request(
        new Request('http://localhost/untp/0.7.0/dfr', {
          method: 'POST',
          body: JSON.stringify({
            credentialSubject: minimalFacility,
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

    it('returns 400 when required field is missing', async () => {
      const { address, ...incomplete } = minimalFacility;
      const response = await app.request(
        new Request('http://localhost/untp/0.7.0/dfr', {
          method: 'POST',
          body: JSON.stringify({
            issuerDid: { alias: 'test.truststack.dev:test-org:test-did' },
            credentialSubject: incomplete,
          }),
          headers: {
            'x-tenant-id': 'test-tenant',
            'x-organization-id': 'test-org',
            'Content-Type': 'application/json',
          },
        }),
      );

      expect(response.status).toBe(400);
      const body = await response.json();
      expect(body.errors).toBeDefined();
      expect(body.errors.length).toBeGreaterThan(0);
    });

    it('returns 400 when nested required field is invalid', async () => {
      const response = await app.request(
        new Request('http://localhost/untp/0.7.0/dfr', {
          method: 'POST',
          body: JSON.stringify({
            issuerDid: { alias: 'test.truststack.dev:test-org:test-did' },
            credentialSubject: {
              ...minimalFacility,
              countryOfOperation: { countryName: 'Zambia' }, // missing required countryCode
            },
          }),
          headers: {
            'x-tenant-id': 'test-tenant',
            'x-organization-id': 'test-org',
            'Content-Type': 'application/json',
          },
        }),
      );

      expect(response.status).toBe(400);
      const body = await response.json();
      expect(body.errors).toBeDefined();
    });
  });
});
