import { and, eq, inArray } from 'drizzle-orm';
import { presentations } from 'src/db/schema/presentations';
import {
  PresentationInsert,
  PresentationRecord,
  PresentationsRepository,
} from 'src/presentations/presentations.repository';
import { getRequestContext } from 'src/request-context';
import { SqliteDb } from './sqlite-drizzle';

export class PresentationsRepositorySqlite implements PresentationsRepository {
  constructor(private db: SqliteDb) {}

  async savePresentation(presentation: PresentationInsert): Promise<void> {
    const { auth } = getRequestContext();

    const values: PresentationInsert = {
      ...presentation,
      tenantId: auth.tenantId ?? auth.organizationId,
    };

    const { hash, ...update } = values;

    await this.db.insert(presentations).values(values).onConflictDoUpdate({
      target: presentations.hash,
      set: update,
    });
  }

  async findPresentationByHash(hash: string): Promise<PresentationRecord | null> {
    const { auth } = getRequestContext();

    const [result] = await this.db
      .select()
      .from(presentations)
      .where(
        and(
          eq(presentations.hash, hash),
          eq(presentations.tenantId, auth.tenantId ?? auth.organizationId),
        ),
      )
      .limit(1);

    return result ?? null;
  }

  async findPresentationsByHashes(hashes: string[]): Promise<PresentationRecord[]> {
    if (!hashes.length) return [];

    const { auth } = getRequestContext();

    return this.db
      .select()
      .from(presentations)
      .where(
        and(
          inArray(presentations.hash, hashes),
          eq(presentations.tenantId, auth.tenantId ?? auth.organizationId),
        ),
      );
  }
}
