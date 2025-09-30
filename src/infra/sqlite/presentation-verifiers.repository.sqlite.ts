import { eq } from 'drizzle-orm';
import { presentationVerifiers } from 'src/db/schema/links';
import { PresentationVerifiersRepository } from 'src/presentation-verifiers';
import { SqliteDb } from './sqlite-drizzle';

export class PresentationVerifiersRepositorySqlite implements PresentationVerifiersRepository {
  constructor(private db: SqliteDb) {}

  async replaceVerifiers(presentationHash: string, verifierDids: string[]): Promise<void> {
    await this.db
      .delete(presentationVerifiers)
      .where(eq(presentationVerifiers.presentationHash, presentationHash));

    if (!verifierDids.length) return;

    await this.db.insert(presentationVerifiers).values(
      verifierDids.map((did) => ({
        presentationHash,
        verifierDid: did,
      })),
    );
  }
}
