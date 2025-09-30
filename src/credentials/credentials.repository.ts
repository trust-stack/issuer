import type { InferInsertModel } from 'drizzle-orm';
import { credentials } from 'src/db/schema';

export type CredentialRecord = typeof credentials.$inferSelect;
export type CredentialInsert = InferInsertModel<typeof credentials>;

export interface CredentialsRepository {
  saveCredential(credential: CredentialInsert): Promise<void>;
  findCredentialByHash(hash: string): Promise<CredentialRecord | null>;
  findCredentialsByHashes(hashes: string[]): Promise<CredentialRecord[]>;
  deleteCredentialByHash(hash: string): Promise<void>;
}
