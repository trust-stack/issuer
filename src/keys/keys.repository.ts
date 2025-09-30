import type { IKey, ManagedKeyInfo } from '@veramo/core';

export interface KeysRepository {
  saveKey(key: Partial<IKey>): Promise<void>;
  findKey(kid: string): Promise<IKey | null>;
  deleteKey(kid: string): Promise<void>;
  listKeys(): Promise<ManagedKeyInfo[]>;
}
