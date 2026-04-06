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

const minimalMoveEvent = {
  id: 'https://example.com/events/move-001',
  name: 'Copper concentrate shipment',
  eventDate: '2025-03-01T08:00:00Z',
  activityType: {
    code: 'shipping',
    name: 'Shipping',
    schemeId: 'https://ref.gs1.org/cbv/BizStep',
    schemeName: 'GS1 CBV Business Step',
  },
  movedProduct: [
    {
      product: {
        id: 'https://id.example.com/product/cu-conc-2025',
        name: 'Copper Concentrate',
        idGranularity: 'model',
      },
    },
  ],
  fromFacility: {
    id: 'https://facility.example.com/fac-001',
    name: 'Sample Copper Mine',
  },
  toFacility: {
    id: 'https://facility.example.com/fac-002',
    name: 'Sample Copper Refinery',
  },
};

const minimalMakeEvent = {
  id: 'https://example.com/events/make-001',
  name: 'Battery manufacturing',
  eventDate: '2025-03-15T10:00:00Z',
  activityType: {
    code: 'commissioning',
    name: 'Commissioning',
    schemeId: 'https://ref.gs1.org/cbv/BizStep',
    schemeName: 'GS1 CBV Business Step',
  },
  inputProduct: [
    {
      product: {
        id: 'https://id.example.com/product/cathode-001',
        name: 'Copper Cathode',
        idGranularity: 'batch',
      },
    },
  ],
  outputProduct: [
    {
      product: {
        id: 'https://id.example.com/product/battery-001',
        name: 'Battery Pack',
        idGranularity: 'item',
      },
    },
  ],
  madeAtFacility: {
    id: 'https://facility.example.com/fac-003',
    name: 'Battery Factory',
  },
};

describe('UNTP DTE (e2e)', () => {
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

  describe('POST /untp/0.7.0/dte', () => {
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

    it('creates a DTE credential with a single MoveEvent', async () => {
      const response = await app.request(
        new Request('http://localhost/untp/0.7.0/dte', {
          method: 'POST',
          body: JSON.stringify({
            issuerDid: { alias: 'test.truststack.dev:test-org:test-did' },
            credentialSubject: [minimalMoveEvent],
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

    it('creates a DTE credential with multiple events of different types', async () => {
      const response = await app.request(
        new Request('http://localhost/untp/0.7.0/dte', {
          method: 'POST',
          body: JSON.stringify({
            credentialSubject: [minimalMoveEvent, minimalMakeEvent],
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

    it('creates a DTE credential without issuerDid', async () => {
      const response = await app.request(
        new Request('http://localhost/untp/0.7.0/dte', {
          method: 'POST',
          body: JSON.stringify({
            credentialSubject: [minimalMakeEvent],
          }),
          headers: {
            'x-tenant-id': 'test-tenant',
            'x-organization-id': 'test-org',
            'Content-Type': 'application/json',
          },
        }),
      );

      expect(response.status).toBe(201);
    });

    it('returns 400 when required event field is missing', async () => {
      const { eventDate, ...incomplete } = minimalMoveEvent;
      const response = await app.request(
        new Request('http://localhost/untp/0.7.0/dte', {
          method: 'POST',
          body: JSON.stringify({
            issuerDid: { alias: 'test.truststack.dev:test-org:test-did' },
            credentialSubject: [incomplete],
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

    it('returns 400 for empty credentialSubject array', async () => {
      const response = await app.request(
        new Request('http://localhost/untp/0.7.0/dte', {
          method: 'POST',
          body: JSON.stringify({
            issuerDid: { alias: 'test.truststack.dev:test-org:test-did' },
            credentialSubject: [],
          }),
          headers: {
            'x-tenant-id': 'test-tenant',
            'x-organization-id': 'test-org',
            'Content-Type': 'application/json',
          },
        }),
      );

      expect(response.status).toBe(400);
    });
  });
});
