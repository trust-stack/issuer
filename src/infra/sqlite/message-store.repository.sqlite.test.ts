import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { resolve } from 'node:path';
import * as schema from 'src/db/schema';
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { MessageStoreRepositorySqlite } from './message-store.repository.sqlite';

describe('MessageStoreRepositorySqlite', () => {
  let sqlite: Database.Database;
  let db: ReturnType<typeof drizzle>;
  let repo: MessageStoreRepositorySqlite;

  beforeAll(async () => {
    sqlite = new Database(':memory:');
    db = drizzle(sqlite, { schema });
    await migrate(db, { migrationsFolder: resolve(process.cwd(), 'drizzle') });
    repo = new MessageStoreRepositorySqlite(db as any);
  });

  beforeEach(() => {
    sqlite.exec('DELETE FROM credential_messages;');
    sqlite.exec('DELETE FROM messages;');
  });

  const baseMessage = () => ({
    id: 'msg-1',
    type: 'jwt',
    raw: null,
    data: null,
    replyTo: null,
    replyUrl: null,
    threadId: null,
    createdAt: null,
    expiresAt: null,
    fromId: null,
    toId: null,
    returnRoute: null,
  });

  describe('saveMessage / findMessageById', () => {
    it('saves and retrieves a message by id', async () => {
      await repo.saveMessage(baseMessage());
      const result = await repo.findMessageById('msg-1');
      expect(result).not.toBeNull();
      expect(result!.id).toBe('msg-1');
      expect(result!.type).toBe('jwt');
    });

    it('returns null for unknown message id', async () => {
      const result = await repo.findMessageById('does-not-exist');
      expect(result).toBeNull();
    });

    it('upserts on duplicate id', async () => {
      await repo.saveMessage(baseMessage());
      await repo.saveMessage({ ...baseMessage(), type: 'updated' });
      const result = await repo.findMessageById('msg-1');
      expect(result!.type).toBe('updated');
    });
  });

  // Insert into credential_messages without FK enforcement (avoids needing a real credential row)
  const insertCredentialMessage = (credentialHash: string, messageId: string) => {
    sqlite.pragma('foreign_keys = OFF');
    sqlite.exec(
      `INSERT INTO credential_messages (credential_hash, message_id) VALUES ('${credentialHash}', '${messageId}')`,
    );
    sqlite.pragma('foreign_keys = ON');
  };

  describe('findCredentialHashesByMessageId', () => {
    it('returns empty array when no credential_messages exist for message', async () => {
      await repo.saveMessage(baseMessage());
      const hashes = await repo.findCredentialHashesByMessageId('msg-1');
      expect(hashes).toEqual([]);
    });

    it('returns credential hashes linked to a message', async () => {
      await repo.saveMessage(baseMessage());
      insertCredentialMessage('hash-abc', 'msg-1');
      const hashes = await repo.findCredentialHashesByMessageId('msg-1');
      expect(hashes).toEqual(['hash-abc']);
    });

    it('returns only hashes for the requested message', async () => {
      await repo.saveMessage(baseMessage());
      await repo.saveMessage({ ...baseMessage(), id: 'msg-2' });
      insertCredentialMessage('hash-1', 'msg-1');
      insertCredentialMessage('hash-2', 'msg-2');
      const hashes = await repo.findCredentialHashesByMessageId('msg-1');
      expect(hashes).toEqual(['hash-1']);
    });
  });

  describe('deleteByCredentialHash', () => {
    it('deletes credential_messages entries for the given hash', async () => {
      await repo.saveMessage(baseMessage());
      insertCredentialMessage('hash-abc', 'msg-1');
      await repo.deleteByCredentialHash('hash-abc');
      const hashes = await repo.findCredentialHashesByMessageId('msg-1');
      expect(hashes).toEqual([]);
    });

    it('is a no-op when hash does not exist', async () => {
      await expect(repo.deleteByCredentialHash('nonexistent')).resolves.not.toThrow();
    });
  });
});
