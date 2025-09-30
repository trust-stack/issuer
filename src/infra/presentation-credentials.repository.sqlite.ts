import { eq } from 'drizzle-orm';
import { Database } from 'src/db';
import { getDb } from 'src/db/instance';
import { presentationCredentials } from 'src/db/schema/links';
import { PresentationCredentialsRepository } from 'src/presentation-credentials';

export class PresentationCredentialsRepositorySqlite implements PresentationCredentialsRepository {
  private readonly db: Database;

  constructor() {
    this.db = getDb();
  }

  async deleteByCredentialHash(credentialHash: string): Promise<void> {
    await this.db
      .delete(presentationCredentials)
      .where(eq(presentationCredentials.credentialHash, credentialHash));
  }
}
