import { z } from 'zod';
import {
  CreateIdentifierSchema,
  IdentifierHeadersSchema,
  IdentifierParamsSchema,
  IdentifierSchema,
  UpdateIdentifierSchema,
} from './identifier.schema';

export type CreateIdentifierDto = z.infer<typeof CreateIdentifierSchema>;
export type UpdateIdentifierDto = z.infer<typeof UpdateIdentifierSchema>;
export type IdentifierParams = z.infer<typeof IdentifierParamsSchema>;
export type IdentifierResponse = z.infer<typeof IdentifierSchema>;
export type IdentifierRequestHeaders = z.infer<typeof IdentifierHeadersSchema>;
