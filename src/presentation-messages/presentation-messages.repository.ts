export interface PresentationMessagesRepository {
  findPresentationHashesByMessageId(messageId: string): Promise<string[]>;
}
