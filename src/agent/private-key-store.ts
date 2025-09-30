import { AbstractPrivateKeyStore, ManagedPrivateKey } from '@veramo/key-manager';
import { PrivateKeyRepository } from 'src/private-key';
import { getRequestContext } from 'src/request-context';

export class PrivateKeyStore implements AbstractPrivateKeyStore {
  private repository: PrivateKeyRepository;

  constructor() {
    const { privateKeyRepository } = getRequestContext();
    this.repository = privateKeyRepository;
  }

  public async getKey(args: { alias: string }): Promise<ManagedPrivateKey> {
    return await this.repository.getPrivateKey(args);
  }

  public async deleteKey(args: { alias: string }): Promise<boolean> {
    await this.repository.deletePrivateKey(args);
    return true;
  }

  public async importKey(args: {
    alias?: string;
    privateKeyHex: string;
    type: string;
  }): Promise<ManagedPrivateKey> {
    return await this.repository.createPrivateKey(args);
  }

  public async listKeys(): Promise<ManagedPrivateKey[]> {
    return this.repository.listPrivateKeys();
  }
}
