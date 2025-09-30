import type { IIdentifier } from '@veramo/core';
import { AbstractDIDStore } from '@veramo/did-manager';
import { IdentifierListFilter, IdentifierLookup } from 'src/identifiers/identifiers.repository';
import { getRequestContext } from 'src/request-context';

export class DidStore implements AbstractDIDStore {
  public async importDID(identifier: IIdentifier): Promise<boolean> {
    const { identifiersRepository } = getRequestContext();

    await identifiersRepository.saveIdentifierDetails(identifier);
    return true;
  }

  public async getDID(args: { did: string }): Promise<IIdentifier>;
  public async getDID(args: { alias: string }): Promise<IIdentifier>;
  public async getDID(query: IdentifierLookup): Promise<IIdentifier> {
    const { identifiersRepository } = getRequestContext();

    const identifier = await identifiersRepository.findIdentifierDetails(query);

    if (!identifier) {
      throw new Error('Identifier not found');
    }

    return identifier;
  }

  public async deleteDID({ did }: { did: string }): Promise<boolean> {
    const { identifiersRepository } = getRequestContext();

    await identifiersRepository.deleteIdentifierByDid(did);
    return true;
  }

  public async listDIDs(filter: IdentifierListFilter = {}): Promise<IIdentifier[]> {
    const { identifiersRepository } = getRequestContext();

    return identifiersRepository.listIdentifierDetails(filter);
  }
}
