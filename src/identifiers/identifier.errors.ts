export class IdentifierNotFoundError extends Error {
  constructor(did: string) {
    super(`Identifier not found for DID ${did}`);
    this.name = "IdentifierNotFoundError";
  }
}
