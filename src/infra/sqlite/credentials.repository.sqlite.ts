import type { SQL } from 'drizzle-orm';
import { and, eq, inArray } from 'drizzle-orm';
import type {
  CredentialInsert,
  CredentialListFilter,
  CredentialRecord,
  CredentialsRepository,
} from 'src/credentials/credentials.repository';
import { credentials } from 'src/db/schema/credentials';
import { getRequestContext } from 'src/request-context';
import { SqliteDb } from './sqlite-drizzle';

export class CredentialsRepositorySqlite implements CredentialsRepository {
  constructor(readonly db: SqliteDb) {}

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

  async findCredentialById(id: string): Promise<CredentialRecord | null> {
    const { auth } = getRequestContext();

    const [result] = await this.db
      .select()
      .from(credentials)
      .where(and(eq(credentials.id, id), eq(credentials.organizationId, auth.organizationId)))
      .limit(1);

    return result ?? null;
  }

  async listCredentials(filter: CredentialListFilter = {}): Promise<CredentialRecord[]> {
    const { auth } = getRequestContext();

    const conditions: SQL[] = [eq(credentials.organizationId, auth.organizationId)];

    if (filter.issuerDid) {
      conditions.push(eq(credentials.issuerId, filter.issuerDid));
    }

    const whereClause = conditions.reduce<SQL | undefined>((acc, condition) => {
      return acc ? and(acc, condition) : condition;
    }, undefined);

    if (!whereClause) {
      throw new Error('No conditions provided for credential query');
    }

    return this.db
      .select()
      .from(credentials)
      .where(whereClause)
      .offset(filter.offset ?? 0)
      .limit(filter.limit ?? 100);
  }

  async deleteCredentialByHash(hash: string): Promise<void> {
    const { auth } = getRequestContext();

    await this.db
      .delete(credentials)
      .where(and(eq(credentials.hash, hash), eq(credentials.organizationId, auth.organizationId)));
  }

  async deleteCredentialById(id: string): Promise<void> {
    const { auth } = getRequestContext();

    await this.db
      .delete(credentials)
      .where(and(eq(credentials.id, id), eq(credentials.organizationId, auth.organizationId)));
  }
}
