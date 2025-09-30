export interface PresentationVerifiersRepository {
  replaceVerifiers(presentationHash: string, verifierDids: string[]): Promise<void>;
}
