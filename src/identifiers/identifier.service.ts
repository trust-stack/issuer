import {agent} from "../agent/agent";
import {getRequestContext} from "../request-context";
import {
  getIdentifierRepository,
} from "./identifier.repository";
import {
  CreateIdentifierDto,
  IdentifierResponse,
  UpdateIdentifierDto,
} from "./identifier.dto";
import {IdentifierNotFoundError} from "./identifier.errors";
import {mapAgentIdentifierToDto} from "./identifier.mapper";

/**
 * Create a new identifier
 * @param dto - The identifier data
 * @returns
 */
export async function createIdentifier(
  dto: CreateIdentifierDto
): Promise<IdentifierResponse> {
  const {auth} = getRequestContext();
  const repository = getIdentifierRepository();

  const identifier = await agent.didManagerCreate({
    alias: dto.alias,
  });

  await repository.upsertIdentifierFromAgent(identifier, auth);

  const stored = await repository.findIdentifierByDid(identifier.did, auth);

  return stored ?? mapAgentIdentifierToDto(identifier);
}

/**
 * Retrieve an identifier by DID
 */
export async function getIdentifier(did: string): Promise<IdentifierResponse> {
  const {auth} = getRequestContext();
  const repository = getIdentifierRepository();

  const identifier = await repository.findIdentifierByDid(did, auth);

  if (!identifier) {
    throw new IdentifierNotFoundError(did);
  }

  return identifier;
}

/**
 * Update identifier attributes
 */
export async function updateIdentifier(
  did: string,
  dto: UpdateIdentifierDto
): Promise<IdentifierResponse> {
  const {auth} = getRequestContext();
  const repository = getIdentifierRepository();

  if (dto.alias !== undefined) {
    await agent.didManagerSetAlias({
      did,
      alias: dto.alias,
    });

    await repository.updateIdentifierRecord(did, {alias: dto.alias}, auth);
  }

  const updated = await repository.findIdentifierByDid(did, auth);

  if (!updated) {
    throw new IdentifierNotFoundError(did);
  }

  return updated;
}
