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
} from "@veramo/core";
import {computeEntryHash, extractIssuer} from "@veramo/utils";
import type {InferInsertModel} from "drizzle-orm";
import {eq, inArray} from "drizzle-orm";
import {Database} from "../db";
import {
  credentialMessages,
  credentials,
  encryptedCredentials,
  messages,
  presentationCredentials,
  presentationMessages,
  presentationVerifiers,
  presentations,
  vcClaims,
} from "../db/schema";
import {getRequestContext} from "../request-context";
import {encryptString} from "./encryption";

export type SaveVerifiableCredentialArgs = {
  verifiableCredential: VerifiableCredential;
};

type MessageRow = typeof messages.$inferSelect;

type DataStoreMethods = {
  dataStoreSaveMessage: (args: IDataStoreSaveMessageArgs) => Promise<string>;
  dataStoreGetMessage: (args: IDataStoreGetMessageArgs) => Promise<IMessage>;
  dataStoreSaveVerifiableCredential: (
    args: SaveVerifiableCredentialArgs
  ) => Promise<string>;
  dataStoreGetVerifiableCredential: (
    args: IDataStoreGetVerifiableCredentialArgs
  ) => Promise<VerifiableCredential>;
  dataStoreDeleteVerifiableCredential: (
    args: IDataStoreDeleteVerifiableCredentialArgs
  ) => Promise<boolean>;
  dataStoreSaveVerifiablePresentation: (
    args: IDataStoreSaveVerifiablePresentationArgs
  ) => Promise<string>;
  dataStoreGetVerifiablePresentation: (
    args: IDataStoreGetVerifiablePresentationArgs
  ) => Promise<VerifiablePresentation>;
};

const ensureArray = <T>(value: T | T[] | undefined): T[] =>
  value === undefined ? [] : Array.isArray(value) ? value : [value];

const first = <T>(rows: T[]): T | undefined => rows[0];

