import { getRequestContext } from 'src/request-context';
import { uuid } from 'src/utils';
import z from 'zod';
import { getAgent } from '../agent';
import { CreateIdentifierDto, IdentifierDto, toIdentifierDto } from './identifiers.dto';
import { constructAlias } from './identifiers.utils';

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
  const agent = getAgent();
  const { identifiersRepository } = getRequestContext();
  const alias = constructAlias(dto.alias || uuid());

  const identifier = await agent.didManagerCreate({
    alias,
    provider: 'did:web',
  });

  return identifiersRepository.findIdentifier({ alias: identifier.alias! }).then((identifier) => {
    if (!identifier) throw new Error('Identifier not found');
    return toIdentifierDto(identifier);
  });
}
