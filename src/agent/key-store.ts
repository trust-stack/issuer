import { IKey, ManagedKeyInfo } from '@veramo/core';
import { AbstractKeyStore } from '@veramo/key-manager';
import { KeysRepository } from 'src/keys';
import { getRequestContext } from 'src/request-context';

export class KeyStore implements AbstractKeyStore {
  public async importKey(args: Partial<IKey>): Promise<boolean> {
    const repository = this.getRepository();
    await repository.saveKey(args);
    return true;
  }

  public async getKey(args: { kid: string }): Promise<IKey> {
    const repository = this.getRepository();
    const key = await repository.findKey(args.kid);
    if (!key) throw new Error('Key not found');
    return key;
  }

  public async deleteKey(args: { kid: string }): Promise<boolean> {
    const repository = this.getRepository();
    await repository.deleteKey(args.kid);
    return true;
  }

  public async listKeys(args: {}): Promise<Array<ManagedKeyInfo>> {
    const repository = this.getRepository();
    return repository.listKeys();
  }

  private getRepository(): KeysRepository {
    const { keysRepository } = getRequestContext();
    return keysRepository;
  }
}
