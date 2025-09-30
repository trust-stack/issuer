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
import type { EncryptedCredentialsRepository } from 'src/encrypted-credentials';
import type { MessagesRepository, MessageInsert, MessageRecord } from 'src/messages';
import type { PresentationCredentialsRepository } from 'src/presentation-credentials';
import type { CredentialMessagesRepository } from 'src/credential-messages';
import type { PresentationMessagesRepository } from 'src/presentation-messages';
import type { PresentationVerifiersRepository } from 'src/presentation-verifiers';
import type { PresentationInsert, PresentationsRepository } from 'src/presentations';
import type { VcClaimsRepository } from 'src/vc-claims';
import { getRequestContext } from '../request-context';
import { encryptString } from './encryption';

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

const rowToMessage = (
  row: MessageRecord,
  linkedCredentials: VerifiableCredential[],
  linkedPresentations: VerifiablePresentation[],
): IMessage => ({
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
  presentations: linkedPresentations,
});

const credentialSubjectId = (credential: VerifiableCredential): string | undefined => {
  const subject = credential.credentialSubject;

  if (Array.isArray(subject)) {
    const match = subject.find(
      (item): item is { id: string } => typeof item === 'object' && item !== null && 'id' in item,
    );
    return match?.id;
  }

  if (typeof subject === 'object' && subject && 'id' in subject) {
    return subject.id as string;
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
    await this.getMessagesRepository().saveMessage(row);

    return message.id;
  }

  private async dataStoreGetMessage({ id }: IDataStoreGetMessageArgs): Promise<IMessage> {
    const row = await this.getMessagesRepository().findMessageById(id);

    if (!row) throw new Error('Message not found.');

    const credentialHashes =
      await this.getCredentialMessagesRepository().findCredentialHashesByMessageId(row.id);

    const presentationHashes =
      await this.getPresentationMessagesRepository().findPresentationHashesByMessageId(row.id);

    const credentialRows = credentialHashes.length
      ? await this.getCredentialsRepository().findCredentialsByHashes(credentialHashes)
      : [];

    const presentationRows = presentationHashes.length
      ? await this.getPresentationsRepository().findPresentationsByHashes(presentationHashes)
      : [];

    return rowToMessage(
      row,
      credentialRows.map((item) => item.raw as VerifiableCredential),
      presentationRows.map((item) => item.raw as VerifiablePresentation),
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
    await this.getCredentialsRepository().saveCredential(values);

    const encrypted = encryptString(JSON.stringify(verifiableCredential));
    await this.getEncryptedCredentialsRepository().upsertEncryptedCredential({
      credentialId,
      cipherText: encrypted.cipherText,
      iv: encrypted.iv,
      tag: encrypted.tag,
      key: encrypted.key,
      algorithm: 'AES_GCM',
    });

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

    await this.getVcClaimsRepository().deleteByCredentialHash(hash);
    await this.getCredentialMessagesRepository().deleteByCredentialHash(hash);
    await this.getPresentationCredentialsRepository().deleteByCredentialHash(hash);
    await this.getEncryptedCredentialsRepository().deleteByCredentialId(credential.id);
    await this.getCredentialsRepository().deleteCredentialByHash(hash);

    return true;
  }

  private async dataStoreSaveVerifiablePresentation({
    verifiablePresentation,
  }: IDataStoreSaveVerifiablePresentationArgs): Promise<string> {
    if (typeof verifiablePresentation.holder !== 'string') {
      throw new Error('verifiablePresentation.holder must be a DID string');
    }

    const hash = computeEntryHash(verifiablePresentation);
    const { tenantId } = getTenantContext();
    const holderDid = verifiablePresentation.holder;

    const values: PresentationInsert = {
      hash,
      tenantId,
      raw: verifiablePresentation as unknown,
      holderId: holderDid,
      id: verifiablePresentation.id ?? null,
      context: ensureArray(verifiablePresentation['@context'] as unknown),
      type: ensureArray(verifiablePresentation.type),
      issuanceDate: verifiablePresentation.issuanceDate ?? '',
      expirationDate: verifiablePresentation.expirationDate ?? null,
    };
    await this.getPresentationsRepository().savePresentation(values);

    const verifiers = ensureArray(verifiablePresentation.verifier).filter(
      (item): item is string => typeof item === 'string',
    );

    await this.getPresentationVerifiersRepository().replaceVerifiers(hash, verifiers);

    return hash;
  }

  private async dataStoreGetVerifiablePresentation({
    hash,
  }: IDataStoreGetVerifiablePresentationArgs): Promise<VerifiablePresentation> {
    const record = await this.getPresentationsRepository().findPresentationByHash(hash);

    if (!record) throw new Error('Verifiable presentation not found.');

    return record.raw as VerifiablePresentation;
  }

  private getMessagesRepository(): MessagesRepository {
    const { messagesRepository } = getRequestContext();
    return messagesRepository;
  }

  private getCredentialMessagesRepository(): CredentialMessagesRepository {
    const { credentialMessagesRepository } = getRequestContext();
    return credentialMessagesRepository;
  }

  private getCredentialsRepository(): CredentialsRepository {
    const { credentialsRepository } = getRequestContext();
    return credentialsRepository;
  }

  private getEncryptedCredentialsRepository(): EncryptedCredentialsRepository {
    const { encryptedCredentialsRepository } = getRequestContext();
    return encryptedCredentialsRepository;
  }

  private getPresentationCredentialsRepository(): PresentationCredentialsRepository {
    const { presentationCredentialsRepository } = getRequestContext();
    return presentationCredentialsRepository;
  }

  private getPresentationMessagesRepository(): PresentationMessagesRepository {
    const { presentationMessagesRepository } = getRequestContext();
    return presentationMessagesRepository;
  }

  private getPresentationVerifiersRepository(): PresentationVerifiersRepository {
    const { presentationVerifiersRepository } = getRequestContext();
    return presentationVerifiersRepository;
  }

  private getPresentationsRepository(): PresentationsRepository {
    const { presentationsRepository } = getRequestContext();
    return presentationsRepository;
  }

  private getVcClaimsRepository(): VcClaimsRepository {
    const { vcClaimsRepository } = getRequestContext();
    return vcClaimsRepository;
  }
}

export const createDataStore = () => new DataStore();
