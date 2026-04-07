// @ts-nocheck
import { fullFormats } from 'ajv-formats/dist/formats.js';
export const validate = validate20;
export default validate20;
const schema31 = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  additionalProperties: false,
  properties: {
    type: {
      type: 'array',
      readOnly: true,
      default: ['ConformityAttestation'],
      items: { type: 'string' },
      allOf: [{ contains: { const: 'ConformityAttestation', minContains: 1 } }],
    },
    id: {
      example: 'https://sample-cab.com/attestation/LR-98765',
      type: 'string',
      format: 'uri',
      description:
        'Globally unique identifier of this attestation. Typically represented as a URI AssessmentBody/CertificateID URI or a UUID',
    },
    name: {
      example: 'Forced Labour Facility Certificate',
      type: 'string',
      description: 'Name of this attestation - typically the title of the certificate.',
    },
    description: { type: 'string', description: 'Description of this attestation.' },
    assessorLevel: {
      type: 'string',
      enum: ['self', 'commercial', 'buyer', 'membership', 'unspecified', '3rdParty', 'hybrid'],
      example: 'self',
      description:
        'Assurance code pertaining to assessor (relation to the object under assessment)',
    },
    assessmentLevel: {
      type: 'string',
      enum: [
        'authority-benchmark',
        'authority-mandate',
        'authority-globalmra',
        'authority-peer',
        'authority-extended-mra',
        'scheme-self',
        'scheme-cab',
        'no-endorsement',
      ],
      example: 'authority-benchmark',
      description:
        'Assurance pertaining to assessment (any authority or support for the assessment process)',
    },
    attestationType: {
      type: 'string',
      enum: [
        'certification',
        'declaration',
        'inspection',
        'testing',
        'verification',
        'validation',
        'calibration',
      ],
      example: 'certification',
      description: 'The type of criterion (optional or mandatory).',
    },
    issuedToParty: {
      type: 'object',
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['Party'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'Party', minContains: 1 } }],
        },
        id: {
          example: 'https://sample-business-register.gov/123456789',
          type: 'string',
          format: 'uri',
          description:
            'Globally unique identifier of this party. Typically represented as a URI identifierScheme/Identifier URI',
        },
        name: {
          example: 'Sample Company Ltd',
          type: 'string',
          description: 'Legal registered name of this party.',
        },
        registeredId: {
          example: 90664869327,
          type: 'string',
          description:
            'The registration number (alphanumeric) of the Party within the register. Unique within the register.',
        },
        description: {
          type: 'string',
          description: 'Description of the party including function and other names.',
        },
      },
      required: ['id', 'name'],
      description: 'The party to whom the conformity attestation was issued.',
    },
    authorisation: {
      type: 'array',
      items: { $ref: '#/$defs/Endorsement' },
      description:
        'The authority under which a conformity claim is issued.  For example a national accreditation authority may authorise a test lab to issue test certificates about a product against a standard.  ',
    },
    referenceScheme: {
      type: 'object',
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['ConformityScheme'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'ConformityScheme', minContains: 1 } }],
        },
        id: {
          example: 'https://sample-scheme.org/lrap',
          type: 'string',
          format: 'uri',
          description:
            'Globally unique identifier of this conformity scheme. Typically represented as a URI SchemeOwner/SchemeName URI',
        },
        name: {
          example: 'Labour rights assessment program',
          type: 'string',
          description: 'Name of this scheme as defined by the scheme owner.',
        },
      },
      required: ['id', 'name'],
      description: 'The conformity scheme under which this attestation is made.',
    },
    referenceProfile: {
      type: 'object',
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['ConformityProfile'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'ConformityProfile', minContains: 1 } }],
        },
        id: {
          example: 'https://vocabulary.sample-scheme.org/profile/lrap/v1.0',
          type: 'string',
          format: 'uri',
          description:
            'Globally unique identifier of this context specific conformity profile. Typically represented as a URI SchemeOwner/profileID URI',
        },
        name: {
          example: 'Forced labour assessment criterion',
          type: 'string',
          description: 'Name of this conformity profile as defined by the scheme owner.',
        },
      },
      required: ['id', 'name'],
      description:
        'The specific versioned conformity profile (comprising a set of versioned criteria) against which this conformity attestation is made.',
    },
    profileScore: {
      $ref: '#/$defs/Score',
      description:
        'The overall performance against a scheme level performance measurement framework for the referenced profile or scheme.',
    },
    conformityCertificate: {
      $ref: '#/$defs/Link',
      description:
        'A reference to the human / printable version of this conformity attestation - typically represented as a PDF document. The document may have more details than are represented in the digital attestation.',
    },
    auditableEvidence: {
      $ref: '#/$defs/Link',
      description:
        'Auditable evidence supporting this assessment such as raw measurements, supporting documents. This is usually private data and would normally be encrypted.',
    },
    trustmark: {
      $ref: '#/$defs/Image',
      description:
        'A trust mark as a small binary image encoded as base64 with a description.  Maye be displayed on the conformity credential rendering.',
    },
    conformityAssessment: {
      type: 'array',
      items: { $ref: '#/$defs/ConformityAssessment' },
      description: 'A list of individual assessment made under this attestation. ',
    },
  },
  description:
    'A conformity attestation issued by a competent body that defines one or more assessments (eg carbon intensity) about a product (eg battery) against a specification (eg LCA method) defined in a standard or regulation.',
  required: [
    'id',
    'name',
    'assessorLevel',
    'assessmentLevel',
    'attestationType',
    'issuedToParty',
    'referenceScheme',
  ],
  $defs: {
    Endorsement: {
      type: 'object',
      additionalProperties: true,
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['Endorsement'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'Endorsement', minContains: 1 } }],
        },
        name: {
          example:
            'Accreditation of certifiers.com under the Australian National Greenhouse and Energy Reporting scheme (NGER).',
          type: 'string',
          description: 'The name of the accreditation.',
        },
        trustmark: {
          $ref: '#/$defs/Image',
          description:
            'The trust mark image awarded by the AB to the CAB to indicate accreditation.',
        },
        issuingAuthority: {
          type: 'object',
          properties: {
            type: {
              type: 'array',
              readOnly: true,
              default: ['Party'],
              items: { type: 'string' },
              allOf: [{ contains: { const: 'Party', minContains: 1 } }],
            },
            id: {
              example: 'https://sample-business-register.gov/123456789',
              type: 'string',
              format: 'uri',
              description:
                'Globally unique identifier of this party. Typically represented as a URI identifierScheme/Identifier URI',
            },
            name: {
              example: 'Sample Company Ltd',
              type: 'string',
              description: 'Legal registered name of this party.',
            },
            registeredId: {
              example: 90664869327,
              type: 'string',
              description:
                'The registration number (alphanumeric) of the Party within the register. Unique within the register.',
            },
          },
          required: ['id', 'name'],
          description: 'The competent authority that issued the accreditation.',
        },
        endorsementEvidence: {
          $ref: '#/$defs/Link',
          description:
            'The evidence that supports the authority under which the attestation is issued - for an example an accreditation certificate.',
        },
      },
      description:
        'The authority under which a conformity claim is issued.  For example a national accreditation authority may authorise a test lab to issue test certificates about a product against a standard. ',
      required: ['name', 'issuingAuthority'],
    },
    Image: {
      type: 'object',
      additionalProperties: false,
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['Image'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'Image', minContains: 1 } }],
        },
        name: {
          example: 'certification trust mark',
          type: 'string',
          description: 'the display name for this image',
        },
        description: {
          type: 'string',
          description: 'The detailed description / supporting information for this image.',
        },
        imageData: {
          type: 'string',
          format: 'byte',
          description: 'The image data encoded as a base64 string.',
        },
        mediaType: {
          type: 'string',
          'x-external-enumeration': 'https://mimetype.io/',
          description:
            'The media type of this image (eg image/png)\n\n    This is an enumerated value, but the list of valid values are too big, or change too often to include here. You can access the list of allowable values at this URL:  https://mimetype.io/\n    ',
        },
      },
      description:
        'A binary image encoded as base64 text and embedded into the data.  Use this for small images like certification trust marks or regulated labels.  Large impages should be external links.',
      required: ['name', 'imageData', 'mediaType'],
    },
    Link: {
      type: 'object',
      additionalProperties: false,
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['Link'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'Link', minContains: 1 } }],
        },
        linkURL: {
          example: 'https://files.example-certifier.com/1234567.json',
          type: 'string',
          format: 'uri',
          description: 'The URL of the target resource.  ',
        },
        linkName: { type: 'string', description: 'Display name for this link.' },
        digestMultibase: {
          example: 'abc123-example-digest-invalid',
          type: 'string',
          description:
            'An optional multi-base encoded digest to ensure the content of the link has not changed. See https://www.w3.org/TR/vc-data-integrity/#resource-integrity for more information.',
        },
        mediaType: {
          example: 'application/ld+json',
          type: 'string',
          description: 'The media type of the target resource.',
        },
        linkType: {
          example: 'https://test.uncefact.org/vocabulary/linkTypes/dcc',
          type: 'string',
          description: 'The type of the target resource - drawn from a controlled vocabulary ',
        },
      },
      description: 'A structure to provide a URL link plus metadata associated with the link.',
      required: ['linkURL', 'linkName'],
    },
    Score: {
      type: 'object',
      additionalProperties: false,
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['Score'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'Score', minContains: 1 } }],
        },
        code: { type: 'string', description: 'The coded value for this score (eg "AAA")' },
        rank: {
          type: 'integer',
          description:
            'The ranking of this score within the scoring framework - using an integer where "1" is the highest rank.',
        },
        definition: { type: 'string', description: 'A description of the meaning of this score.' },
      },
      description: 'A single score within a scoring framework. ',
      required: ['code'],
    },
    ConformityAssessment: {
      type: 'object',
      additionalProperties: true,
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['ConformityAssessment'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'ConformityAssessment', minContains: 1 } }],
        },
        id: {
          example: 'https://sample-cab.com/assessment/e78dab5d-b6f6-4bc4-a458-7feb039f6cb3',
          type: 'string',
          format: 'uri',
          description:
            'Globally unique identifier of this assessment. Typically represented as a URI AssessmentBody/Assessment URI or a UUID',
        },
        name: {
          example: 'Sample Scheme Forced Labour Assessment',
          type: 'string',
          description:
            'Name of this assessment - typically similar or the same as the referenced criterion name.',
        },
        description: { type: 'string', description: 'Description of this conformity assessment ' },
        assessmentCriteria: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: {
                type: 'array',
                readOnly: true,
                default: ['Criterion'],
                items: { type: 'string' },
                allOf: [{ contains: { const: 'Criterion', minContains: 1 } }],
              },
              id: {
                example: 'https://vocabulary.sample-scheme.org/criterion/lb/v1.0',
                type: 'string',
                format: 'uri',
                description:
                  'Globally unique identifier of this conformity criterion. Typically represented as a URI SchemeOwner/CriterionID URI',
              },
              name: {
                example: 'Forced labour assessment criterion',
                type: 'string',
                description: 'Name of this criterion as defined by the scheme owner.',
              },
            },
            required: ['id', 'name'],
          },
          description: 'The specification against which the assessment is made.',
        },
        assessmentDate: {
          example: '2024-03-15',
          type: 'string',
          format: 'date',
          description: 'The date on which this assessment was made. ',
        },
        assessedPerformance: {
          type: 'array',
          items: { $ref: '#/$defs/Performance' },
          description: 'The assessed performance against criteria.',
        },
        assessedProduct: {
          type: 'array',
          items: { $ref: '#/$defs/ProductVerification' },
          description: 'The product which is the subject of this assessment.',
        },
        assessedFacility: {
          type: 'array',
          items: { $ref: '#/$defs/FacilityVerification' },
          description: 'The facility which is the subject of this assessment.',
        },
        assessedOrganisation: {
          type: 'object',
          properties: {
            type: {
              type: 'array',
              readOnly: true,
              default: ['Party'],
              items: { type: 'string' },
              allOf: [{ contains: { const: 'Party', minContains: 1 } }],
            },
            id: {
              example: 'https://sample-business-register.gov/123456789',
              type: 'string',
              format: 'uri',
              description:
                'Globally unique identifier of this party. Typically represented as a URI identifierScheme/Identifier URI',
            },
            name: {
              example: 'Sample Company Ltd',
              type: 'string',
              description: 'Legal registered name of this party.',
            },
          },
          required: ['id', 'name'],
          description: 'An organisation that is the subject of this assessment.',
        },
        referenceStandard: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: {
                type: 'array',
                readOnly: true,
                default: ['Standard'],
                items: { type: 'string' },
                allOf: [{ contains: { const: 'Standard', minContains: 1 } }],
              },
              id: {
                example: 'https://sample-standards.org/A1234',
                type: 'string',
                format: 'uri',
                description:
                  'Globally unique identifier of this standard. Typically represented as a URI issuer/standard URI',
              },
              name: {
                example: 'Labour rights standard',
                type: 'string',
                description: 'Name for this standard',
              },
            },
            required: ['id', 'name'],
          },
          description: 'The reference to the standard that defines the specification / criteria',
        },
        referenceRegulation: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              type: {
                type: 'array',
                readOnly: true,
                default: ['Regulation'],
                items: { type: 'string' },
                allOf: [{ contains: { const: 'Regulation', minContains: 1 } }],
              },
              id: {
                example: 'https://regulations.country.gov/ABC-12345',
                type: 'string',
                format: 'uri',
                description:
                  'Globally unique identifier of this standard. Typically represented as a URI government/regulation URI',
              },
              name: {
                example: 'Due Diligence Directove',
                type: 'string',
                description: 'Name of this regulation as defined by the regulator.',
              },
            },
            required: ['id', 'name'],
          },
          description: 'The reference to the regulation that defines the assessment criteria',
        },
        specifiedCondition: {
          type: 'array',
          items: { type: 'string' },
          description:
            'A list of specific conditions that constrain this conformity assessment. For example a specific jurisdiction, material type, or test method.',
        },
        evidence: {
          type: 'array',
          items: { $ref: '#/$defs/Link' },
          description: 'Evidence to support this specific assessment.',
        },
        conformityTopic: {
          type: 'array',
          items: { $ref: '#/$defs/ConformityTopic' },
          description:
            'The UNTP conformity topic used to categorise this assessment. Should match the topic defined by the scheme criterion.',
        },
        conformance: {
          type: 'boolean',
          description:
            'An indicator (true / false) whether the outcome of this assessment is conformant to the requirements defined by the standard or criterion.',
        },
      },
      description:
        'A specific assessment about the product or facility against a specific specification.  Eg the carbon intensity of a given product or batch.',
      required: [
        'id',
        'name',
        'assessmentCriteria',
        'assessmentDate',
        'assessedPerformance',
        'conformityTopic',
      ],
    },
    Performance: {
      type: 'object',
      additionalProperties: false,
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['Performance'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'Performance', minContains: 1 } }],
        },
        metric: {
          type: 'object',
          properties: {
            type: {
              type: 'array',
              readOnly: true,
              default: ['PerformanceMetric'],
              items: { type: 'string' },
              allOf: [{ contains: { const: 'PerformanceMetric', minContains: 1 } }],
            },
            id: {
              example: 'https://authority.gov/schemeABC/123456789',
              type: 'string',
              format: 'uri',
              description: 'Globally unique identifier of this reporting metric. ',
            },
            name: {
              example: 'emissions intensity',
              type: 'string',
              description:
                'A human readable name for this metric (for example "water usage per Kg of material")',
            },
          },
          required: ['id', 'name'],
          description:
            'The metric (eg material emissions intensity CO2e/Kg or percentage of young workers) that is measured.',
        },
        measure: { $ref: '#/$defs/Measure', description: 'The measured performance value' },
        score: {
          $ref: '#/$defs/Score',
          description:
            'A performance score (eg "AA") drawn from a scoring framework defined by the scheme or criterion.',
        },
      },
      description:
        'A claimed, assessed, or required performance level defined either by a scoring system or a numeric measure. When a numeric measure is provided, the metric classifying the measurement is required. When only a score is provided, the scoring framework is discoverable via the conformity scheme or criterion.',
      dependentRequired: { measure: ['metric'] },
    },
    Measure: {
      type: 'object',
      additionalProperties: false,
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['Measure'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'Measure', minContains: 1 } }],
        },
        value: { example: 10, type: 'number', description: 'The numeric value of the measure' },
        upperTolerance: {
          type: 'number',
          description:
            'The upper tolerance associated with this measure expressed in the same units as the measure.  For example value=10, upperTolerance=0.1, unit=KGM would mean that this measure is 10kg + 0.1kg',
        },
        lowerTolerance: {
          type: 'number',
          description:
            'The lower tolerance associated with this measure expressed in the same units as the measure.  For example value=10, lowerTolerance=0.1, unit=KGM would mean that this measure is 10kg - 0.1kg',
        },
        unit: {
          type: 'string',
          'x-external-enumeration': 'https://vocabulary.uncefact.org/UnitMeasureCode#',
          description:
            'Unit of measure drawn from the UNECE Rec20 measure code list.\n\n    This is an enumerated value, but the list of valid values are too big, or change too often to include here. You can access the list of allowable values at this URL:  https://vocabulary.uncefact.org/UnitMeasureCode#\n    ',
        },
      },
      description:
        'The measure class defines a numeric measured value (eg 10) and a coded unit of measure (eg KG).  There is an optional upper and lower tolerance which can be used to specify uncertainty in the measure.  ',
      required: ['value', 'unit'],
    },
    ProductVerification: {
      type: 'object',
      additionalProperties: true,
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['ProductVerification'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'ProductVerification', minContains: 1 } }],
        },
        product: {
          type: 'object',
          properties: {
            type: {
              type: 'array',
              readOnly: true,
              default: ['Product'],
              items: { type: 'string' },
              allOf: [{ contains: { const: 'Product', minContains: 1 } }],
            },
            id: {
              example: 'did:web:manufacturer.com:product:123456789',
              type: 'string',
              format: 'uri',
              description:
                'Globally unique identifier of this product. Typically represented as a URI identifierScheme/Identifier URI or, if self-issued, as a did.',
            },
            name: {
              example: '600 Ah Lithium Battery',
              type: 'string',
              description: 'The product name as known to the market.',
            },
            modelNumber: {
              type: 'string',
              description:
                'Where available, the model number (for manufactured products) or material identification (for bulk materials)',
            },
            batchNumber: {
              example: 6789,
              type: 'string',
              description:
                'Identifier of the specific production batch of the product.  Unique within the product class.',
            },
            itemNumber: {
              example: 12345678,
              type: 'string',
              description:
                'A number or code representing a specific serialised item of the product. Unique within product class.',
            },
          },
          required: ['id', 'name'],
          description: 'The product, serial or batch that is the subject of this assessment',
        },
        idVerifiedByCAB: {
          type: 'boolean',
          description:
            'Indicates whether the conformity assessment body has verified the identity product that is the subject of the assessment.',
        },
      },
      description: 'The product which is the subject of this conformity assessment',
      required: ['product'],
    },
    FacilityVerification: {
      type: 'object',
      additionalProperties: true,
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['FacilityVerification'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'FacilityVerification', minContains: 1 } }],
        },
        facility: {
          type: 'object',
          properties: {
            type: {
              type: 'array',
              readOnly: true,
              default: ['Facility'],
              items: { type: 'string' },
              allOf: [{ contains: { const: 'Facility', minContains: 1 } }],
            },
            id: {
              example: 'https://sample-location-register.com/987654321',
              type: 'string',
              format: 'uri',
              description:
                'Globally unique identifier of this facility. Typically represented as a URI identifierScheme/Identifier URI',
            },
            name: {
              example: 'Sample Factory A',
              type: 'string',
              description: 'Name of this facility as defined the location register.',
            },
            registeredId: {
              example: 1234567,
              type: 'string',
              description:
                'The registration number (alphanumeric) of the facility within the identifier scheme. Unique within the register.',
            },
          },
          required: ['id', 'name'],
          description: 'The facility which is the subject of this assessment',
        },
        idVerifiedByCAB: {
          type: 'boolean',
          description:
            'Indicates whether the conformity assessment body has verified the identity of the facility which is the subject of the assessment.',
        },
      },
      description: 'The facility which is the subject of this conformity assessment',
      required: ['facility'],
    },
    ConformityTopic: {
      type: 'object',
      additionalProperties: false,
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['ConformityTopic'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'ConformityTopic', minContains: 1 } }],
        },
        id: {
          type: 'string',
          format: 'uri',
          description: 'The unique identifier for this conformity topic',
        },
        name: {
          example: 'forced-labour',
          type: 'string',
          description: 'The human readable name for this conformity topic.',
        },
        definition: {
          type: 'string',
          description: 'The rich definition of this conformity topic.',
        },
      },
      description:
        'The UNTP standard classification scheme for conformity topic.  see http://vocabulary.uncefact.org/ConformityTopic',
      required: ['id', 'name'],
    },
  },
};
const schema35 = {
  type: 'object',
  additionalProperties: false,
  properties: {
    type: {
      type: 'array',
      readOnly: true,
      default: ['Score'],
      items: { type: 'string' },
      allOf: [{ contains: { const: 'Score', minContains: 1 } }],
    },
    code: { type: 'string', description: 'The coded value for this score (eg "AAA")' },
    rank: {
      type: 'integer',
      description:
        'The ranking of this score within the scoring framework - using an integer where "1" is the highest rank.',
    },
    definition: { type: 'string', description: 'A description of the meaning of this score.' },
  },
  description: 'A single score within a scoring framework. ',
  required: ['code'],
};
const schema34 = {
  type: 'object',
  additionalProperties: false,
  properties: {
    type: {
      type: 'array',
      readOnly: true,
      default: ['Link'],
      items: { type: 'string' },
      allOf: [{ contains: { const: 'Link', minContains: 1 } }],
    },
    linkURL: {
      example: 'https://files.example-certifier.com/1234567.json',
      type: 'string',
      format: 'uri',
      description: 'The URL of the target resource.  ',
    },
    linkName: { type: 'string', description: 'Display name for this link.' },
    digestMultibase: {
      example: 'abc123-example-digest-invalid',
      type: 'string',
      description:
        'An optional multi-base encoded digest to ensure the content of the link has not changed. See https://www.w3.org/TR/vc-data-integrity/#resource-integrity for more information.',
    },
    mediaType: {
      example: 'application/ld+json',
      type: 'string',
      description: 'The media type of the target resource.',
    },
    linkType: {
      example: 'https://test.uncefact.org/vocabulary/linkTypes/dcc',
      type: 'string',
      description: 'The type of the target resource - drawn from a controlled vocabulary ',
    },
  },
  description: 'A structure to provide a URL link plus metadata associated with the link.',
  required: ['linkURL', 'linkName'],
};
const schema33 = {
  type: 'object',
  additionalProperties: false,
  properties: {
    type: {
      type: 'array',
      readOnly: true,
      default: ['Image'],
      items: { type: 'string' },
      allOf: [{ contains: { const: 'Image', minContains: 1 } }],
    },
    name: {
      example: 'certification trust mark',
      type: 'string',
      description: 'the display name for this image',
    },
    description: {
      type: 'string',
      description: 'The detailed description / supporting information for this image.',
    },
    imageData: {
      type: 'string',
      format: 'byte',
      description: 'The image data encoded as a base64 string.',
    },
    mediaType: {
      type: 'string',
      'x-external-enumeration': 'https://mimetype.io/',
      description:
        'The media type of this image (eg image/png)\n\n    This is an enumerated value, but the list of valid values are too big, or change too often to include here. You can access the list of allowable values at this URL:  https://mimetype.io/\n    ',
    },
  },
  description:
    'A binary image encoded as base64 text and embedded into the data.  Use this for small images like certification trust marks or regulated labels.  Large impages should be external links.',
  required: ['name', 'imageData', 'mediaType'],
};
const func1 = Object.prototype.hasOwnProperty;
const formats0 = fullFormats.uri;
const formats4 = fullFormats.byte;
const schema32 = {
  type: 'object',
  additionalProperties: true,
  properties: {
    type: {
      type: 'array',
      readOnly: true,
      default: ['Endorsement'],
      items: { type: 'string' },
      allOf: [{ contains: { const: 'Endorsement', minContains: 1 } }],
    },
    name: {
      example:
        'Accreditation of certifiers.com under the Australian National Greenhouse and Energy Reporting scheme (NGER).',
      type: 'string',
      description: 'The name of the accreditation.',
    },
    trustmark: {
      $ref: '#/$defs/Image',
      description: 'The trust mark image awarded by the AB to the CAB to indicate accreditation.',
    },
    issuingAuthority: {
      type: 'object',
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['Party'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'Party', minContains: 1 } }],
        },
        id: {
          example: 'https://sample-business-register.gov/123456789',
          type: 'string',
          format: 'uri',
          description:
            'Globally unique identifier of this party. Typically represented as a URI identifierScheme/Identifier URI',
        },
        name: {
          example: 'Sample Company Ltd',
          type: 'string',
          description: 'Legal registered name of this party.',
        },
        registeredId: {
          example: 90664869327,
          type: 'string',
          description:
            'The registration number (alphanumeric) of the Party within the register. Unique within the register.',
        },
      },
      required: ['id', 'name'],
      description: 'The competent authority that issued the accreditation.',
    },
    endorsementEvidence: {
      $ref: '#/$defs/Link',
      description:
        'The evidence that supports the authority under which the attestation is issued - for an example an accreditation certificate.',
    },
  },
  description:
    'The authority under which a conformity claim is issued.  For example a national accreditation authority may authorise a test lab to issue test certificates about a product against a standard. ',
  required: ['name', 'issuingAuthority'],
};
function validate21(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {},
) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate21.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = undefined;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = undefined;
  }
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.name === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'name' },
        message: "must have required property '" + 'name' + "'",
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.issuingAuthority === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'issuingAuthority' },
        message: "must have required property '" + 'issuingAuthority' + "'",
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.type !== undefined) {
      let data0 = data.type;
      if (Array.isArray(data0)) {
        const _errs5 = errors;
        const len0 = data0.length;
        for (let i0 = 0; i0 < len0; i0++) {
          const _errs6 = errors;
          if ('Endorsement' !== data0[i0]) {
            const err2 = {
              instancePath: instancePath + '/type/' + i0,
              schemaPath: '#/properties/type/allOf/0/contains/const',
              keyword: 'const',
              params: { allowedValue: 'Endorsement' },
              message: 'must be equal to constant',
            };
            if (vErrors === null) {
              vErrors = [err2];
            } else {
              vErrors.push(err2);
            }
            errors++;
          }
          var valid2 = _errs6 === errors;
          if (valid2) {
            break;
          }
        }
        if (!valid2) {
          const err3 = {
            instancePath: instancePath + '/type',
            schemaPath: '#/properties/type/allOf/0/contains',
            keyword: 'contains',
            params: { minContains: 1 },
            message: 'must contain at least 1 valid item(s)',
          };
          if (vErrors === null) {
            vErrors = [err3];
          } else {
            vErrors.push(err3);
          }
          errors++;
        } else {
          errors = _errs5;
          if (vErrors !== null) {
            if (_errs5) {
              vErrors.length = _errs5;
            } else {
              vErrors = null;
            }
          }
        }
      }
      if (Array.isArray(data0)) {
        const len1 = data0.length;
        for (let i1 = 0; i1 < len1; i1++) {
          if (typeof data0[i1] !== 'string') {
            const err4 = {
              instancePath: instancePath + '/type/' + i1,
              schemaPath: '#/properties/type/items/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err4];
            } else {
              vErrors.push(err4);
            }
            errors++;
          }
        }
      } else {
        const err5 = {
          instancePath: instancePath + '/type',
          schemaPath: '#/properties/type/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
        }
        errors++;
      }
    }
    if (data.name !== undefined) {
      if (typeof data.name !== 'string') {
        const err6 = {
          instancePath: instancePath + '/name',
          schemaPath: '#/properties/name/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
    if (data.trustmark !== undefined) {
      let data4 = data.trustmark;
      if (data4 && typeof data4 == 'object' && !Array.isArray(data4)) {
        if (data4.name === undefined) {
          const err7 = {
            instancePath: instancePath + '/trustmark',
            schemaPath: '#/$defs/Image/required',
            keyword: 'required',
            params: { missingProperty: 'name' },
            message: "must have required property '" + 'name' + "'",
          };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
        if (data4.imageData === undefined) {
          const err8 = {
            instancePath: instancePath + '/trustmark',
            schemaPath: '#/$defs/Image/required',
            keyword: 'required',
            params: { missingProperty: 'imageData' },
            message: "must have required property '" + 'imageData' + "'",
          };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
          }
          errors++;
        }
        if (data4.mediaType === undefined) {
          const err9 = {
            instancePath: instancePath + '/trustmark',
            schemaPath: '#/$defs/Image/required',
            keyword: 'required',
            params: { missingProperty: 'mediaType' },
            message: "must have required property '" + 'mediaType' + "'",
          };
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        }
        for (const key0 in data4) {
          if (
            !(
              key0 === 'type' ||
              key0 === 'name' ||
              key0 === 'description' ||
              key0 === 'imageData' ||
              key0 === 'mediaType'
            )
          ) {
            const err10 = {
              instancePath: instancePath + '/trustmark',
              schemaPath: '#/$defs/Image/additionalProperties',
              keyword: 'additionalProperties',
              params: { additionalProperty: key0 },
              message: 'must NOT have additional properties',
            };
            if (vErrors === null) {
              vErrors = [err10];
            } else {
              vErrors.push(err10);
            }
            errors++;
          }
        }
        if (data4.type !== undefined) {
          let data5 = data4.type;
          if (Array.isArray(data5)) {
            const _errs18 = errors;
            const len2 = data5.length;
            for (let i2 = 0; i2 < len2; i2++) {
              const _errs19 = errors;
              if ('Image' !== data5[i2]) {
                const err11 = {
                  instancePath: instancePath + '/trustmark/type/' + i2,
                  schemaPath: '#/$defs/Image/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Image' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err11];
                } else {
                  vErrors.push(err11);
                }
                errors++;
              }
              var valid8 = _errs19 === errors;
              if (valid8) {
                break;
              }
            }
            if (!valid8) {
              const err12 = {
                instancePath: instancePath + '/trustmark/type',
                schemaPath: '#/$defs/Image/properties/type/allOf/0/contains',
                keyword: 'contains',
                params: { minContains: 1 },
                message: 'must contain at least 1 valid item(s)',
              };
              if (vErrors === null) {
                vErrors = [err12];
              } else {
                vErrors.push(err12);
              }
              errors++;
            } else {
              errors = _errs18;
              if (vErrors !== null) {
                if (_errs18) {
                  vErrors.length = _errs18;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data5)) {
            const len3 = data5.length;
            for (let i3 = 0; i3 < len3; i3++) {
              if (typeof data5[i3] !== 'string') {
                const err13 = {
                  instancePath: instancePath + '/trustmark/type/' + i3,
                  schemaPath: '#/$defs/Image/properties/type/items/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err13];
                } else {
                  vErrors.push(err13);
                }
                errors++;
              }
            }
          } else {
            const err14 = {
              instancePath: instancePath + '/trustmark/type',
              schemaPath: '#/$defs/Image/properties/type/type',
              keyword: 'type',
              params: { type: 'array' },
              message: 'must be array',
            };
            if (vErrors === null) {
              vErrors = [err14];
            } else {
              vErrors.push(err14);
            }
            errors++;
          }
        }
        if (data4.name !== undefined) {
          if (typeof data4.name !== 'string') {
            const err15 = {
              instancePath: instancePath + '/trustmark/name',
              schemaPath: '#/$defs/Image/properties/name/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err15];
            } else {
              vErrors.push(err15);
            }
            errors++;
          }
        }
        if (data4.description !== undefined) {
          if (typeof data4.description !== 'string') {
            const err16 = {
              instancePath: instancePath + '/trustmark/description',
              schemaPath: '#/$defs/Image/properties/description/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err16];
            } else {
              vErrors.push(err16);
            }
            errors++;
          }
        }
        if (data4.imageData !== undefined) {
          let data10 = data4.imageData;
          if (typeof data10 === 'string') {
            if (!formats4(data10)) {
              const err17 = {
                instancePath: instancePath + '/trustmark/imageData',
                schemaPath: '#/$defs/Image/properties/imageData/format',
                keyword: 'format',
                params: { format: 'byte' },
                message: 'must match format "' + 'byte' + '"',
              };
              if (vErrors === null) {
                vErrors = [err17];
              } else {
                vErrors.push(err17);
              }
              errors++;
            }
          } else {
            const err18 = {
              instancePath: instancePath + '/trustmark/imageData',
              schemaPath: '#/$defs/Image/properties/imageData/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err18];
            } else {
              vErrors.push(err18);
            }
            errors++;
          }
        }
        if (data4.mediaType !== undefined) {
          if (typeof data4.mediaType !== 'string') {
            const err19 = {
              instancePath: instancePath + '/trustmark/mediaType',
              schemaPath: '#/$defs/Image/properties/mediaType/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err19];
            } else {
              vErrors.push(err19);
            }
            errors++;
          }
        }
      } else {
        const err20 = {
          instancePath: instancePath + '/trustmark',
          schemaPath: '#/$defs/Image/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err20];
        } else {
          vErrors.push(err20);
        }
        errors++;
      }
    }
    if (data.issuingAuthority !== undefined) {
      let data12 = data.issuingAuthority;
      if (data12 && typeof data12 == 'object' && !Array.isArray(data12)) {
        if (data12.id === undefined) {
          const err21 = {
            instancePath: instancePath + '/issuingAuthority',
            schemaPath: '#/properties/issuingAuthority/required',
            keyword: 'required',
            params: { missingProperty: 'id' },
            message: "must have required property '" + 'id' + "'",
          };
          if (vErrors === null) {
            vErrors = [err21];
          } else {
            vErrors.push(err21);
          }
          errors++;
        }
        if (data12.name === undefined) {
          const err22 = {
            instancePath: instancePath + '/issuingAuthority',
            schemaPath: '#/properties/issuingAuthority/required',
            keyword: 'required',
            params: { missingProperty: 'name' },
            message: "must have required property '" + 'name' + "'",
          };
          if (vErrors === null) {
            vErrors = [err22];
          } else {
            vErrors.push(err22);
          }
          errors++;
        }
        if (data12.type !== undefined) {
          let data13 = data12.type;
          if (Array.isArray(data13)) {
            const _errs35 = errors;
            const len4 = data13.length;
            for (let i4 = 0; i4 < len4; i4++) {
              const _errs36 = errors;
              if ('Party' !== data13[i4]) {
                const err23 = {
                  instancePath: instancePath + '/issuingAuthority/type/' + i4,
                  schemaPath:
                    '#/properties/issuingAuthority/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Party' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err23];
                } else {
                  vErrors.push(err23);
                }
                errors++;
              }
              var valid13 = _errs36 === errors;
              if (valid13) {
                break;
              }
            }
            if (!valid13) {
              const err24 = {
                instancePath: instancePath + '/issuingAuthority/type',
                schemaPath: '#/properties/issuingAuthority/properties/type/allOf/0/contains',
                keyword: 'contains',
                params: { minContains: 1 },
                message: 'must contain at least 1 valid item(s)',
              };
              if (vErrors === null) {
                vErrors = [err24];
              } else {
                vErrors.push(err24);
              }
              errors++;
            } else {
              errors = _errs35;
              if (vErrors !== null) {
                if (_errs35) {
                  vErrors.length = _errs35;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data13)) {
            const len5 = data13.length;
            for (let i5 = 0; i5 < len5; i5++) {
              if (typeof data13[i5] !== 'string') {
                const err25 = {
                  instancePath: instancePath + '/issuingAuthority/type/' + i5,
                  schemaPath: '#/properties/issuingAuthority/properties/type/items/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err25];
                } else {
                  vErrors.push(err25);
                }
                errors++;
              }
            }
          } else {
            const err26 = {
              instancePath: instancePath + '/issuingAuthority/type',
              schemaPath: '#/properties/issuingAuthority/properties/type/type',
              keyword: 'type',
              params: { type: 'array' },
              message: 'must be array',
            };
            if (vErrors === null) {
              vErrors = [err26];
            } else {
              vErrors.push(err26);
            }
            errors++;
          }
        }
        if (data12.id !== undefined) {
          let data16 = data12.id;
          if (typeof data16 === 'string') {
            if (!formats0(data16)) {
              const err27 = {
                instancePath: instancePath + '/issuingAuthority/id',
                schemaPath: '#/properties/issuingAuthority/properties/id/format',
                keyword: 'format',
                params: { format: 'uri' },
                message: 'must match format "' + 'uri' + '"',
              };
              if (vErrors === null) {
                vErrors = [err27];
              } else {
                vErrors.push(err27);
              }
              errors++;
            }
          } else {
            const err28 = {
              instancePath: instancePath + '/issuingAuthority/id',
              schemaPath: '#/properties/issuingAuthority/properties/id/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err28];
            } else {
              vErrors.push(err28);
            }
            errors++;
          }
        }
        if (data12.name !== undefined) {
          if (typeof data12.name !== 'string') {
            const err29 = {
              instancePath: instancePath + '/issuingAuthority/name',
              schemaPath: '#/properties/issuingAuthority/properties/name/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err29];
            } else {
              vErrors.push(err29);
            }
            errors++;
          }
        }
        if (data12.registeredId !== undefined) {
          if (typeof data12.registeredId !== 'string') {
            const err30 = {
              instancePath: instancePath + '/issuingAuthority/registeredId',
              schemaPath: '#/properties/issuingAuthority/properties/registeredId/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err30];
            } else {
              vErrors.push(err30);
            }
            errors++;
          }
        }
      } else {
        const err31 = {
          instancePath: instancePath + '/issuingAuthority',
          schemaPath: '#/properties/issuingAuthority/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err31];
        } else {
          vErrors.push(err31);
        }
        errors++;
      }
    }
    if (data.endorsementEvidence !== undefined) {
      let data19 = data.endorsementEvidence;
      if (data19 && typeof data19 == 'object' && !Array.isArray(data19)) {
        if (data19.linkURL === undefined) {
          const err32 = {
            instancePath: instancePath + '/endorsementEvidence',
            schemaPath: '#/$defs/Link/required',
            keyword: 'required',
            params: { missingProperty: 'linkURL' },
            message: "must have required property '" + 'linkURL' + "'",
          };
          if (vErrors === null) {
            vErrors = [err32];
          } else {
            vErrors.push(err32);
          }
          errors++;
        }
        if (data19.linkName === undefined) {
          const err33 = {
            instancePath: instancePath + '/endorsementEvidence',
            schemaPath: '#/$defs/Link/required',
            keyword: 'required',
            params: { missingProperty: 'linkName' },
            message: "must have required property '" + 'linkName' + "'",
          };
          if (vErrors === null) {
            vErrors = [err33];
          } else {
            vErrors.push(err33);
          }
          errors++;
        }
        for (const key1 in data19) {
          if (
            !(
              key1 === 'type' ||
              key1 === 'linkURL' ||
              key1 === 'linkName' ||
              key1 === 'digestMultibase' ||
              key1 === 'mediaType' ||
              key1 === 'linkType'
            )
          ) {
            const err34 = {
              instancePath: instancePath + '/endorsementEvidence',
              schemaPath: '#/$defs/Link/additionalProperties',
              keyword: 'additionalProperties',
              params: { additionalProperty: key1 },
              message: 'must NOT have additional properties',
            };
            if (vErrors === null) {
              vErrors = [err34];
            } else {
              vErrors.push(err34);
            }
            errors++;
          }
        }
        if (data19.type !== undefined) {
          let data20 = data19.type;
          if (Array.isArray(data20)) {
            const _errs52 = errors;
            const len6 = data20.length;
            for (let i6 = 0; i6 < len6; i6++) {
              const _errs53 = errors;
              if ('Link' !== data20[i6]) {
                const err35 = {
                  instancePath: instancePath + '/endorsementEvidence/type/' + i6,
                  schemaPath: '#/$defs/Link/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Link' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err35];
                } else {
                  vErrors.push(err35);
                }
                errors++;
              }
              var valid19 = _errs53 === errors;
              if (valid19) {
                break;
              }
            }
            if (!valid19) {
              const err36 = {
                instancePath: instancePath + '/endorsementEvidence/type',
                schemaPath: '#/$defs/Link/properties/type/allOf/0/contains',
                keyword: 'contains',
                params: { minContains: 1 },
                message: 'must contain at least 1 valid item(s)',
              };
              if (vErrors === null) {
                vErrors = [err36];
              } else {
                vErrors.push(err36);
              }
              errors++;
            } else {
              errors = _errs52;
              if (vErrors !== null) {
                if (_errs52) {
                  vErrors.length = _errs52;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data20)) {
            const len7 = data20.length;
            for (let i7 = 0; i7 < len7; i7++) {
              if (typeof data20[i7] !== 'string') {
                const err37 = {
                  instancePath: instancePath + '/endorsementEvidence/type/' + i7,
                  schemaPath: '#/$defs/Link/properties/type/items/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err37];
                } else {
                  vErrors.push(err37);
                }
                errors++;
              }
            }
          } else {
            const err38 = {
              instancePath: instancePath + '/endorsementEvidence/type',
              schemaPath: '#/$defs/Link/properties/type/type',
              keyword: 'type',
              params: { type: 'array' },
              message: 'must be array',
            };
            if (vErrors === null) {
              vErrors = [err38];
            } else {
              vErrors.push(err38);
            }
            errors++;
          }
        }
        if (data19.linkURL !== undefined) {
          let data23 = data19.linkURL;
          if (typeof data23 === 'string') {
            if (!formats0(data23)) {
              const err39 = {
                instancePath: instancePath + '/endorsementEvidence/linkURL',
                schemaPath: '#/$defs/Link/properties/linkURL/format',
                keyword: 'format',
                params: { format: 'uri' },
                message: 'must match format "' + 'uri' + '"',
              };
              if (vErrors === null) {
                vErrors = [err39];
              } else {
                vErrors.push(err39);
              }
              errors++;
            }
          } else {
            const err40 = {
              instancePath: instancePath + '/endorsementEvidence/linkURL',
              schemaPath: '#/$defs/Link/properties/linkURL/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err40];
            } else {
              vErrors.push(err40);
            }
            errors++;
          }
        }
        if (data19.linkName !== undefined) {
          if (typeof data19.linkName !== 'string') {
            const err41 = {
              instancePath: instancePath + '/endorsementEvidence/linkName',
              schemaPath: '#/$defs/Link/properties/linkName/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err41];
            } else {
              vErrors.push(err41);
            }
            errors++;
          }
        }
        if (data19.digestMultibase !== undefined) {
          if (typeof data19.digestMultibase !== 'string') {
            const err42 = {
              instancePath: instancePath + '/endorsementEvidence/digestMultibase',
              schemaPath: '#/$defs/Link/properties/digestMultibase/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err42];
            } else {
              vErrors.push(err42);
            }
            errors++;
          }
        }
        if (data19.mediaType !== undefined) {
          if (typeof data19.mediaType !== 'string') {
            const err43 = {
              instancePath: instancePath + '/endorsementEvidence/mediaType',
              schemaPath: '#/$defs/Link/properties/mediaType/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err43];
            } else {
              vErrors.push(err43);
            }
            errors++;
          }
        }
        if (data19.linkType !== undefined) {
          if (typeof data19.linkType !== 'string') {
            const err44 = {
              instancePath: instancePath + '/endorsementEvidence/linkType',
              schemaPath: '#/$defs/Link/properties/linkType/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err44];
            } else {
              vErrors.push(err44);
            }
            errors++;
          }
        }
      } else {
        const err45 = {
          instancePath: instancePath + '/endorsementEvidence',
          schemaPath: '#/$defs/Link/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err45];
        } else {
          vErrors.push(err45);
        }
        errors++;
      }
    }
  } else {
    const err46 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: { type: 'object' },
      message: 'must be object',
    };
    if (vErrors === null) {
      vErrors = [err46];
    } else {
      vErrors.push(err46);
    }
    errors++;
  }
  validate21.errors = vErrors;
  return errors === 0;
}
validate21.evaluated = { props: true, dynamicProps: false, dynamicItems: false };
const schema39 = {
  type: 'object',
  additionalProperties: true,
  properties: {
    type: {
      type: 'array',
      readOnly: true,
      default: ['ConformityAssessment'],
      items: { type: 'string' },
      allOf: [{ contains: { const: 'ConformityAssessment', minContains: 1 } }],
    },
    id: {
      example: 'https://sample-cab.com/assessment/e78dab5d-b6f6-4bc4-a458-7feb039f6cb3',
      type: 'string',
      format: 'uri',
      description:
        'Globally unique identifier of this assessment. Typically represented as a URI AssessmentBody/Assessment URI or a UUID',
    },
    name: {
      example: 'Sample Scheme Forced Labour Assessment',
      type: 'string',
      description:
        'Name of this assessment - typically similar or the same as the referenced criterion name.',
    },
    description: { type: 'string', description: 'Description of this conformity assessment ' },
    assessmentCriteria: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          type: {
            type: 'array',
            readOnly: true,
            default: ['Criterion'],
            items: { type: 'string' },
            allOf: [{ contains: { const: 'Criterion', minContains: 1 } }],
          },
          id: {
            example: 'https://vocabulary.sample-scheme.org/criterion/lb/v1.0',
            type: 'string',
            format: 'uri',
            description:
              'Globally unique identifier of this conformity criterion. Typically represented as a URI SchemeOwner/CriterionID URI',
          },
          name: {
            example: 'Forced labour assessment criterion',
            type: 'string',
            description: 'Name of this criterion as defined by the scheme owner.',
          },
        },
        required: ['id', 'name'],
      },
      description: 'The specification against which the assessment is made.',
    },
    assessmentDate: {
      example: '2024-03-15',
      type: 'string',
      format: 'date',
      description: 'The date on which this assessment was made. ',
    },
    assessedPerformance: {
      type: 'array',
      items: { $ref: '#/$defs/Performance' },
      description: 'The assessed performance against criteria.',
    },
    assessedProduct: {
      type: 'array',
      items: { $ref: '#/$defs/ProductVerification' },
      description: 'The product which is the subject of this assessment.',
    },
    assessedFacility: {
      type: 'array',
      items: { $ref: '#/$defs/FacilityVerification' },
      description: 'The facility which is the subject of this assessment.',
    },
    assessedOrganisation: {
      type: 'object',
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['Party'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'Party', minContains: 1 } }],
        },
        id: {
          example: 'https://sample-business-register.gov/123456789',
          type: 'string',
          format: 'uri',
          description:
            'Globally unique identifier of this party. Typically represented as a URI identifierScheme/Identifier URI',
        },
        name: {
          example: 'Sample Company Ltd',
          type: 'string',
          description: 'Legal registered name of this party.',
        },
      },
      required: ['id', 'name'],
      description: 'An organisation that is the subject of this assessment.',
    },
    referenceStandard: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          type: {
            type: 'array',
            readOnly: true,
            default: ['Standard'],
            items: { type: 'string' },
            allOf: [{ contains: { const: 'Standard', minContains: 1 } }],
          },
          id: {
            example: 'https://sample-standards.org/A1234',
            type: 'string',
            format: 'uri',
            description:
              'Globally unique identifier of this standard. Typically represented as a URI issuer/standard URI',
          },
          name: {
            example: 'Labour rights standard',
            type: 'string',
            description: 'Name for this standard',
          },
        },
        required: ['id', 'name'],
      },
      description: 'The reference to the standard that defines the specification / criteria',
    },
    referenceRegulation: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          type: {
            type: 'array',
            readOnly: true,
            default: ['Regulation'],
            items: { type: 'string' },
            allOf: [{ contains: { const: 'Regulation', minContains: 1 } }],
          },
          id: {
            example: 'https://regulations.country.gov/ABC-12345',
            type: 'string',
            format: 'uri',
            description:
              'Globally unique identifier of this standard. Typically represented as a URI government/regulation URI',
          },
          name: {
            example: 'Due Diligence Directove',
            type: 'string',
            description: 'Name of this regulation as defined by the regulator.',
          },
        },
        required: ['id', 'name'],
      },
      description: 'The reference to the regulation that defines the assessment criteria',
    },
    specifiedCondition: {
      type: 'array',
      items: { type: 'string' },
      description:
        'A list of specific conditions that constrain this conformity assessment. For example a specific jurisdiction, material type, or test method.',
    },
    evidence: {
      type: 'array',
      items: { $ref: '#/$defs/Link' },
      description: 'Evidence to support this specific assessment.',
    },
    conformityTopic: {
      type: 'array',
      items: { $ref: '#/$defs/ConformityTopic' },
      description:
        'The UNTP conformity topic used to categorise this assessment. Should match the topic defined by the scheme criterion.',
    },
    conformance: {
      type: 'boolean',
      description:
        'An indicator (true / false) whether the outcome of this assessment is conformant to the requirements defined by the standard or criterion.',
    },
  },
  description:
    'A specific assessment about the product or facility against a specific specification.  Eg the carbon intensity of a given product or batch.',
  required: [
    'id',
    'name',
    'assessmentCriteria',
    'assessmentDate',
    'assessedPerformance',
    'conformityTopic',
  ],
};
const schema43 = {
  type: 'object',
  additionalProperties: true,
  properties: {
    type: {
      type: 'array',
      readOnly: true,
      default: ['ProductVerification'],
      items: { type: 'string' },
      allOf: [{ contains: { const: 'ProductVerification', minContains: 1 } }],
    },
    product: {
      type: 'object',
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['Product'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'Product', minContains: 1 } }],
        },
        id: {
          example: 'did:web:manufacturer.com:product:123456789',
          type: 'string',
          format: 'uri',
          description:
            'Globally unique identifier of this product. Typically represented as a URI identifierScheme/Identifier URI or, if self-issued, as a did.',
        },
        name: {
          example: '600 Ah Lithium Battery',
          type: 'string',
          description: 'The product name as known to the market.',
        },
        modelNumber: {
          type: 'string',
          description:
            'Where available, the model number (for manufactured products) or material identification (for bulk materials)',
        },
        batchNumber: {
          example: 6789,
          type: 'string',
          description:
            'Identifier of the specific production batch of the product.  Unique within the product class.',
        },
        itemNumber: {
          example: 12345678,
          type: 'string',
          description:
            'A number or code representing a specific serialised item of the product. Unique within product class.',
        },
      },
      required: ['id', 'name'],
      description: 'The product, serial or batch that is the subject of this assessment',
    },
    idVerifiedByCAB: {
      type: 'boolean',
      description:
        'Indicates whether the conformity assessment body has verified the identity product that is the subject of the assessment.',
    },
  },
  description: 'The product which is the subject of this conformity assessment',
  required: ['product'],
};
const schema44 = {
  type: 'object',
  additionalProperties: true,
  properties: {
    type: {
      type: 'array',
      readOnly: true,
      default: ['FacilityVerification'],
      items: { type: 'string' },
      allOf: [{ contains: { const: 'FacilityVerification', minContains: 1 } }],
    },
    facility: {
      type: 'object',
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['Facility'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'Facility', minContains: 1 } }],
        },
        id: {
          example: 'https://sample-location-register.com/987654321',
          type: 'string',
          format: 'uri',
          description:
            'Globally unique identifier of this facility. Typically represented as a URI identifierScheme/Identifier URI',
        },
        name: {
          example: 'Sample Factory A',
          type: 'string',
          description: 'Name of this facility as defined the location register.',
        },
        registeredId: {
          example: 1234567,
          type: 'string',
          description:
            'The registration number (alphanumeric) of the facility within the identifier scheme. Unique within the register.',
        },
      },
      required: ['id', 'name'],
      description: 'The facility which is the subject of this assessment',
    },
    idVerifiedByCAB: {
      type: 'boolean',
      description:
        'Indicates whether the conformity assessment body has verified the identity of the facility which is the subject of the assessment.',
    },
  },
  description: 'The facility which is the subject of this conformity assessment',
  required: ['facility'],
};
const schema46 = {
  type: 'object',
  additionalProperties: false,
  properties: {
    type: {
      type: 'array',
      readOnly: true,
      default: ['ConformityTopic'],
      items: { type: 'string' },
      allOf: [{ contains: { const: 'ConformityTopic', minContains: 1 } }],
    },
    id: {
      type: 'string',
      format: 'uri',
      description: 'The unique identifier for this conformity topic',
    },
    name: {
      example: 'forced-labour',
      type: 'string',
      description: 'The human readable name for this conformity topic.',
    },
    definition: { type: 'string', description: 'The rich definition of this conformity topic.' },
  },
  description:
    'The UNTP standard classification scheme for conformity topic.  see http://vocabulary.uncefact.org/ConformityTopic',
  required: ['id', 'name'],
};
const formats24 = fullFormats.date;
const schema40 = {
  type: 'object',
  additionalProperties: false,
  properties: {
    type: {
      type: 'array',
      readOnly: true,
      default: ['Performance'],
      items: { type: 'string' },
      allOf: [{ contains: { const: 'Performance', minContains: 1 } }],
    },
    metric: {
      type: 'object',
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['PerformanceMetric'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'PerformanceMetric', minContains: 1 } }],
        },
        id: {
          example: 'https://authority.gov/schemeABC/123456789',
          type: 'string',
          format: 'uri',
          description: 'Globally unique identifier of this reporting metric. ',
        },
        name: {
          example: 'emissions intensity',
          type: 'string',
          description:
            'A human readable name for this metric (for example "water usage per Kg of material")',
        },
      },
      required: ['id', 'name'],
      description:
        'The metric (eg material emissions intensity CO2e/Kg or percentage of young workers) that is measured.',
    },
    measure: { $ref: '#/$defs/Measure', description: 'The measured performance value' },
    score: {
      $ref: '#/$defs/Score',
      description:
        'A performance score (eg "AA") drawn from a scoring framework defined by the scheme or criterion.',
    },
  },
  description:
    'A claimed, assessed, or required performance level defined either by a scoring system or a numeric measure. When a numeric measure is provided, the metric classifying the measurement is required. When only a score is provided, the scoring framework is discoverable via the conformity scheme or criterion.',
  dependentRequired: { measure: ['metric'] },
};
const schema41 = {
  type: 'object',
  additionalProperties: false,
  properties: {
    type: {
      type: 'array',
      readOnly: true,
      default: ['Measure'],
      items: { type: 'string' },
      allOf: [{ contains: { const: 'Measure', minContains: 1 } }],
    },
    value: { example: 10, type: 'number', description: 'The numeric value of the measure' },
    upperTolerance: {
      type: 'number',
      description:
        'The upper tolerance associated with this measure expressed in the same units as the measure.  For example value=10, upperTolerance=0.1, unit=KGM would mean that this measure is 10kg + 0.1kg',
    },
    lowerTolerance: {
      type: 'number',
      description:
        'The lower tolerance associated with this measure expressed in the same units as the measure.  For example value=10, lowerTolerance=0.1, unit=KGM would mean that this measure is 10kg - 0.1kg',
    },
    unit: {
      type: 'string',
      'x-external-enumeration': 'https://vocabulary.uncefact.org/UnitMeasureCode#',
      description:
        'Unit of measure drawn from the UNECE Rec20 measure code list.\n\n    This is an enumerated value, but the list of valid values are too big, or change too often to include here. You can access the list of allowable values at this URL:  https://vocabulary.uncefact.org/UnitMeasureCode#\n    ',
    },
  },
  description:
    'The measure class defines a numeric measured value (eg 10) and a coded unit of measure (eg KG).  There is an optional upper and lower tolerance which can be used to specify uncertainty in the measure.  ',
  required: ['value', 'unit'],
};
function validate24(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {},
) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate24.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = undefined;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = undefined;
  }
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    for (const key0 in data) {
      if (!(key0 === 'type' || key0 === 'metric' || key0 === 'measure' || key0 === 'score')) {
        const err0 = {
          instancePath,
          schemaPath: '#/additionalProperties',
          keyword: 'additionalProperties',
          params: { additionalProperty: key0 },
          message: 'must NOT have additional properties',
        };
        if (vErrors === null) {
          vErrors = [err0];
        } else {
          vErrors.push(err0);
        }
        errors++;
      }
    }
    if (data.type !== undefined) {
      let data0 = data.type;
      if (Array.isArray(data0)) {
        const _errs5 = errors;
        const len0 = data0.length;
        for (let i0 = 0; i0 < len0; i0++) {
          const _errs6 = errors;
          if ('Performance' !== data0[i0]) {
            const err1 = {
              instancePath: instancePath + '/type/' + i0,
              schemaPath: '#/properties/type/allOf/0/contains/const',
              keyword: 'const',
              params: { allowedValue: 'Performance' },
              message: 'must be equal to constant',
            };
            if (vErrors === null) {
              vErrors = [err1];
            } else {
              vErrors.push(err1);
            }
            errors++;
          }
          var valid2 = _errs6 === errors;
          if (valid2) {
            break;
          }
        }
        if (!valid2) {
          const err2 = {
            instancePath: instancePath + '/type',
            schemaPath: '#/properties/type/allOf/0/contains',
            keyword: 'contains',
            params: { minContains: 1 },
            message: 'must contain at least 1 valid item(s)',
          };
          if (vErrors === null) {
            vErrors = [err2];
          } else {
            vErrors.push(err2);
          }
          errors++;
        } else {
          errors = _errs5;
          if (vErrors !== null) {
            if (_errs5) {
              vErrors.length = _errs5;
            } else {
              vErrors = null;
            }
          }
        }
      }
      if (Array.isArray(data0)) {
        const len1 = data0.length;
        for (let i1 = 0; i1 < len1; i1++) {
          if (typeof data0[i1] !== 'string') {
            const err3 = {
              instancePath: instancePath + '/type/' + i1,
              schemaPath: '#/properties/type/items/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err3];
            } else {
              vErrors.push(err3);
            }
            errors++;
          }
        }
      } else {
        const err4 = {
          instancePath: instancePath + '/type',
          schemaPath: '#/properties/type/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err4];
        } else {
          vErrors.push(err4);
        }
        errors++;
      }
    }
    if (data.metric !== undefined) {
      let data3 = data.metric;
      if (data3 && typeof data3 == 'object' && !Array.isArray(data3)) {
        if (data3.id === undefined) {
          const err5 = {
            instancePath: instancePath + '/metric',
            schemaPath: '#/properties/metric/required',
            keyword: 'required',
            params: { missingProperty: 'id' },
            message: "must have required property '" + 'id' + "'",
          };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
        if (data3.name === undefined) {
          const err6 = {
            instancePath: instancePath + '/metric',
            schemaPath: '#/properties/metric/required',
            keyword: 'required',
            params: { missingProperty: 'name' },
            message: "must have required property '" + 'name' + "'",
          };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
        if (data3.type !== undefined) {
          let data4 = data3.type;
          if (Array.isArray(data4)) {
            const _errs14 = errors;
            const len2 = data4.length;
            for (let i2 = 0; i2 < len2; i2++) {
              const _errs15 = errors;
              if ('PerformanceMetric' !== data4[i2]) {
                const err7 = {
                  instancePath: instancePath + '/metric/type/' + i2,
                  schemaPath: '#/properties/metric/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'PerformanceMetric' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err7];
                } else {
                  vErrors.push(err7);
                }
                errors++;
              }
              var valid7 = _errs15 === errors;
              if (valid7) {
                break;
              }
            }
            if (!valid7) {
              const err8 = {
                instancePath: instancePath + '/metric/type',
                schemaPath: '#/properties/metric/properties/type/allOf/0/contains',
                keyword: 'contains',
                params: { minContains: 1 },
                message: 'must contain at least 1 valid item(s)',
              };
              if (vErrors === null) {
                vErrors = [err8];
              } else {
                vErrors.push(err8);
              }
              errors++;
            } else {
              errors = _errs14;
              if (vErrors !== null) {
                if (_errs14) {
                  vErrors.length = _errs14;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data4)) {
            const len3 = data4.length;
            for (let i3 = 0; i3 < len3; i3++) {
              if (typeof data4[i3] !== 'string') {
                const err9 = {
                  instancePath: instancePath + '/metric/type/' + i3,
                  schemaPath: '#/properties/metric/properties/type/items/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err9];
                } else {
                  vErrors.push(err9);
                }
                errors++;
              }
            }
          } else {
            const err10 = {
              instancePath: instancePath + '/metric/type',
              schemaPath: '#/properties/metric/properties/type/type',
              keyword: 'type',
              params: { type: 'array' },
              message: 'must be array',
            };
            if (vErrors === null) {
              vErrors = [err10];
            } else {
              vErrors.push(err10);
            }
            errors++;
          }
        }
        if (data3.id !== undefined) {
          let data7 = data3.id;
          if (typeof data7 === 'string') {
            if (!formats0(data7)) {
              const err11 = {
                instancePath: instancePath + '/metric/id',
                schemaPath: '#/properties/metric/properties/id/format',
                keyword: 'format',
                params: { format: 'uri' },
                message: 'must match format "' + 'uri' + '"',
              };
              if (vErrors === null) {
                vErrors = [err11];
              } else {
                vErrors.push(err11);
              }
              errors++;
            }
          } else {
            const err12 = {
              instancePath: instancePath + '/metric/id',
              schemaPath: '#/properties/metric/properties/id/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err12];
            } else {
              vErrors.push(err12);
            }
            errors++;
          }
        }
        if (data3.name !== undefined) {
          if (typeof data3.name !== 'string') {
            const err13 = {
              instancePath: instancePath + '/metric/name',
              schemaPath: '#/properties/metric/properties/name/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err13];
            } else {
              vErrors.push(err13);
            }
            errors++;
          }
        }
      } else {
        const err14 = {
          instancePath: instancePath + '/metric',
          schemaPath: '#/properties/metric/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err14];
        } else {
          vErrors.push(err14);
        }
        errors++;
      }
    }
    if (data.measure !== undefined) {
      let data9 = data.measure;
      if (data9 && typeof data9 == 'object' && !Array.isArray(data9)) {
        if (data9.value === undefined) {
          const err15 = {
            instancePath: instancePath + '/measure',
            schemaPath: '#/$defs/Measure/required',
            keyword: 'required',
            params: { missingProperty: 'value' },
            message: "must have required property '" + 'value' + "'",
          };
          if (vErrors === null) {
            vErrors = [err15];
          } else {
            vErrors.push(err15);
          }
          errors++;
        }
        if (data9.unit === undefined) {
          const err16 = {
            instancePath: instancePath + '/measure',
            schemaPath: '#/$defs/Measure/required',
            keyword: 'required',
            params: { missingProperty: 'unit' },
            message: "must have required property '" + 'unit' + "'",
          };
          if (vErrors === null) {
            vErrors = [err16];
          } else {
            vErrors.push(err16);
          }
          errors++;
        }
        for (const key1 in data9) {
          if (
            !(
              key1 === 'type' ||
              key1 === 'value' ||
              key1 === 'upperTolerance' ||
              key1 === 'lowerTolerance' ||
              key1 === 'unit'
            )
          ) {
            const err17 = {
              instancePath: instancePath + '/measure',
              schemaPath: '#/$defs/Measure/additionalProperties',
              keyword: 'additionalProperties',
              params: { additionalProperty: key1 },
              message: 'must NOT have additional properties',
            };
            if (vErrors === null) {
              vErrors = [err17];
            } else {
              vErrors.push(err17);
            }
            errors++;
          }
        }
        if (data9.type !== undefined) {
          let data10 = data9.type;
          if (Array.isArray(data10)) {
            const _errs29 = errors;
            const len4 = data10.length;
            for (let i4 = 0; i4 < len4; i4++) {
              const _errs30 = errors;
              if ('Measure' !== data10[i4]) {
                const err18 = {
                  instancePath: instancePath + '/measure/type/' + i4,
                  schemaPath: '#/$defs/Measure/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Measure' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err18];
                } else {
                  vErrors.push(err18);
                }
                errors++;
              }
              var valid13 = _errs30 === errors;
              if (valid13) {
                break;
              }
            }
            if (!valid13) {
              const err19 = {
                instancePath: instancePath + '/measure/type',
                schemaPath: '#/$defs/Measure/properties/type/allOf/0/contains',
                keyword: 'contains',
                params: { minContains: 1 },
                message: 'must contain at least 1 valid item(s)',
              };
              if (vErrors === null) {
                vErrors = [err19];
              } else {
                vErrors.push(err19);
              }
              errors++;
            } else {
              errors = _errs29;
              if (vErrors !== null) {
                if (_errs29) {
                  vErrors.length = _errs29;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data10)) {
            const len5 = data10.length;
            for (let i5 = 0; i5 < len5; i5++) {
              if (typeof data10[i5] !== 'string') {
                const err20 = {
                  instancePath: instancePath + '/measure/type/' + i5,
                  schemaPath: '#/$defs/Measure/properties/type/items/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err20];
                } else {
                  vErrors.push(err20);
                }
                errors++;
              }
            }
          } else {
            const err21 = {
              instancePath: instancePath + '/measure/type',
              schemaPath: '#/$defs/Measure/properties/type/type',
              keyword: 'type',
              params: { type: 'array' },
              message: 'must be array',
            };
            if (vErrors === null) {
              vErrors = [err21];
            } else {
              vErrors.push(err21);
            }
            errors++;
          }
        }
        if (data9.value !== undefined) {
          if (!(typeof data9.value == 'number')) {
            const err22 = {
              instancePath: instancePath + '/measure/value',
              schemaPath: '#/$defs/Measure/properties/value/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            };
            if (vErrors === null) {
              vErrors = [err22];
            } else {
              vErrors.push(err22);
            }
            errors++;
          }
        }
        if (data9.upperTolerance !== undefined) {
          if (!(typeof data9.upperTolerance == 'number')) {
            const err23 = {
              instancePath: instancePath + '/measure/upperTolerance',
              schemaPath: '#/$defs/Measure/properties/upperTolerance/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            };
            if (vErrors === null) {
              vErrors = [err23];
            } else {
              vErrors.push(err23);
            }
            errors++;
          }
        }
        if (data9.lowerTolerance !== undefined) {
          if (!(typeof data9.lowerTolerance == 'number')) {
            const err24 = {
              instancePath: instancePath + '/measure/lowerTolerance',
              schemaPath: '#/$defs/Measure/properties/lowerTolerance/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            };
            if (vErrors === null) {
              vErrors = [err24];
            } else {
              vErrors.push(err24);
            }
            errors++;
          }
        }
        if (data9.unit !== undefined) {
          if (typeof data9.unit !== 'string') {
            const err25 = {
              instancePath: instancePath + '/measure/unit',
              schemaPath: '#/$defs/Measure/properties/unit/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err25];
            } else {
              vErrors.push(err25);
            }
            errors++;
          }
        }
      } else {
        const err26 = {
          instancePath: instancePath + '/measure',
          schemaPath: '#/$defs/Measure/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err26];
        } else {
          vErrors.push(err26);
        }
        errors++;
      }
    }
    if (data.score !== undefined) {
      let data17 = data.score;
      if (data17 && typeof data17 == 'object' && !Array.isArray(data17)) {
        if (data17.code === undefined) {
          const err27 = {
            instancePath: instancePath + '/score',
            schemaPath: '#/$defs/Score/required',
            keyword: 'required',
            params: { missingProperty: 'code' },
            message: "must have required property '" + 'code' + "'",
          };
          if (vErrors === null) {
            vErrors = [err27];
          } else {
            vErrors.push(err27);
          }
          errors++;
        }
        for (const key2 in data17) {
          if (!(key2 === 'type' || key2 === 'code' || key2 === 'rank' || key2 === 'definition')) {
            const err28 = {
              instancePath: instancePath + '/score',
              schemaPath: '#/$defs/Score/additionalProperties',
              keyword: 'additionalProperties',
              params: { additionalProperty: key2 },
              message: 'must NOT have additional properties',
            };
            if (vErrors === null) {
              vErrors = [err28];
            } else {
              vErrors.push(err28);
            }
            errors++;
          }
        }
        if (data17.type !== undefined) {
          let data18 = data17.type;
          if (Array.isArray(data18)) {
            const _errs48 = errors;
            const len6 = data18.length;
            for (let i6 = 0; i6 < len6; i6++) {
              const _errs49 = errors;
              if ('Score' !== data18[i6]) {
                const err29 = {
                  instancePath: instancePath + '/score/type/' + i6,
                  schemaPath: '#/$defs/Score/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Score' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err29];
                } else {
                  vErrors.push(err29);
                }
                errors++;
              }
              var valid19 = _errs49 === errors;
              if (valid19) {
                break;
              }
            }
            if (!valid19) {
              const err30 = {
                instancePath: instancePath + '/score/type',
                schemaPath: '#/$defs/Score/properties/type/allOf/0/contains',
                keyword: 'contains',
                params: { minContains: 1 },
                message: 'must contain at least 1 valid item(s)',
              };
              if (vErrors === null) {
                vErrors = [err30];
              } else {
                vErrors.push(err30);
              }
              errors++;
            } else {
              errors = _errs48;
              if (vErrors !== null) {
                if (_errs48) {
                  vErrors.length = _errs48;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data18)) {
            const len7 = data18.length;
            for (let i7 = 0; i7 < len7; i7++) {
              if (typeof data18[i7] !== 'string') {
                const err31 = {
                  instancePath: instancePath + '/score/type/' + i7,
                  schemaPath: '#/$defs/Score/properties/type/items/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err31];
                } else {
                  vErrors.push(err31);
                }
                errors++;
              }
            }
          } else {
            const err32 = {
              instancePath: instancePath + '/score/type',
              schemaPath: '#/$defs/Score/properties/type/type',
              keyword: 'type',
              params: { type: 'array' },
              message: 'must be array',
            };
            if (vErrors === null) {
              vErrors = [err32];
            } else {
              vErrors.push(err32);
            }
            errors++;
          }
        }
        if (data17.code !== undefined) {
          if (typeof data17.code !== 'string') {
            const err33 = {
              instancePath: instancePath + '/score/code',
              schemaPath: '#/$defs/Score/properties/code/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err33];
            } else {
              vErrors.push(err33);
            }
            errors++;
          }
        }
        if (data17.rank !== undefined) {
          let data22 = data17.rank;
          if (!(typeof data22 == 'number' && !(data22 % 1) && !isNaN(data22))) {
            const err34 = {
              instancePath: instancePath + '/score/rank',
              schemaPath: '#/$defs/Score/properties/rank/type',
              keyword: 'type',
              params: { type: 'integer' },
              message: 'must be integer',
            };
            if (vErrors === null) {
              vErrors = [err34];
            } else {
              vErrors.push(err34);
            }
            errors++;
          }
        }
        if (data17.definition !== undefined) {
          if (typeof data17.definition !== 'string') {
            const err35 = {
              instancePath: instancePath + '/score/definition',
              schemaPath: '#/$defs/Score/properties/definition/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err35];
            } else {
              vErrors.push(err35);
            }
            errors++;
          }
        }
      } else {
        const err36 = {
          instancePath: instancePath + '/score',
          schemaPath: '#/$defs/Score/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err36];
        } else {
          vErrors.push(err36);
        }
        errors++;
      }
    }
    if (data.measure !== undefined) {
      if (data.metric === undefined) {
        const err37 = {
          instancePath,
          schemaPath: '#/dependentRequired',
          keyword: 'dependentRequired',
          params: { property: 'measure', missingProperty: 'metric', depsCount: 1, deps: 'metric' },
          message: 'must have property metric when property measure is present',
        };
        if (vErrors === null) {
          vErrors = [err37];
        } else {
          vErrors.push(err37);
        }
        errors++;
      }
    }
  } else {
    const err38 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: { type: 'object' },
      message: 'must be object',
    };
    if (vErrors === null) {
      vErrors = [err38];
    } else {
      vErrors.push(err38);
    }
    errors++;
  }
  validate24.errors = vErrors;
  return errors === 0;
}
validate24.evaluated = { props: true, dynamicProps: false, dynamicItems: false };
function validate23(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {},
) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate23.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = undefined;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = undefined;
  }
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.id === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'id' },
        message: "must have required property '" + 'id' + "'",
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.name === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'name' },
        message: "must have required property '" + 'name' + "'",
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.assessmentCriteria === undefined) {
      const err2 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'assessmentCriteria' },
        message: "must have required property '" + 'assessmentCriteria' + "'",
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.assessmentDate === undefined) {
      const err3 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'assessmentDate' },
        message: "must have required property '" + 'assessmentDate' + "'",
      };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.assessedPerformance === undefined) {
      const err4 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'assessedPerformance' },
        message: "must have required property '" + 'assessedPerformance' + "'",
      };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.conformityTopic === undefined) {
      const err5 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'conformityTopic' },
        message: "must have required property '" + 'conformityTopic' + "'",
      };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
    }
    if (data.type !== undefined) {
      let data0 = data.type;
      if (Array.isArray(data0)) {
        const _errs5 = errors;
        const len0 = data0.length;
        for (let i0 = 0; i0 < len0; i0++) {
          const _errs6 = errors;
          if ('ConformityAssessment' !== data0[i0]) {
            const err6 = {
              instancePath: instancePath + '/type/' + i0,
              schemaPath: '#/properties/type/allOf/0/contains/const',
              keyword: 'const',
              params: { allowedValue: 'ConformityAssessment' },
              message: 'must be equal to constant',
            };
            if (vErrors === null) {
              vErrors = [err6];
            } else {
              vErrors.push(err6);
            }
            errors++;
          }
          var valid2 = _errs6 === errors;
          if (valid2) {
            break;
          }
        }
        if (!valid2) {
          const err7 = {
            instancePath: instancePath + '/type',
            schemaPath: '#/properties/type/allOf/0/contains',
            keyword: 'contains',
            params: { minContains: 1 },
            message: 'must contain at least 1 valid item(s)',
          };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        } else {
          errors = _errs5;
          if (vErrors !== null) {
            if (_errs5) {
              vErrors.length = _errs5;
            } else {
              vErrors = null;
            }
          }
        }
      }
      if (Array.isArray(data0)) {
        const len1 = data0.length;
        for (let i1 = 0; i1 < len1; i1++) {
          if (typeof data0[i1] !== 'string') {
            const err8 = {
              instancePath: instancePath + '/type/' + i1,
              schemaPath: '#/properties/type/items/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err8];
            } else {
              vErrors.push(err8);
            }
            errors++;
          }
        }
      } else {
        const err9 = {
          instancePath: instancePath + '/type',
          schemaPath: '#/properties/type/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err9];
        } else {
          vErrors.push(err9);
        }
        errors++;
      }
    }
    if (data.id !== undefined) {
      let data3 = data.id;
      if (typeof data3 === 'string') {
        if (!formats0(data3)) {
          const err10 = {
            instancePath: instancePath + '/id',
            schemaPath: '#/properties/id/format',
            keyword: 'format',
            params: { format: 'uri' },
            message: 'must match format "' + 'uri' + '"',
          };
          if (vErrors === null) {
            vErrors = [err10];
          } else {
            vErrors.push(err10);
          }
          errors++;
        }
      } else {
        const err11 = {
          instancePath: instancePath + '/id',
          schemaPath: '#/properties/id/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
    }
    if (data.name !== undefined) {
      if (typeof data.name !== 'string') {
        const err12 = {
          instancePath: instancePath + '/name',
          schemaPath: '#/properties/name/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
    }
    if (data.description !== undefined) {
      if (typeof data.description !== 'string') {
        const err13 = {
          instancePath: instancePath + '/description',
          schemaPath: '#/properties/description/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err13];
        } else {
          vErrors.push(err13);
        }
        errors++;
      }
    }
    if (data.assessmentCriteria !== undefined) {
      let data6 = data.assessmentCriteria;
      if (Array.isArray(data6)) {
        const len2 = data6.length;
        for (let i2 = 0; i2 < len2; i2++) {
          let data7 = data6[i2];
          if (data7 && typeof data7 == 'object' && !Array.isArray(data7)) {
            if (data7.id === undefined) {
              const err14 = {
                instancePath: instancePath + '/assessmentCriteria/' + i2,
                schemaPath: '#/properties/assessmentCriteria/items/required',
                keyword: 'required',
                params: { missingProperty: 'id' },
                message: "must have required property '" + 'id' + "'",
              };
              if (vErrors === null) {
                vErrors = [err14];
              } else {
                vErrors.push(err14);
              }
              errors++;
            }
            if (data7.name === undefined) {
              const err15 = {
                instancePath: instancePath + '/assessmentCriteria/' + i2,
                schemaPath: '#/properties/assessmentCriteria/items/required',
                keyword: 'required',
                params: { missingProperty: 'name' },
                message: "must have required property '" + 'name' + "'",
              };
              if (vErrors === null) {
                vErrors = [err15];
              } else {
                vErrors.push(err15);
              }
              errors++;
            }
            if (data7.type !== undefined) {
              let data8 = data7.type;
              if (Array.isArray(data8)) {
                const _errs22 = errors;
                const len3 = data8.length;
                for (let i3 = 0; i3 < len3; i3++) {
                  const _errs23 = errors;
                  if ('Criterion' !== data8[i3]) {
                    const err16 = {
                      instancePath: instancePath + '/assessmentCriteria/' + i2 + '/type/' + i3,
                      schemaPath:
                        '#/properties/assessmentCriteria/items/properties/type/allOf/0/contains/const',
                      keyword: 'const',
                      params: { allowedValue: 'Criterion' },
                      message: 'must be equal to constant',
                    };
                    if (vErrors === null) {
                      vErrors = [err16];
                    } else {
                      vErrors.push(err16);
                    }
                    errors++;
                  }
                  var valid9 = _errs23 === errors;
                  if (valid9) {
                    break;
                  }
                }
                if (!valid9) {
                  const err17 = {
                    instancePath: instancePath + '/assessmentCriteria/' + i2 + '/type',
                    schemaPath:
                      '#/properties/assessmentCriteria/items/properties/type/allOf/0/contains',
                    keyword: 'contains',
                    params: { minContains: 1 },
                    message: 'must contain at least 1 valid item(s)',
                  };
                  if (vErrors === null) {
                    vErrors = [err17];
                  } else {
                    vErrors.push(err17);
                  }
                  errors++;
                } else {
                  errors = _errs22;
                  if (vErrors !== null) {
                    if (_errs22) {
                      vErrors.length = _errs22;
                    } else {
                      vErrors = null;
                    }
                  }
                }
              }
              if (Array.isArray(data8)) {
                const len4 = data8.length;
                for (let i4 = 0; i4 < len4; i4++) {
                  if (typeof data8[i4] !== 'string') {
                    const err18 = {
                      instancePath: instancePath + '/assessmentCriteria/' + i2 + '/type/' + i4,
                      schemaPath:
                        '#/properties/assessmentCriteria/items/properties/type/items/type',
                      keyword: 'type',
                      params: { type: 'string' },
                      message: 'must be string',
                    };
                    if (vErrors === null) {
                      vErrors = [err18];
                    } else {
                      vErrors.push(err18);
                    }
                    errors++;
                  }
                }
              } else {
                const err19 = {
                  instancePath: instancePath + '/assessmentCriteria/' + i2 + '/type',
                  schemaPath: '#/properties/assessmentCriteria/items/properties/type/type',
                  keyword: 'type',
                  params: { type: 'array' },
                  message: 'must be array',
                };
                if (vErrors === null) {
                  vErrors = [err19];
                } else {
                  vErrors.push(err19);
                }
                errors++;
              }
            }
            if (data7.id !== undefined) {
              let data11 = data7.id;
              if (typeof data11 === 'string') {
                if (!formats0(data11)) {
                  const err20 = {
                    instancePath: instancePath + '/assessmentCriteria/' + i2 + '/id',
                    schemaPath: '#/properties/assessmentCriteria/items/properties/id/format',
                    keyword: 'format',
                    params: { format: 'uri' },
                    message: 'must match format "' + 'uri' + '"',
                  };
                  if (vErrors === null) {
                    vErrors = [err20];
                  } else {
                    vErrors.push(err20);
                  }
                  errors++;
                }
              } else {
                const err21 = {
                  instancePath: instancePath + '/assessmentCriteria/' + i2 + '/id',
                  schemaPath: '#/properties/assessmentCriteria/items/properties/id/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err21];
                } else {
                  vErrors.push(err21);
                }
                errors++;
              }
            }
            if (data7.name !== undefined) {
              if (typeof data7.name !== 'string') {
                const err22 = {
                  instancePath: instancePath + '/assessmentCriteria/' + i2 + '/name',
                  schemaPath: '#/properties/assessmentCriteria/items/properties/name/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err22];
                } else {
                  vErrors.push(err22);
                }
                errors++;
              }
            }
          } else {
            const err23 = {
              instancePath: instancePath + '/assessmentCriteria/' + i2,
              schemaPath: '#/properties/assessmentCriteria/items/type',
              keyword: 'type',
              params: { type: 'object' },
              message: 'must be object',
            };
            if (vErrors === null) {
              vErrors = [err23];
            } else {
              vErrors.push(err23);
            }
            errors++;
          }
        }
      } else {
        const err24 = {
          instancePath: instancePath + '/assessmentCriteria',
          schemaPath: '#/properties/assessmentCriteria/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err24];
        } else {
          vErrors.push(err24);
        }
        errors++;
      }
    }
    if (data.assessmentDate !== undefined) {
      let data13 = data.assessmentDate;
      if (typeof data13 === 'string') {
        if (!formats24.validate(data13)) {
          const err25 = {
            instancePath: instancePath + '/assessmentDate',
            schemaPath: '#/properties/assessmentDate/format',
            keyword: 'format',
            params: { format: 'date' },
            message: 'must match format "' + 'date' + '"',
          };
          if (vErrors === null) {
            vErrors = [err25];
          } else {
            vErrors.push(err25);
          }
          errors++;
        }
      } else {
        const err26 = {
          instancePath: instancePath + '/assessmentDate',
          schemaPath: '#/properties/assessmentDate/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err26];
        } else {
          vErrors.push(err26);
        }
        errors++;
      }
    }
    if (data.assessedPerformance !== undefined) {
      let data14 = data.assessedPerformance;
      if (Array.isArray(data14)) {
        const len5 = data14.length;
        for (let i5 = 0; i5 < len5; i5++) {
          if (
            !validate24(data14[i5], {
              instancePath: instancePath + '/assessedPerformance/' + i5,
              parentData: data14,
              parentDataProperty: i5,
              rootData,
              dynamicAnchors,
            })
          ) {
            vErrors = vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err27 = {
          instancePath: instancePath + '/assessedPerformance',
          schemaPath: '#/properties/assessedPerformance/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err27];
        } else {
          vErrors.push(err27);
        }
        errors++;
      }
    }
    if (data.assessedProduct !== undefined) {
      let data16 = data.assessedProduct;
      if (Array.isArray(data16)) {
        const len6 = data16.length;
        for (let i6 = 0; i6 < len6; i6++) {
          let data17 = data16[i6];
          if (data17 && typeof data17 == 'object' && !Array.isArray(data17)) {
            if (data17.product === undefined) {
              const err28 = {
                instancePath: instancePath + '/assessedProduct/' + i6,
                schemaPath: '#/$defs/ProductVerification/required',
                keyword: 'required',
                params: { missingProperty: 'product' },
                message: "must have required property '" + 'product' + "'",
              };
              if (vErrors === null) {
                vErrors = [err28];
              } else {
                vErrors.push(err28);
              }
              errors++;
            }
            if (data17.type !== undefined) {
              let data18 = data17.type;
              if (Array.isArray(data18)) {
                const _errs44 = errors;
                const len7 = data18.length;
                for (let i7 = 0; i7 < len7; i7++) {
                  const _errs45 = errors;
                  if ('ProductVerification' !== data18[i7]) {
                    const err29 = {
                      instancePath: instancePath + '/assessedProduct/' + i6 + '/type/' + i7,
                      schemaPath:
                        '#/$defs/ProductVerification/properties/type/allOf/0/contains/const',
                      keyword: 'const',
                      params: { allowedValue: 'ProductVerification' },
                      message: 'must be equal to constant',
                    };
                    if (vErrors === null) {
                      vErrors = [err29];
                    } else {
                      vErrors.push(err29);
                    }
                    errors++;
                  }
                  var valid19 = _errs45 === errors;
                  if (valid19) {
                    break;
                  }
                }
                if (!valid19) {
                  const err30 = {
                    instancePath: instancePath + '/assessedProduct/' + i6 + '/type',
                    schemaPath: '#/$defs/ProductVerification/properties/type/allOf/0/contains',
                    keyword: 'contains',
                    params: { minContains: 1 },
                    message: 'must contain at least 1 valid item(s)',
                  };
                  if (vErrors === null) {
                    vErrors = [err30];
                  } else {
                    vErrors.push(err30);
                  }
                  errors++;
                } else {
                  errors = _errs44;
                  if (vErrors !== null) {
                    if (_errs44) {
                      vErrors.length = _errs44;
                    } else {
                      vErrors = null;
                    }
                  }
                }
              }
              if (Array.isArray(data18)) {
                const len8 = data18.length;
                for (let i8 = 0; i8 < len8; i8++) {
                  if (typeof data18[i8] !== 'string') {
                    const err31 = {
                      instancePath: instancePath + '/assessedProduct/' + i6 + '/type/' + i8,
                      schemaPath: '#/$defs/ProductVerification/properties/type/items/type',
                      keyword: 'type',
                      params: { type: 'string' },
                      message: 'must be string',
                    };
                    if (vErrors === null) {
                      vErrors = [err31];
                    } else {
                      vErrors.push(err31);
                    }
                    errors++;
                  }
                }
              } else {
                const err32 = {
                  instancePath: instancePath + '/assessedProduct/' + i6 + '/type',
                  schemaPath: '#/$defs/ProductVerification/properties/type/type',
                  keyword: 'type',
                  params: { type: 'array' },
                  message: 'must be array',
                };
                if (vErrors === null) {
                  vErrors = [err32];
                } else {
                  vErrors.push(err32);
                }
                errors++;
              }
            }
            if (data17.product !== undefined) {
              let data21 = data17.product;
              if (data21 && typeof data21 == 'object' && !Array.isArray(data21)) {
                if (data21.id === undefined) {
                  const err33 = {
                    instancePath: instancePath + '/assessedProduct/' + i6 + '/product',
                    schemaPath: '#/$defs/ProductVerification/properties/product/required',
                    keyword: 'required',
                    params: { missingProperty: 'id' },
                    message: "must have required property '" + 'id' + "'",
                  };
                  if (vErrors === null) {
                    vErrors = [err33];
                  } else {
                    vErrors.push(err33);
                  }
                  errors++;
                }
                if (data21.name === undefined) {
                  const err34 = {
                    instancePath: instancePath + '/assessedProduct/' + i6 + '/product',
                    schemaPath: '#/$defs/ProductVerification/properties/product/required',
                    keyword: 'required',
                    params: { missingProperty: 'name' },
                    message: "must have required property '" + 'name' + "'",
                  };
                  if (vErrors === null) {
                    vErrors = [err34];
                  } else {
                    vErrors.push(err34);
                  }
                  errors++;
                }
                if (data21.type !== undefined) {
                  let data22 = data21.type;
                  if (Array.isArray(data22)) {
                    const _errs53 = errors;
                    const len9 = data22.length;
                    for (let i9 = 0; i9 < len9; i9++) {
                      const _errs54 = errors;
                      if ('Product' !== data22[i9]) {
                        const err35 = {
                          instancePath:
                            instancePath + '/assessedProduct/' + i6 + '/product/type/' + i9,
                          schemaPath:
                            '#/$defs/ProductVerification/properties/product/properties/type/allOf/0/contains/const',
                          keyword: 'const',
                          params: { allowedValue: 'Product' },
                          message: 'must be equal to constant',
                        };
                        if (vErrors === null) {
                          vErrors = [err35];
                        } else {
                          vErrors.push(err35);
                        }
                        errors++;
                      }
                      var valid24 = _errs54 === errors;
                      if (valid24) {
                        break;
                      }
                    }
                    if (!valid24) {
                      const err36 = {
                        instancePath: instancePath + '/assessedProduct/' + i6 + '/product/type',
                        schemaPath:
                          '#/$defs/ProductVerification/properties/product/properties/type/allOf/0/contains',
                        keyword: 'contains',
                        params: { minContains: 1 },
                        message: 'must contain at least 1 valid item(s)',
                      };
                      if (vErrors === null) {
                        vErrors = [err36];
                      } else {
                        vErrors.push(err36);
                      }
                      errors++;
                    } else {
                      errors = _errs53;
                      if (vErrors !== null) {
                        if (_errs53) {
                          vErrors.length = _errs53;
                        } else {
                          vErrors = null;
                        }
                      }
                    }
                  }
                  if (Array.isArray(data22)) {
                    const len10 = data22.length;
                    for (let i10 = 0; i10 < len10; i10++) {
                      if (typeof data22[i10] !== 'string') {
                        const err37 = {
                          instancePath:
                            instancePath + '/assessedProduct/' + i6 + '/product/type/' + i10,
                          schemaPath:
                            '#/$defs/ProductVerification/properties/product/properties/type/items/type',
                          keyword: 'type',
                          params: { type: 'string' },
                          message: 'must be string',
                        };
                        if (vErrors === null) {
                          vErrors = [err37];
                        } else {
                          vErrors.push(err37);
                        }
                        errors++;
                      }
                    }
                  } else {
                    const err38 = {
                      instancePath: instancePath + '/assessedProduct/' + i6 + '/product/type',
                      schemaPath:
                        '#/$defs/ProductVerification/properties/product/properties/type/type',
                      keyword: 'type',
                      params: { type: 'array' },
                      message: 'must be array',
                    };
                    if (vErrors === null) {
                      vErrors = [err38];
                    } else {
                      vErrors.push(err38);
                    }
                    errors++;
                  }
                }
                if (data21.id !== undefined) {
                  let data25 = data21.id;
                  if (typeof data25 === 'string') {
                    if (!formats0(data25)) {
                      const err39 = {
                        instancePath: instancePath + '/assessedProduct/' + i6 + '/product/id',
                        schemaPath:
                          '#/$defs/ProductVerification/properties/product/properties/id/format',
                        keyword: 'format',
                        params: { format: 'uri' },
                        message: 'must match format "' + 'uri' + '"',
                      };
                      if (vErrors === null) {
                        vErrors = [err39];
                      } else {
                        vErrors.push(err39);
                      }
                      errors++;
                    }
                  } else {
                    const err40 = {
                      instancePath: instancePath + '/assessedProduct/' + i6 + '/product/id',
                      schemaPath:
                        '#/$defs/ProductVerification/properties/product/properties/id/type',
                      keyword: 'type',
                      params: { type: 'string' },
                      message: 'must be string',
                    };
                    if (vErrors === null) {
                      vErrors = [err40];
                    } else {
                      vErrors.push(err40);
                    }
                    errors++;
                  }
                }
                if (data21.name !== undefined) {
                  if (typeof data21.name !== 'string') {
                    const err41 = {
                      instancePath: instancePath + '/assessedProduct/' + i6 + '/product/name',
                      schemaPath:
                        '#/$defs/ProductVerification/properties/product/properties/name/type',
                      keyword: 'type',
                      params: { type: 'string' },
                      message: 'must be string',
                    };
                    if (vErrors === null) {
                      vErrors = [err41];
                    } else {
                      vErrors.push(err41);
                    }
                    errors++;
                  }
                }
                if (data21.modelNumber !== undefined) {
                  if (typeof data21.modelNumber !== 'string') {
                    const err42 = {
                      instancePath:
                        instancePath + '/assessedProduct/' + i6 + '/product/modelNumber',
                      schemaPath:
                        '#/$defs/ProductVerification/properties/product/properties/modelNumber/type',
                      keyword: 'type',
                      params: { type: 'string' },
                      message: 'must be string',
                    };
                    if (vErrors === null) {
                      vErrors = [err42];
                    } else {
                      vErrors.push(err42);
                    }
                    errors++;
                  }
                }
                if (data21.batchNumber !== undefined) {
                  if (typeof data21.batchNumber !== 'string') {
                    const err43 = {
                      instancePath:
                        instancePath + '/assessedProduct/' + i6 + '/product/batchNumber',
                      schemaPath:
                        '#/$defs/ProductVerification/properties/product/properties/batchNumber/type',
                      keyword: 'type',
                      params: { type: 'string' },
                      message: 'must be string',
                    };
                    if (vErrors === null) {
                      vErrors = [err43];
                    } else {
                      vErrors.push(err43);
                    }
                    errors++;
                  }
                }
                if (data21.itemNumber !== undefined) {
                  if (typeof data21.itemNumber !== 'string') {
                    const err44 = {
                      instancePath: instancePath + '/assessedProduct/' + i6 + '/product/itemNumber',
                      schemaPath:
                        '#/$defs/ProductVerification/properties/product/properties/itemNumber/type',
                      keyword: 'type',
                      params: { type: 'string' },
                      message: 'must be string',
                    };
                    if (vErrors === null) {
                      vErrors = [err44];
                    } else {
                      vErrors.push(err44);
                    }
                    errors++;
                  }
                }
              } else {
                const err45 = {
                  instancePath: instancePath + '/assessedProduct/' + i6 + '/product',
                  schemaPath: '#/$defs/ProductVerification/properties/product/type',
                  keyword: 'type',
                  params: { type: 'object' },
                  message: 'must be object',
                };
                if (vErrors === null) {
                  vErrors = [err45];
                } else {
                  vErrors.push(err45);
                }
                errors++;
              }
            }
            if (data17.idVerifiedByCAB !== undefined) {
              if (typeof data17.idVerifiedByCAB !== 'boolean') {
                const err46 = {
                  instancePath: instancePath + '/assessedProduct/' + i6 + '/idVerifiedByCAB',
                  schemaPath: '#/$defs/ProductVerification/properties/idVerifiedByCAB/type',
                  keyword: 'type',
                  params: { type: 'boolean' },
                  message: 'must be boolean',
                };
                if (vErrors === null) {
                  vErrors = [err46];
                } else {
                  vErrors.push(err46);
                }
                errors++;
              }
            }
          } else {
            const err47 = {
              instancePath: instancePath + '/assessedProduct/' + i6,
              schemaPath: '#/$defs/ProductVerification/type',
              keyword: 'type',
              params: { type: 'object' },
              message: 'must be object',
            };
            if (vErrors === null) {
              vErrors = [err47];
            } else {
              vErrors.push(err47);
            }
            errors++;
          }
        }
      } else {
        const err48 = {
          instancePath: instancePath + '/assessedProduct',
          schemaPath: '#/properties/assessedProduct/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err48];
        } else {
          vErrors.push(err48);
        }
        errors++;
      }
    }
    if (data.assessedFacility !== undefined) {
      let data31 = data.assessedFacility;
      if (Array.isArray(data31)) {
        const len11 = data31.length;
        for (let i11 = 0; i11 < len11; i11++) {
          let data32 = data31[i11];
          if (data32 && typeof data32 == 'object' && !Array.isArray(data32)) {
            if (data32.facility === undefined) {
              const err49 = {
                instancePath: instancePath + '/assessedFacility/' + i11,
                schemaPath: '#/$defs/FacilityVerification/required',
                keyword: 'required',
                params: { missingProperty: 'facility' },
                message: "must have required property '" + 'facility' + "'",
              };
              if (vErrors === null) {
                vErrors = [err49];
              } else {
                vErrors.push(err49);
              }
              errors++;
            }
            if (data32.type !== undefined) {
              let data33 = data32.type;
              if (Array.isArray(data33)) {
                const _errs78 = errors;
                const len12 = data33.length;
                for (let i12 = 0; i12 < len12; i12++) {
                  const _errs79 = errors;
                  if ('FacilityVerification' !== data33[i12]) {
                    const err50 = {
                      instancePath: instancePath + '/assessedFacility/' + i11 + '/type/' + i12,
                      schemaPath:
                        '#/$defs/FacilityVerification/properties/type/allOf/0/contains/const',
                      keyword: 'const',
                      params: { allowedValue: 'FacilityVerification' },
                      message: 'must be equal to constant',
                    };
                    if (vErrors === null) {
                      vErrors = [err50];
                    } else {
                      vErrors.push(err50);
                    }
                    errors++;
                  }
                  var valid32 = _errs79 === errors;
                  if (valid32) {
                    break;
                  }
                }
                if (!valid32) {
                  const err51 = {
                    instancePath: instancePath + '/assessedFacility/' + i11 + '/type',
                    schemaPath: '#/$defs/FacilityVerification/properties/type/allOf/0/contains',
                    keyword: 'contains',
                    params: { minContains: 1 },
                    message: 'must contain at least 1 valid item(s)',
                  };
                  if (vErrors === null) {
                    vErrors = [err51];
                  } else {
                    vErrors.push(err51);
                  }
                  errors++;
                } else {
                  errors = _errs78;
                  if (vErrors !== null) {
                    if (_errs78) {
                      vErrors.length = _errs78;
                    } else {
                      vErrors = null;
                    }
                  }
                }
              }
              if (Array.isArray(data33)) {
                const len13 = data33.length;
                for (let i13 = 0; i13 < len13; i13++) {
                  if (typeof data33[i13] !== 'string') {
                    const err52 = {
                      instancePath: instancePath + '/assessedFacility/' + i11 + '/type/' + i13,
                      schemaPath: '#/$defs/FacilityVerification/properties/type/items/type',
                      keyword: 'type',
                      params: { type: 'string' },
                      message: 'must be string',
                    };
                    if (vErrors === null) {
                      vErrors = [err52];
                    } else {
                      vErrors.push(err52);
                    }
                    errors++;
                  }
                }
              } else {
                const err53 = {
                  instancePath: instancePath + '/assessedFacility/' + i11 + '/type',
                  schemaPath: '#/$defs/FacilityVerification/properties/type/type',
                  keyword: 'type',
                  params: { type: 'array' },
                  message: 'must be array',
                };
                if (vErrors === null) {
                  vErrors = [err53];
                } else {
                  vErrors.push(err53);
                }
                errors++;
              }
            }
            if (data32.facility !== undefined) {
              let data36 = data32.facility;
              if (data36 && typeof data36 == 'object' && !Array.isArray(data36)) {
                if (data36.id === undefined) {
                  const err54 = {
                    instancePath: instancePath + '/assessedFacility/' + i11 + '/facility',
                    schemaPath: '#/$defs/FacilityVerification/properties/facility/required',
                    keyword: 'required',
                    params: { missingProperty: 'id' },
                    message: "must have required property '" + 'id' + "'",
                  };
                  if (vErrors === null) {
                    vErrors = [err54];
                  } else {
                    vErrors.push(err54);
                  }
                  errors++;
                }
                if (data36.name === undefined) {
                  const err55 = {
                    instancePath: instancePath + '/assessedFacility/' + i11 + '/facility',
                    schemaPath: '#/$defs/FacilityVerification/properties/facility/required',
                    keyword: 'required',
                    params: { missingProperty: 'name' },
                    message: "must have required property '" + 'name' + "'",
                  };
                  if (vErrors === null) {
                    vErrors = [err55];
                  } else {
                    vErrors.push(err55);
                  }
                  errors++;
                }
                if (data36.type !== undefined) {
                  let data37 = data36.type;
                  if (Array.isArray(data37)) {
                    const _errs87 = errors;
                    const len14 = data37.length;
                    for (let i14 = 0; i14 < len14; i14++) {
                      const _errs88 = errors;
                      if ('Facility' !== data37[i14]) {
                        const err56 = {
                          instancePath:
                            instancePath + '/assessedFacility/' + i11 + '/facility/type/' + i14,
                          schemaPath:
                            '#/$defs/FacilityVerification/properties/facility/properties/type/allOf/0/contains/const',
                          keyword: 'const',
                          params: { allowedValue: 'Facility' },
                          message: 'must be equal to constant',
                        };
                        if (vErrors === null) {
                          vErrors = [err56];
                        } else {
                          vErrors.push(err56);
                        }
                        errors++;
                      }
                      var valid37 = _errs88 === errors;
                      if (valid37) {
                        break;
                      }
                    }
                    if (!valid37) {
                      const err57 = {
                        instancePath: instancePath + '/assessedFacility/' + i11 + '/facility/type',
                        schemaPath:
                          '#/$defs/FacilityVerification/properties/facility/properties/type/allOf/0/contains',
                        keyword: 'contains',
                        params: { minContains: 1 },
                        message: 'must contain at least 1 valid item(s)',
                      };
                      if (vErrors === null) {
                        vErrors = [err57];
                      } else {
                        vErrors.push(err57);
                      }
                      errors++;
                    } else {
                      errors = _errs87;
                      if (vErrors !== null) {
                        if (_errs87) {
                          vErrors.length = _errs87;
                        } else {
                          vErrors = null;
                        }
                      }
                    }
                  }
                  if (Array.isArray(data37)) {
                    const len15 = data37.length;
                    for (let i15 = 0; i15 < len15; i15++) {
                      if (typeof data37[i15] !== 'string') {
                        const err58 = {
                          instancePath:
                            instancePath + '/assessedFacility/' + i11 + '/facility/type/' + i15,
                          schemaPath:
                            '#/$defs/FacilityVerification/properties/facility/properties/type/items/type',
                          keyword: 'type',
                          params: { type: 'string' },
                          message: 'must be string',
                        };
                        if (vErrors === null) {
                          vErrors = [err58];
                        } else {
                          vErrors.push(err58);
                        }
                        errors++;
                      }
                    }
                  } else {
                    const err59 = {
                      instancePath: instancePath + '/assessedFacility/' + i11 + '/facility/type',
                      schemaPath:
                        '#/$defs/FacilityVerification/properties/facility/properties/type/type',
                      keyword: 'type',
                      params: { type: 'array' },
                      message: 'must be array',
                    };
                    if (vErrors === null) {
                      vErrors = [err59];
                    } else {
                      vErrors.push(err59);
                    }
                    errors++;
                  }
                }
                if (data36.id !== undefined) {
                  let data40 = data36.id;
                  if (typeof data40 === 'string') {
                    if (!formats0(data40)) {
                      const err60 = {
                        instancePath: instancePath + '/assessedFacility/' + i11 + '/facility/id',
                        schemaPath:
                          '#/$defs/FacilityVerification/properties/facility/properties/id/format',
                        keyword: 'format',
                        params: { format: 'uri' },
                        message: 'must match format "' + 'uri' + '"',
                      };
                      if (vErrors === null) {
                        vErrors = [err60];
                      } else {
                        vErrors.push(err60);
                      }
                      errors++;
                    }
                  } else {
                    const err61 = {
                      instancePath: instancePath + '/assessedFacility/' + i11 + '/facility/id',
                      schemaPath:
                        '#/$defs/FacilityVerification/properties/facility/properties/id/type',
                      keyword: 'type',
                      params: { type: 'string' },
                      message: 'must be string',
                    };
                    if (vErrors === null) {
                      vErrors = [err61];
                    } else {
                      vErrors.push(err61);
                    }
                    errors++;
                  }
                }
                if (data36.name !== undefined) {
                  if (typeof data36.name !== 'string') {
                    const err62 = {
                      instancePath: instancePath + '/assessedFacility/' + i11 + '/facility/name',
                      schemaPath:
                        '#/$defs/FacilityVerification/properties/facility/properties/name/type',
                      keyword: 'type',
                      params: { type: 'string' },
                      message: 'must be string',
                    };
                    if (vErrors === null) {
                      vErrors = [err62];
                    } else {
                      vErrors.push(err62);
                    }
                    errors++;
                  }
                }
                if (data36.registeredId !== undefined) {
                  if (typeof data36.registeredId !== 'string') {
                    const err63 = {
                      instancePath:
                        instancePath + '/assessedFacility/' + i11 + '/facility/registeredId',
                      schemaPath:
                        '#/$defs/FacilityVerification/properties/facility/properties/registeredId/type',
                      keyword: 'type',
                      params: { type: 'string' },
                      message: 'must be string',
                    };
                    if (vErrors === null) {
                      vErrors = [err63];
                    } else {
                      vErrors.push(err63);
                    }
                    errors++;
                  }
                }
              } else {
                const err64 = {
                  instancePath: instancePath + '/assessedFacility/' + i11 + '/facility',
                  schemaPath: '#/$defs/FacilityVerification/properties/facility/type',
                  keyword: 'type',
                  params: { type: 'object' },
                  message: 'must be object',
                };
                if (vErrors === null) {
                  vErrors = [err64];
                } else {
                  vErrors.push(err64);
                }
                errors++;
              }
            }
            if (data32.idVerifiedByCAB !== undefined) {
              if (typeof data32.idVerifiedByCAB !== 'boolean') {
                const err65 = {
                  instancePath: instancePath + '/assessedFacility/' + i11 + '/idVerifiedByCAB',
                  schemaPath: '#/$defs/FacilityVerification/properties/idVerifiedByCAB/type',
                  keyword: 'type',
                  params: { type: 'boolean' },
                  message: 'must be boolean',
                };
                if (vErrors === null) {
                  vErrors = [err65];
                } else {
                  vErrors.push(err65);
                }
                errors++;
              }
            }
          } else {
            const err66 = {
              instancePath: instancePath + '/assessedFacility/' + i11,
              schemaPath: '#/$defs/FacilityVerification/type',
              keyword: 'type',
              params: { type: 'object' },
              message: 'must be object',
            };
            if (vErrors === null) {
              vErrors = [err66];
            } else {
              vErrors.push(err66);
            }
            errors++;
          }
        }
      } else {
        const err67 = {
          instancePath: instancePath + '/assessedFacility',
          schemaPath: '#/properties/assessedFacility/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err67];
        } else {
          vErrors.push(err67);
        }
        errors++;
      }
    }
    if (data.assessedOrganisation !== undefined) {
      let data44 = data.assessedOrganisation;
      if (data44 && typeof data44 == 'object' && !Array.isArray(data44)) {
        if (data44.id === undefined) {
          const err68 = {
            instancePath: instancePath + '/assessedOrganisation',
            schemaPath: '#/properties/assessedOrganisation/required',
            keyword: 'required',
            params: { missingProperty: 'id' },
            message: "must have required property '" + 'id' + "'",
          };
          if (vErrors === null) {
            vErrors = [err68];
          } else {
            vErrors.push(err68);
          }
          errors++;
        }
        if (data44.name === undefined) {
          const err69 = {
            instancePath: instancePath + '/assessedOrganisation',
            schemaPath: '#/properties/assessedOrganisation/required',
            keyword: 'required',
            params: { missingProperty: 'name' },
            message: "must have required property '" + 'name' + "'",
          };
          if (vErrors === null) {
            vErrors = [err69];
          } else {
            vErrors.push(err69);
          }
          errors++;
        }
        if (data44.type !== undefined) {
          let data45 = data44.type;
          if (Array.isArray(data45)) {
            const _errs104 = errors;
            const len16 = data45.length;
            for (let i16 = 0; i16 < len16; i16++) {
              const _errs105 = errors;
              if ('Party' !== data45[i16]) {
                const err70 = {
                  instancePath: instancePath + '/assessedOrganisation/type/' + i16,
                  schemaPath:
                    '#/properties/assessedOrganisation/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Party' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err70];
                } else {
                  vErrors.push(err70);
                }
                errors++;
              }
              var valid42 = _errs105 === errors;
              if (valid42) {
                break;
              }
            }
            if (!valid42) {
              const err71 = {
                instancePath: instancePath + '/assessedOrganisation/type',
                schemaPath: '#/properties/assessedOrganisation/properties/type/allOf/0/contains',
                keyword: 'contains',
                params: { minContains: 1 },
                message: 'must contain at least 1 valid item(s)',
              };
              if (vErrors === null) {
                vErrors = [err71];
              } else {
                vErrors.push(err71);
              }
              errors++;
            } else {
              errors = _errs104;
              if (vErrors !== null) {
                if (_errs104) {
                  vErrors.length = _errs104;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data45)) {
            const len17 = data45.length;
            for (let i17 = 0; i17 < len17; i17++) {
              if (typeof data45[i17] !== 'string') {
                const err72 = {
                  instancePath: instancePath + '/assessedOrganisation/type/' + i17,
                  schemaPath: '#/properties/assessedOrganisation/properties/type/items/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err72];
                } else {
                  vErrors.push(err72);
                }
                errors++;
              }
            }
          } else {
            const err73 = {
              instancePath: instancePath + '/assessedOrganisation/type',
              schemaPath: '#/properties/assessedOrganisation/properties/type/type',
              keyword: 'type',
              params: { type: 'array' },
              message: 'must be array',
            };
            if (vErrors === null) {
              vErrors = [err73];
            } else {
              vErrors.push(err73);
            }
            errors++;
          }
        }
        if (data44.id !== undefined) {
          let data48 = data44.id;
          if (typeof data48 === 'string') {
            if (!formats0(data48)) {
              const err74 = {
                instancePath: instancePath + '/assessedOrganisation/id',
                schemaPath: '#/properties/assessedOrganisation/properties/id/format',
                keyword: 'format',
                params: { format: 'uri' },
                message: 'must match format "' + 'uri' + '"',
              };
              if (vErrors === null) {
                vErrors = [err74];
              } else {
                vErrors.push(err74);
              }
              errors++;
            }
          } else {
            const err75 = {
              instancePath: instancePath + '/assessedOrganisation/id',
              schemaPath: '#/properties/assessedOrganisation/properties/id/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err75];
            } else {
              vErrors.push(err75);
            }
            errors++;
          }
        }
        if (data44.name !== undefined) {
          if (typeof data44.name !== 'string') {
            const err76 = {
              instancePath: instancePath + '/assessedOrganisation/name',
              schemaPath: '#/properties/assessedOrganisation/properties/name/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err76];
            } else {
              vErrors.push(err76);
            }
            errors++;
          }
        }
      } else {
        const err77 = {
          instancePath: instancePath + '/assessedOrganisation',
          schemaPath: '#/properties/assessedOrganisation/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err77];
        } else {
          vErrors.push(err77);
        }
        errors++;
      }
    }
    if (data.referenceStandard !== undefined) {
      let data50 = data.referenceStandard;
      if (Array.isArray(data50)) {
        const len18 = data50.length;
        for (let i18 = 0; i18 < len18; i18++) {
          let data51 = data50[i18];
          if (data51 && typeof data51 == 'object' && !Array.isArray(data51)) {
            if (data51.id === undefined) {
              const err78 = {
                instancePath: instancePath + '/referenceStandard/' + i18,
                schemaPath: '#/properties/referenceStandard/items/required',
                keyword: 'required',
                params: { missingProperty: 'id' },
                message: "must have required property '" + 'id' + "'",
              };
              if (vErrors === null) {
                vErrors = [err78];
              } else {
                vErrors.push(err78);
              }
              errors++;
            }
            if (data51.name === undefined) {
              const err79 = {
                instancePath: instancePath + '/referenceStandard/' + i18,
                schemaPath: '#/properties/referenceStandard/items/required',
                keyword: 'required',
                params: { missingProperty: 'name' },
                message: "must have required property '" + 'name' + "'",
              };
              if (vErrors === null) {
                vErrors = [err79];
              } else {
                vErrors.push(err79);
              }
              errors++;
            }
            if (data51.type !== undefined) {
              let data52 = data51.type;
              if (Array.isArray(data52)) {
                const _errs119 = errors;
                const len19 = data52.length;
                for (let i19 = 0; i19 < len19; i19++) {
                  const _errs120 = errors;
                  if ('Standard' !== data52[i19]) {
                    const err80 = {
                      instancePath: instancePath + '/referenceStandard/' + i18 + '/type/' + i19,
                      schemaPath:
                        '#/properties/referenceStandard/items/properties/type/allOf/0/contains/const',
                      keyword: 'const',
                      params: { allowedValue: 'Standard' },
                      message: 'must be equal to constant',
                    };
                    if (vErrors === null) {
                      vErrors = [err80];
                    } else {
                      vErrors.push(err80);
                    }
                    errors++;
                  }
                  var valid49 = _errs120 === errors;
                  if (valid49) {
                    break;
                  }
                }
                if (!valid49) {
                  const err81 = {
                    instancePath: instancePath + '/referenceStandard/' + i18 + '/type',
                    schemaPath:
                      '#/properties/referenceStandard/items/properties/type/allOf/0/contains',
                    keyword: 'contains',
                    params: { minContains: 1 },
                    message: 'must contain at least 1 valid item(s)',
                  };
                  if (vErrors === null) {
                    vErrors = [err81];
                  } else {
                    vErrors.push(err81);
                  }
                  errors++;
                } else {
                  errors = _errs119;
                  if (vErrors !== null) {
                    if (_errs119) {
                      vErrors.length = _errs119;
                    } else {
                      vErrors = null;
                    }
                  }
                }
              }
              if (Array.isArray(data52)) {
                const len20 = data52.length;
                for (let i20 = 0; i20 < len20; i20++) {
                  if (typeof data52[i20] !== 'string') {
                    const err82 = {
                      instancePath: instancePath + '/referenceStandard/' + i18 + '/type/' + i20,
                      schemaPath: '#/properties/referenceStandard/items/properties/type/items/type',
                      keyword: 'type',
                      params: { type: 'string' },
                      message: 'must be string',
                    };
                    if (vErrors === null) {
                      vErrors = [err82];
                    } else {
                      vErrors.push(err82);
                    }
                    errors++;
                  }
                }
              } else {
                const err83 = {
                  instancePath: instancePath + '/referenceStandard/' + i18 + '/type',
                  schemaPath: '#/properties/referenceStandard/items/properties/type/type',
                  keyword: 'type',
                  params: { type: 'array' },
                  message: 'must be array',
                };
                if (vErrors === null) {
                  vErrors = [err83];
                } else {
                  vErrors.push(err83);
                }
                errors++;
              }
            }
            if (data51.id !== undefined) {
              let data55 = data51.id;
              if (typeof data55 === 'string') {
                if (!formats0(data55)) {
                  const err84 = {
                    instancePath: instancePath + '/referenceStandard/' + i18 + '/id',
                    schemaPath: '#/properties/referenceStandard/items/properties/id/format',
                    keyword: 'format',
                    params: { format: 'uri' },
                    message: 'must match format "' + 'uri' + '"',
                  };
                  if (vErrors === null) {
                    vErrors = [err84];
                  } else {
                    vErrors.push(err84);
                  }
                  errors++;
                }
              } else {
                const err85 = {
                  instancePath: instancePath + '/referenceStandard/' + i18 + '/id',
                  schemaPath: '#/properties/referenceStandard/items/properties/id/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err85];
                } else {
                  vErrors.push(err85);
                }
                errors++;
              }
            }
            if (data51.name !== undefined) {
              if (typeof data51.name !== 'string') {
                const err86 = {
                  instancePath: instancePath + '/referenceStandard/' + i18 + '/name',
                  schemaPath: '#/properties/referenceStandard/items/properties/name/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err86];
                } else {
                  vErrors.push(err86);
                }
                errors++;
              }
            }
          } else {
            const err87 = {
              instancePath: instancePath + '/referenceStandard/' + i18,
              schemaPath: '#/properties/referenceStandard/items/type',
              keyword: 'type',
              params: { type: 'object' },
              message: 'must be object',
            };
            if (vErrors === null) {
              vErrors = [err87];
            } else {
              vErrors.push(err87);
            }
            errors++;
          }
        }
      } else {
        const err88 = {
          instancePath: instancePath + '/referenceStandard',
          schemaPath: '#/properties/referenceStandard/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err88];
        } else {
          vErrors.push(err88);
        }
        errors++;
      }
    }
    if (data.referenceRegulation !== undefined) {
      let data57 = data.referenceRegulation;
      if (Array.isArray(data57)) {
        const len21 = data57.length;
        for (let i21 = 0; i21 < len21; i21++) {
          let data58 = data57[i21];
          if (data58 && typeof data58 == 'object' && !Array.isArray(data58)) {
            if (data58.id === undefined) {
              const err89 = {
                instancePath: instancePath + '/referenceRegulation/' + i21,
                schemaPath: '#/properties/referenceRegulation/items/required',
                keyword: 'required',
                params: { missingProperty: 'id' },
                message: "must have required property '" + 'id' + "'",
              };
              if (vErrors === null) {
                vErrors = [err89];
              } else {
                vErrors.push(err89);
              }
              errors++;
            }
            if (data58.name === undefined) {
              const err90 = {
                instancePath: instancePath + '/referenceRegulation/' + i21,
                schemaPath: '#/properties/referenceRegulation/items/required',
                keyword: 'required',
                params: { missingProperty: 'name' },
                message: "must have required property '" + 'name' + "'",
              };
              if (vErrors === null) {
                vErrors = [err90];
              } else {
                vErrors.push(err90);
              }
              errors++;
            }
            if (data58.type !== undefined) {
              let data59 = data58.type;
              if (Array.isArray(data59)) {
                const _errs134 = errors;
                const len22 = data59.length;
                for (let i22 = 0; i22 < len22; i22++) {
                  const _errs135 = errors;
                  if ('Regulation' !== data59[i22]) {
                    const err91 = {
                      instancePath: instancePath + '/referenceRegulation/' + i21 + '/type/' + i22,
                      schemaPath:
                        '#/properties/referenceRegulation/items/properties/type/allOf/0/contains/const',
                      keyword: 'const',
                      params: { allowedValue: 'Regulation' },
                      message: 'must be equal to constant',
                    };
                    if (vErrors === null) {
                      vErrors = [err91];
                    } else {
                      vErrors.push(err91);
                    }
                    errors++;
                  }
                  var valid56 = _errs135 === errors;
                  if (valid56) {
                    break;
                  }
                }
                if (!valid56) {
                  const err92 = {
                    instancePath: instancePath + '/referenceRegulation/' + i21 + '/type',
                    schemaPath:
                      '#/properties/referenceRegulation/items/properties/type/allOf/0/contains',
                    keyword: 'contains',
                    params: { minContains: 1 },
                    message: 'must contain at least 1 valid item(s)',
                  };
                  if (vErrors === null) {
                    vErrors = [err92];
                  } else {
                    vErrors.push(err92);
                  }
                  errors++;
                } else {
                  errors = _errs134;
                  if (vErrors !== null) {
                    if (_errs134) {
                      vErrors.length = _errs134;
                    } else {
                      vErrors = null;
                    }
                  }
                }
              }
              if (Array.isArray(data59)) {
                const len23 = data59.length;
                for (let i23 = 0; i23 < len23; i23++) {
                  if (typeof data59[i23] !== 'string') {
                    const err93 = {
                      instancePath: instancePath + '/referenceRegulation/' + i21 + '/type/' + i23,
                      schemaPath:
                        '#/properties/referenceRegulation/items/properties/type/items/type',
                      keyword: 'type',
                      params: { type: 'string' },
                      message: 'must be string',
                    };
                    if (vErrors === null) {
                      vErrors = [err93];
                    } else {
                      vErrors.push(err93);
                    }
                    errors++;
                  }
                }
              } else {
                const err94 = {
                  instancePath: instancePath + '/referenceRegulation/' + i21 + '/type',
                  schemaPath: '#/properties/referenceRegulation/items/properties/type/type',
                  keyword: 'type',
                  params: { type: 'array' },
                  message: 'must be array',
                };
                if (vErrors === null) {
                  vErrors = [err94];
                } else {
                  vErrors.push(err94);
                }
                errors++;
              }
            }
            if (data58.id !== undefined) {
              let data62 = data58.id;
              if (typeof data62 === 'string') {
                if (!formats0(data62)) {
                  const err95 = {
                    instancePath: instancePath + '/referenceRegulation/' + i21 + '/id',
                    schemaPath: '#/properties/referenceRegulation/items/properties/id/format',
                    keyword: 'format',
                    params: { format: 'uri' },
                    message: 'must match format "' + 'uri' + '"',
                  };
                  if (vErrors === null) {
                    vErrors = [err95];
                  } else {
                    vErrors.push(err95);
                  }
                  errors++;
                }
              } else {
                const err96 = {
                  instancePath: instancePath + '/referenceRegulation/' + i21 + '/id',
                  schemaPath: '#/properties/referenceRegulation/items/properties/id/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err96];
                } else {
                  vErrors.push(err96);
                }
                errors++;
              }
            }
            if (data58.name !== undefined) {
              if (typeof data58.name !== 'string') {
                const err97 = {
                  instancePath: instancePath + '/referenceRegulation/' + i21 + '/name',
                  schemaPath: '#/properties/referenceRegulation/items/properties/name/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err97];
                } else {
                  vErrors.push(err97);
                }
                errors++;
              }
            }
          } else {
            const err98 = {
              instancePath: instancePath + '/referenceRegulation/' + i21,
              schemaPath: '#/properties/referenceRegulation/items/type',
              keyword: 'type',
              params: { type: 'object' },
              message: 'must be object',
            };
            if (vErrors === null) {
              vErrors = [err98];
            } else {
              vErrors.push(err98);
            }
            errors++;
          }
        }
      } else {
        const err99 = {
          instancePath: instancePath + '/referenceRegulation',
          schemaPath: '#/properties/referenceRegulation/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err99];
        } else {
          vErrors.push(err99);
        }
        errors++;
      }
    }
    if (data.specifiedCondition !== undefined) {
      let data64 = data.specifiedCondition;
      if (Array.isArray(data64)) {
        const len24 = data64.length;
        for (let i24 = 0; i24 < len24; i24++) {
          if (typeof data64[i24] !== 'string') {
            const err100 = {
              instancePath: instancePath + '/specifiedCondition/' + i24,
              schemaPath: '#/properties/specifiedCondition/items/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err100];
            } else {
              vErrors.push(err100);
            }
            errors++;
          }
        }
      } else {
        const err101 = {
          instancePath: instancePath + '/specifiedCondition',
          schemaPath: '#/properties/specifiedCondition/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err101];
        } else {
          vErrors.push(err101);
        }
        errors++;
      }
    }
    if (data.evidence !== undefined) {
      let data66 = data.evidence;
      if (Array.isArray(data66)) {
        const len25 = data66.length;
        for (let i25 = 0; i25 < len25; i25++) {
          let data67 = data66[i25];
          if (data67 && typeof data67 == 'object' && !Array.isArray(data67)) {
            if (data67.linkURL === undefined) {
              const err102 = {
                instancePath: instancePath + '/evidence/' + i25,
                schemaPath: '#/$defs/Link/required',
                keyword: 'required',
                params: { missingProperty: 'linkURL' },
                message: "must have required property '" + 'linkURL' + "'",
              };
              if (vErrors === null) {
                vErrors = [err102];
              } else {
                vErrors.push(err102);
              }
              errors++;
            }
            if (data67.linkName === undefined) {
              const err103 = {
                instancePath: instancePath + '/evidence/' + i25,
                schemaPath: '#/$defs/Link/required',
                keyword: 'required',
                params: { missingProperty: 'linkName' },
                message: "must have required property '" + 'linkName' + "'",
              };
              if (vErrors === null) {
                vErrors = [err103];
              } else {
                vErrors.push(err103);
              }
              errors++;
            }
            for (const key0 in data67) {
              if (
                !(
                  key0 === 'type' ||
                  key0 === 'linkURL' ||
                  key0 === 'linkName' ||
                  key0 === 'digestMultibase' ||
                  key0 === 'mediaType' ||
                  key0 === 'linkType'
                )
              ) {
                const err104 = {
                  instancePath: instancePath + '/evidence/' + i25,
                  schemaPath: '#/$defs/Link/additionalProperties',
                  keyword: 'additionalProperties',
                  params: { additionalProperty: key0 },
                  message: 'must NOT have additional properties',
                };
                if (vErrors === null) {
                  vErrors = [err104];
                } else {
                  vErrors.push(err104);
                }
                errors++;
              }
            }
            if (data67.type !== undefined) {
              let data68 = data67.type;
              if (Array.isArray(data68)) {
                const _errs155 = errors;
                const len26 = data68.length;
                for (let i26 = 0; i26 < len26; i26++) {
                  const _errs156 = errors;
                  if ('Link' !== data68[i26]) {
                    const err105 = {
                      instancePath: instancePath + '/evidence/' + i25 + '/type/' + i26,
                      schemaPath: '#/$defs/Link/properties/type/allOf/0/contains/const',
                      keyword: 'const',
                      params: { allowedValue: 'Link' },
                      message: 'must be equal to constant',
                    };
                    if (vErrors === null) {
                      vErrors = [err105];
                    } else {
                      vErrors.push(err105);
                    }
                    errors++;
                  }
                  var valid66 = _errs156 === errors;
                  if (valid66) {
                    break;
                  }
                }
                if (!valid66) {
                  const err106 = {
                    instancePath: instancePath + '/evidence/' + i25 + '/type',
                    schemaPath: '#/$defs/Link/properties/type/allOf/0/contains',
                    keyword: 'contains',
                    params: { minContains: 1 },
                    message: 'must contain at least 1 valid item(s)',
                  };
                  if (vErrors === null) {
                    vErrors = [err106];
                  } else {
                    vErrors.push(err106);
                  }
                  errors++;
                } else {
                  errors = _errs155;
                  if (vErrors !== null) {
                    if (_errs155) {
                      vErrors.length = _errs155;
                    } else {
                      vErrors = null;
                    }
                  }
                }
              }
              if (Array.isArray(data68)) {
                const len27 = data68.length;
                for (let i27 = 0; i27 < len27; i27++) {
                  if (typeof data68[i27] !== 'string') {
                    const err107 = {
                      instancePath: instancePath + '/evidence/' + i25 + '/type/' + i27,
                      schemaPath: '#/$defs/Link/properties/type/items/type',
                      keyword: 'type',
                      params: { type: 'string' },
                      message: 'must be string',
                    };
                    if (vErrors === null) {
                      vErrors = [err107];
                    } else {
                      vErrors.push(err107);
                    }
                    errors++;
                  }
                }
              } else {
                const err108 = {
                  instancePath: instancePath + '/evidence/' + i25 + '/type',
                  schemaPath: '#/$defs/Link/properties/type/type',
                  keyword: 'type',
                  params: { type: 'array' },
                  message: 'must be array',
                };
                if (vErrors === null) {
                  vErrors = [err108];
                } else {
                  vErrors.push(err108);
                }
                errors++;
              }
            }
            if (data67.linkURL !== undefined) {
              let data71 = data67.linkURL;
              if (typeof data71 === 'string') {
                if (!formats0(data71)) {
                  const err109 = {
                    instancePath: instancePath + '/evidence/' + i25 + '/linkURL',
                    schemaPath: '#/$defs/Link/properties/linkURL/format',
                    keyword: 'format',
                    params: { format: 'uri' },
                    message: 'must match format "' + 'uri' + '"',
                  };
                  if (vErrors === null) {
                    vErrors = [err109];
                  } else {
                    vErrors.push(err109);
                  }
                  errors++;
                }
              } else {
                const err110 = {
                  instancePath: instancePath + '/evidence/' + i25 + '/linkURL',
                  schemaPath: '#/$defs/Link/properties/linkURL/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err110];
                } else {
                  vErrors.push(err110);
                }
                errors++;
              }
            }
            if (data67.linkName !== undefined) {
              if (typeof data67.linkName !== 'string') {
                const err111 = {
                  instancePath: instancePath + '/evidence/' + i25 + '/linkName',
                  schemaPath: '#/$defs/Link/properties/linkName/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err111];
                } else {
                  vErrors.push(err111);
                }
                errors++;
              }
            }
            if (data67.digestMultibase !== undefined) {
              if (typeof data67.digestMultibase !== 'string') {
                const err112 = {
                  instancePath: instancePath + '/evidence/' + i25 + '/digestMultibase',
                  schemaPath: '#/$defs/Link/properties/digestMultibase/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err112];
                } else {
                  vErrors.push(err112);
                }
                errors++;
              }
            }
            if (data67.mediaType !== undefined) {
              if (typeof data67.mediaType !== 'string') {
                const err113 = {
                  instancePath: instancePath + '/evidence/' + i25 + '/mediaType',
                  schemaPath: '#/$defs/Link/properties/mediaType/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err113];
                } else {
                  vErrors.push(err113);
                }
                errors++;
              }
            }
            if (data67.linkType !== undefined) {
              if (typeof data67.linkType !== 'string') {
                const err114 = {
                  instancePath: instancePath + '/evidence/' + i25 + '/linkType',
                  schemaPath: '#/$defs/Link/properties/linkType/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err114];
                } else {
                  vErrors.push(err114);
                }
                errors++;
              }
            }
          } else {
            const err115 = {
              instancePath: instancePath + '/evidence/' + i25,
              schemaPath: '#/$defs/Link/type',
              keyword: 'type',
              params: { type: 'object' },
              message: 'must be object',
            };
            if (vErrors === null) {
              vErrors = [err115];
            } else {
              vErrors.push(err115);
            }
            errors++;
          }
        }
      } else {
        const err116 = {
          instancePath: instancePath + '/evidence',
          schemaPath: '#/properties/evidence/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err116];
        } else {
          vErrors.push(err116);
        }
        errors++;
      }
    }
    if (data.conformityTopic !== undefined) {
      let data76 = data.conformityTopic;
      if (Array.isArray(data76)) {
        const len28 = data76.length;
        for (let i28 = 0; i28 < len28; i28++) {
          let data77 = data76[i28];
          if (data77 && typeof data77 == 'object' && !Array.isArray(data77)) {
            if (data77.id === undefined) {
              const err117 = {
                instancePath: instancePath + '/conformityTopic/' + i28,
                schemaPath: '#/$defs/ConformityTopic/required',
                keyword: 'required',
                params: { missingProperty: 'id' },
                message: "must have required property '" + 'id' + "'",
              };
              if (vErrors === null) {
                vErrors = [err117];
              } else {
                vErrors.push(err117);
              }
              errors++;
            }
            if (data77.name === undefined) {
              const err118 = {
                instancePath: instancePath + '/conformityTopic/' + i28,
                schemaPath: '#/$defs/ConformityTopic/required',
                keyword: 'required',
                params: { missingProperty: 'name' },
                message: "must have required property '" + 'name' + "'",
              };
              if (vErrors === null) {
                vErrors = [err118];
              } else {
                vErrors.push(err118);
              }
              errors++;
            }
            for (const key1 in data77) {
              if (!(key1 === 'type' || key1 === 'id' || key1 === 'name' || key1 === 'definition')) {
                const err119 = {
                  instancePath: instancePath + '/conformityTopic/' + i28,
                  schemaPath: '#/$defs/ConformityTopic/additionalProperties',
                  keyword: 'additionalProperties',
                  params: { additionalProperty: key1 },
                  message: 'must NOT have additional properties',
                };
                if (vErrors === null) {
                  vErrors = [err119];
                } else {
                  vErrors.push(err119);
                }
                errors++;
              }
            }
            if (data77.type !== undefined) {
              let data78 = data77.type;
              if (Array.isArray(data78)) {
                const _errs178 = errors;
                const len29 = data78.length;
                for (let i29 = 0; i29 < len29; i29++) {
                  const _errs179 = errors;
                  if ('ConformityTopic' !== data78[i29]) {
                    const err120 = {
                      instancePath: instancePath + '/conformityTopic/' + i28 + '/type/' + i29,
                      schemaPath: '#/$defs/ConformityTopic/properties/type/allOf/0/contains/const',
                      keyword: 'const',
                      params: { allowedValue: 'ConformityTopic' },
                      message: 'must be equal to constant',
                    };
                    if (vErrors === null) {
                      vErrors = [err120];
                    } else {
                      vErrors.push(err120);
                    }
                    errors++;
                  }
                  var valid74 = _errs179 === errors;
                  if (valid74) {
                    break;
                  }
                }
                if (!valid74) {
                  const err121 = {
                    instancePath: instancePath + '/conformityTopic/' + i28 + '/type',
                    schemaPath: '#/$defs/ConformityTopic/properties/type/allOf/0/contains',
                    keyword: 'contains',
                    params: { minContains: 1 },
                    message: 'must contain at least 1 valid item(s)',
                  };
                  if (vErrors === null) {
                    vErrors = [err121];
                  } else {
                    vErrors.push(err121);
                  }
                  errors++;
                } else {
                  errors = _errs178;
                  if (vErrors !== null) {
                    if (_errs178) {
                      vErrors.length = _errs178;
                    } else {
                      vErrors = null;
                    }
                  }
                }
              }
              if (Array.isArray(data78)) {
                const len30 = data78.length;
                for (let i30 = 0; i30 < len30; i30++) {
                  if (typeof data78[i30] !== 'string') {
                    const err122 = {
                      instancePath: instancePath + '/conformityTopic/' + i28 + '/type/' + i30,
                      schemaPath: '#/$defs/ConformityTopic/properties/type/items/type',
                      keyword: 'type',
                      params: { type: 'string' },
                      message: 'must be string',
                    };
                    if (vErrors === null) {
                      vErrors = [err122];
                    } else {
                      vErrors.push(err122);
                    }
                    errors++;
                  }
                }
              } else {
                const err123 = {
                  instancePath: instancePath + '/conformityTopic/' + i28 + '/type',
                  schemaPath: '#/$defs/ConformityTopic/properties/type/type',
                  keyword: 'type',
                  params: { type: 'array' },
                  message: 'must be array',
                };
                if (vErrors === null) {
                  vErrors = [err123];
                } else {
                  vErrors.push(err123);
                }
                errors++;
              }
            }
            if (data77.id !== undefined) {
              let data81 = data77.id;
              if (typeof data81 === 'string') {
                if (!formats0(data81)) {
                  const err124 = {
                    instancePath: instancePath + '/conformityTopic/' + i28 + '/id',
                    schemaPath: '#/$defs/ConformityTopic/properties/id/format',
                    keyword: 'format',
                    params: { format: 'uri' },
                    message: 'must match format "' + 'uri' + '"',
                  };
                  if (vErrors === null) {
                    vErrors = [err124];
                  } else {
                    vErrors.push(err124);
                  }
                  errors++;
                }
              } else {
                const err125 = {
                  instancePath: instancePath + '/conformityTopic/' + i28 + '/id',
                  schemaPath: '#/$defs/ConformityTopic/properties/id/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err125];
                } else {
                  vErrors.push(err125);
                }
                errors++;
              }
            }
            if (data77.name !== undefined) {
              if (typeof data77.name !== 'string') {
                const err126 = {
                  instancePath: instancePath + '/conformityTopic/' + i28 + '/name',
                  schemaPath: '#/$defs/ConformityTopic/properties/name/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err126];
                } else {
                  vErrors.push(err126);
                }
                errors++;
              }
            }
            if (data77.definition !== undefined) {
              if (typeof data77.definition !== 'string') {
                const err127 = {
                  instancePath: instancePath + '/conformityTopic/' + i28 + '/definition',
                  schemaPath: '#/$defs/ConformityTopic/properties/definition/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err127];
                } else {
                  vErrors.push(err127);
                }
                errors++;
              }
            }
          } else {
            const err128 = {
              instancePath: instancePath + '/conformityTopic/' + i28,
              schemaPath: '#/$defs/ConformityTopic/type',
              keyword: 'type',
              params: { type: 'object' },
              message: 'must be object',
            };
            if (vErrors === null) {
              vErrors = [err128];
            } else {
              vErrors.push(err128);
            }
            errors++;
          }
        }
      } else {
        const err129 = {
          instancePath: instancePath + '/conformityTopic',
          schemaPath: '#/properties/conformityTopic/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err129];
        } else {
          vErrors.push(err129);
        }
        errors++;
      }
    }
    if (data.conformance !== undefined) {
      if (typeof data.conformance !== 'boolean') {
        const err130 = {
          instancePath: instancePath + '/conformance',
          schemaPath: '#/properties/conformance/type',
          keyword: 'type',
          params: { type: 'boolean' },
          message: 'must be boolean',
        };
        if (vErrors === null) {
          vErrors = [err130];
        } else {
          vErrors.push(err130);
        }
        errors++;
      }
    }
  } else {
    const err131 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: { type: 'object' },
      message: 'must be object',
    };
    if (vErrors === null) {
      vErrors = [err131];
    } else {
      vErrors.push(err131);
    }
    errors++;
  }
  validate23.errors = vErrors;
  return errors === 0;
}
validate23.evaluated = { props: true, dynamicProps: false, dynamicItems: false };
function validate20(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {},
) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate20.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = undefined;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = undefined;
  }
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.id === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'id' },
        message: "must have required property '" + 'id' + "'",
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.name === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'name' },
        message: "must have required property '" + 'name' + "'",
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.assessorLevel === undefined) {
      const err2 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'assessorLevel' },
        message: "must have required property '" + 'assessorLevel' + "'",
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.assessmentLevel === undefined) {
      const err3 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'assessmentLevel' },
        message: "must have required property '" + 'assessmentLevel' + "'",
      };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.attestationType === undefined) {
      const err4 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'attestationType' },
        message: "must have required property '" + 'attestationType' + "'",
      };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.issuedToParty === undefined) {
      const err5 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'issuedToParty' },
        message: "must have required property '" + 'issuedToParty' + "'",
      };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
    }
    if (data.referenceScheme === undefined) {
      const err6 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'referenceScheme' },
        message: "must have required property '" + 'referenceScheme' + "'",
      };
      if (vErrors === null) {
        vErrors = [err6];
      } else {
        vErrors.push(err6);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!func1.call(schema31.properties, key0)) {
        const err7 = {
          instancePath,
          schemaPath: '#/additionalProperties',
          keyword: 'additionalProperties',
          params: { additionalProperty: key0 },
          message: 'must NOT have additional properties',
        };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data.type !== undefined) {
      let data0 = data.type;
      if (Array.isArray(data0)) {
        const _errs5 = errors;
        const len0 = data0.length;
        for (let i0 = 0; i0 < len0; i0++) {
          const _errs6 = errors;
          if ('ConformityAttestation' !== data0[i0]) {
            const err8 = {
              instancePath: instancePath + '/type/' + i0,
              schemaPath: '#/properties/type/allOf/0/contains/const',
              keyword: 'const',
              params: { allowedValue: 'ConformityAttestation' },
              message: 'must be equal to constant',
            };
            if (vErrors === null) {
              vErrors = [err8];
            } else {
              vErrors.push(err8);
            }
            errors++;
          }
          var valid2 = _errs6 === errors;
          if (valid2) {
            break;
          }
        }
        if (!valid2) {
          const err9 = {
            instancePath: instancePath + '/type',
            schemaPath: '#/properties/type/allOf/0/contains',
            keyword: 'contains',
            params: { minContains: 1 },
            message: 'must contain at least 1 valid item(s)',
          };
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        } else {
          errors = _errs5;
          if (vErrors !== null) {
            if (_errs5) {
              vErrors.length = _errs5;
            } else {
              vErrors = null;
            }
          }
        }
      }
      if (Array.isArray(data0)) {
        const len1 = data0.length;
        for (let i1 = 0; i1 < len1; i1++) {
          if (typeof data0[i1] !== 'string') {
            const err10 = {
              instancePath: instancePath + '/type/' + i1,
              schemaPath: '#/properties/type/items/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err10];
            } else {
              vErrors.push(err10);
            }
            errors++;
          }
        }
      } else {
        const err11 = {
          instancePath: instancePath + '/type',
          schemaPath: '#/properties/type/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err11];
        } else {
          vErrors.push(err11);
        }
        errors++;
      }
    }
    if (data.id !== undefined) {
      let data3 = data.id;
      if (typeof data3 === 'string') {
        if (!formats0(data3)) {
          const err12 = {
            instancePath: instancePath + '/id',
            schemaPath: '#/properties/id/format',
            keyword: 'format',
            params: { format: 'uri' },
            message: 'must match format "' + 'uri' + '"',
          };
          if (vErrors === null) {
            vErrors = [err12];
          } else {
            vErrors.push(err12);
          }
          errors++;
        }
      } else {
        const err13 = {
          instancePath: instancePath + '/id',
          schemaPath: '#/properties/id/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err13];
        } else {
          vErrors.push(err13);
        }
        errors++;
      }
    }
    if (data.name !== undefined) {
      if (typeof data.name !== 'string') {
        const err14 = {
          instancePath: instancePath + '/name',
          schemaPath: '#/properties/name/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err14];
        } else {
          vErrors.push(err14);
        }
        errors++;
      }
    }
    if (data.description !== undefined) {
      if (typeof data.description !== 'string') {
        const err15 = {
          instancePath: instancePath + '/description',
          schemaPath: '#/properties/description/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err15];
        } else {
          vErrors.push(err15);
        }
        errors++;
      }
    }
    if (data.assessorLevel !== undefined) {
      let data6 = data.assessorLevel;
      if (typeof data6 !== 'string') {
        const err16 = {
          instancePath: instancePath + '/assessorLevel',
          schemaPath: '#/properties/assessorLevel/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err16];
        } else {
          vErrors.push(err16);
        }
        errors++;
      }
      if (
        !(
          data6 === 'self' ||
          data6 === 'commercial' ||
          data6 === 'buyer' ||
          data6 === 'membership' ||
          data6 === 'unspecified' ||
          data6 === '3rdParty' ||
          data6 === 'hybrid'
        )
      ) {
        const err17 = {
          instancePath: instancePath + '/assessorLevel',
          schemaPath: '#/properties/assessorLevel/enum',
          keyword: 'enum',
          params: { allowedValues: schema31.properties.assessorLevel.enum },
          message: 'must be equal to one of the allowed values',
        };
        if (vErrors === null) {
          vErrors = [err17];
        } else {
          vErrors.push(err17);
        }
        errors++;
      }
    }
    if (data.assessmentLevel !== undefined) {
      let data7 = data.assessmentLevel;
      if (typeof data7 !== 'string') {
        const err18 = {
          instancePath: instancePath + '/assessmentLevel',
          schemaPath: '#/properties/assessmentLevel/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err18];
        } else {
          vErrors.push(err18);
        }
        errors++;
      }
      if (
        !(
          data7 === 'authority-benchmark' ||
          data7 === 'authority-mandate' ||
          data7 === 'authority-globalmra' ||
          data7 === 'authority-peer' ||
          data7 === 'authority-extended-mra' ||
          data7 === 'scheme-self' ||
          data7 === 'scheme-cab' ||
          data7 === 'no-endorsement'
        )
      ) {
        const err19 = {
          instancePath: instancePath + '/assessmentLevel',
          schemaPath: '#/properties/assessmentLevel/enum',
          keyword: 'enum',
          params: { allowedValues: schema31.properties.assessmentLevel.enum },
          message: 'must be equal to one of the allowed values',
        };
        if (vErrors === null) {
          vErrors = [err19];
        } else {
          vErrors.push(err19);
        }
        errors++;
      }
    }
    if (data.attestationType !== undefined) {
      let data8 = data.attestationType;
      if (typeof data8 !== 'string') {
        const err20 = {
          instancePath: instancePath + '/attestationType',
          schemaPath: '#/properties/attestationType/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err20];
        } else {
          vErrors.push(err20);
        }
        errors++;
      }
      if (
        !(
          data8 === 'certification' ||
          data8 === 'declaration' ||
          data8 === 'inspection' ||
          data8 === 'testing' ||
          data8 === 'verification' ||
          data8 === 'validation' ||
          data8 === 'calibration'
        )
      ) {
        const err21 = {
          instancePath: instancePath + '/attestationType',
          schemaPath: '#/properties/attestationType/enum',
          keyword: 'enum',
          params: { allowedValues: schema31.properties.attestationType.enum },
          message: 'must be equal to one of the allowed values',
        };
        if (vErrors === null) {
          vErrors = [err21];
        } else {
          vErrors.push(err21);
        }
        errors++;
      }
    }
    if (data.issuedToParty !== undefined) {
      let data9 = data.issuedToParty;
      if (data9 && typeof data9 == 'object' && !Array.isArray(data9)) {
        if (data9.id === undefined) {
          const err22 = {
            instancePath: instancePath + '/issuedToParty',
            schemaPath: '#/properties/issuedToParty/required',
            keyword: 'required',
            params: { missingProperty: 'id' },
            message: "must have required property '" + 'id' + "'",
          };
          if (vErrors === null) {
            vErrors = [err22];
          } else {
            vErrors.push(err22);
          }
          errors++;
        }
        if (data9.name === undefined) {
          const err23 = {
            instancePath: instancePath + '/issuedToParty',
            schemaPath: '#/properties/issuedToParty/required',
            keyword: 'required',
            params: { missingProperty: 'name' },
            message: "must have required property '" + 'name' + "'",
          };
          if (vErrors === null) {
            vErrors = [err23];
          } else {
            vErrors.push(err23);
          }
          errors++;
        }
        if (data9.type !== undefined) {
          let data10 = data9.type;
          if (Array.isArray(data10)) {
            const _errs26 = errors;
            const len2 = data10.length;
            for (let i2 = 0; i2 < len2; i2++) {
              const _errs27 = errors;
              if ('Party' !== data10[i2]) {
                const err24 = {
                  instancePath: instancePath + '/issuedToParty/type/' + i2,
                  schemaPath: '#/properties/issuedToParty/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Party' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err24];
                } else {
                  vErrors.push(err24);
                }
                errors++;
              }
              var valid7 = _errs27 === errors;
              if (valid7) {
                break;
              }
            }
            if (!valid7) {
              const err25 = {
                instancePath: instancePath + '/issuedToParty/type',
                schemaPath: '#/properties/issuedToParty/properties/type/allOf/0/contains',
                keyword: 'contains',
                params: { minContains: 1 },
                message: 'must contain at least 1 valid item(s)',
              };
              if (vErrors === null) {
                vErrors = [err25];
              } else {
                vErrors.push(err25);
              }
              errors++;
            } else {
              errors = _errs26;
              if (vErrors !== null) {
                if (_errs26) {
                  vErrors.length = _errs26;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data10)) {
            const len3 = data10.length;
            for (let i3 = 0; i3 < len3; i3++) {
              if (typeof data10[i3] !== 'string') {
                const err26 = {
                  instancePath: instancePath + '/issuedToParty/type/' + i3,
                  schemaPath: '#/properties/issuedToParty/properties/type/items/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err26];
                } else {
                  vErrors.push(err26);
                }
                errors++;
              }
            }
          } else {
            const err27 = {
              instancePath: instancePath + '/issuedToParty/type',
              schemaPath: '#/properties/issuedToParty/properties/type/type',
              keyword: 'type',
              params: { type: 'array' },
              message: 'must be array',
            };
            if (vErrors === null) {
              vErrors = [err27];
            } else {
              vErrors.push(err27);
            }
            errors++;
          }
        }
        if (data9.id !== undefined) {
          let data13 = data9.id;
          if (typeof data13 === 'string') {
            if (!formats0(data13)) {
              const err28 = {
                instancePath: instancePath + '/issuedToParty/id',
                schemaPath: '#/properties/issuedToParty/properties/id/format',
                keyword: 'format',
                params: { format: 'uri' },
                message: 'must match format "' + 'uri' + '"',
              };
              if (vErrors === null) {
                vErrors = [err28];
              } else {
                vErrors.push(err28);
              }
              errors++;
            }
          } else {
            const err29 = {
              instancePath: instancePath + '/issuedToParty/id',
              schemaPath: '#/properties/issuedToParty/properties/id/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err29];
            } else {
              vErrors.push(err29);
            }
            errors++;
          }
        }
        if (data9.name !== undefined) {
          if (typeof data9.name !== 'string') {
            const err30 = {
              instancePath: instancePath + '/issuedToParty/name',
              schemaPath: '#/properties/issuedToParty/properties/name/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err30];
            } else {
              vErrors.push(err30);
            }
            errors++;
          }
        }
        if (data9.registeredId !== undefined) {
          if (typeof data9.registeredId !== 'string') {
            const err31 = {
              instancePath: instancePath + '/issuedToParty/registeredId',
              schemaPath: '#/properties/issuedToParty/properties/registeredId/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err31];
            } else {
              vErrors.push(err31);
            }
            errors++;
          }
        }
        if (data9.description !== undefined) {
          if (typeof data9.description !== 'string') {
            const err32 = {
              instancePath: instancePath + '/issuedToParty/description',
              schemaPath: '#/properties/issuedToParty/properties/description/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err32];
            } else {
              vErrors.push(err32);
            }
            errors++;
          }
        }
      } else {
        const err33 = {
          instancePath: instancePath + '/issuedToParty',
          schemaPath: '#/properties/issuedToParty/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err33];
        } else {
          vErrors.push(err33);
        }
        errors++;
      }
    }
    if (data.authorisation !== undefined) {
      let data17 = data.authorisation;
      if (Array.isArray(data17)) {
        const len4 = data17.length;
        for (let i4 = 0; i4 < len4; i4++) {
          if (
            !validate21(data17[i4], {
              instancePath: instancePath + '/authorisation/' + i4,
              parentData: data17,
              parentDataProperty: i4,
              rootData,
              dynamicAnchors,
            })
          ) {
            vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err34 = {
          instancePath: instancePath + '/authorisation',
          schemaPath: '#/properties/authorisation/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err34];
        } else {
          vErrors.push(err34);
        }
        errors++;
      }
    }
    if (data.referenceScheme !== undefined) {
      let data19 = data.referenceScheme;
      if (data19 && typeof data19 == 'object' && !Array.isArray(data19)) {
        if (data19.id === undefined) {
          const err35 = {
            instancePath: instancePath + '/referenceScheme',
            schemaPath: '#/properties/referenceScheme/required',
            keyword: 'required',
            params: { missingProperty: 'id' },
            message: "must have required property '" + 'id' + "'",
          };
          if (vErrors === null) {
            vErrors = [err35];
          } else {
            vErrors.push(err35);
          }
          errors++;
        }
        if (data19.name === undefined) {
          const err36 = {
            instancePath: instancePath + '/referenceScheme',
            schemaPath: '#/properties/referenceScheme/required',
            keyword: 'required',
            params: { missingProperty: 'name' },
            message: "must have required property '" + 'name' + "'",
          };
          if (vErrors === null) {
            vErrors = [err36];
          } else {
            vErrors.push(err36);
          }
          errors++;
        }
        if (data19.type !== undefined) {
          let data20 = data19.type;
          if (Array.isArray(data20)) {
            const _errs46 = errors;
            const len5 = data20.length;
            for (let i5 = 0; i5 < len5; i5++) {
              const _errs47 = errors;
              if ('ConformityScheme' !== data20[i5]) {
                const err37 = {
                  instancePath: instancePath + '/referenceScheme/type/' + i5,
                  schemaPath: '#/properties/referenceScheme/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'ConformityScheme' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err37];
                } else {
                  vErrors.push(err37);
                }
                errors++;
              }
              var valid14 = _errs47 === errors;
              if (valid14) {
                break;
              }
            }
            if (!valid14) {
              const err38 = {
                instancePath: instancePath + '/referenceScheme/type',
                schemaPath: '#/properties/referenceScheme/properties/type/allOf/0/contains',
                keyword: 'contains',
                params: { minContains: 1 },
                message: 'must contain at least 1 valid item(s)',
              };
              if (vErrors === null) {
                vErrors = [err38];
              } else {
                vErrors.push(err38);
              }
              errors++;
            } else {
              errors = _errs46;
              if (vErrors !== null) {
                if (_errs46) {
                  vErrors.length = _errs46;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data20)) {
            const len6 = data20.length;
            for (let i6 = 0; i6 < len6; i6++) {
              if (typeof data20[i6] !== 'string') {
                const err39 = {
                  instancePath: instancePath + '/referenceScheme/type/' + i6,
                  schemaPath: '#/properties/referenceScheme/properties/type/items/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err39];
                } else {
                  vErrors.push(err39);
                }
                errors++;
              }
            }
          } else {
            const err40 = {
              instancePath: instancePath + '/referenceScheme/type',
              schemaPath: '#/properties/referenceScheme/properties/type/type',
              keyword: 'type',
              params: { type: 'array' },
              message: 'must be array',
            };
            if (vErrors === null) {
              vErrors = [err40];
            } else {
              vErrors.push(err40);
            }
            errors++;
          }
        }
        if (data19.id !== undefined) {
          let data23 = data19.id;
          if (typeof data23 === 'string') {
            if (!formats0(data23)) {
              const err41 = {
                instancePath: instancePath + '/referenceScheme/id',
                schemaPath: '#/properties/referenceScheme/properties/id/format',
                keyword: 'format',
                params: { format: 'uri' },
                message: 'must match format "' + 'uri' + '"',
              };
              if (vErrors === null) {
                vErrors = [err41];
              } else {
                vErrors.push(err41);
              }
              errors++;
            }
          } else {
            const err42 = {
              instancePath: instancePath + '/referenceScheme/id',
              schemaPath: '#/properties/referenceScheme/properties/id/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err42];
            } else {
              vErrors.push(err42);
            }
            errors++;
          }
        }
        if (data19.name !== undefined) {
          if (typeof data19.name !== 'string') {
            const err43 = {
              instancePath: instancePath + '/referenceScheme/name',
              schemaPath: '#/properties/referenceScheme/properties/name/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err43];
            } else {
              vErrors.push(err43);
            }
            errors++;
          }
        }
      } else {
        const err44 = {
          instancePath: instancePath + '/referenceScheme',
          schemaPath: '#/properties/referenceScheme/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err44];
        } else {
          vErrors.push(err44);
        }
        errors++;
      }
    }
    if (data.referenceProfile !== undefined) {
      let data25 = data.referenceProfile;
      if (data25 && typeof data25 == 'object' && !Array.isArray(data25)) {
        if (data25.id === undefined) {
          const err45 = {
            instancePath: instancePath + '/referenceProfile',
            schemaPath: '#/properties/referenceProfile/required',
            keyword: 'required',
            params: { missingProperty: 'id' },
            message: "must have required property '" + 'id' + "'",
          };
          if (vErrors === null) {
            vErrors = [err45];
          } else {
            vErrors.push(err45);
          }
          errors++;
        }
        if (data25.name === undefined) {
          const err46 = {
            instancePath: instancePath + '/referenceProfile',
            schemaPath: '#/properties/referenceProfile/required',
            keyword: 'required',
            params: { missingProperty: 'name' },
            message: "must have required property '" + 'name' + "'",
          };
          if (vErrors === null) {
            vErrors = [err46];
          } else {
            vErrors.push(err46);
          }
          errors++;
        }
        if (data25.type !== undefined) {
          let data26 = data25.type;
          if (Array.isArray(data26)) {
            const _errs59 = errors;
            const len7 = data26.length;
            for (let i7 = 0; i7 < len7; i7++) {
              const _errs60 = errors;
              if ('ConformityProfile' !== data26[i7]) {
                const err47 = {
                  instancePath: instancePath + '/referenceProfile/type/' + i7,
                  schemaPath:
                    '#/properties/referenceProfile/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'ConformityProfile' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err47];
                } else {
                  vErrors.push(err47);
                }
                errors++;
              }
              var valid19 = _errs60 === errors;
              if (valid19) {
                break;
              }
            }
            if (!valid19) {
              const err48 = {
                instancePath: instancePath + '/referenceProfile/type',
                schemaPath: '#/properties/referenceProfile/properties/type/allOf/0/contains',
                keyword: 'contains',
                params: { minContains: 1 },
                message: 'must contain at least 1 valid item(s)',
              };
              if (vErrors === null) {
                vErrors = [err48];
              } else {
                vErrors.push(err48);
              }
              errors++;
            } else {
              errors = _errs59;
              if (vErrors !== null) {
                if (_errs59) {
                  vErrors.length = _errs59;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data26)) {
            const len8 = data26.length;
            for (let i8 = 0; i8 < len8; i8++) {
              if (typeof data26[i8] !== 'string') {
                const err49 = {
                  instancePath: instancePath + '/referenceProfile/type/' + i8,
                  schemaPath: '#/properties/referenceProfile/properties/type/items/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err49];
                } else {
                  vErrors.push(err49);
                }
                errors++;
              }
            }
          } else {
            const err50 = {
              instancePath: instancePath + '/referenceProfile/type',
              schemaPath: '#/properties/referenceProfile/properties/type/type',
              keyword: 'type',
              params: { type: 'array' },
              message: 'must be array',
            };
            if (vErrors === null) {
              vErrors = [err50];
            } else {
              vErrors.push(err50);
            }
            errors++;
          }
        }
        if (data25.id !== undefined) {
          let data29 = data25.id;
          if (typeof data29 === 'string') {
            if (!formats0(data29)) {
              const err51 = {
                instancePath: instancePath + '/referenceProfile/id',
                schemaPath: '#/properties/referenceProfile/properties/id/format',
                keyword: 'format',
                params: { format: 'uri' },
                message: 'must match format "' + 'uri' + '"',
              };
              if (vErrors === null) {
                vErrors = [err51];
              } else {
                vErrors.push(err51);
              }
              errors++;
            }
          } else {
            const err52 = {
              instancePath: instancePath + '/referenceProfile/id',
              schemaPath: '#/properties/referenceProfile/properties/id/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err52];
            } else {
              vErrors.push(err52);
            }
            errors++;
          }
        }
        if (data25.name !== undefined) {
          if (typeof data25.name !== 'string') {
            const err53 = {
              instancePath: instancePath + '/referenceProfile/name',
              schemaPath: '#/properties/referenceProfile/properties/name/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err53];
            } else {
              vErrors.push(err53);
            }
            errors++;
          }
        }
      } else {
        const err54 = {
          instancePath: instancePath + '/referenceProfile',
          schemaPath: '#/properties/referenceProfile/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err54];
        } else {
          vErrors.push(err54);
        }
        errors++;
      }
    }
    if (data.profileScore !== undefined) {
      let data31 = data.profileScore;
      if (data31 && typeof data31 == 'object' && !Array.isArray(data31)) {
        if (data31.code === undefined) {
          const err55 = {
            instancePath: instancePath + '/profileScore',
            schemaPath: '#/$defs/Score/required',
            keyword: 'required',
            params: { missingProperty: 'code' },
            message: "must have required property '" + 'code' + "'",
          };
          if (vErrors === null) {
            vErrors = [err55];
          } else {
            vErrors.push(err55);
          }
          errors++;
        }
        for (const key1 in data31) {
          if (!(key1 === 'type' || key1 === 'code' || key1 === 'rank' || key1 === 'definition')) {
            const err56 = {
              instancePath: instancePath + '/profileScore',
              schemaPath: '#/$defs/Score/additionalProperties',
              keyword: 'additionalProperties',
              params: { additionalProperty: key1 },
              message: 'must NOT have additional properties',
            };
            if (vErrors === null) {
              vErrors = [err56];
            } else {
              vErrors.push(err56);
            }
            errors++;
          }
        }
        if (data31.type !== undefined) {
          let data32 = data31.type;
          if (Array.isArray(data32)) {
            const _errs74 = errors;
            const len9 = data32.length;
            for (let i9 = 0; i9 < len9; i9++) {
              const _errs75 = errors;
              if ('Score' !== data32[i9]) {
                const err57 = {
                  instancePath: instancePath + '/profileScore/type/' + i9,
                  schemaPath: '#/$defs/Score/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Score' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err57];
                } else {
                  vErrors.push(err57);
                }
                errors++;
              }
              var valid25 = _errs75 === errors;
              if (valid25) {
                break;
              }
            }
            if (!valid25) {
              const err58 = {
                instancePath: instancePath + '/profileScore/type',
                schemaPath: '#/$defs/Score/properties/type/allOf/0/contains',
                keyword: 'contains',
                params: { minContains: 1 },
                message: 'must contain at least 1 valid item(s)',
              };
              if (vErrors === null) {
                vErrors = [err58];
              } else {
                vErrors.push(err58);
              }
              errors++;
            } else {
              errors = _errs74;
              if (vErrors !== null) {
                if (_errs74) {
                  vErrors.length = _errs74;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data32)) {
            const len10 = data32.length;
            for (let i10 = 0; i10 < len10; i10++) {
              if (typeof data32[i10] !== 'string') {
                const err59 = {
                  instancePath: instancePath + '/profileScore/type/' + i10,
                  schemaPath: '#/$defs/Score/properties/type/items/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err59];
                } else {
                  vErrors.push(err59);
                }
                errors++;
              }
            }
          } else {
            const err60 = {
              instancePath: instancePath + '/profileScore/type',
              schemaPath: '#/$defs/Score/properties/type/type',
              keyword: 'type',
              params: { type: 'array' },
              message: 'must be array',
            };
            if (vErrors === null) {
              vErrors = [err60];
            } else {
              vErrors.push(err60);
            }
            errors++;
          }
        }
        if (data31.code !== undefined) {
          if (typeof data31.code !== 'string') {
            const err61 = {
              instancePath: instancePath + '/profileScore/code',
              schemaPath: '#/$defs/Score/properties/code/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err61];
            } else {
              vErrors.push(err61);
            }
            errors++;
          }
        }
        if (data31.rank !== undefined) {
          let data36 = data31.rank;
          if (!(typeof data36 == 'number' && !(data36 % 1) && !isNaN(data36))) {
            const err62 = {
              instancePath: instancePath + '/profileScore/rank',
              schemaPath: '#/$defs/Score/properties/rank/type',
              keyword: 'type',
              params: { type: 'integer' },
              message: 'must be integer',
            };
            if (vErrors === null) {
              vErrors = [err62];
            } else {
              vErrors.push(err62);
            }
            errors++;
          }
        }
        if (data31.definition !== undefined) {
          if (typeof data31.definition !== 'string') {
            const err63 = {
              instancePath: instancePath + '/profileScore/definition',
              schemaPath: '#/$defs/Score/properties/definition/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err63];
            } else {
              vErrors.push(err63);
            }
            errors++;
          }
        }
      } else {
        const err64 = {
          instancePath: instancePath + '/profileScore',
          schemaPath: '#/$defs/Score/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err64];
        } else {
          vErrors.push(err64);
        }
        errors++;
      }
    }
    if (data.conformityCertificate !== undefined) {
      let data38 = data.conformityCertificate;
      if (data38 && typeof data38 == 'object' && !Array.isArray(data38)) {
        if (data38.linkURL === undefined) {
          const err65 = {
            instancePath: instancePath + '/conformityCertificate',
            schemaPath: '#/$defs/Link/required',
            keyword: 'required',
            params: { missingProperty: 'linkURL' },
            message: "must have required property '" + 'linkURL' + "'",
          };
          if (vErrors === null) {
            vErrors = [err65];
          } else {
            vErrors.push(err65);
          }
          errors++;
        }
        if (data38.linkName === undefined) {
          const err66 = {
            instancePath: instancePath + '/conformityCertificate',
            schemaPath: '#/$defs/Link/required',
            keyword: 'required',
            params: { missingProperty: 'linkName' },
            message: "must have required property '" + 'linkName' + "'",
          };
          if (vErrors === null) {
            vErrors = [err66];
          } else {
            vErrors.push(err66);
          }
          errors++;
        }
        for (const key2 in data38) {
          if (
            !(
              key2 === 'type' ||
              key2 === 'linkURL' ||
              key2 === 'linkName' ||
              key2 === 'digestMultibase' ||
              key2 === 'mediaType' ||
              key2 === 'linkType'
            )
          ) {
            const err67 = {
              instancePath: instancePath + '/conformityCertificate',
              schemaPath: '#/$defs/Link/additionalProperties',
              keyword: 'additionalProperties',
              params: { additionalProperty: key2 },
              message: 'must NOT have additional properties',
            };
            if (vErrors === null) {
              vErrors = [err67];
            } else {
              vErrors.push(err67);
            }
            errors++;
          }
        }
        if (data38.type !== undefined) {
          let data39 = data38.type;
          if (Array.isArray(data39)) {
            const _errs91 = errors;
            const len11 = data39.length;
            for (let i11 = 0; i11 < len11; i11++) {
              const _errs92 = errors;
              if ('Link' !== data39[i11]) {
                const err68 = {
                  instancePath: instancePath + '/conformityCertificate/type/' + i11,
                  schemaPath: '#/$defs/Link/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Link' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err68];
                } else {
                  vErrors.push(err68);
                }
                errors++;
              }
              var valid31 = _errs92 === errors;
              if (valid31) {
                break;
              }
            }
            if (!valid31) {
              const err69 = {
                instancePath: instancePath + '/conformityCertificate/type',
                schemaPath: '#/$defs/Link/properties/type/allOf/0/contains',
                keyword: 'contains',
                params: { minContains: 1 },
                message: 'must contain at least 1 valid item(s)',
              };
              if (vErrors === null) {
                vErrors = [err69];
              } else {
                vErrors.push(err69);
              }
              errors++;
            } else {
              errors = _errs91;
              if (vErrors !== null) {
                if (_errs91) {
                  vErrors.length = _errs91;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data39)) {
            const len12 = data39.length;
            for (let i12 = 0; i12 < len12; i12++) {
              if (typeof data39[i12] !== 'string') {
                const err70 = {
                  instancePath: instancePath + '/conformityCertificate/type/' + i12,
                  schemaPath: '#/$defs/Link/properties/type/items/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err70];
                } else {
                  vErrors.push(err70);
                }
                errors++;
              }
            }
          } else {
            const err71 = {
              instancePath: instancePath + '/conformityCertificate/type',
              schemaPath: '#/$defs/Link/properties/type/type',
              keyword: 'type',
              params: { type: 'array' },
              message: 'must be array',
            };
            if (vErrors === null) {
              vErrors = [err71];
            } else {
              vErrors.push(err71);
            }
            errors++;
          }
        }
        if (data38.linkURL !== undefined) {
          let data42 = data38.linkURL;
          if (typeof data42 === 'string') {
            if (!formats0(data42)) {
              const err72 = {
                instancePath: instancePath + '/conformityCertificate/linkURL',
                schemaPath: '#/$defs/Link/properties/linkURL/format',
                keyword: 'format',
                params: { format: 'uri' },
                message: 'must match format "' + 'uri' + '"',
              };
              if (vErrors === null) {
                vErrors = [err72];
              } else {
                vErrors.push(err72);
              }
              errors++;
            }
          } else {
            const err73 = {
              instancePath: instancePath + '/conformityCertificate/linkURL',
              schemaPath: '#/$defs/Link/properties/linkURL/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err73];
            } else {
              vErrors.push(err73);
            }
            errors++;
          }
        }
        if (data38.linkName !== undefined) {
          if (typeof data38.linkName !== 'string') {
            const err74 = {
              instancePath: instancePath + '/conformityCertificate/linkName',
              schemaPath: '#/$defs/Link/properties/linkName/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err74];
            } else {
              vErrors.push(err74);
            }
            errors++;
          }
        }
        if (data38.digestMultibase !== undefined) {
          if (typeof data38.digestMultibase !== 'string') {
            const err75 = {
              instancePath: instancePath + '/conformityCertificate/digestMultibase',
              schemaPath: '#/$defs/Link/properties/digestMultibase/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err75];
            } else {
              vErrors.push(err75);
            }
            errors++;
          }
        }
        if (data38.mediaType !== undefined) {
          if (typeof data38.mediaType !== 'string') {
            const err76 = {
              instancePath: instancePath + '/conformityCertificate/mediaType',
              schemaPath: '#/$defs/Link/properties/mediaType/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err76];
            } else {
              vErrors.push(err76);
            }
            errors++;
          }
        }
        if (data38.linkType !== undefined) {
          if (typeof data38.linkType !== 'string') {
            const err77 = {
              instancePath: instancePath + '/conformityCertificate/linkType',
              schemaPath: '#/$defs/Link/properties/linkType/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err77];
            } else {
              vErrors.push(err77);
            }
            errors++;
          }
        }
      } else {
        const err78 = {
          instancePath: instancePath + '/conformityCertificate',
          schemaPath: '#/$defs/Link/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err78];
        } else {
          vErrors.push(err78);
        }
        errors++;
      }
    }
    if (data.auditableEvidence !== undefined) {
      let data47 = data.auditableEvidence;
      if (data47 && typeof data47 == 'object' && !Array.isArray(data47)) {
        if (data47.linkURL === undefined) {
          const err79 = {
            instancePath: instancePath + '/auditableEvidence',
            schemaPath: '#/$defs/Link/required',
            keyword: 'required',
            params: { missingProperty: 'linkURL' },
            message: "must have required property '" + 'linkURL' + "'",
          };
          if (vErrors === null) {
            vErrors = [err79];
          } else {
            vErrors.push(err79);
          }
          errors++;
        }
        if (data47.linkName === undefined) {
          const err80 = {
            instancePath: instancePath + '/auditableEvidence',
            schemaPath: '#/$defs/Link/required',
            keyword: 'required',
            params: { missingProperty: 'linkName' },
            message: "must have required property '" + 'linkName' + "'",
          };
          if (vErrors === null) {
            vErrors = [err80];
          } else {
            vErrors.push(err80);
          }
          errors++;
        }
        for (const key3 in data47) {
          if (
            !(
              key3 === 'type' ||
              key3 === 'linkURL' ||
              key3 === 'linkName' ||
              key3 === 'digestMultibase' ||
              key3 === 'mediaType' ||
              key3 === 'linkType'
            )
          ) {
            const err81 = {
              instancePath: instancePath + '/auditableEvidence',
              schemaPath: '#/$defs/Link/additionalProperties',
              keyword: 'additionalProperties',
              params: { additionalProperty: key3 },
              message: 'must NOT have additional properties',
            };
            if (vErrors === null) {
              vErrors = [err81];
            } else {
              vErrors.push(err81);
            }
            errors++;
          }
        }
        if (data47.type !== undefined) {
          let data48 = data47.type;
          if (Array.isArray(data48)) {
            const _errs112 = errors;
            const len13 = data48.length;
            for (let i13 = 0; i13 < len13; i13++) {
              const _errs113 = errors;
              if ('Link' !== data48[i13]) {
                const err82 = {
                  instancePath: instancePath + '/auditableEvidence/type/' + i13,
                  schemaPath: '#/$defs/Link/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Link' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err82];
                } else {
                  vErrors.push(err82);
                }
                errors++;
              }
              var valid37 = _errs113 === errors;
              if (valid37) {
                break;
              }
            }
            if (!valid37) {
              const err83 = {
                instancePath: instancePath + '/auditableEvidence/type',
                schemaPath: '#/$defs/Link/properties/type/allOf/0/contains',
                keyword: 'contains',
                params: { minContains: 1 },
                message: 'must contain at least 1 valid item(s)',
              };
              if (vErrors === null) {
                vErrors = [err83];
              } else {
                vErrors.push(err83);
              }
              errors++;
            } else {
              errors = _errs112;
              if (vErrors !== null) {
                if (_errs112) {
                  vErrors.length = _errs112;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data48)) {
            const len14 = data48.length;
            for (let i14 = 0; i14 < len14; i14++) {
              if (typeof data48[i14] !== 'string') {
                const err84 = {
                  instancePath: instancePath + '/auditableEvidence/type/' + i14,
                  schemaPath: '#/$defs/Link/properties/type/items/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err84];
                } else {
                  vErrors.push(err84);
                }
                errors++;
              }
            }
          } else {
            const err85 = {
              instancePath: instancePath + '/auditableEvidence/type',
              schemaPath: '#/$defs/Link/properties/type/type',
              keyword: 'type',
              params: { type: 'array' },
              message: 'must be array',
            };
            if (vErrors === null) {
              vErrors = [err85];
            } else {
              vErrors.push(err85);
            }
            errors++;
          }
        }
        if (data47.linkURL !== undefined) {
          let data51 = data47.linkURL;
          if (typeof data51 === 'string') {
            if (!formats0(data51)) {
              const err86 = {
                instancePath: instancePath + '/auditableEvidence/linkURL',
                schemaPath: '#/$defs/Link/properties/linkURL/format',
                keyword: 'format',
                params: { format: 'uri' },
                message: 'must match format "' + 'uri' + '"',
              };
              if (vErrors === null) {
                vErrors = [err86];
              } else {
                vErrors.push(err86);
              }
              errors++;
            }
          } else {
            const err87 = {
              instancePath: instancePath + '/auditableEvidence/linkURL',
              schemaPath: '#/$defs/Link/properties/linkURL/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err87];
            } else {
              vErrors.push(err87);
            }
            errors++;
          }
        }
        if (data47.linkName !== undefined) {
          if (typeof data47.linkName !== 'string') {
            const err88 = {
              instancePath: instancePath + '/auditableEvidence/linkName',
              schemaPath: '#/$defs/Link/properties/linkName/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err88];
            } else {
              vErrors.push(err88);
            }
            errors++;
          }
        }
        if (data47.digestMultibase !== undefined) {
          if (typeof data47.digestMultibase !== 'string') {
            const err89 = {
              instancePath: instancePath + '/auditableEvidence/digestMultibase',
              schemaPath: '#/$defs/Link/properties/digestMultibase/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err89];
            } else {
              vErrors.push(err89);
            }
            errors++;
          }
        }
        if (data47.mediaType !== undefined) {
          if (typeof data47.mediaType !== 'string') {
            const err90 = {
              instancePath: instancePath + '/auditableEvidence/mediaType',
              schemaPath: '#/$defs/Link/properties/mediaType/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err90];
            } else {
              vErrors.push(err90);
            }
            errors++;
          }
        }
        if (data47.linkType !== undefined) {
          if (typeof data47.linkType !== 'string') {
            const err91 = {
              instancePath: instancePath + '/auditableEvidence/linkType',
              schemaPath: '#/$defs/Link/properties/linkType/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err91];
            } else {
              vErrors.push(err91);
            }
            errors++;
          }
        }
      } else {
        const err92 = {
          instancePath: instancePath + '/auditableEvidence',
          schemaPath: '#/$defs/Link/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err92];
        } else {
          vErrors.push(err92);
        }
        errors++;
      }
    }
    if (data.trustmark !== undefined) {
      let data56 = data.trustmark;
      if (data56 && typeof data56 == 'object' && !Array.isArray(data56)) {
        if (data56.name === undefined) {
          const err93 = {
            instancePath: instancePath + '/trustmark',
            schemaPath: '#/$defs/Image/required',
            keyword: 'required',
            params: { missingProperty: 'name' },
            message: "must have required property '" + 'name' + "'",
          };
          if (vErrors === null) {
            vErrors = [err93];
          } else {
            vErrors.push(err93);
          }
          errors++;
        }
        if (data56.imageData === undefined) {
          const err94 = {
            instancePath: instancePath + '/trustmark',
            schemaPath: '#/$defs/Image/required',
            keyword: 'required',
            params: { missingProperty: 'imageData' },
            message: "must have required property '" + 'imageData' + "'",
          };
          if (vErrors === null) {
            vErrors = [err94];
          } else {
            vErrors.push(err94);
          }
          errors++;
        }
        if (data56.mediaType === undefined) {
          const err95 = {
            instancePath: instancePath + '/trustmark',
            schemaPath: '#/$defs/Image/required',
            keyword: 'required',
            params: { missingProperty: 'mediaType' },
            message: "must have required property '" + 'mediaType' + "'",
          };
          if (vErrors === null) {
            vErrors = [err95];
          } else {
            vErrors.push(err95);
          }
          errors++;
        }
        for (const key4 in data56) {
          if (
            !(
              key4 === 'type' ||
              key4 === 'name' ||
              key4 === 'description' ||
              key4 === 'imageData' ||
              key4 === 'mediaType'
            )
          ) {
            const err96 = {
              instancePath: instancePath + '/trustmark',
              schemaPath: '#/$defs/Image/additionalProperties',
              keyword: 'additionalProperties',
              params: { additionalProperty: key4 },
              message: 'must NOT have additional properties',
            };
            if (vErrors === null) {
              vErrors = [err96];
            } else {
              vErrors.push(err96);
            }
            errors++;
          }
        }
        if (data56.type !== undefined) {
          let data57 = data56.type;
          if (Array.isArray(data57)) {
            const _errs133 = errors;
            const len15 = data57.length;
            for (let i15 = 0; i15 < len15; i15++) {
              const _errs134 = errors;
              if ('Image' !== data57[i15]) {
                const err97 = {
                  instancePath: instancePath + '/trustmark/type/' + i15,
                  schemaPath: '#/$defs/Image/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Image' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err97];
                } else {
                  vErrors.push(err97);
                }
                errors++;
              }
              var valid43 = _errs134 === errors;
              if (valid43) {
                break;
              }
            }
            if (!valid43) {
              const err98 = {
                instancePath: instancePath + '/trustmark/type',
                schemaPath: '#/$defs/Image/properties/type/allOf/0/contains',
                keyword: 'contains',
                params: { minContains: 1 },
                message: 'must contain at least 1 valid item(s)',
              };
              if (vErrors === null) {
                vErrors = [err98];
              } else {
                vErrors.push(err98);
              }
              errors++;
            } else {
              errors = _errs133;
              if (vErrors !== null) {
                if (_errs133) {
                  vErrors.length = _errs133;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data57)) {
            const len16 = data57.length;
            for (let i16 = 0; i16 < len16; i16++) {
              if (typeof data57[i16] !== 'string') {
                const err99 = {
                  instancePath: instancePath + '/trustmark/type/' + i16,
                  schemaPath: '#/$defs/Image/properties/type/items/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err99];
                } else {
                  vErrors.push(err99);
                }
                errors++;
              }
            }
          } else {
            const err100 = {
              instancePath: instancePath + '/trustmark/type',
              schemaPath: '#/$defs/Image/properties/type/type',
              keyword: 'type',
              params: { type: 'array' },
              message: 'must be array',
            };
            if (vErrors === null) {
              vErrors = [err100];
            } else {
              vErrors.push(err100);
            }
            errors++;
          }
        }
        if (data56.name !== undefined) {
          if (typeof data56.name !== 'string') {
            const err101 = {
              instancePath: instancePath + '/trustmark/name',
              schemaPath: '#/$defs/Image/properties/name/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err101];
            } else {
              vErrors.push(err101);
            }
            errors++;
          }
        }
        if (data56.description !== undefined) {
          if (typeof data56.description !== 'string') {
            const err102 = {
              instancePath: instancePath + '/trustmark/description',
              schemaPath: '#/$defs/Image/properties/description/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err102];
            } else {
              vErrors.push(err102);
            }
            errors++;
          }
        }
        if (data56.imageData !== undefined) {
          let data62 = data56.imageData;
          if (typeof data62 === 'string') {
            if (!formats4(data62)) {
              const err103 = {
                instancePath: instancePath + '/trustmark/imageData',
                schemaPath: '#/$defs/Image/properties/imageData/format',
                keyword: 'format',
                params: { format: 'byte' },
                message: 'must match format "' + 'byte' + '"',
              };
              if (vErrors === null) {
                vErrors = [err103];
              } else {
                vErrors.push(err103);
              }
              errors++;
            }
          } else {
            const err104 = {
              instancePath: instancePath + '/trustmark/imageData',
              schemaPath: '#/$defs/Image/properties/imageData/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err104];
            } else {
              vErrors.push(err104);
            }
            errors++;
          }
        }
        if (data56.mediaType !== undefined) {
          if (typeof data56.mediaType !== 'string') {
            const err105 = {
              instancePath: instancePath + '/trustmark/mediaType',
              schemaPath: '#/$defs/Image/properties/mediaType/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err105];
            } else {
              vErrors.push(err105);
            }
            errors++;
          }
        }
      } else {
        const err106 = {
          instancePath: instancePath + '/trustmark',
          schemaPath: '#/$defs/Image/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err106];
        } else {
          vErrors.push(err106);
        }
        errors++;
      }
    }
    if (data.conformityAssessment !== undefined) {
      let data64 = data.conformityAssessment;
      if (Array.isArray(data64)) {
        const len17 = data64.length;
        for (let i17 = 0; i17 < len17; i17++) {
          if (
            !validate23(data64[i17], {
              instancePath: instancePath + '/conformityAssessment/' + i17,
              parentData: data64,
              parentDataProperty: i17,
              rootData,
              dynamicAnchors,
            })
          ) {
            vErrors = vErrors === null ? validate23.errors : vErrors.concat(validate23.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err107 = {
          instancePath: instancePath + '/conformityAssessment',
          schemaPath: '#/properties/conformityAssessment/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err107];
        } else {
          vErrors.push(err107);
        }
        errors++;
      }
    }
  } else {
    const err108 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: { type: 'object' },
      message: 'must be object',
    };
    if (vErrors === null) {
      vErrors = [err108];
    } else {
      vErrors.push(err108);
    }
    errors++;
  }
  validate20.errors = vErrors;
  return errors === 0;
}
validate20.evaluated = { props: true, dynamicProps: false, dynamicItems: false };
