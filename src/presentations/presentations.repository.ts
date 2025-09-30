import type { InferInsertModel } from 'drizzle-orm';
import { presentations } from 'src/db/schema';

export type PresentationRecord = typeof presentations.$inferSelect;
export type PresentationInsert = InferInsertModel<typeof presentations>;

export interface PresentationsRepository {
  savePresentation(presentation: PresentationInsert): Promise<void>;
  findPresentationByHash(hash: string): Promise<PresentationRecord | null>;
  findPresentationsByHashes(hashes: string[]): Promise<PresentationRecord[]>;
}
