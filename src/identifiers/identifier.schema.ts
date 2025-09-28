import {z} from "@hono/zod-openapi";

export const IdentifierParamsSchema = z.object({
  did: z
    .string()
    .openapi({
      description: "Decentralized identifier (did:web, did:key, etc)",
    }),
});

export const CreateIdentifierSchema = z
  .object({
    alias: z
      .string()
      .min(1)
      .max(255)
      .openapi({ description: "Friendly alias for the identifier" })
      .optional(),
  })
  .openapi({ description: "Payload to create a new identifier" });

export const UpdateIdentifierSchema = z
  .object({
    alias: z
      .string()
      .min(1)
      .max(255)
      .openapi({ description: "Updated alias for the identifier" })
      .optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one property must be provided",
    path: [],
  })
  .openapi({ description: "Payload to update an identifier" });

const IdentifierKeySchema = z
  .object({
    kid: z.string().openapi({ description: "Key identifier" }),
    type: z.string().optional(),
    kms: z.string().optional(),
    publicKeyHex: z.string().optional(),
    meta: z.unknown().optional(),
  })
  .passthrough()
  .openapi({ description: "Key material associated with the identifier" });

const IdentifierServiceSchema = z
  .object({
    id: z.string(),
    type: z.string(),
    serviceEndpoint: z.unknown(),
    description: z.string().optional(),
  })
  .passthrough()
  .openapi({ description: "DID service entry" });

export const IdentifierSchema = z
  .object({
    did: z.string(),
    provider: z.string().optional(),
    controllerKeyId: z.string().optional(),
    alias: z.string().optional(),
    keys: z.array(IdentifierKeySchema).default([]),
    services: z.array(IdentifierServiceSchema).default([]),
  })
  .passthrough()
  .openapi({ description: "Identifier representation" });
