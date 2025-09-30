export interface CredentialMessagesRepository {
  findCredentialHashesByMessageId(messageId: string): Promise<string[]>;
  deleteByCredentialHash(credentialHash: string): Promise<void>;
}
