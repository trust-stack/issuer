import { ManagedPrivateKey } from '@veramo/key-manager';

export type CreatePrivateKeyArgs = {
  alias?: string;
  privateKeyHex: string;
  type: string;
};

export type DeletePrivateKeyArgs = {
  alias: string;
};

export type GetPrivateKeyArgs = {
  alias: string;
};

export interface PrivateKeyRepository {
  createPrivateKey(args: CreatePrivateKeyArgs): Promise<ManagedPrivateKey>;
  listPrivateKeys(): Promise<ManagedPrivateKey[]>;
  deletePrivateKey(args: DeletePrivateKeyArgs): Promise<void>;
  getPrivateKey(args: GetPrivateKeyArgs): Promise<ManagedPrivateKey>;
}
