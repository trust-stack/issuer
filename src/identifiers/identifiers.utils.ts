import { getEnv } from 'src/env';
import { getRequestContext } from 'src/request-context';

/**
 * Construct a DID alias
 * @param alias - The alias to construct
 * @returns The constructed alias
 */
export const constructAlias = (alias: string) => {
  const context = getRequestContext();
  const env = getEnv();
  return `${env.WEB_DID_DOMAIN}:${context.auth.organizationId}:${alias}`;
};
