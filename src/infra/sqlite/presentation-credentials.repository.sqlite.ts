import { eq } from 'drizzle-orm';
import { presentationCredentials } from 'src/db/schema/links';
import { PresentationCredentialsRepository } from 'src/presentation-credentials';
import { SqliteDb } from './sqlite-drizzle';

export class PresentationCredentialsRepositorySqlite implements PresentationCredentialsRepository {
  constructor(private db: SqliteDb) {}

  async deleteByCredentialHash(credentialHash: string): Promise<void> {
    await this.db
      .delete(presentationCredentials)
      .where(eq(presentationCredentials.credentialHash, credentialHash));
  }
}
