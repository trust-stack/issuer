import { eq } from 'drizzle-orm';
import { vcClaims } from 'src/db/schema/credentials';
import { VcClaimsRepository } from 'src/vc-claims';
import { SqliteDb } from './sqlite-drizzle';

export class VcClaimsRepositorySqlite implements VcClaimsRepository {
  constructor(private db: SqliteDb) {}

  async deleteByCredentialHash(credentialHash: string): Promise<void> {
    await this.db.delete(vcClaims).where(eq(vcClaims.credentialId, credentialHash));
  }
}
