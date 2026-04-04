import {
  IAgentPlugin,
  IDataStoreDeleteVerifiableCredentialArgs,
  IDataStoreGetMessageArgs,
  IDataStoreGetVerifiableCredentialArgs,
  IDataStoreGetVerifiablePresentationArgs,
  IDataStoreSaveMessageArgs,
  IDataStoreSaveVerifiablePresentationArgs,
  IMessage,
  VerifiableCredential,
  VerifiablePresentation,
} from '@veramo/core';
import { computeEntryHash, extractIssuer } from '@veramo/utils';
import type { CredentialInsert, CredentialsRepository } from 'src/credentials';
import type { MessageStoreRepository, MessageInsert, MessageRecord } from 'src/messages';
import { getRequestContext } from '../request-context';

export type SaveVerifiableCredentialArgs = {
  verifiableCredential: VerifiableCredential;
};

type DataStoreMethods = {
  dataStoreSaveMessage: (args: IDataStoreSaveMessageArgs) => Promise<string>;
  dataStoreGetMessage: (args: IDataStoreGetMessageArgs) => Promise<IMessage>;
  dataStoreSaveVerifiableCredential: (args: SaveVerifiableCredentialArgs) => Promise<string>;
  dataStoreGetVerifiableCredential: (
    args: IDataStoreGetVerifiableCredentialArgs,
  ) => Promise<VerifiableCredential>;
  dataStoreDeleteVerifiableCredential: (
    args: IDataStoreDeleteVerifiableCredentialArgs,
  ) => Promise<boolean>;
  dataStoreSaveVerifiablePresentation: (
    args: IDataStoreSaveVerifiablePresentationArgs,
  ) => Promise<string>;
  dataStoreGetVerifiablePresentation: (
    args: IDataStoreGetVerifiablePresentationArgs,
  ) => Promise<VerifiablePresentation>;
};

const ensureArray = <T>(value: T | T[] | undefined): T[] =>
  value === undefined ? [] : Array.isArray(value) ? value : [value];

const messageToRow = (message: IMessage): MessageInsert => ({
  id: message.id,
  type: message.type,
  raw: message.raw ?? null,
  data: (message.data as Record<string, unknown>) ?? null,
  // metaData: (message.metaData as unknown[] | undefined) ?? null,
  replyTo: message.replyTo ?? null,
  replyUrl: message.replyUrl ?? null,
  threadId: message.threadId ?? null,
  createdAt: message.createdAt ?? null,
  expiresAt: message.expiresAt ?? null,
  fromId: message.from ?? null,
  toId: message.to ?? null,
  returnRoute: message.returnRoute ?? null,
});

const rowToMessage = (row: MessageRecord, linkedCredentials: VerifiableCredential[]): IMessage => ({
  id: row.id,
  type: row.type,
  raw: row.raw ?? undefined,
  data: (row.data as Record<string, unknown> | null) ?? undefined,
  // metaData: (row.metaData as unknown[] | null) ?? undefined,
  replyTo: row.replyTo ?? undefined,
  replyUrl: row.replyUrl ?? undefined,
  threadId: row.threadId ?? undefined,
  createdAt: row.createdAt ?? undefined,
  expiresAt: row.expiresAt ?? undefined,
  from: row.fromId ?? undefined,
  to: row.toId ?? undefined,
  credentials: linkedCredentials,
  presentations: [],
});

/** Only DIDs are stored in credentials.subject_id (FK to identifiers). Product URIs etc. stay in the VC payload only. */
const credentialSubjectId = (credential: VerifiableCredential): string | undefined => {
  const subject = credential.credentialSubject;

  let id: string | undefined;
  if (Array.isArray(subject)) {
    const match = subject.find(
      (item): item is { id: string } => typeof item === 'object' && item !== null && 'id' in item,
    );
    id = match?.id;
  } else if (typeof subject === 'object' && subject && 'id' in subject) {
    id = subject.id as string;
  }

  if (typeof id === 'string' && id.startsWith('did:')) {
    return id;
  }
  return undefined;
};

const getTenantContext = () => {
  const { auth } = getRequestContext();
  return {
    tenantId: auth.tenantId ?? auth.organizationId,
    organizationId: auth.organizationId,
  };
};

const generateDeterministicId = () =>
  globalThis.crypto?.randomUUID?.() ?? `id_${Math.random().toString(36).slice(2)}`;

export class DataStore implements IAgentPlugin {
  readonly methods: DataStoreMethods;

