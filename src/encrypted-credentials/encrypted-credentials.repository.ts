import type { EncryptionAlgorithm } from 'src/db/schema/enums';

export type EncryptedCredentialUpsert = {
  credentialId: string;
  cipherText: string;
  iv: string;
  tag: string;
  key: string;
  algorithm: EncryptionAlgorithm;
};

export interface EncryptedCredentialsRepository {
  upsertEncryptedCredential(data: EncryptedCredentialUpsert): Promise<void>;
  deleteByCredentialId(credentialId: string): Promise<void>;
}
