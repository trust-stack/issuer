import { z } from '@hono/zod-openapi';

export const CreateCredentialSchema = z.object({
  issuerDid: z.object({
    alias: z.string().optional().nullable(),
    did: z.string().optional().nullable(),
  }),
  credential: z.record(z.string(), z.any()),
});
export type CreateCredentialDto = z.infer<typeof CreateCredentialSchema>;

export const CredentialSchema = z.object({
  id: z.string(),
});

export type CredentialDto = z.infer<typeof CredentialSchema>;
