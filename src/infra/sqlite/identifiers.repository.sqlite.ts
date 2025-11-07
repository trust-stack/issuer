import type { IIdentifier } from '@veramo/core';
import type { SQL } from 'drizzle-orm';
import { and, eq, InferSelectModel } from 'drizzle-orm';
import { cryptoKeys, identifiers, services as servicesTable } from 'src/db/schema/identifiers';
import type { UpdateIdentifierDto } from 'src/identifiers';
import { Identifier } from 'src/identifiers';
import {
  IdentifierListFilter,
  IdentifierLookup,
  IdentifiersRepository,
} from 'src/identifiers/identifiers.repository';
import { getRequestContext } from 'src/request-context';
import { SqliteDb } from './sqlite-drizzle';

type DbIdentifier = InferSelectModel<typeof identifiers>;
type DbCryptoKey = InferSelectModel<typeof cryptoKeys>;
type DbService = InferSelectModel<typeof servicesTable>;

export class IdentifiersRepositorySqlite implements IdentifiersRepository {
  constructor(private db: SqliteDb) {}

  async findIdentifier(lookup: IdentifierLookup): Promise<Identifier | null> {
    const { auth } = getRequestContext();

    const lookupPredicate =
      'id' in lookup
        ? eq(identifiers.id, lookup.id)
        : 'did' in lookup
          ? eq(identifiers.did, lookup.did)
          : eq(identifiers.alias, lookup.alias);

    const [result] = await this.db
      .select()
      .from(identifiers)
      .where(and(lookupPredicate, eq(identifiers.organizationId, auth.organizationId)));

    if (!result) return null;
    return this.toIdentifier(result);
  }

  async updateIdentifier(did: string, dto: UpdateIdentifierDto): Promise<Identifier | null> {
    const { auth } = getRequestContext();

    const [result] = await this.db
      .update(identifiers)
      .set(dto)
      .where(and(eq(identifiers.did, did), eq(identifiers.organizationId, auth.organizationId)));

    if (!result) return null;
    return this.toIdentifier(result);
  }

  async saveIdentifierDetails(identifier: IIdentifier): Promise<void> {
    const { auth } = getRequestContext();

    await this.db.insert(identifiers).values({
      did: identifier.did,
      controllerKeyId: identifier.controllerKeyId,
      provider: identifier.provider ?? 'did:web',
      alias: identifier.alias ?? '',
      organizationId: auth.organizationId,
    });

    for (const key of identifier.keys ?? []) {
      await this.db
        .insert(cryptoKeys)
        .values({
          kid: key.kid,
          publicKeyHex: key.publicKeyHex,
          kms: key.kms,
          meta: key.meta,
          type: key.type,
          privateKeyHex: key.privateKeyHex,
          identifierDid: identifier.did,
        })
        .onConflictDoUpdate({
          target: cryptoKeys.kid,
          set: {
            publicKeyHex: key.publicKeyHex,
            kms: key.kms,
            meta: key.meta,
            type: key.type,
            privateKeyHex: key.privateKeyHex,
            identifierDid: identifier.did,
          },
        });
    }

    for (const service of identifier.services ?? []) {
      const serviceEndpoints = Array.isArray(service.serviceEndpoint)
        ? service.serviceEndpoint.map((endpoint) =>
            typeof endpoint === 'string' ? endpoint : JSON.stringify(endpoint),
          )
        : [
            typeof service.serviceEndpoint === 'string'
              ? service.serviceEndpoint
              : JSON.stringify(service.serviceEndpoint),
          ];

      await this.db.insert(servicesTable).values({
        id: service.id,
        type: service.type,
        serviceEndpoint: serviceEndpoints,
        identifierDid: identifier.did,
        tenantId: auth.organizationId,
        description: service.description,
      });
    }
  }

  async findIdentifierDetails(lookup: IdentifierLookup): Promise<IIdentifier | null> {
    const { auth } = getRequestContext();

    const identifierPredicate =
      'id' in lookup
        ? eq(identifiers.id, lookup.id)
        : 'did' in lookup
          ? eq(identifiers.did, lookup.did)
          : eq(identifiers.alias, lookup.alias);

    const whereClause = and(
      identifierPredicate,
      eq(identifiers.organizationId, auth.organizationId),
    );

    const result = await this.db.query.identifiers.findFirst({
      where: whereClause,
      with: {
        cryptoKeys: true,
        services: true,
      },
    });

    if (!result) {
      return null;
    }

    return this.toIdentifierDetails(result);
  }

  async deleteIdentifierByDid(did: string): Promise<void> {
    const { auth } = getRequestContext();

    await this.db
      .delete(identifiers)
      .where(and(eq(identifiers.did, did), eq(identifiers.organizationId, auth.organizationId)));
  }

  async listIdentifierDetails(filter: IdentifierListFilter = {}): Promise<IIdentifier[]> {
    const { auth } = getRequestContext();

    const conditions = [eq(identifiers.organizationId, auth.organizationId)];

    if (filter.alias) {
      conditions.push(eq(identifiers.alias, filter.alias));
    }

    if (filter.provider) {
      conditions.push(eq(identifiers.provider, filter.provider));
    }

    const whereClause = conditions.reduce<SQL | undefined>((acc, condition) => {
      return acc ? and(acc, condition) : condition;
    }, undefined);

    if (!whereClause) {
      throw new Error('No conditions provided for identifier query');
    }

    const results = await this.db.query.identifiers.findMany({
      where: whereClause,
      with: {
        cryptoKeys: true,
        services: true,
      },
      offset: filter.offset,
      limit: filter.limit,
    });

    return results.map((result) => this.toIdentifierDetails(result));
  }

  async listIdentifiers(filter: IdentifierListFilter = {}): Promise<Identifier[]> {
    const { auth } = getRequestContext();

    const conditions = [eq(identifiers.organizationId, auth.organizationId)];

    if (filter.alias) {
      conditions.push(eq(identifiers.alias, filter.alias));
    }

    if (filter.provider) {
      conditions.push(eq(identifiers.provider, filter.provider));
    }

    const whereClause = conditions.reduce<SQL | undefined>((acc, condition) => {
      return acc ? and(acc, condition) : condition;
    }, undefined);

    if (!whereClause) {
      throw new Error('No conditions provided for identifier query');
    }

    const results = await this.db
      .select()
      .from(identifiers)
      .where(whereClause)
      .offset(filter.offset ?? 0)
      .limit(filter.limit ?? 100);

    return results.map((result) => this.toIdentifier(result));
  }

  private toIdentifier(identifier: DbIdentifier): Identifier {
    return {
      id: identifier.id,
      did: identifier.did,
      alias: identifier.alias,
    };
  }

  private toIdentifierDetails(
    result: DbIdentifier & {
      cryptoKeys: DbCryptoKey[];
      services: DbService[];
    },
  ): IIdentifier {
    return {
      did: result.did,
      provider: result.provider,
      alias: result.alias,
      controllerKeyId: result.controllerKeyId ?? undefined,
      services: result.services.map((service) => ({
        id: service.id,
        type: service.type,
        serviceEndpoint:
          service.serviceEndpoint.length === 1
            ? service.serviceEndpoint[0]
            : service.serviceEndpoint,
        description: service.description ?? undefined,
      })),
      keys: result.cryptoKeys.map((key) => ({
        kid: key.kid,
        kms: key.kms,
        type: key.type,
        publicKeyHex: key.publicKeyHex,
        privateKeyHex: key.privateKeyHex ?? undefined,
        meta: key.meta,
      })),
    };
  }
}
