import { eq } from 'drizzle-orm';
import { Database } from 'src/db';
import { getDb } from 'src/db/instance';
import { vcClaims } from 'src/db/schema/credentials';
import { VcClaimsRepository } from 'src/vc-claims';

export class VcClaimsRepositorySqlite implements VcClaimsRepository {
  private readonly db: Database;

  constructor() {
    this.db = getDb();
  }

  async deleteByCredentialHash(credentialHash: string): Promise<void> {
    await this.db.delete(vcClaims).where(eq(vcClaims.credentialId, credentialHash));
  }
}
