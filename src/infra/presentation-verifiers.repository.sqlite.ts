import { eq } from 'drizzle-orm';
import { Database } from 'src/db';
import { getDb } from 'src/db/instance';
import { presentationVerifiers } from 'src/db/schema/links';
import { PresentationVerifiersRepository } from 'src/presentation-verifiers';

export class PresentationVerifiersRepositorySqlite implements PresentationVerifiersRepository {
  private readonly db: Database;

  constructor() {
    this.db = getDb();
  }

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
