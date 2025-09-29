import z from 'zod';
import { agent } from '../agent/agent';
import { CreateIdentifierDto, IdentifierDto, toIdentifierDto } from './identifier.dto';
import { getIdentifierByDid } from './identifiers.repository';

export const Identifier = z.object({
  id: z.string(),
  did: z.string(),
  alias: z.string(),
});

export type Identifier = z.infer<typeof Identifier>;

/**
 * Create a new identifier
 * @param dto - The identifier data
 * @returns
 */
export async function createIdentifier(dto: CreateIdentifierDto): Promise<IdentifierDto> {
  const identifier = await agent.didManagerCreate({
    alias: dto.alias,
  });

  return getIdentifierByDid(identifier.alias!).then((identifier) => {
    if (!identifier) throw new Error('Identifier not found');
    return toIdentifierDto(identifier);
  });
}
