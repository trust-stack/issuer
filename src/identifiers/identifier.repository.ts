import {and, eq} from "drizzle-orm";
import {db} from "../db";
import {
  cryptoKeys,
  identifiers,
  services as identifierServices,
} from "../db/schema/identifiers";
import type {AuthContext} from "../auth";
import {mapIdentifierRecordToDto} from "./identifier.mapper";
import type {IdentifierResponse} from "./identifier.dto";
import type {IIdentifier} from "@veramo/core";

const selectOrganizationFilter = (
  organizationId: string,
  did: string
) =>
  and(eq(identifiers.organizationId, organizationId), eq(identifiers.did, did));

const toAlias = (identifier: IIdentifier) => identifier.alias ?? identifier.did;

const mapServiceEndpoint = (endpoint: unknown): string[] => {
  if (Array.isArray(endpoint)) {
    return endpoint as string[];
  }
  if (endpoint === undefined || endpoint === null) {
    return [];
  }
  return [
    typeof endpoint === "string" ? endpoint : JSON.stringify(endpoint),
  ];
};

export const upsertIdentifierFromAgent = async (
  identifier: IIdentifier,
  auth: AuthContext
) => {
  const now = new Date().toISOString();
  const alias = toAlias(identifier);
  const organizationId = auth.organizationId;

  await db.transaction(async (tx) => {
    await tx
      .insert(identifiers)
      .values({
        did: identifier.did,
        alias,
        provider: identifier.provider ?? "did:web",
        controllerKeyId: identifier.controllerKeyId ?? null,
        organizationId,
        updatedAt: now,
      })
      .onConflictDoUpdate({
        target: identifiers.did,
        set: {
          alias,
          provider: identifier.provider ?? "did:web",
          controllerKeyId: identifier.controllerKeyId ?? null,
          updatedAt: now,
        },
      });

    await tx
      .delete(cryptoKeys)
      .where(eq(cryptoKeys.identifierDid, identifier.did));

    if (identifier.keys?.length) {
      await tx.insert(cryptoKeys).values(
        identifier.keys.map((key) => ({
          kid: key.kid,
          kms: key.kms ?? "local",
          type: key.type,
          publicKeyHex: key.publicKeyHex ?? "",
          privateKeyHex: key.privateKeyHex ?? null,
          meta: key.meta ?? null,
          identifierDid: identifier.did,
        }))
      );
    }

    await tx
      .delete(identifierServices)
      .where(eq(identifierServices.identifierDid, identifier.did));

    if (identifier.services?.length) {
      await tx.insert(identifierServices).values(
        identifier.services.map((service) => ({
          id: service.id,
          type: service.type,
          serviceEndpoint: mapServiceEndpoint(service.serviceEndpoint),
          description: service.description ?? null,
          identifierDid: identifier.did,
          tenantId: auth.tenantId ?? auth.organizationId,
        }))
      );
    }
  });
};

export const findIdentifierByDid = async (
  did: string,
  auth: AuthContext
): Promise<IdentifierResponse | null> => {
  const [identifier] = await db
    .select()
    .from(identifiers)
    .where(selectOrganizationFilter(auth.organizationId, did))
    .limit(1);

  if (!identifier) {
    return null;
  }

  const [keys, services] = await Promise.all([
    db
      .select()
      .from(cryptoKeys)
      .where(eq(cryptoKeys.identifierDid, identifier.did)),
    db
      .select()
      .from(identifierServices)
      .where(eq(identifierServices.identifierDid, identifier.did)),
  ]);

  return mapIdentifierRecordToDto(identifier, keys, services);
};

export const updateIdentifierRecord = async (
  did: string,
  updates: {alias?: string},
  auth: AuthContext
): Promise<void> => {
  const now = new Date().toISOString();

  await db
    .update(identifiers)
    .set({
      ...(updates.alias ? {alias: updates.alias} : {}),
      updatedAt: now,
    })
    .where(selectOrganizationFilter(auth.organizationId, did));
};

export type IdentifierRepository = {
  upsertIdentifierFromAgent: (
    identifier: IIdentifier,
    auth: AuthContext
  ) => Promise<void>;
  findIdentifierByDid: (
    did: string,
    auth: AuthContext
  ) => Promise<IdentifierResponse | null>;
  updateIdentifierRecord: (
    did: string,
    updates: {alias?: string},
    auth: AuthContext
  ) => Promise<void>;
};

export const defaultIdentifierRepository: IdentifierRepository = {
  upsertIdentifierFromAgent,
  findIdentifierByDid,
  updateIdentifierRecord,
};

let activeIdentifierRepository: IdentifierRepository = defaultIdentifierRepository;

export const setIdentifierRepository = (repository?: IdentifierRepository) => {
  activeIdentifierRepository = repository ?? defaultIdentifierRepository;
};

export const getIdentifierRepository = (): IdentifierRepository =>
  activeIdentifierRepository;
