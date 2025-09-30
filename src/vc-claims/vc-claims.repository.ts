export interface VcClaimsRepository {
  deleteByCredentialHash(credentialHash: string): Promise<void>;
}
