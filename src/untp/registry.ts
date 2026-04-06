import ConformityAttestationSchema from './schemas/0.7.0/ConformityAttestation.json';
import FacilitySchema from './schemas/0.7.0/Facility.json';
import MakeEventSchema from './schemas/0.7.0/MakeEvent.json';
import ModifyEventSchema from './schemas/0.7.0/ModifyEvent.json';
import MoveEventSchema from './schemas/0.7.0/MoveEvent.json';
import ProductSchema from './schemas/0.7.0/Product.json';
import RegisteredIdentitySchema from './schemas/0.7.0/RegisteredIdentity.json';

export type CredentialTypeMeta = {
  /** URL path segment, e.g. 'dpp' */
  code: string;
  /** VC type array, e.g. ['DigitalProductPassport', 'VerifiableCredential'] */
  vcTypes: string[];
  /** Type tag to ensure in credentialSubject.type, e.g. 'Product' */
  subjectType: string;
  /** JSON Schema object(s) for credentialSubject validation. Array means union (DTE events). */
  subjectSchema: Record<string, unknown> | Record<string, unknown>[];
  /** Human-readable description for OpenAPI */
  description: string;
};

export type UntpVersionConfig = {
  version: string;
  contextUri: string;
  credentialTypes: CredentialTypeMeta[];
};

export const UNTP_VERSIONS: UntpVersionConfig[] = [
  {
    version: '0.7.0',
    contextUri: 'https://vocabulary.uncefact.org/untp/0.7.0/context/',
    credentialTypes: [
      {
        code: 'dpp',
        vcTypes: ['DigitalProductPassport', 'VerifiableCredential'],
        subjectType: 'Product',
        subjectSchema: ProductSchema,
        description: 'Digital Product Passport',
      },
      {
        code: 'dcc',
        vcTypes: ['DigitalConformityCredential', 'VerifiableCredential'],
        subjectType: 'ConformityAttestation',
        subjectSchema: ConformityAttestationSchema,
        description: 'Digital Conformity Credential',
      },
      {
        code: 'dte',
        vcTypes: ['DigitalTraceabilityEvent', 'VerifiableCredential'],
        subjectType: 'LifecycleEvent',
        subjectSchema: [MakeEventSchema, MoveEventSchema, ModifyEventSchema],
        description: 'Digital Traceability Event',
      },
      {
        code: 'dfr',
        vcTypes: ['DigitalFacilityRecord', 'VerifiableCredential'],
        subjectType: 'Facility',
        subjectSchema: FacilitySchema,
        description: 'Digital Facility Record',
      },
      {
        code: 'dia',
        vcTypes: ['DigitalIdentityAnchor', 'VerifiableCredential'],
        subjectType: 'RegisteredIdentity',
        subjectSchema: RegisteredIdentitySchema,
        description: 'Digital Identity Anchor',
      },
    ],
  },
];
