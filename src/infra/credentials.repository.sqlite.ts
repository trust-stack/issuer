import { and, eq, inArray } from 'drizzle-orm';
import { Database } from 'src/db';
import { getDb } from 'src/db/instance';
import { credentials } from 'src/db/schema/credentials';
import type {
  CredentialInsert,
  CredentialRecord,
  CredentialsRepository,
} from 'src/credentials/credentials.repository';
import { getRequestContext } from 'src/request-context';

export class CredentialsRepositorySqlite implements CredentialsRepository {
  private readonly db: Database;

  constructor() {
    this.db = getDb();
  }

  async saveCredential(credential: CredentialInsert): Promise<void> {
    const { auth } = getRequestContext();

    const values: CredentialInsert = {
      ...credential,
      organizationId: auth.organizationId,
    };

    const { hash, ...update } = values;

    await this.db.insert(credentials).values(values).onConflictDoUpdate({
      target: credentials.hash,
      set: update,
    });
  }

  async findCredentialByHash(hash: string): Promise<CredentialRecord | null> {
    const { auth } = getRequestContext();

    const [result] = await this.db
      .select()
      .from(credentials)
      .where(and(eq(credentials.hash, hash), eq(credentials.organizationId, auth.organizationId)))
      .limit(1);

    return result ?? null;
  }

  async findCredentialsByHashes(hashes: string[]): Promise<CredentialRecord[]> {
    if (hashes.length === 0) return [];

    const { auth } = getRequestContext();

    return this.db
      .select()
      .from(credentials)
      .where(
        and(inArray(credentials.hash, hashes), eq(credentials.organizationId, auth.organizationId)),
      );
  }

  async deleteCredentialByHash(hash: string): Promise<void> {
    const { auth } = getRequestContext();

    await this.db
      .delete(credentials)
      .where(and(eq(credentials.hash, hash), eq(credentials.organizationId, auth.organizationId)));
  }
}
