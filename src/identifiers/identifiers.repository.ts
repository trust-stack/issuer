import type { IIdentifier } from '@veramo/core';
import type { UpdateIdentifierDto } from './identifiers.dto';
import type { Identifier } from './identifiers.service';

export type IdentifierLookup = { id: string } | { did: string } | { alias: string };

export type IdentifierListFilter = {
  alias?: string;
  provider?: string;
};

export interface IdentifiersRepository {
  findIdentifier(lookup: IdentifierLookup): Promise<Identifier | null>;
  updateIdentifier(did: string, dto: UpdateIdentifierDto): Promise<Identifier | null>;
  saveIdentifierDetails(identifier: IIdentifier): Promise<void>;
  findIdentifierDetails(lookup: IdentifierLookup): Promise<IIdentifier | null>;
  deleteIdentifierByDid(did: string): Promise<void>;
  listIdentifierDetails(filter?: IdentifierListFilter): Promise<IIdentifier[]>;
}
