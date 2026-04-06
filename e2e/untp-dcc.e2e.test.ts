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

const minimalConformityAttestation = {
  id: 'https://example.com/attestation/001',
  name: 'Coppermark Certification — Test Mine',
  assessorLevel: '3rdParty',
  assessmentLevel: 'authority-benchmark',
  attestationType: 'certification',
  issuedToParty: {
    id: 'did:web:sample-mine.example.com',
    name: 'Test Mine Pty Ltd',
  },
  referenceScheme: {
    id: 'https://coppermark.org',
    name: 'Coppermark',
  },
};

describe('UNTP DCC (e2e)', () => {
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

  describe('POST /untp/0.7.0/dcc', () => {
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

    it('creates a DCC credential with issuerDid', async () => {
      const response = await app.request(
        new Request('http://localhost/untp/0.7.0/dcc', {
          method: 'POST',
          body: JSON.stringify({
            issuerDid: { alias: 'test.truststack.dev:test-org:test-did' },
            credentialSubject: minimalConformityAttestation,
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

    it('creates a DCC credential without issuerDid when organization has one identifier', async () => {
      const response = await app.request(
        new Request('http://localhost/untp/0.7.0/dcc', {
          method: 'POST',
          body: JSON.stringify({
            credentialSubject: minimalConformityAttestation,
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
      const { assessorLevel, ...incomplete } = minimalConformityAttestation;
      const response = await app.request(
        new Request('http://localhost/untp/0.7.0/dcc', {
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
        new Request('http://localhost/untp/0.7.0/dcc', {
          method: 'POST',
          body: JSON.stringify({
            issuerDid: { alias: 'test.truststack.dev:test-org:test-did' },
            credentialSubject: {
              ...minimalConformityAttestation,
              assessorLevel: 'invalid-level',
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

    it('accepts extra fields via passthrough', async () => {
      const response = await app.request(
        new Request('http://localhost/untp/0.7.0/dcc', {
          method: 'POST',
          body: JSON.stringify({
            credentialSubject: {
              ...minimalConformityAttestation,
              description: 'An optional description field',
              conformityAssessment: [],
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
