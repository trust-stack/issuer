import { z } from '@hono/zod-openapi';

export const IssuerDidInputSchema = z
  .object({
    alias: z.string().optional().nullable(),
    did: z.string().optional().nullable(),
  })
  .optional();

export const CreateUntpCredentialSchema = z.object({
  issuerDid: IssuerDidInputSchema,
  credentialSubject: z.union([
    z.record(z.string(), z.any()),
    z.array(z.record(z.string(), z.any())),
  ]),
});

export type CreateUntpCredentialDto = z.infer<typeof CreateUntpCredentialSchema>;

export const UntpCredentialCreatedSchema = z.object({
  id: z.string(),
});

export const UntpValidationErrorSchema = z.object({
  message: z.string(),
  errors: z.array(z.string()),
});