const messageToRow = (
  message: IMessage
): InferInsertModel<typeof messages> => ({
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
  row: MessageRow,
  linkedCredentials: VerifiableCredential[],
  linkedPresentations: VerifiablePresentation[]
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

const credentialSubjectId = (
  credential: VerifiableCredential
): string | undefined => {
  const subject = credential.credentialSubject;

  if (Array.isArray(subject)) {
    const match = subject.find(
      (item): item is {id: string} =>
        typeof item === "object" && item !== null && "id" in item
    );
    return match?.id;
  }

  if (typeof subject === "object" && subject && "id" in subject) {
    return subject.id as string;
  }

  return undefined;
};

const getTenantContext = () => {
  const {auth} = getRequestContext();
  return {
    tenantId: auth.tenantId ?? auth.organizationId,
    organizationId: auth.organizationId,
  };
};

const generateDeterministicId = () =>
  globalThis.crypto?.randomUUID?.() ??
  `id_${Math.random().toString(36).slice(2)}`;

export class DataStore implements IAgentPlugin {
  readonly methods: DataStoreMethods;

  constructor(private readonly db: Database) {
    this.methods = {
      dataStoreSaveMessage: this.dataStoreSaveMessage.bind(this),
      dataStoreGetMessage: this.dataStoreGetMessage.bind(this),
      dataStoreDeleteVerifiableCredential:
        this.dataStoreDeleteVerifiableCredential.bind(this),
      dataStoreSaveVerifiableCredential:
        this.dataStoreSaveVerifiableCredential.bind(this),
      dataStoreGetVerifiableCredential:
        this.dataStoreGetVerifiableCredential.bind(this),
      dataStoreSaveVerifiablePresentation:
        this.dataStoreSaveVerifiablePresentation.bind(this),
      dataStoreGetVerifiablePresentation:
        this.dataStoreGetVerifiablePresentation.bind(this),
    };
  }

  private async dataStoreSaveMessage({
    message,
  }: IDataStoreSaveMessageArgs): Promise<string> {
    const row = messageToRow(message);
    const {id: _messageId, ...update} = row;

    await this.db.insert(messages).values(row).onConflictDoUpdate({
      target: messages.id,
      set: update,
    });

    return message.id;
  }

  private async dataStoreGetMessage({
    id,
  }: IDataStoreGetMessageArgs): Promise<IMessage> {
    const row = first(
      await this.db.select().from(messages).where(eq(messages.id, id)).limit(1)
    );

    if (!row) throw new Error("Message not found.");

    const credentialHashes = await this.db
      .select({hash: credentialMessages.credentialHash})
      .from(credentialMessages)
      .where(eq(credentialMessages.messageId, row.id));

    const presentationHashes = await this.db
      .select({hash: presentationMessages.presentationHash})
      .from(presentationMessages)
      .where(eq(presentationMessages.messageId, row.id));

    const credentialsList = credentialHashes.length
      ? await this.db
          .select({raw: credentials.raw})
          .from(credentials)
          .where(
            inArray(
              credentials.hash,
              credentialHashes.map((c) => c.hash)
            )
          )
      : [];

    const presentationsList = presentationHashes.length
      ? await this.db
          .select({raw: presentations.raw})
          .from(presentations)
          .where(
            inArray(
              presentations.hash,
              presentationHashes.map((p) => p.hash)
            )
          )
      : [];

    return rowToMessage(
      row,
      credentialsList.map((item) => item.raw as VerifiableCredential),
      presentationsList.map((item) => item.raw as VerifiablePresentation)
    );
  }

  private async dataStoreSaveVerifiableCredential({
    verifiableCredential,
  }: SaveVerifiableCredentialArgs): Promise<string> {
    const hash = computeEntryHash(verifiableCredential);
    const credentialId = verifiableCredential.id ?? generateDeterministicId();
    const {tenantId, organizationId} = getTenantContext();

    const values: InferInsertModel<typeof credentials> = {
      hash,
      id: credentialId,
      organizationId,
      revocationList: null,
      revocationIndex: null,
      context: ensureArray(verifiableCredential["@context"] as unknown),
      issuanceDate: verifiableCredential.issuanceDate,
      expirationDate: verifiableCredential.expirationDate ?? null,
      raw: verifiableCredential as unknown,
      issuerId: extractIssuer(verifiableCredential) ?? null,
      subjectId: credentialSubjectId(verifiableCredential) ?? null,
      type: ensureArray(verifiableCredential.type),
    };
    const {hash: _hash, ...update} = values;

    await this.db.insert(credentials).values(values).onConflictDoUpdate({
      target: credentials.hash,
      set: update,
    });

    const encrypted = encryptString(JSON.stringify(verifiableCredential));

    await this.db
      .insert(encryptedCredentials)
      .values({
        credentialId,
        cipherText: encrypted.cipherText,
        iv: encrypted.iv,
        tag: encrypted.tag,
        key: encrypted.key,
        algorithm: "AES_GCM",
      })
      .onConflictDoUpdate({
        target: encryptedCredentials.credentialId,
        set: {
          cipherText: encrypted.cipherText,
          iv: encrypted.iv,
          tag: encrypted.tag,
          key: encrypted.key,
          algorithm: "AES_GCM",
        },
      });

    return hash;
  }

  private async dataStoreGetVerifiableCredential({
    hash,
  }: IDataStoreGetVerifiableCredentialArgs): Promise<VerifiableCredential> {
    const record = first(
      await this.db
        .select({raw: credentials.raw})
        .from(credentials)
        .where(eq(credentials.hash, hash))
        .limit(1)
    );

    if (!record) throw new Error("Verifiable credential not found.");

    return record.raw as VerifiableCredential;
  }

  private async dataStoreDeleteVerifiableCredential({
    hash,
  }: IDataStoreDeleteVerifiableCredentialArgs): Promise<boolean> {
    return this.db.transaction(async (tx) => {
      const credential = first(
        await tx
          .select({id: credentials.id})
          .from(credentials)
          .where(eq(credentials.hash, hash))
          .limit(1)
      );

      if (!credential) return false;

      await tx.delete(vcClaims).where(eq(vcClaims.credentialId, hash));
      await tx
        .delete(credentialMessages)
        .where(eq(credentialMessages.credentialHash, hash));
      await tx
        .delete(presentationCredentials)
        .where(eq(presentationCredentials.credentialHash, hash));
      await tx
        .delete(encryptedCredentials)
        .where(eq(encryptedCredentials.credentialId, credential.id));
      await tx.delete(credentials).where(eq(credentials.hash, hash));

      return true;
    });
  }

  private async dataStoreSaveVerifiablePresentation({
    verifiablePresentation,
  }: IDataStoreSaveVerifiablePresentationArgs): Promise<string> {
    if (typeof verifiablePresentation.holder !== "string") {
      throw new Error("verifiablePresentation.holder must be a DID string");
    }

    const hash = computeEntryHash(verifiablePresentation);
    const {tenantId} = getTenantContext();
    const holderDid = verifiablePresentation.holder;

    const values: InferInsertModel<typeof presentations> = {
      hash,
      tenantId,
      raw: verifiablePresentation as unknown,
      holderId: holderDid,
      id: verifiablePresentation.id ?? null,
      context: ensureArray(verifiablePresentation["@context"] as unknown),
      type: ensureArray(verifiablePresentation.type),
      issuanceDate: verifiablePresentation.issuanceDate ?? "",
      expirationDate: verifiablePresentation.expirationDate ?? null,
    };
    const {hash: _presentationHash, ...update} = values;

    await this.db.insert(presentations).values(values).onConflictDoUpdate({
      target: presentations.hash,
      set: update,
    });

    await this.db
      .delete(presentationVerifiers)
      .where(eq(presentationVerifiers.presentationHash, hash));

    const verifiers = ensureArray(verifiablePresentation.verifier).filter(
      (item): item is string => typeof item === "string"
    );

    if (verifiers.length) {
      await this.db.insert(presentationVerifiers).values(
        verifiers.map((did) => ({
          presentationHash: hash,
          verifierDid: did,
        }))
      );
    }

    return hash;
  }

  private async dataStoreGetVerifiablePresentation({
    hash,
  }: IDataStoreGetVerifiablePresentationArgs): Promise<VerifiablePresentation> {
    const record = first(
      await this.db
        .select({raw: presentations.raw})
        .from(presentations)
        .where(eq(presentations.hash, hash))
        .limit(1)
    );

    if (!record) throw new Error("Verifiable presentation not found.");

    return record.raw as VerifiablePresentation;
  }
}

export const createDataStore = (db: Database) => new DataStore(db);
