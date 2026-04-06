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

const minimalRegisteredIdentity = {
  id: 'did:web:sample-refinery.example.com',
  registeredName: 'Sample Copper Refinery Co. Ltd',
  registeredId: 'REF-001',
  registeredDate: '1985-06-15',
  idScheme: {
    id: 'https://www.houjin-register.example.com',
    name: 'Japan Corporate Number (Houjin Bangou)',
  },
  registerType: 'business',
};

describe('UNTP DIA (e2e)', () => {
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

  describe('POST /untp/0.7.0/dia', () => {
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

    it('creates a DIA credential with issuerDid', async () => {
      const response = await app.request(
        new Request('http://localhost/untp/0.7.0/dia', {
          method: 'POST',
          body: JSON.stringify({
            issuerDid: { alias: 'test.truststack.dev:test-org:test-did' },
            credentialSubject: minimalRegisteredIdentity,
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

    it('creates a DIA credential without issuerDid', async () => {
      const response = await app.request(
        new Request('http://localhost/untp/0.7.0/dia', {
          method: 'POST',
          body: JSON.stringify({
            credentialSubject: minimalRegisteredIdentity,
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
      const { registeredDate, ...incomplete } = minimalRegisteredIdentity;
      const response = await app.request(
        new Request('http://localhost/untp/0.7.0/dia', {
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

    it('returns 400 for invalid enum value', async () => {
      const response = await app.request(
        new Request('http://localhost/untp/0.7.0/dia', {
          method: 'POST',
          body: JSON.stringify({
            issuerDid: { alias: 'test.truststack.dev:test-org:test-did' },
            credentialSubject: {
              ...minimalRegisteredIdentity,
              registerType: 'invalid-type',
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

    it('accepts optional fields', async () => {
      const response = await app.request(
        new Request('http://localhost/untp/0.7.0/dia', {
          method: 'POST',
          body: JSON.stringify({
            credentialSubject: {
              ...minimalRegisteredIdentity,
              publicInformation: 'https://example.com/info',
              registrar: {
                id: 'https://example.com/registrar',
                name: 'Test Registrar',
              },
              registrationScope: ['https://example.com/scope/business'],
            },
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
  });
});
