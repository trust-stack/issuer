/* eslint-disable */
/**
 * UNTP 0.7.0 types generated from JSON Schema. Do not edit by hand.
 * Source: src/untp/schemas/0.7.0/RegisteredIdentity.json
 * Regenerate: pnpm run generate:untp-types
 */

/**
 * The identity anchor is a mapping between a registry member identity and one or more decentralised identifiers owned by the member. It may also list a set of membership scopes.
 */
export interface RegisteredIdentity {
  type?: {
    [k: string]: unknown;
  } & string[];
  /**
   * The DID that is controlled by the registered member and is linked to the registeredID through this Identity Anchor credential
   */
  id: string;
  /**
   * The registered name of the entity within the identifier scheme.  Examples: product - EV battery 300Ah, Party - Sample Company Pty Ltd,  Facility - Green Acres battery factory
   */
  registeredName: string;
  /**
   * The registration number (alphanumeric) of the entity within the register. Unique within the register.
   */
  registeredId: string;
  /**
   * The date on which this identity was first registered with the registrar.
   */
  registeredDate: string;
  /**
   * A link to further information about the registered entity on the authoritative registrar site.
   */
  publicInformation?: string;
  idScheme: IdentifierScheme;
  /**
   * The registrar party that operates the register.
   */
  registrar?: {
    type?: {
      [k: string]: unknown;
    } & string[];
    /**
     * Globally unique identifier of this party. Typically represented as a URI identifierScheme/Identifier URI
     */
    id: string;
    /**
     * Legal registered name of this party.
     */
    name: string;
    [k: string]: unknown;
  };
  /**
   * The thematic purpose of the register - organisations, facilities, products, trademarks, etc
   */
  registerType: 'product' | 'facility' | 'business' | 'trademark' | 'land' | 'accreditation';
  /**
   * List of URIs that represent the roles or scopes of membership. For example ["https://abr.business.gov.au/Help/EntityTypeDescription?Id=19"]
   */
  registrationScope?: string[];
  [k: string]: unknown;
}
/**
 * The identifier scheme operated by the registrar
 */
export interface IdentifierScheme {
  type?: {
    [k: string]: unknown;
  } & string[];
  /**
   * The URI of this identifier scheme
   */
  id: string;
  /**
   * The name of the identifier scheme.
   */
  name: string;
}
