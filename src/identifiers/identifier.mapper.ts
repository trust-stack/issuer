import type {IIdentifier} from "@veramo/core";
import type {IdentifierResponse} from "./identifier.dto";
import {
  cryptoKeys,
  identifiers,
  services as identifierServices,
} from "../db/schema/identifiers";

export type IdentifierRow = typeof identifiers.$inferSelect;
export type IdentifierKeyRow = typeof cryptoKeys.$inferSelect;
export type IdentifierServiceRow = typeof identifierServices.$inferSelect;

const normalizeAlias = (alias: string | null | undefined) => {
  const trimmed = alias?.trim();
  return trimmed && trimmed.length > 0 ? trimmed : undefined;
};

export const mapIdentifierRecordToDto = (
  identifier: IdentifierRow,
  keys: IdentifierKeyRow[] = [],
  services: IdentifierServiceRow[] = []
): IdentifierResponse => ({
  did: identifier.did,
  provider: identifier.provider ?? undefined,
  controllerKeyId: identifier.controllerKeyId ?? undefined,
  alias: normalizeAlias(identifier.alias),
  keys: keys.map((key) => ({
    kid: key.kid,
    type: key.type ?? undefined,
    kms: key.kms ?? undefined,
    publicKeyHex: key.publicKeyHex ?? undefined,
    meta: key.meta ?? undefined,
  })),
  services: services.map((service) => ({
    id: service.id,
    type: service.type,
    serviceEndpoint: service.serviceEndpoint,
    description: service.description ?? undefined,
  })),
});

export const mapAgentIdentifierToDto = (
  identifier: IIdentifier
): IdentifierResponse => ({
  did: identifier.did,
  provider: identifier.provider ?? undefined,
  controllerKeyId: identifier.controllerKeyId ?? undefined,
  alias: normalizeAlias(identifier.alias),
  keys: identifier.keys?.map((key) => ({
    kid: key.kid,
    type: key.type,
    kms: key.kms,
    publicKeyHex: key.publicKeyHex,
    meta: key.meta,
  })) ?? [],
  services: identifier.services?.map((service) => ({
    id: service.id,
    type: service.type,
    serviceEndpoint: service.serviceEndpoint,
    description: service.description,
  })) ?? [],
});
