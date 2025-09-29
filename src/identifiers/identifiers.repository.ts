import { and, eq } from 'drizzle-orm';
import { db } from '../db';
import { identifiers } from '../db/schema';
import { getRequestContext } from '../request-context';
import { UpdateIdentifierDto } from './identifier.dto';
import { Identifier } from './identifiers.service';

type DbIdentifier = typeof identifiers.$inferSelect;

/**
 * Get an identifier by id
 * @param id - The id of the identifier
 * @returns The identifier
 */
export async function getIdentifierById(id: string): Promise<Identifier | null> {
  const { auth } = getRequestContext();

  const [result] = await db
    .select()
    .from(identifiers)
    .where(and(eq(identifiers.id, id), eq(identifiers.organizationId, auth.organizationId)));

  if (!result) return null;
  return toIdentifier(result);
}

/**
 * Get an identifier by did
 * @param did - The did of the identifier
 * @returns The identifier
 */
export async function getIdentifierByDid(did: string): Promise<Identifier | null> {
  const { auth } = getRequestContext();
  const [result] = await db
    .select()
    .from(identifiers)
    .where(and(eq(identifiers.did, did), eq(identifiers.organizationId, auth.organizationId)));
  if (!result) return null;
  return toIdentifier(result);
}

/**
 * Get an identifier by alias
 * @param alias - The alias of the identifier
 * @returns The identifier
 */
export async function getIdentifierByAlias(alias: string): Promise<Identifier | null> {
  const { auth } = getRequestContext();
  const [result] = await db
    .select()
    .from(identifiers)
    .where(and(eq(identifiers.alias, alias), eq(identifiers.organizationId, auth.organizationId)));
  if (!result) return null;
  return toIdentifier(result);
}

/**
 * Update an identifier
 * @param did - The did of the identifier
 * @param dto - The update identifier dto
 * @returns
 */
export async function updateIdentifier(
  did: string,
  dto: UpdateIdentifierDto,
): Promise<Identifier | null> {
  const { auth } = getRequestContext();
  const [result] = await db
    .update(identifiers)
    .set(dto)
    .where(and(eq(identifiers.did, did), eq(identifiers.organizationId, auth.organizationId)));
  if (!result) return null;
  return toIdentifier(result);
}

/**
 * Map a database identifier to an identifier
 * @param identifier - The identifier
 * @returns The identifier
 */
const toIdentifier = (identifier: DbIdentifier): Identifier => {
  return {
    id: identifier.id,
    did: identifier.did,
    alias: identifier.alias,
  };
};
