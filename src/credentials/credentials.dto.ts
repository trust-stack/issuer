import { z } from '@hono/zod-openapi';

export const CreateCredentialSchema = z.object({
  issuerDid: z
    .object({
      alias: z.string(),
      did: z.string(),
    })
    .required(),
  credential: z.object({}).required(),
});
export type CreateCredentialDto = z.infer<typeof CreateCredentialSchema>;

export const CredentialSchema = z.object({
  id: z.string(),
});

export type CredentialDto = z.infer<typeof CredentialSchema>;
