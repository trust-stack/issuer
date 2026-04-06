import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { resolve } from 'node:path';
import * as schema from 'src/db/schema';
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { IdentifiersRepositorySqlite } from './identifiers.repository.sqlite';

// Key methods do not use request context, but the class imports getRequestContext
// so we mock it to prevent errors on any code path that might call it.
vi.mock('src/request-context', () => ({
  getRequestContext: vi.fn(() => ({
    auth: { organizationId: 'org-test', tenantId: 'org-test' },
  })),
}));

describe('IdentifiersRepositorySqlite — key methods', () => {
  let sqlite: Database.Database;
  let db: ReturnType<typeof drizzle>;
  let repo: IdentifiersRepositorySqlite;

  beforeAll(async () => {
    sqlite = new Database(':memory:');
    db = drizzle(sqlite, { schema });
    await migrate(db, { migrationsFolder: resolve(process.cwd(), 'drizzle') });
    repo = new IdentifiersRepositorySqlite(db as any);
  });

  beforeEach(() => {
    sqlite.exec('DELETE FROM crypto_keys;');
  });

  const baseKey = () => ({
    kid: 'key-1',
    type: 'Ed25519' as const,
    kms: 'local',
    publicKeyHex: 'aabbccdd',
    privateKeyHex: '11223344',
    meta: {},
  });

  describe('saveKey', () => {
    it('inserts a key', async () => {
      await repo.saveKey(baseKey());
      const result = await repo.findKey('key-1');
      expect(result).not.toBeNull();
      expect(result!.kid).toBe('key-1');
      expect(result!.publicKeyHex).toBe('aabbccdd');
    });

    it('upserts on duplicate kid', async () => {
      await repo.saveKey(baseKey());
      await repo.saveKey({ ...baseKey(), publicKeyHex: 'updated' });
      const result = await repo.findKey('key-1');
      expect(result!.publicKeyHex).toBe('updated');
    });

    it('throws when required fields are missing', async () => {
      await expect(repo.saveKey({ kid: 'key-1' })).rejects.toThrow(
        'Missing required key properties',
      );
    });
  });

  describe('findKey', () => {
    it('returns null for unknown kid', async () => {
      const result = await repo.findKey('nonexistent');
      expect(result).toBeNull();
    });

    it('returns the key with all fields', async () => {
      await repo.saveKey(baseKey());
      const result = await repo.findKey('key-1');
      expect(result).toMatchObject({
        kid: 'key-1',
        kms: 'local',
        type: 'Ed25519',
        publicKeyHex: 'aabbccdd',
        privateKeyHex: '11223344',
      });
    });
  });

  describe('deleteKey', () => {
    it('deletes an existing key', async () => {
      await repo.saveKey(baseKey());
      await repo.deleteKey('key-1');
      const result = await repo.findKey('key-1');
      expect(result).toBeNull();
    });

    it('is a no-op for nonexistent kid', async () => {
      await expect(repo.deleteKey('nonexistent')).resolves.not.toThrow();
    });
  });

  describe('listKeys', () => {
    it('returns empty array when no keys exist', async () => {
      const results = await repo.listKeys();
      expect(results).toEqual([]);
    });

    it('returns all stored keys', async () => {
      await repo.saveKey(baseKey());
      await repo.saveKey({ ...baseKey(), kid: 'key-2', publicKeyHex: 'eeff0011' });
      const results = await repo.listKeys();
      expect(results).toHaveLength(2);
      expect(results.map((k) => k.kid)).toContain('key-1');
      expect(results.map((k) => k.kid)).toContain('key-2');
    });
  });
});
