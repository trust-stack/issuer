export interface PresentationCredentialsRepository {
  deleteByCredentialHash(credentialHash: string): Promise<void>;
}
