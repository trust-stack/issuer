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
import { SqliteDb } from '../sqlite';

export class CredentialsRepositoryCf implements CredentialsRepository {
  constructor(
    readonly r2: CredentialR2Repository,
    private db: SqliteDb,
  ) {}

  async saveCredential(credential: CredentialInsert): Promise<void> {
    const { auth } = getRequestContext();

    const values: CredentialInsert = {
      ...credential,
      organizationId: auth.organizationId,
    };

    const { raw, ...update } = values;

    // Save raw to R2.
    await this.r2.saveCredential(values.hash, raw as JSON);

    // Save metadata to DB
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

    // Get raw from R2.
    const raw = await this.r2.getCredential(hash);

    return { ...result, raw: raw as JSON };
  }

  async findCredentialsByHashes(hashes: string[]): Promise<CredentialRecord[]> {
    if (hashes.length === 0) return [];

    const { auth } = getRequestContext();

    // Get raw from R2.
    const raw = await this.r2.getCredentials(hashes);

    const creds = await this.db
      .select()
      .from(credentials)
      .where(
        and(inArray(credentials.hash, hashes), eq(credentials.organizationId, auth.organizationId)),
      );

    return creds.map((cred) => ({
      ...cred,
      raw: raw.find((r) => r.hash === cred.hash)?.raw as JSON,
    }));
  }

  async findCredentialById(id: string): Promise<CredentialRecord | null> {
    const { auth } = getRequestContext();

    const [result] = await this.db
      .select()
      .from(credentials)
      .where(and(eq(credentials.id, id), eq(credentials.organizationId, auth.organizationId)))
      .limit(1);

    if (!result) return null;

    // Get raw from R2.
    const raw = await this.r2.getCredential(result.hash);

    return { ...result, raw: raw as JSON };
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

    const creds = await this.db
      .select()
      .from(credentials)
      .where(whereClause)
      .offset(filter.offset ?? 0)
      .limit(filter.limit ?? 100);

    // Get raw from R2 for all credentials
    const hashes = creds.map((cred) => cred.hash);
    const raw = await this.r2.getCredentials(hashes);

    return creds.map((cred) => ({
      ...cred,
      raw: raw.find((r) => r.hash === cred.hash)?.raw as JSON,
    }));
  }

  async deleteCredentialByHash(hash: string): Promise<void> {
    const { auth } = getRequestContext();

    // Delete raw from R2.
    await this.r2.deleteCredential(hash);

    await this.db
      .delete(credentials)
      .where(and(eq(credentials.hash, hash), eq(credentials.organizationId, auth.organizationId)));
  }

  async deleteCredentialById(id: string): Promise<void> {
    const { auth } = getRequestContext();

    // First find the credential to get the hash
    const [credential] = await this.db
      .select()
      .from(credentials)
      .where(and(eq(credentials.id, id), eq(credentials.organizationId, auth.organizationId)))
      .limit(1);

    if (!credential) return;

    // Delete raw from R2.
    await this.r2.deleteCredential(credential.hash);

    await this.db
      .delete(credentials)
      .where(and(eq(credentials.id, id), eq(credentials.organizationId, auth.organizationId)));
  }
}

export abstract class CredentialR2Repository {
  abstract saveCredential(hash: string, raw: JSON): Promise<void>;
  abstract getCredential(hash: string): Promise<JSON>;
  abstract getCredentials(hashes: string[]): Promise<{ hash: string; raw: JSON }[]>;
  abstract deleteCredential(hash: string): Promise<void>;
}
