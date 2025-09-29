import { z } from 'zod';
import { Identifier } from './identifiers.service';

export const CreateIdentifierSchema = z
  .object({
    alias: z
      .string()
      .min(1)
      .max(255)
      .openapi({ description: 'Friendly alias for the identifier' })
      .optional(),
  })
  .openapi({ description: 'Payload to create a new identifier' });
export type CreateIdentifierDto = z.infer<typeof CreateIdentifierSchema>;

export const UpdateIdentifierSchema = z
  .object({
    alias: z
      .string()
      .min(1)
      .max(255)
      .openapi({ description: 'Updated alias for the identifier' })
      .optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: 'At least one property must be provided',
    path: [],
  })
  .openapi({ description: 'Payload to update an identifier' });
export type UpdateIdentifierDto = z.infer<typeof UpdateIdentifierSchema>;

export const IdentifierSchema = z
  .object({
    id: z.string(),
    did: z.string(),
    provider: z.string().optional(),
    controllerKeyId: z.string().optional(),
    alias: z.string().optional(),
  })
  .openapi({ description: 'Identifier representation' });

export type IdentifierDto = z.infer<typeof IdentifierSchema>;

export const toIdentifierDto = (identifier: Identifier): IdentifierDto => {
  return {
    id: identifier.id,
    did: identifier.did,
    alias: identifier.alias,
  };
};