  constructor() {
    this.methods = {
      dataStoreSaveMessage: this.dataStoreSaveMessage.bind(this),
      dataStoreGetMessage: this.dataStoreGetMessage.bind(this),
      dataStoreDeleteVerifiableCredential: this.dataStoreDeleteVerifiableCredential.bind(this),
      dataStoreSaveVerifiableCredential: this.dataStoreSaveVerifiableCredential.bind(this),
      dataStoreGetVerifiableCredential: this.dataStoreGetVerifiableCredential.bind(this),
      dataStoreSaveVerifiablePresentation: this.dataStoreSaveVerifiablePresentation.bind(this),
      dataStoreGetVerifiablePresentation: this.dataStoreGetVerifiablePresentation.bind(this),
    };
  }

  private async dataStoreSaveMessage({ message }: IDataStoreSaveMessageArgs): Promise<string> {
    const row = messageToRow(message);
    await this.getMessageStoreRepository().saveMessage(row);
    return message.id;
  }

  private async dataStoreGetMessage({ id }: IDataStoreGetMessageArgs): Promise<IMessage> {
    const messageStore = this.getMessageStoreRepository();
    const row = await messageStore.findMessageById(id);

    if (!row) throw new Error('Message not found.');

    const credentialHashes = await messageStore.findCredentialHashesByMessageId(row.id);

    const credentialRows = credentialHashes.length
      ? await this.getCredentialsRepository().findCredentialsByHashes(credentialHashes)
      : [];

    return rowToMessage(
      row,
      credentialRows.map((item) => item.raw as VerifiableCredential),
    );
  }

  private async dataStoreSaveVerifiableCredential({
    verifiableCredential,
  }: SaveVerifiableCredentialArgs): Promise<string> {
    const hash = computeEntryHash(verifiableCredential);
    const credentialId = verifiableCredential.id ?? generateDeterministicId();
    const { organizationId } = getTenantContext();

    const values: CredentialInsert = {
      hash,
      id: credentialId,
      organizationId,
      revocationList: null,
      revocationIndex: null,
      context: ensureArray(verifiableCredential['@context'] as unknown),
      issuanceDate: verifiableCredential.issuanceDate,
      expirationDate: verifiableCredential.expirationDate ?? null,
      raw: verifiableCredential as unknown,
      issuerId: extractIssuer(verifiableCredential) ?? null,
      subjectId: credentialSubjectId(verifiableCredential) ?? null,
      type: ensureArray(verifiableCredential.type),
    };
    try {
      await this.getCredentialsRepository().saveCredential(values);
    } catch (error: unknown) {
      // subjectId FK may reference an external DID not in local identifiers — retry without it
      if (error instanceof Error && error.message?.includes('FOREIGN KEY')) {
        values.subjectId = null;
        await this.getCredentialsRepository().saveCredential(values);
      } else {
        throw error;
      }
    }

    return hash;
  }

  private async dataStoreGetVerifiableCredential({
    hash,
  }: IDataStoreGetVerifiableCredentialArgs): Promise<VerifiableCredential> {
    const record = await this.getCredentialsRepository().findCredentialByHash(hash);

    if (!record) throw new Error('Verifiable credential not found.');

    return record.raw as VerifiableCredential;
  }

  private async dataStoreDeleteVerifiableCredential({
    hash,
  }: IDataStoreDeleteVerifiableCredentialArgs): Promise<boolean> {
    const credential = await this.getCredentialsRepository().findCredentialByHash(hash);

    if (!credential) return false;

    await this.getMessageStoreRepository().deleteByCredentialHash(hash);
    await this.getCredentialsRepository().deleteCredentialByHash(hash);

    return true;
  }

  // VP operations are not yet implemented — these satisfy the Veramo plugin interface
  private async dataStoreSaveVerifiablePresentation(
    _args: IDataStoreSaveVerifiablePresentationArgs,
  ): Promise<string> {
    throw new Error('dataStoreSaveVerifiablePresentation is not implemented');
  }

  private async dataStoreGetVerifiablePresentation(
    _args: IDataStoreGetVerifiablePresentationArgs,
  ): Promise<VerifiablePresentation> {
    throw new Error('dataStoreGetVerifiablePresentation is not implemented');
  }

  private getMessageStoreRepository(): MessageStoreRepository {
    const { messageStoreRepository } = getRequestContext();
    return messageStoreRepository;
  }

  private getCredentialsRepository(): CredentialsRepository {
    const { credentialsRepository } = getRequestContext();
    return credentialsRepository;
  }
}

export const createDataStore = () => new DataStore();
