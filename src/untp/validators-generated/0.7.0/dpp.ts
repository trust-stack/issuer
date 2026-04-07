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
    description: { type: 'string', description: 'Description of the product.' },
    idScheme: {
      type: 'object',
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['IdentifierScheme'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'IdentifierScheme', minContains: 1 } }],
        },
        id: { type: 'string', format: 'uri', description: 'The URI of this identifier scheme' },
        name: {
          example: 'Global Identifier Scheme Name',
          type: 'string',
          description: 'The name of the identifier scheme. ',
        },
      },
      required: ['id', 'name'],
      description:
        'The identifier scheme for this product.  Eg a GS1 GTIN or an AU Livestock NLIS, or similar. If self issued then use the party ID of the issuer.  ',
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
    idGranularity: {
      type: 'string',
      enum: ['model', 'batch', 'item'],
      example: 'model',
      description: 'The identification granularity for this product (item, batch, model)',
    },
    productImage: {
      $ref: '#/$defs/Link',
      description: 'Reference information (location, type, name) of an image of the product.',
    },
    characteristics: {
      $ref: '#/$defs/Characteristics',
      description: 'A set of indusutry specific product information. ',
    },
    productCategory: {
      type: 'array',
      items: { $ref: '#/$defs/Classification' },
      description:
        "A code representing the product's class, typically using the UN CPC (United Nations Central Product Classification) https://unstats.un.org/unsd/classifications/Econ/cpc",
    },
    relatedDocument: {
      type: 'array',
      items: { $ref: '#/$defs/Link' },
      description:
        'A list of links to documents providing additional product information. Documents that support a conformity claim (e.g. permits or certificates) SHOULD be referenced as claim evidence rather than here.',
    },
    relatedParty: {
      type: 'array',
      items: { $ref: '#/$defs/PartyRole' },
      description: 'A list of parties with a defined relationship to this product',
    },
    producedAtFacility: {
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
      description: 'The Facility where the product batch was produced / manufactured.',
    },
    productionDate: {
      example: '2024-04-25',
      type: 'string',
      format: 'date',
      description:
        'The ISO 8601 date on which the product batch or individual serialised item was manufactured.',
    },
    countryOfProduction: {
      $ref: '#/$defs/Country',
      description:
        'The country in which this item was produced / manufactured.using ISO-3166 code and name.',
    },
    dimensions: {
      $ref: '#/$defs/Dimension',
      description:
        'The physical dimensions of the product. Not every dimension is relevant to every products.  For example bulk materials may have weight and volume but not length, width, or height."weight":{"value":10, "unit":"KGM"}',
    },
    materialProvenance: {
      type: 'array',
      items: { $ref: '#/$defs/Material' },
      description:
        'A list of materials provenance objects providing details on the origin and mass fraction of materials of the product or batch.',
    },
    packaging: { $ref: '#/$defs/Package', description: 'The packaging for this product.' },
    productLabel: {
      type: 'array',
      items: { $ref: '#/$defs/Image' },
      description:
        'An array of labels that may appear on the product such as certification marks or regulatory labels.',
    },
    performanceClaim: {
      type: 'array',
      items: { $ref: '#/$defs/Claim' },
      description: 'A list of performance claims (eg emissions intensity) for this product.',
    },
  },
  description:
    'The ProductInformation class encapsulates detailed information regarding a specific product, including its identification details, manufacturer, and other pertinent details.',
  required: [
    'id',
    'name',
    'idScheme',
    'idGranularity',
    'productCategory',
    'producedAtFacility',
    'countryOfProduction',
  ],
  $defs: {
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
    Characteristics: {
      type: 'object',
      additionalProperties: true,
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['Characteristics'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'Characteristics', minContains: 1 } }],
        },
      },
      description:
        'A declaration of conformance with one or more criteria from a specific standard or regulation.  ',
    },
    Classification: {
      type: 'object',
      additionalProperties: false,
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['Classification'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'Classification', minContains: 1 } }],
        },
        code: {
          example: 46410,
          type: 'string',
          description: 'classification code within the scheme',
        },
        name: {
          example: 'Primary cells and primary batteries',
          type: 'string',
          description: 'Name of the classification represented by the code',
        },
        definition: {
          type: 'string',
          description: 'A rich definition of this classification code.',
        },
        schemeId: {
          example: 'https://unstats.un.org/unsd/classifications/Econ/cpc/',
          type: 'string',
          format: 'uri',
          description: 'Classification scheme ID',
        },
        schemeName: {
          example: 'UN Central Product Classification (CPC)',
          type: 'string',
          description: 'The name of the classification scheme',
        },
      },
      description:
        'A classification scheme and code / name representing a category value for a product, entity, or facility.',
      required: ['code', 'name', 'schemeId', 'schemeName'],
    },
    PartyRole: {
      type: 'object',
      additionalProperties: false,
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['PartyRole'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'PartyRole', minContains: 1 } }],
        },
        role: {
          type: 'string',
          enum: [
            'owner',
            'producer',
            'manufacturer',
            'processor',
            'remanufacturer',
            'recycler',
            'operator',
            'serviceProvider',
            'inspector',
            'certifier',
            'logisticsProvider',
            'carrier',
            'consignor',
            'consignee',
            'importer',
            'exporter',
            'distributor',
            'retailer',
            'brandOwner',
            'regulator',
          ],
          example: 'owner',
          description: 'The role played by the party in this relationship',
        },
        party: { $ref: '#/$defs/Party', description: 'The party that has the specified role.' },
      },
      description: 'A party with a defined relationship to the referencing entity',
      required: ['role', 'party'],
    },
    Party: {
      type: 'object',
      additionalProperties: true,
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
        description: {
          type: 'string',
          description: 'Description of the party including function and other names.',
        },
        registeredId: {
          example: 90664869327,
          type: 'string',
          description:
            'The registration number (alphanumeric) of the Party within the register. Unique within the register.',
        },
        idScheme: {
          type: 'object',
          properties: {
            type: {
              type: 'array',
              readOnly: true,
              default: ['IdentifierScheme'],
              items: { type: 'string' },
              allOf: [{ contains: { const: 'IdentifierScheme', minContains: 1 } }],
            },
            id: { type: 'string', format: 'uri', description: 'The URI of this identifier scheme' },
            name: {
              example: 'Global Identifier Scheme Name',
              type: 'string',
              description: 'The name of the identifier scheme. ',
            },
          },
          required: ['id', 'name'],
          description:
            'The identifier scheme of the party.  Typically a national business register or a global scheme such as GLEIF. ',
        },
        registrationCountry: {
          $ref: '#/$defs/Country',
          description:
            'the country in which this organisation is registered - using ISO-3166 code and name.',
        },
        partyAddress: { $ref: '#/$defs/Address', description: 'The address of the party' },
        organisationWebsite: {
          example: 'https://example-company.com',
          type: 'string',
          format: 'uri',
          description: 'Website for this organisation',
        },
        industryCategory: {
          type: 'array',
          items: { $ref: '#/$defs/Classification' },
          description:
            'The industry categories for this organisation.  Recommend use of UNCPC as the category scheme. for example - unstats.un.org/isic/1030',
        },
        partyAlsoKnownAs: {
          type: 'array',
          items: {
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
          },
          description:
            'An optional list of other registered identifiers for this organisation. For example DUNS, GLN, LEI, etc',
        },
      },
      description:
        'An organisation.  May be a supply chain actor, a certifier, a government agency.',
      required: ['id', 'name'],
    },
    Country: {
      type: 'object',
      additionalProperties: false,
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['Country'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'Country', minContains: 1 } }],
        },
        countryCode: {
          type: 'string',
          'x-external-enumeration': 'https://vocabulary.uncefact.org/CountryId#',
          description:
            'ISO 3166 country code\n\n    This is an enumerated value, but the list of valid values are too big, or change too often to include here. You can access the list of allowable values at this URL:  https://vocabulary.uncefact.org/CountryId#\n    ',
        },
        countryName: { type: 'string', description: 'Country Name as defined in ISO 3166' },
      },
      description: 'Country Code and Name from ISO 3166',
      required: ['countryCode'],
    },
    Address: {
      type: 'object',
      additionalProperties: false,
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['Address'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'Address', minContains: 1 } }],
        },
        streetAddress: {
          example: 'level 11, 15 London Circuit',
          type: 'string',
          description: 'the street address as an unstructured string.',
        },
        postalCode: {
          example: 2601,
          type: 'string',
          description: 'The postal code or zip code for this address.',
        },
        addressLocality: {
          example: 'Acton',
          type: 'string',
          description: 'The city, suburb or township name.',
        },
        addressRegion: {
          example: 'ACT',
          type: 'string',
          description: 'The state or territory or province',
        },
        addressCountry: {
          $ref: '#/$defs/Country',
          description: 'The address country as an ISO-3166 two letter country code and name.',
        },
      },
      description: 'A postal address.',
      required: [
        'streetAddress',
        'postalCode',
        'addressLocality',
        'addressRegion',
        'addressCountry',
      ],
    },
    Dimension: {
      type: 'object',
      additionalProperties: true,
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['Dimension'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'Dimension', minContains: 1 } }],
        },
        weight: {
          $ref: '#/$defs/Measure',
          description: 'the weight of the product. EG {"value":10, "unit":"KGM"}',
        },
        length: {
          $ref: '#/$defs/Measure',
          description: 'The length of the product or packaging eg {"value":840, "unit":"MMT"}',
        },
        width: {
          $ref: '#/$defs/Measure',
          description: 'The width of the product or packaging. eg {"value":150, "unit":"MMT"}',
        },
        height: {
          $ref: '#/$defs/Measure',
          description: 'The height of the product or packaging. eg {"value":220, "unit":"MMT"}',
        },
        volume: {
          $ref: '#/$defs/Measure',
          description: 'The displacement volume of the product. eg {"value":7.5, "unit":"LTR"}',
        },
      },
      description: 'Overall (length, width, height) dimensions and weight/volume of an item.',
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
    Material: {
      type: 'object',
      additionalProperties: true,
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['Material'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'Material', minContains: 1 } }],
        },
        name: {
          example: 'Lithium Spodumene',
          type: 'string',
          description: 'Name of this material (eg "Egyptian Cotton")',
        },
        originCountry: {
          $ref: '#/$defs/Country',
          description:
            'A ISO 3166-1 code representing the country of origin of the component or ingredient.',
        },
        materialType: {
          $ref: '#/$defs/Classification',
          description:
            'The type of this material - as a value drawn from a controlled vocabulary eg from UN Framework Classification for Resources (UNFC).',
        },
        massFraction: {
          maximum: 1,
          minimum: 0,
          example: 0.2,
          type: 'number',
          description:
            'The mass fraction as a decimal of the product (or facility reporting period)  represented by this material. ',
        },
        mass: { $ref: '#/$defs/Measure', description: 'The mass of the material component.' },
        recycledMassFraction: {
          maximum: 1,
          minimum: 0,
          example: 0.5,
          type: 'number',
          description: 'Mass fraction of this material that is recycled (eg 50% recycled Lithium)',
        },
        hazardous: {
          type: 'boolean',
          description:
            'Indicates whether this material is hazardous. If true then the materialSafetyInformation property must be present',
        },
        symbol: {
          $ref: '#/$defs/Image',
          description:
            'Based 64 encoded binary used to represent a visual symbol for a given material. ',
        },
        materialSafetyInformation: {
          $ref: '#/$defs/Link',
          description:
            'Reference to further information about safe handling of this hazardous material (for example a link to a material safety data sheet)',
        },
      },
      description:
        'The material class encapsulates details about the origin or source of raw materials in a product, including the country of origin and the mass fraction.',
      required: ['name', 'originCountry', 'materialType', 'massFraction'],
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
    Package: {
      type: 'object',
      additionalProperties: false,
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['Package'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'Package', minContains: 1 } }],
        },
        description: { type: 'string', description: 'Description of the packaging.' },
        dimensions: { $ref: '#/$defs/Dimension', description: 'dimensions of the packaging' },
        materialUsed: {
          type: 'array',
          items: { $ref: '#/$defs/Material' },
          description: 'materials used for the packaging.',
        },
        packageLabel: {
          type: 'array',
          items: { $ref: '#/$defs/Image' },
          description:
            'An array of package labels that may appear on the packaging together with their meaning. Use for small images that represent certification marks or regulatory requirements. Large images should be linked as evidence to claims.',
        },
        performanceClaim: {
          type: 'array',
          items: { $ref: '#/$defs/Claim' },
          description: 'conformity claims made about the packaging.',
        },
      },
      description: 'Details of product packaging',
      required: ['description', 'dimensions', 'materialUsed'],
    },
    Claim: {
      type: 'object',
      additionalProperties: false,
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['Claim'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'Claim', minContains: 1 } }],
        },
        id: {
          example: 'https://sample-company.com/claim/e78dab5d-b6f6-4bc4-a458-7feb039f6cb3',
          type: 'string',
          format: 'uri',
          description:
            'Globally unique identifier of this claim. Typically represented as a URI companyURL/claimID URI or a UUID',
        },
        name: {
          example: 'Sample company Forced Labour claim',
          type: 'string',
          description:
            'Name of this claim - typically similar or the same as the referenced criterion name.',
        },
        description: { type: 'string', description: 'Description of this conformity claim' },
        referenceCriteria: {
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
          description: 'The criterion against which the claim is made.',
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
          description:
            'List of references to regulation to which conformity is claimed claimed for this product',
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
          description:
            'List of references to standards to which conformity is claimed claimed for this product',
        },
        claimDate: {
          type: 'string',
          format: 'date',
          description: 'That date on which the claimed performance is applicable.',
        },
        applicablePeriod: {
          $ref: '#/$defs/Period',
          description: 'The applicable reporting period for this facility record.',
        },
        claimedPerformance: {
          type: 'array',
          items: { $ref: '#/$defs/Performance' },
          description: 'The claimed performance level ',
        },
        evidence: {
          type: 'array',
          items: { $ref: '#/$defs/Link' },
          description:
            'A URI pointing to the evidence supporting the claim. SHOULD be a URL to a UNTP Digital Conformity Credential (DCC)',
        },
        conformityTopic: {
          type: 'array',
          items: { $ref: '#/$defs/ConformityTopic' },
          description: 'The conformity topic category for this assessment',
        },
      },
      description:
        'A performance claim about a product, facility, or organisation that is made against a well defined criterion.',
      required: [
        'id',
        'name',
        'referenceCriteria',
        'claimDate',
        'claimedPerformance',
        'conformityTopic',
      ],
    },
    Period: {
      type: 'object',
      additionalProperties: false,
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['Period'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'Period', minContains: 1 } }],
        },
        startDate: { type: 'string', format: 'date', description: 'The period start date' },
        endDate: { type: 'string', format: 'date', description: 'The period end date' },
        periodInformation: {
          type: 'string',
          description: 'Additional information relevant to this reporting period',
        },
      },
      description:
        'A period of time, typically a month, quarter or a year, which defines the context boundary for reported facts.',
      required: ['startDate', 'endDate'],
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
const schema32 = {
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
  additionalProperties: true,
  properties: {
    type: {
      type: 'array',
      readOnly: true,
      default: ['Characteristics'],
      items: { type: 'string' },
      allOf: [{ contains: { const: 'Characteristics', minContains: 1 } }],
    },
  },
  description:
    'A declaration of conformance with one or more criteria from a specific standard or regulation.  ',
};
const schema34 = {
  type: 'object',
  additionalProperties: false,
  properties: {
    type: {
      type: 'array',
      readOnly: true,
      default: ['Classification'],
      items: { type: 'string' },
      allOf: [{ contains: { const: 'Classification', minContains: 1 } }],
    },
    code: { example: 46410, type: 'string', description: 'classification code within the scheme' },
    name: {
      example: 'Primary cells and primary batteries',
      type: 'string',
      description: 'Name of the classification represented by the code',
    },
    definition: { type: 'string', description: 'A rich definition of this classification code.' },
    schemeId: {
      example: 'https://unstats.un.org/unsd/classifications/Econ/cpc/',
      type: 'string',
      format: 'uri',
      description: 'Classification scheme ID',
    },
    schemeName: {
      example: 'UN Central Product Classification (CPC)',
      type: 'string',
      description: 'The name of the classification scheme',
    },
  },
  description:
    'A classification scheme and code / name representing a category value for a product, entity, or facility.',
  required: ['code', 'name', 'schemeId', 'schemeName'],
};
const schema38 = {
  type: 'object',
  additionalProperties: false,
  properties: {
    type: {
      type: 'array',
      readOnly: true,
      default: ['Country'],
      items: { type: 'string' },
      allOf: [{ contains: { const: 'Country', minContains: 1 } }],
    },
    countryCode: {
      type: 'string',
      'x-external-enumeration': 'https://vocabulary.uncefact.org/CountryId#',
      description:
        'ISO 3166 country code\n\n    This is an enumerated value, but the list of valid values are too big, or change too often to include here. You can access the list of allowable values at this URL:  https://vocabulary.uncefact.org/CountryId#\n    ',
    },
    countryName: { type: 'string', description: 'Country Name as defined in ISO 3166' },
  },
  description: 'Country Code and Name from ISO 3166',
  required: ['countryCode'],
};
const schema53 = {
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
const formats22 = fullFormats.date;
const formats26 = fullFormats.byte;
const schema36 = {
  type: 'object',
  additionalProperties: false,
  properties: {
    type: {
      type: 'array',
      readOnly: true,
      default: ['PartyRole'],
      items: { type: 'string' },
      allOf: [{ contains: { const: 'PartyRole', minContains: 1 } }],
    },
    role: {
      type: 'string',
      enum: [
        'owner',
        'producer',
        'manufacturer',
        'processor',
        'remanufacturer',
        'recycler',
        'operator',
        'serviceProvider',
        'inspector',
        'certifier',
        'logisticsProvider',
        'carrier',
        'consignor',
        'consignee',
        'importer',
        'exporter',
        'distributor',
        'retailer',
        'brandOwner',
        'regulator',
      ],
      example: 'owner',
      description: 'The role played by the party in this relationship',
    },
    party: { $ref: '#/$defs/Party', description: 'The party that has the specified role.' },
  },
  description: 'A party with a defined relationship to the referencing entity',
  required: ['role', 'party'],
};
const schema37 = {
  type: 'object',
  additionalProperties: true,
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
    description: {
      type: 'string',
      description: 'Description of the party including function and other names.',
    },
    registeredId: {
      example: 90664869327,
      type: 'string',
      description:
        'The registration number (alphanumeric) of the Party within the register. Unique within the register.',
    },
    idScheme: {
      type: 'object',
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['IdentifierScheme'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'IdentifierScheme', minContains: 1 } }],
        },
        id: { type: 'string', format: 'uri', description: 'The URI of this identifier scheme' },
        name: {
          example: 'Global Identifier Scheme Name',
          type: 'string',
          description: 'The name of the identifier scheme. ',
        },
      },
      required: ['id', 'name'],
      description:
        'The identifier scheme of the party.  Typically a national business register or a global scheme such as GLEIF. ',
    },
    registrationCountry: {
      $ref: '#/$defs/Country',
      description:
        'the country in which this organisation is registered - using ISO-3166 code and name.',
    },
    partyAddress: { $ref: '#/$defs/Address', description: 'The address of the party' },
    organisationWebsite: {
      example: 'https://example-company.com',
      type: 'string',
      format: 'uri',
      description: 'Website for this organisation',
    },
    industryCategory: {
      type: 'array',
      items: { $ref: '#/$defs/Classification' },
      description:
        'The industry categories for this organisation.  Recommend use of UNCPC as the category scheme. for example - unstats.un.org/isic/1030',
    },
    partyAlsoKnownAs: {
      type: 'array',
      items: {
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
      },
      description:
        'An optional list of other registered identifiers for this organisation. For example DUNS, GLN, LEI, etc',
    },
  },
  description: 'An organisation.  May be a supply chain actor, a certifier, a government agency.',
  required: ['id', 'name'],
};
const schema39 = {
  type: 'object',
  additionalProperties: false,
  properties: {
    type: {
      type: 'array',
      readOnly: true,
      default: ['Address'],
      items: { type: 'string' },
      allOf: [{ contains: { const: 'Address', minContains: 1 } }],
    },
    streetAddress: {
      example: 'level 11, 15 London Circuit',
      type: 'string',
      description: 'the street address as an unstructured string.',
    },
    postalCode: {
      example: 2601,
      type: 'string',
      description: 'The postal code or zip code for this address.',
    },
    addressLocality: {
      example: 'Acton',
      type: 'string',
      description: 'The city, suburb or township name.',
    },
    addressRegion: {
      example: 'ACT',
      type: 'string',
      description: 'The state or territory or province',
    },
    addressCountry: {
      $ref: '#/$defs/Country',
      description: 'The address country as an ISO-3166 two letter country code and name.',
    },
  },
  description: 'A postal address.',
  required: ['streetAddress', 'postalCode', 'addressLocality', 'addressRegion', 'addressCountry'],
};
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
    if (data.streetAddress === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'streetAddress' },
        message: "must have required property '" + 'streetAddress' + "'",
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.postalCode === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'postalCode' },
        message: "must have required property '" + 'postalCode' + "'",
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.addressLocality === undefined) {
      const err2 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'addressLocality' },
        message: "must have required property '" + 'addressLocality' + "'",
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.addressRegion === undefined) {
      const err3 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'addressRegion' },
        message: "must have required property '" + 'addressRegion' + "'",
      };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.addressCountry === undefined) {
      const err4 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'addressCountry' },
        message: "must have required property '" + 'addressCountry' + "'",
      };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    for (const key0 in data) {
      if (
        !(
          key0 === 'type' ||
          key0 === 'streetAddress' ||
          key0 === 'postalCode' ||
          key0 === 'addressLocality' ||
          key0 === 'addressRegion' ||
          key0 === 'addressCountry'
        )
      ) {
        const err5 = {
          instancePath,
          schemaPath: '#/additionalProperties',
          keyword: 'additionalProperties',
          params: { additionalProperty: key0 },
          message: 'must NOT have additional properties',
        };
        if (vErrors === null) {
          vErrors = [err5];
        } else {
          vErrors.push(err5);
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
          if ('Address' !== data0[i0]) {
            const err6 = {
              instancePath: instancePath + '/type/' + i0,
              schemaPath: '#/properties/type/allOf/0/contains/const',
              keyword: 'const',
              params: { allowedValue: 'Address' },
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
    if (data.streetAddress !== undefined) {
      if (typeof data.streetAddress !== 'string') {
        const err10 = {
          instancePath: instancePath + '/streetAddress',
          schemaPath: '#/properties/streetAddress/type',
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
    if (data.postalCode !== undefined) {
      if (typeof data.postalCode !== 'string') {
        const err11 = {
          instancePath: instancePath + '/postalCode',
          schemaPath: '#/properties/postalCode/type',
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
    if (data.addressLocality !== undefined) {
      if (typeof data.addressLocality !== 'string') {
        const err12 = {
          instancePath: instancePath + '/addressLocality',
          schemaPath: '#/properties/addressLocality/type',
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
    if (data.addressRegion !== undefined) {
      if (typeof data.addressRegion !== 'string') {
        const err13 = {
          instancePath: instancePath + '/addressRegion',
          schemaPath: '#/properties/addressRegion/type',
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
    if (data.addressCountry !== undefined) {
      let data7 = data.addressCountry;
      if (data7 && typeof data7 == 'object' && !Array.isArray(data7)) {
        if (data7.countryCode === undefined) {
          const err14 = {
            instancePath: instancePath + '/addressCountry',
            schemaPath: '#/$defs/Country/required',
            keyword: 'required',
            params: { missingProperty: 'countryCode' },
            message: "must have required property '" + 'countryCode' + "'",
          };
          if (vErrors === null) {
            vErrors = [err14];
          } else {
            vErrors.push(err14);
          }
          errors++;
        }
        for (const key1 in data7) {
          if (!(key1 === 'type' || key1 === 'countryCode' || key1 === 'countryName')) {
            const err15 = {
              instancePath: instancePath + '/addressCountry',
              schemaPath: '#/$defs/Country/additionalProperties',
              keyword: 'additionalProperties',
              params: { additionalProperty: key1 },
              message: 'must NOT have additional properties',
            };
            if (vErrors === null) {
              vErrors = [err15];
            } else {
              vErrors.push(err15);
            }
            errors++;
          }
        }
        if (data7.type !== undefined) {
          let data8 = data7.type;
          if (Array.isArray(data8)) {
            const _errs24 = errors;
            const len2 = data8.length;
            for (let i2 = 0; i2 < len2; i2++) {
              const _errs25 = errors;
              if ('Country' !== data8[i2]) {
                const err16 = {
                  instancePath: instancePath + '/addressCountry/type/' + i2,
                  schemaPath: '#/$defs/Country/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Country' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err16];
                } else {
                  vErrors.push(err16);
                }
                errors++;
              }
              var valid8 = _errs25 === errors;
              if (valid8) {
                break;
              }
            }
            if (!valid8) {
              const err17 = {
                instancePath: instancePath + '/addressCountry/type',
                schemaPath: '#/$defs/Country/properties/type/allOf/0/contains',
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
              errors = _errs24;
              if (vErrors !== null) {
                if (_errs24) {
                  vErrors.length = _errs24;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data8)) {
            const len3 = data8.length;
            for (let i3 = 0; i3 < len3; i3++) {
              if (typeof data8[i3] !== 'string') {
                const err18 = {
                  instancePath: instancePath + '/addressCountry/type/' + i3,
                  schemaPath: '#/$defs/Country/properties/type/items/type',
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
              instancePath: instancePath + '/addressCountry/type',
              schemaPath: '#/$defs/Country/properties/type/type',
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
        if (data7.countryCode !== undefined) {
          if (typeof data7.countryCode !== 'string') {
            const err20 = {
              instancePath: instancePath + '/addressCountry/countryCode',
              schemaPath: '#/$defs/Country/properties/countryCode/type',
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
        if (data7.countryName !== undefined) {
          if (typeof data7.countryName !== 'string') {
            const err21 = {
              instancePath: instancePath + '/addressCountry/countryName',
              schemaPath: '#/$defs/Country/properties/countryName/type',
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
      } else {
        const err22 = {
          instancePath: instancePath + '/addressCountry',
          schemaPath: '#/$defs/Country/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
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
      instancePath,
      schemaPath: '#/type',
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
  validate23.errors = vErrors;
  return errors === 0;
}
validate23.evaluated = { props: true, dynamicProps: false, dynamicItems: false };
function validate22(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {},
) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate22.evaluated;
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
    if (data.type !== undefined) {
      let data0 = data.type;
      if (Array.isArray(data0)) {
        const _errs5 = errors;
        const len0 = data0.length;
        for (let i0 = 0; i0 < len0; i0++) {
          const _errs6 = errors;
          if ('Party' !== data0[i0]) {
            const err2 = {
              instancePath: instancePath + '/type/' + i0,
              schemaPath: '#/properties/type/allOf/0/contains/const',
              keyword: 'const',
              params: { allowedValue: 'Party' },
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
    if (data.id !== undefined) {
      let data3 = data.id;
      if (typeof data3 === 'string') {
        if (!formats0(data3)) {
          const err6 = {
            instancePath: instancePath + '/id',
            schemaPath: '#/properties/id/format',
            keyword: 'format',
            params: { format: 'uri' },
            message: 'must match format "' + 'uri' + '"',
          };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
      } else {
        const err7 = {
          instancePath: instancePath + '/id',
          schemaPath: '#/properties/id/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data.name !== undefined) {
      if (typeof data.name !== 'string') {
        const err8 = {
          instancePath: instancePath + '/name',
          schemaPath: '#/properties/name/type',
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
    if (data.description !== undefined) {
      if (typeof data.description !== 'string') {
        const err9 = {
          instancePath: instancePath + '/description',
          schemaPath: '#/properties/description/type',
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
    if (data.registeredId !== undefined) {
      if (typeof data.registeredId !== 'string') {
        const err10 = {
          instancePath: instancePath + '/registeredId',
          schemaPath: '#/properties/registeredId/type',
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
    if (data.idScheme !== undefined) {
      let data7 = data.idScheme;
      if (data7 && typeof data7 == 'object' && !Array.isArray(data7)) {
        if (data7.id === undefined) {
          const err11 = {
            instancePath: instancePath + '/idScheme',
            schemaPath: '#/properties/idScheme/required',
            keyword: 'required',
            params: { missingProperty: 'id' },
            message: "must have required property '" + 'id' + "'",
          };
          if (vErrors === null) {
            vErrors = [err11];
          } else {
            vErrors.push(err11);
          }
          errors++;
        }
        if (data7.name === undefined) {
          const err12 = {
            instancePath: instancePath + '/idScheme',
            schemaPath: '#/properties/idScheme/required',
            keyword: 'required',
            params: { missingProperty: 'name' },
            message: "must have required property '" + 'name' + "'",
          };
          if (vErrors === null) {
            vErrors = [err12];
          } else {
            vErrors.push(err12);
          }
          errors++;
        }
        if (data7.type !== undefined) {
          let data8 = data7.type;
          if (Array.isArray(data8)) {
            const _errs22 = errors;
            const len2 = data8.length;
            for (let i2 = 0; i2 < len2; i2++) {
              const _errs23 = errors;
              if ('IdentifierScheme' !== data8[i2]) {
                const err13 = {
                  instancePath: instancePath + '/idScheme/type/' + i2,
                  schemaPath: '#/properties/idScheme/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'IdentifierScheme' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err13];
                } else {
                  vErrors.push(err13);
                }
                errors++;
              }
              var valid7 = _errs23 === errors;
              if (valid7) {
                break;
              }
            }
            if (!valid7) {
              const err14 = {
                instancePath: instancePath + '/idScheme/type',
                schemaPath: '#/properties/idScheme/properties/type/allOf/0/contains',
                keyword: 'contains',
                params: { minContains: 1 },
                message: 'must contain at least 1 valid item(s)',
              };
              if (vErrors === null) {
                vErrors = [err14];
              } else {
                vErrors.push(err14);
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
            const len3 = data8.length;
            for (let i3 = 0; i3 < len3; i3++) {
              if (typeof data8[i3] !== 'string') {
                const err15 = {
                  instancePath: instancePath + '/idScheme/type/' + i3,
                  schemaPath: '#/properties/idScheme/properties/type/items/type',
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
          } else {
            const err16 = {
              instancePath: instancePath + '/idScheme/type',
              schemaPath: '#/properties/idScheme/properties/type/type',
              keyword: 'type',
              params: { type: 'array' },
              message: 'must be array',
            };
            if (vErrors === null) {
              vErrors = [err16];
            } else {
              vErrors.push(err16);
            }
            errors++;
          }
        }
        if (data7.id !== undefined) {
          let data11 = data7.id;
          if (typeof data11 === 'string') {
            if (!formats0(data11)) {
              const err17 = {
                instancePath: instancePath + '/idScheme/id',
                schemaPath: '#/properties/idScheme/properties/id/format',
                keyword: 'format',
                params: { format: 'uri' },
                message: 'must match format "' + 'uri' + '"',
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
              instancePath: instancePath + '/idScheme/id',
              schemaPath: '#/properties/idScheme/properties/id/type',
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
        if (data7.name !== undefined) {
          if (typeof data7.name !== 'string') {
            const err19 = {
              instancePath: instancePath + '/idScheme/name',
              schemaPath: '#/properties/idScheme/properties/name/type',
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
          instancePath: instancePath + '/idScheme',
          schemaPath: '#/properties/idScheme/type',
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
    if (data.registrationCountry !== undefined) {
      let data13 = data.registrationCountry;
      if (data13 && typeof data13 == 'object' && !Array.isArray(data13)) {
        if (data13.countryCode === undefined) {
          const err21 = {
            instancePath: instancePath + '/registrationCountry',
            schemaPath: '#/$defs/Country/required',
            keyword: 'required',
            params: { missingProperty: 'countryCode' },
            message: "must have required property '" + 'countryCode' + "'",
          };
          if (vErrors === null) {
            vErrors = [err21];
          } else {
            vErrors.push(err21);
          }
          errors++;
        }
        for (const key0 in data13) {
          if (!(key0 === 'type' || key0 === 'countryCode' || key0 === 'countryName')) {
            const err22 = {
              instancePath: instancePath + '/registrationCountry',
              schemaPath: '#/$defs/Country/additionalProperties',
              keyword: 'additionalProperties',
              params: { additionalProperty: key0 },
              message: 'must NOT have additional properties',
            };
            if (vErrors === null) {
              vErrors = [err22];
            } else {
              vErrors.push(err22);
            }
            errors++;
          }
        }
        if (data13.type !== undefined) {
          let data14 = data13.type;
          if (Array.isArray(data14)) {
            const _errs37 = errors;
            const len4 = data14.length;
            for (let i4 = 0; i4 < len4; i4++) {
              const _errs38 = errors;
              if ('Country' !== data14[i4]) {
                const err23 = {
                  instancePath: instancePath + '/registrationCountry/type/' + i4,
                  schemaPath: '#/$defs/Country/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Country' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err23];
                } else {
                  vErrors.push(err23);
                }
                errors++;
              }
              var valid13 = _errs38 === errors;
              if (valid13) {
                break;
              }
            }
            if (!valid13) {
              const err24 = {
                instancePath: instancePath + '/registrationCountry/type',
                schemaPath: '#/$defs/Country/properties/type/allOf/0/contains',
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
              errors = _errs37;
              if (vErrors !== null) {
                if (_errs37) {
                  vErrors.length = _errs37;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data14)) {
            const len5 = data14.length;
            for (let i5 = 0; i5 < len5; i5++) {
              if (typeof data14[i5] !== 'string') {
                const err25 = {
                  instancePath: instancePath + '/registrationCountry/type/' + i5,
                  schemaPath: '#/$defs/Country/properties/type/items/type',
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
              instancePath: instancePath + '/registrationCountry/type',
              schemaPath: '#/$defs/Country/properties/type/type',
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
        if (data13.countryCode !== undefined) {
          if (typeof data13.countryCode !== 'string') {
            const err27 = {
              instancePath: instancePath + '/registrationCountry/countryCode',
              schemaPath: '#/$defs/Country/properties/countryCode/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err27];
            } else {
              vErrors.push(err27);
            }
            errors++;
          }
        }
        if (data13.countryName !== undefined) {
          if (typeof data13.countryName !== 'string') {
            const err28 = {
              instancePath: instancePath + '/registrationCountry/countryName',
              schemaPath: '#/$defs/Country/properties/countryName/type',
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
      } else {
        const err29 = {
          instancePath: instancePath + '/registrationCountry',
          schemaPath: '#/$defs/Country/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err29];
        } else {
          vErrors.push(err29);
        }
        errors++;
      }
    }
    if (data.partyAddress !== undefined) {
      if (
        !validate23(data.partyAddress, {
          instancePath: instancePath + '/partyAddress',
          parentData: data,
          parentDataProperty: 'partyAddress',
          rootData,
          dynamicAnchors,
        })
      ) {
        vErrors = vErrors === null ? validate23.errors : vErrors.concat(validate23.errors);
        errors = vErrors.length;
      }
    }
    if (data.organisationWebsite !== undefined) {
      let data20 = data.organisationWebsite;
      if (typeof data20 === 'string') {
        if (!formats0(data20)) {
          const err30 = {
            instancePath: instancePath + '/organisationWebsite',
            schemaPath: '#/properties/organisationWebsite/format',
            keyword: 'format',
            params: { format: 'uri' },
            message: 'must match format "' + 'uri' + '"',
          };
          if (vErrors === null) {
            vErrors = [err30];
          } else {
            vErrors.push(err30);
          }
          errors++;
        }
      } else {
        const err31 = {
          instancePath: instancePath + '/organisationWebsite',
          schemaPath: '#/properties/organisationWebsite/type',
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
    if (data.industryCategory !== undefined) {
      let data21 = data.industryCategory;
      if (Array.isArray(data21)) {
        const len6 = data21.length;
        for (let i6 = 0; i6 < len6; i6++) {
          let data22 = data21[i6];
          if (data22 && typeof data22 == 'object' && !Array.isArray(data22)) {
            if (data22.code === undefined) {
              const err32 = {
                instancePath: instancePath + '/industryCategory/' + i6,
                schemaPath: '#/$defs/Classification/required',
                keyword: 'required',
                params: { missingProperty: 'code' },
                message: "must have required property '" + 'code' + "'",
              };
              if (vErrors === null) {
                vErrors = [err32];
              } else {
                vErrors.push(err32);
              }
              errors++;
            }
            if (data22.name === undefined) {
              const err33 = {
                instancePath: instancePath + '/industryCategory/' + i6,
                schemaPath: '#/$defs/Classification/required',
                keyword: 'required',
                params: { missingProperty: 'name' },
                message: "must have required property '" + 'name' + "'",
              };
              if (vErrors === null) {
                vErrors = [err33];
              } else {
                vErrors.push(err33);
              }
              errors++;
            }
            if (data22.schemeId === undefined) {
              const err34 = {
                instancePath: instancePath + '/industryCategory/' + i6,
                schemaPath: '#/$defs/Classification/required',
                keyword: 'required',
                params: { missingProperty: 'schemeId' },
                message: "must have required property '" + 'schemeId' + "'",
              };
              if (vErrors === null) {
                vErrors = [err34];
              } else {
                vErrors.push(err34);
              }
              errors++;
            }
            if (data22.schemeName === undefined) {
              const err35 = {
                instancePath: instancePath + '/industryCategory/' + i6,
                schemaPath: '#/$defs/Classification/required',
                keyword: 'required',
                params: { missingProperty: 'schemeName' },
                message: "must have required property '" + 'schemeName' + "'",
              };
              if (vErrors === null) {
                vErrors = [err35];
              } else {
                vErrors.push(err35);
              }
              errors++;
            }
            for (const key1 in data22) {
              if (
                !(
                  key1 === 'type' ||
                  key1 === 'code' ||
                  key1 === 'name' ||
                  key1 === 'definition' ||
                  key1 === 'schemeId' ||
                  key1 === 'schemeName'
                )
              ) {
                const err36 = {
                  instancePath: instancePath + '/industryCategory/' + i6,
                  schemaPath: '#/$defs/Classification/additionalProperties',
                  keyword: 'additionalProperties',
                  params: { additionalProperty: key1 },
                  message: 'must NOT have additional properties',
                };
                if (vErrors === null) {
                  vErrors = [err36];
                } else {
                  vErrors.push(err36);
                }
                errors++;
              }
            }
            if (data22.type !== undefined) {
              let data23 = data22.type;
              if (Array.isArray(data23)) {
                const _errs57 = errors;
                const len7 = data23.length;
                for (let i7 = 0; i7 < len7; i7++) {
                  const _errs58 = errors;
                  if ('Classification' !== data23[i7]) {
                    const err37 = {
                      instancePath: instancePath + '/industryCategory/' + i6 + '/type/' + i7,
                      schemaPath: '#/$defs/Classification/properties/type/allOf/0/contains/const',
                      keyword: 'const',
                      params: { allowedValue: 'Classification' },
                      message: 'must be equal to constant',
                    };
                    if (vErrors === null) {
                      vErrors = [err37];
                    } else {
                      vErrors.push(err37);
                    }
                    errors++;
                  }
                  var valid21 = _errs58 === errors;
                  if (valid21) {
                    break;
                  }
                }
                if (!valid21) {
                  const err38 = {
                    instancePath: instancePath + '/industryCategory/' + i6 + '/type',
                    schemaPath: '#/$defs/Classification/properties/type/allOf/0/contains',
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
                  errors = _errs57;
                  if (vErrors !== null) {
                    if (_errs57) {
                      vErrors.length = _errs57;
                    } else {
                      vErrors = null;
                    }
                  }
                }
              }
              if (Array.isArray(data23)) {
                const len8 = data23.length;
                for (let i8 = 0; i8 < len8; i8++) {
                  if (typeof data23[i8] !== 'string') {
                    const err39 = {
                      instancePath: instancePath + '/industryCategory/' + i6 + '/type/' + i8,
                      schemaPath: '#/$defs/Classification/properties/type/items/type',
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
                  instancePath: instancePath + '/industryCategory/' + i6 + '/type',
                  schemaPath: '#/$defs/Classification/properties/type/type',
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
            if (data22.code !== undefined) {
              if (typeof data22.code !== 'string') {
                const err41 = {
                  instancePath: instancePath + '/industryCategory/' + i6 + '/code',
                  schemaPath: '#/$defs/Classification/properties/code/type',
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
            if (data22.name !== undefined) {
              if (typeof data22.name !== 'string') {
                const err42 = {
                  instancePath: instancePath + '/industryCategory/' + i6 + '/name',
                  schemaPath: '#/$defs/Classification/properties/name/type',
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
            if (data22.definition !== undefined) {
              if (typeof data22.definition !== 'string') {
                const err43 = {
                  instancePath: instancePath + '/industryCategory/' + i6 + '/definition',
                  schemaPath: '#/$defs/Classification/properties/definition/type',
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
            if (data22.schemeId !== undefined) {
              let data29 = data22.schemeId;
              if (typeof data29 === 'string') {
                if (!formats0(data29)) {
                  const err44 = {
                    instancePath: instancePath + '/industryCategory/' + i6 + '/schemeId',
                    schemaPath: '#/$defs/Classification/properties/schemeId/format',
                    keyword: 'format',
                    params: { format: 'uri' },
                    message: 'must match format "' + 'uri' + '"',
                  };
                  if (vErrors === null) {
                    vErrors = [err44];
                  } else {
                    vErrors.push(err44);
                  }
                  errors++;
                }
              } else {
                const err45 = {
                  instancePath: instancePath + '/industryCategory/' + i6 + '/schemeId',
                  schemaPath: '#/$defs/Classification/properties/schemeId/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err45];
                } else {
                  vErrors.push(err45);
                }
                errors++;
              }
            }
            if (data22.schemeName !== undefined) {
              if (typeof data22.schemeName !== 'string') {
                const err46 = {
                  instancePath: instancePath + '/industryCategory/' + i6 + '/schemeName',
                  schemaPath: '#/$defs/Classification/properties/schemeName/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
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
              instancePath: instancePath + '/industryCategory/' + i6,
              schemaPath: '#/$defs/Classification/type',
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
          instancePath: instancePath + '/industryCategory',
          schemaPath: '#/properties/industryCategory/type',
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
    if (data.partyAlsoKnownAs !== undefined) {
      let data31 = data.partyAlsoKnownAs;
      if (Array.isArray(data31)) {
        const len9 = data31.length;
        for (let i9 = 0; i9 < len9; i9++) {
          let data32 = data31[i9];
          if (data32 && typeof data32 == 'object' && !Array.isArray(data32)) {
            if (data32.id === undefined) {
              const err49 = {
                instancePath: instancePath + '/partyAlsoKnownAs/' + i9,
                schemaPath: '#/properties/partyAlsoKnownAs/items/required',
                keyword: 'required',
                params: { missingProperty: 'id' },
                message: "must have required property '" + 'id' + "'",
              };
              if (vErrors === null) {
                vErrors = [err49];
              } else {
                vErrors.push(err49);
              }
              errors++;
            }
            if (data32.name === undefined) {
              const err50 = {
                instancePath: instancePath + '/partyAlsoKnownAs/' + i9,
                schemaPath: '#/properties/partyAlsoKnownAs/items/required',
                keyword: 'required',
                params: { missingProperty: 'name' },
                message: "must have required property '" + 'name' + "'",
              };
              if (vErrors === null) {
                vErrors = [err50];
              } else {
                vErrors.push(err50);
              }
              errors++;
            }
            if (data32.type !== undefined) {
              let data33 = data32.type;
              if (Array.isArray(data33)) {
                const _errs78 = errors;
                const len10 = data33.length;
                for (let i10 = 0; i10 < len10; i10++) {
                  const _errs79 = errors;
                  if ('Party' !== data33[i10]) {
                    const err51 = {
                      instancePath: instancePath + '/partyAlsoKnownAs/' + i9 + '/type/' + i10,
                      schemaPath:
                        '#/properties/partyAlsoKnownAs/items/properties/type/allOf/0/contains/const',
                      keyword: 'const',
                      params: { allowedValue: 'Party' },
                      message: 'must be equal to constant',
                    };
                    if (vErrors === null) {
                      vErrors = [err51];
                    } else {
                      vErrors.push(err51);
                    }
                    errors++;
                  }
                  var valid28 = _errs79 === errors;
                  if (valid28) {
                    break;
                  }
                }
                if (!valid28) {
                  const err52 = {
                    instancePath: instancePath + '/partyAlsoKnownAs/' + i9 + '/type',
                    schemaPath:
                      '#/properties/partyAlsoKnownAs/items/properties/type/allOf/0/contains',
                    keyword: 'contains',
                    params: { minContains: 1 },
                    message: 'must contain at least 1 valid item(s)',
                  };
                  if (vErrors === null) {
                    vErrors = [err52];
                  } else {
                    vErrors.push(err52);
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
                const len11 = data33.length;
                for (let i11 = 0; i11 < len11; i11++) {
                  if (typeof data33[i11] !== 'string') {
                    const err53 = {
                      instancePath: instancePath + '/partyAlsoKnownAs/' + i9 + '/type/' + i11,
                      schemaPath: '#/properties/partyAlsoKnownAs/items/properties/type/items/type',
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
                  instancePath: instancePath + '/partyAlsoKnownAs/' + i9 + '/type',
                  schemaPath: '#/properties/partyAlsoKnownAs/items/properties/type/type',
                  keyword: 'type',
                  params: { type: 'array' },
                  message: 'must be array',
                };
                if (vErrors === null) {
                  vErrors = [err54];
                } else {
                  vErrors.push(err54);
                }
                errors++;
              }
            }
            if (data32.id !== undefined) {
              let data36 = data32.id;
              if (typeof data36 === 'string') {
                if (!formats0(data36)) {
                  const err55 = {
                    instancePath: instancePath + '/partyAlsoKnownAs/' + i9 + '/id',
                    schemaPath: '#/properties/partyAlsoKnownAs/items/properties/id/format',
                    keyword: 'format',
                    params: { format: 'uri' },
                    message: 'must match format "' + 'uri' + '"',
                  };
                  if (vErrors === null) {
                    vErrors = [err55];
                  } else {
                    vErrors.push(err55);
                  }
                  errors++;
                }
              } else {
                const err56 = {
                  instancePath: instancePath + '/partyAlsoKnownAs/' + i9 + '/id',
                  schemaPath: '#/properties/partyAlsoKnownAs/items/properties/id/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err56];
                } else {
                  vErrors.push(err56);
                }
                errors++;
              }
            }
            if (data32.name !== undefined) {
              if (typeof data32.name !== 'string') {
                const err57 = {
                  instancePath: instancePath + '/partyAlsoKnownAs/' + i9 + '/name',
                  schemaPath: '#/properties/partyAlsoKnownAs/items/properties/name/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err57];
                } else {
                  vErrors.push(err57);
                }
                errors++;
              }
            }
            if (data32.registeredId !== undefined) {
              if (typeof data32.registeredId !== 'string') {
                const err58 = {
                  instancePath: instancePath + '/partyAlsoKnownAs/' + i9 + '/registeredId',
                  schemaPath: '#/properties/partyAlsoKnownAs/items/properties/registeredId/type',
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
              instancePath: instancePath + '/partyAlsoKnownAs/' + i9,
              schemaPath: '#/properties/partyAlsoKnownAs/items/type',
              keyword: 'type',
              params: { type: 'object' },
              message: 'must be object',
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
          instancePath: instancePath + '/partyAlsoKnownAs',
          schemaPath: '#/properties/partyAlsoKnownAs/type',
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
  } else {
    const err61 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: { type: 'object' },
      message: 'must be object',
    };
    if (vErrors === null) {
      vErrors = [err61];
    } else {
      vErrors.push(err61);
    }
    errors++;
  }
  validate22.errors = vErrors;
  return errors === 0;
}
validate22.evaluated = { props: true, dynamicProps: false, dynamicItems: false };
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
    if (data.role === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'role' },
        message: "must have required property '" + 'role' + "'",
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.party === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'party' },
        message: "must have required property '" + 'party' + "'",
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    for (const key0 in data) {
      if (!(key0 === 'type' || key0 === 'role' || key0 === 'party')) {
        const err2 = {
          instancePath,
          schemaPath: '#/additionalProperties',
          keyword: 'additionalProperties',
          params: { additionalProperty: key0 },
          message: 'must NOT have additional properties',
        };
        if (vErrors === null) {
          vErrors = [err2];
        } else {
          vErrors.push(err2);
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
          if ('PartyRole' !== data0[i0]) {
            const err3 = {
              instancePath: instancePath + '/type/' + i0,
              schemaPath: '#/properties/type/allOf/0/contains/const',
              keyword: 'const',
              params: { allowedValue: 'PartyRole' },
              message: 'must be equal to constant',
            };
            if (vErrors === null) {
              vErrors = [err3];
            } else {
              vErrors.push(err3);
            }
            errors++;
          }
          var valid2 = _errs6 === errors;
          if (valid2) {
            break;
          }
        }
        if (!valid2) {
          const err4 = {
            instancePath: instancePath + '/type',
            schemaPath: '#/properties/type/allOf/0/contains',
            keyword: 'contains',
            params: { minContains: 1 },
            message: 'must contain at least 1 valid item(s)',
          };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
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
            const err5 = {
              instancePath: instancePath + '/type/' + i1,
              schemaPath: '#/properties/type/items/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err5];
            } else {
              vErrors.push(err5);
            }
            errors++;
          }
        }
      } else {
        const err6 = {
          instancePath: instancePath + '/type',
          schemaPath: '#/properties/type/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
        }
        errors++;
      }
    }
    if (data.role !== undefined) {
      let data3 = data.role;
      if (typeof data3 !== 'string') {
        const err7 = {
          instancePath: instancePath + '/role',
          schemaPath: '#/properties/role/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
      if (
        !(
          data3 === 'owner' ||
          data3 === 'producer' ||
          data3 === 'manufacturer' ||
          data3 === 'processor' ||
          data3 === 'remanufacturer' ||
          data3 === 'recycler' ||
          data3 === 'operator' ||
          data3 === 'serviceProvider' ||
          data3 === 'inspector' ||
          data3 === 'certifier' ||
          data3 === 'logisticsProvider' ||
          data3 === 'carrier' ||
          data3 === 'consignor' ||
          data3 === 'consignee' ||
          data3 === 'importer' ||
          data3 === 'exporter' ||
          data3 === 'distributor' ||
          data3 === 'retailer' ||
          data3 === 'brandOwner' ||
          data3 === 'regulator'
        )
      ) {
        const err8 = {
          instancePath: instancePath + '/role',
          schemaPath: '#/properties/role/enum',
          keyword: 'enum',
          params: { allowedValues: schema36.properties.role.enum },
          message: 'must be equal to one of the allowed values',
        };
        if (vErrors === null) {
          vErrors = [err8];
        } else {
          vErrors.push(err8);
        }
        errors++;
      }
    }
    if (data.party !== undefined) {
      if (
        !validate22(data.party, {
          instancePath: instancePath + '/party',
          parentData: data,
          parentDataProperty: 'party',
          rootData,
          dynamicAnchors,
        })
      ) {
        vErrors = vErrors === null ? validate22.errors : vErrors.concat(validate22.errors);
        errors = vErrors.length;
      }
    }
  } else {
    const err9 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: { type: 'object' },
      message: 'must be object',
    };
    if (vErrors === null) {
      vErrors = [err9];
    } else {
      vErrors.push(err9);
    }
    errors++;
  }
  validate21.errors = vErrors;
  return errors === 0;
}
validate21.evaluated = { props: true, dynamicProps: false, dynamicItems: false };
const schema43 = {
  type: 'object',
  additionalProperties: true,
  properties: {
    type: {
      type: 'array',
      readOnly: true,
      default: ['Dimension'],
      items: { type: 'string' },
      allOf: [{ contains: { const: 'Dimension', minContains: 1 } }],
    },
    weight: {
      $ref: '#/$defs/Measure',
      description: 'the weight of the product. EG {"value":10, "unit":"KGM"}',
    },
    length: {
      $ref: '#/$defs/Measure',
      description: 'The length of the product or packaging eg {"value":840, "unit":"MMT"}',
    },
    width: {
      $ref: '#/$defs/Measure',
      description: 'The width of the product or packaging. eg {"value":150, "unit":"MMT"}',
    },
    height: {
      $ref: '#/$defs/Measure',
      description: 'The height of the product or packaging. eg {"value":220, "unit":"MMT"}',
    },
    volume: {
      $ref: '#/$defs/Measure',
      description: 'The displacement volume of the product. eg {"value":7.5, "unit":"LTR"}',
    },
  },
  description: 'Overall (length, width, height) dimensions and weight/volume of an item.',
};
const schema44 = {
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
function validate27(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {},
) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate27.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = undefined;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = undefined;
  }
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.type !== undefined) {
      let data0 = data.type;
      if (Array.isArray(data0)) {
        const _errs5 = errors;
        const len0 = data0.length;
        for (let i0 = 0; i0 < len0; i0++) {
          const _errs6 = errors;
          if ('Dimension' !== data0[i0]) {
            const err0 = {
              instancePath: instancePath + '/type/' + i0,
              schemaPath: '#/properties/type/allOf/0/contains/const',
              keyword: 'const',
              params: { allowedValue: 'Dimension' },
              message: 'must be equal to constant',
            };
            if (vErrors === null) {
              vErrors = [err0];
            } else {
              vErrors.push(err0);
            }
            errors++;
          }
          var valid2 = _errs6 === errors;
          if (valid2) {
            break;
          }
        }
        if (!valid2) {
          const err1 = {
            instancePath: instancePath + '/type',
            schemaPath: '#/properties/type/allOf/0/contains',
            keyword: 'contains',
            params: { minContains: 1 },
            message: 'must contain at least 1 valid item(s)',
          };
          if (vErrors === null) {
            vErrors = [err1];
          } else {
            vErrors.push(err1);
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
            const err2 = {
              instancePath: instancePath + '/type/' + i1,
              schemaPath: '#/properties/type/items/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err2];
            } else {
              vErrors.push(err2);
            }
            errors++;
          }
        }
      } else {
        const err3 = {
          instancePath: instancePath + '/type',
          schemaPath: '#/properties/type/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
        }
        errors++;
      }
    }
    if (data.weight !== undefined) {
      let data3 = data.weight;
      if (data3 && typeof data3 == 'object' && !Array.isArray(data3)) {
        if (data3.value === undefined) {
          const err4 = {
            instancePath: instancePath + '/weight',
            schemaPath: '#/$defs/Measure/required',
            keyword: 'required',
            params: { missingProperty: 'value' },
            message: "must have required property '" + 'value' + "'",
          };
          if (vErrors === null) {
            vErrors = [err4];
          } else {
            vErrors.push(err4);
          }
          errors++;
        }
        if (data3.unit === undefined) {
          const err5 = {
            instancePath: instancePath + '/weight',
            schemaPath: '#/$defs/Measure/required',
            keyword: 'required',
            params: { missingProperty: 'unit' },
            message: "must have required property '" + 'unit' + "'",
          };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
          }
          errors++;
        }
        for (const key0 in data3) {
          if (
            !(
              key0 === 'type' ||
              key0 === 'value' ||
              key0 === 'upperTolerance' ||
              key0 === 'lowerTolerance' ||
              key0 === 'unit'
            )
          ) {
            const err6 = {
              instancePath: instancePath + '/weight',
              schemaPath: '#/$defs/Measure/additionalProperties',
              keyword: 'additionalProperties',
              params: { additionalProperty: key0 },
              message: 'must NOT have additional properties',
            };
            if (vErrors === null) {
              vErrors = [err6];
            } else {
              vErrors.push(err6);
            }
            errors++;
          }
        }
        if (data3.type !== undefined) {
          let data4 = data3.type;
          if (Array.isArray(data4)) {
            const _errs16 = errors;
            const len2 = data4.length;
            for (let i2 = 0; i2 < len2; i2++) {
              const _errs17 = errors;
              if ('Measure' !== data4[i2]) {
                const err7 = {
                  instancePath: instancePath + '/weight/type/' + i2,
                  schemaPath: '#/$defs/Measure/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Measure' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err7];
                } else {
                  vErrors.push(err7);
                }
                errors++;
              }
              var valid8 = _errs17 === errors;
              if (valid8) {
                break;
              }
            }
            if (!valid8) {
              const err8 = {
                instancePath: instancePath + '/weight/type',
                schemaPath: '#/$defs/Measure/properties/type/allOf/0/contains',
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
              errors = _errs16;
              if (vErrors !== null) {
                if (_errs16) {
                  vErrors.length = _errs16;
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
                  instancePath: instancePath + '/weight/type/' + i3,
                  schemaPath: '#/$defs/Measure/properties/type/items/type',
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
              instancePath: instancePath + '/weight/type',
              schemaPath: '#/$defs/Measure/properties/type/type',
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
        if (data3.value !== undefined) {
          if (!(typeof data3.value == 'number')) {
            const err11 = {
              instancePath: instancePath + '/weight/value',
              schemaPath: '#/$defs/Measure/properties/value/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            };
            if (vErrors === null) {
              vErrors = [err11];
            } else {
              vErrors.push(err11);
            }
            errors++;
          }
        }
        if (data3.upperTolerance !== undefined) {
          if (!(typeof data3.upperTolerance == 'number')) {
            const err12 = {
              instancePath: instancePath + '/weight/upperTolerance',
              schemaPath: '#/$defs/Measure/properties/upperTolerance/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            };
            if (vErrors === null) {
              vErrors = [err12];
            } else {
              vErrors.push(err12);
            }
            errors++;
          }
        }
        if (data3.lowerTolerance !== undefined) {
          if (!(typeof data3.lowerTolerance == 'number')) {
            const err13 = {
              instancePath: instancePath + '/weight/lowerTolerance',
              schemaPath: '#/$defs/Measure/properties/lowerTolerance/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            };
            if (vErrors === null) {
              vErrors = [err13];
            } else {
              vErrors.push(err13);
            }
            errors++;
          }
        }
        if (data3.unit !== undefined) {
          if (typeof data3.unit !== 'string') {
            const err14 = {
              instancePath: instancePath + '/weight/unit',
              schemaPath: '#/$defs/Measure/properties/unit/type',
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
      } else {
        const err15 = {
          instancePath: instancePath + '/weight',
          schemaPath: '#/$defs/Measure/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err15];
        } else {
          vErrors.push(err15);
        }
        errors++;
      }
    }
    if (data.length !== undefined) {
      let data11 = data.length;
      if (data11 && typeof data11 == 'object' && !Array.isArray(data11)) {
        if (data11.value === undefined) {
          const err16 = {
            instancePath: instancePath + '/length',
            schemaPath: '#/$defs/Measure/required',
            keyword: 'required',
            params: { missingProperty: 'value' },
            message: "must have required property '" + 'value' + "'",
          };
          if (vErrors === null) {
            vErrors = [err16];
          } else {
            vErrors.push(err16);
          }
          errors++;
        }
        if (data11.unit === undefined) {
          const err17 = {
            instancePath: instancePath + '/length',
            schemaPath: '#/$defs/Measure/required',
            keyword: 'required',
            params: { missingProperty: 'unit' },
            message: "must have required property '" + 'unit' + "'",
          };
          if (vErrors === null) {
            vErrors = [err17];
          } else {
            vErrors.push(err17);
          }
          errors++;
        }
        for (const key1 in data11) {
          if (
            !(
              key1 === 'type' ||
              key1 === 'value' ||
              key1 === 'upperTolerance' ||
              key1 === 'lowerTolerance' ||
              key1 === 'unit'
            )
          ) {
            const err18 = {
              instancePath: instancePath + '/length',
              schemaPath: '#/$defs/Measure/additionalProperties',
              keyword: 'additionalProperties',
              params: { additionalProperty: key1 },
              message: 'must NOT have additional properties',
            };
            if (vErrors === null) {
              vErrors = [err18];
            } else {
              vErrors.push(err18);
            }
            errors++;
          }
        }
        if (data11.type !== undefined) {
          let data12 = data11.type;
          if (Array.isArray(data12)) {
            const _errs35 = errors;
            const len4 = data12.length;
            for (let i4 = 0; i4 < len4; i4++) {
              const _errs36 = errors;
              if ('Measure' !== data12[i4]) {
                const err19 = {
                  instancePath: instancePath + '/length/type/' + i4,
                  schemaPath: '#/$defs/Measure/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Measure' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err19];
                } else {
                  vErrors.push(err19);
                }
                errors++;
              }
              var valid14 = _errs36 === errors;
              if (valid14) {
                break;
              }
            }
            if (!valid14) {
              const err20 = {
                instancePath: instancePath + '/length/type',
                schemaPath: '#/$defs/Measure/properties/type/allOf/0/contains',
                keyword: 'contains',
                params: { minContains: 1 },
                message: 'must contain at least 1 valid item(s)',
              };
              if (vErrors === null) {
                vErrors = [err20];
              } else {
                vErrors.push(err20);
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
          if (Array.isArray(data12)) {
            const len5 = data12.length;
            for (let i5 = 0; i5 < len5; i5++) {
              if (typeof data12[i5] !== 'string') {
                const err21 = {
                  instancePath: instancePath + '/length/type/' + i5,
                  schemaPath: '#/$defs/Measure/properties/type/items/type',
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
          } else {
            const err22 = {
              instancePath: instancePath + '/length/type',
              schemaPath: '#/$defs/Measure/properties/type/type',
              keyword: 'type',
              params: { type: 'array' },
              message: 'must be array',
            };
            if (vErrors === null) {
              vErrors = [err22];
            } else {
              vErrors.push(err22);
            }
            errors++;
          }
        }
        if (data11.value !== undefined) {
          if (!(typeof data11.value == 'number')) {
            const err23 = {
              instancePath: instancePath + '/length/value',
              schemaPath: '#/$defs/Measure/properties/value/type',
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
        if (data11.upperTolerance !== undefined) {
          if (!(typeof data11.upperTolerance == 'number')) {
            const err24 = {
              instancePath: instancePath + '/length/upperTolerance',
              schemaPath: '#/$defs/Measure/properties/upperTolerance/type',
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
        if (data11.lowerTolerance !== undefined) {
          if (!(typeof data11.lowerTolerance == 'number')) {
            const err25 = {
              instancePath: instancePath + '/length/lowerTolerance',
              schemaPath: '#/$defs/Measure/properties/lowerTolerance/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            };
            if (vErrors === null) {
              vErrors = [err25];
            } else {
              vErrors.push(err25);
            }
            errors++;
          }
        }
        if (data11.unit !== undefined) {
          if (typeof data11.unit !== 'string') {
            const err26 = {
              instancePath: instancePath + '/length/unit',
              schemaPath: '#/$defs/Measure/properties/unit/type',
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
          instancePath: instancePath + '/length',
          schemaPath: '#/$defs/Measure/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err27];
        } else {
          vErrors.push(err27);
        }
        errors++;
      }
    }
    if (data.width !== undefined) {
      let data19 = data.width;
      if (data19 && typeof data19 == 'object' && !Array.isArray(data19)) {
        if (data19.value === undefined) {
          const err28 = {
            instancePath: instancePath + '/width',
            schemaPath: '#/$defs/Measure/required',
            keyword: 'required',
            params: { missingProperty: 'value' },
            message: "must have required property '" + 'value' + "'",
          };
          if (vErrors === null) {
            vErrors = [err28];
          } else {
            vErrors.push(err28);
          }
          errors++;
        }
        if (data19.unit === undefined) {
          const err29 = {
            instancePath: instancePath + '/width',
            schemaPath: '#/$defs/Measure/required',
            keyword: 'required',
            params: { missingProperty: 'unit' },
            message: "must have required property '" + 'unit' + "'",
          };
          if (vErrors === null) {
            vErrors = [err29];
          } else {
            vErrors.push(err29);
          }
          errors++;
        }
        for (const key2 in data19) {
          if (
            !(
              key2 === 'type' ||
              key2 === 'value' ||
              key2 === 'upperTolerance' ||
              key2 === 'lowerTolerance' ||
              key2 === 'unit'
            )
          ) {
            const err30 = {
              instancePath: instancePath + '/width',
              schemaPath: '#/$defs/Measure/additionalProperties',
              keyword: 'additionalProperties',
              params: { additionalProperty: key2 },
              message: 'must NOT have additional properties',
            };
            if (vErrors === null) {
              vErrors = [err30];
            } else {
              vErrors.push(err30);
            }
            errors++;
          }
        }
        if (data19.type !== undefined) {
          let data20 = data19.type;
          if (Array.isArray(data20)) {
            const _errs54 = errors;
            const len6 = data20.length;
            for (let i6 = 0; i6 < len6; i6++) {
              const _errs55 = errors;
              if ('Measure' !== data20[i6]) {
                const err31 = {
                  instancePath: instancePath + '/width/type/' + i6,
                  schemaPath: '#/$defs/Measure/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Measure' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err31];
                } else {
                  vErrors.push(err31);
                }
                errors++;
              }
              var valid20 = _errs55 === errors;
              if (valid20) {
                break;
              }
            }
            if (!valid20) {
              const err32 = {
                instancePath: instancePath + '/width/type',
                schemaPath: '#/$defs/Measure/properties/type/allOf/0/contains',
                keyword: 'contains',
                params: { minContains: 1 },
                message: 'must contain at least 1 valid item(s)',
              };
              if (vErrors === null) {
                vErrors = [err32];
              } else {
                vErrors.push(err32);
              }
              errors++;
            } else {
              errors = _errs54;
              if (vErrors !== null) {
                if (_errs54) {
                  vErrors.length = _errs54;
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
                const err33 = {
                  instancePath: instancePath + '/width/type/' + i7,
                  schemaPath: '#/$defs/Measure/properties/type/items/type',
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
          } else {
            const err34 = {
              instancePath: instancePath + '/width/type',
              schemaPath: '#/$defs/Measure/properties/type/type',
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
        if (data19.value !== undefined) {
          if (!(typeof data19.value == 'number')) {
            const err35 = {
              instancePath: instancePath + '/width/value',
              schemaPath: '#/$defs/Measure/properties/value/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            };
            if (vErrors === null) {
              vErrors = [err35];
            } else {
              vErrors.push(err35);
            }
            errors++;
          }
        }
        if (data19.upperTolerance !== undefined) {
          if (!(typeof data19.upperTolerance == 'number')) {
            const err36 = {
              instancePath: instancePath + '/width/upperTolerance',
              schemaPath: '#/$defs/Measure/properties/upperTolerance/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            };
            if (vErrors === null) {
              vErrors = [err36];
            } else {
              vErrors.push(err36);
            }
            errors++;
          }
        }
        if (data19.lowerTolerance !== undefined) {
          if (!(typeof data19.lowerTolerance == 'number')) {
            const err37 = {
              instancePath: instancePath + '/width/lowerTolerance',
              schemaPath: '#/$defs/Measure/properties/lowerTolerance/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            };
            if (vErrors === null) {
              vErrors = [err37];
            } else {
              vErrors.push(err37);
            }
            errors++;
          }
        }
        if (data19.unit !== undefined) {
          if (typeof data19.unit !== 'string') {
            const err38 = {
              instancePath: instancePath + '/width/unit',
              schemaPath: '#/$defs/Measure/properties/unit/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err38];
            } else {
              vErrors.push(err38);
            }
            errors++;
          }
        }
      } else {
        const err39 = {
          instancePath: instancePath + '/width',
          schemaPath: '#/$defs/Measure/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err39];
        } else {
          vErrors.push(err39);
        }
        errors++;
      }
    }
    if (data.height !== undefined) {
      let data27 = data.height;
      if (data27 && typeof data27 == 'object' && !Array.isArray(data27)) {
        if (data27.value === undefined) {
          const err40 = {
            instancePath: instancePath + '/height',
            schemaPath: '#/$defs/Measure/required',
            keyword: 'required',
            params: { missingProperty: 'value' },
            message: "must have required property '" + 'value' + "'",
          };
          if (vErrors === null) {
            vErrors = [err40];
          } else {
            vErrors.push(err40);
          }
          errors++;
        }
        if (data27.unit === undefined) {
          const err41 = {
            instancePath: instancePath + '/height',
            schemaPath: '#/$defs/Measure/required',
            keyword: 'required',
            params: { missingProperty: 'unit' },
            message: "must have required property '" + 'unit' + "'",
          };
          if (vErrors === null) {
            vErrors = [err41];
          } else {
            vErrors.push(err41);
          }
          errors++;
        }
        for (const key3 in data27) {
          if (
            !(
              key3 === 'type' ||
              key3 === 'value' ||
              key3 === 'upperTolerance' ||
              key3 === 'lowerTolerance' ||
              key3 === 'unit'
            )
          ) {
            const err42 = {
              instancePath: instancePath + '/height',
              schemaPath: '#/$defs/Measure/additionalProperties',
              keyword: 'additionalProperties',
              params: { additionalProperty: key3 },
              message: 'must NOT have additional properties',
            };
            if (vErrors === null) {
              vErrors = [err42];
            } else {
              vErrors.push(err42);
            }
            errors++;
          }
        }
        if (data27.type !== undefined) {
          let data28 = data27.type;
          if (Array.isArray(data28)) {
            const _errs73 = errors;
            const len8 = data28.length;
            for (let i8 = 0; i8 < len8; i8++) {
              const _errs74 = errors;
              if ('Measure' !== data28[i8]) {
                const err43 = {
                  instancePath: instancePath + '/height/type/' + i8,
                  schemaPath: '#/$defs/Measure/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Measure' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err43];
                } else {
                  vErrors.push(err43);
                }
                errors++;
              }
              var valid26 = _errs74 === errors;
              if (valid26) {
                break;
              }
            }
            if (!valid26) {
              const err44 = {
                instancePath: instancePath + '/height/type',
                schemaPath: '#/$defs/Measure/properties/type/allOf/0/contains',
                keyword: 'contains',
                params: { minContains: 1 },
                message: 'must contain at least 1 valid item(s)',
              };
              if (vErrors === null) {
                vErrors = [err44];
              } else {
                vErrors.push(err44);
              }
              errors++;
            } else {
              errors = _errs73;
              if (vErrors !== null) {
                if (_errs73) {
                  vErrors.length = _errs73;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data28)) {
            const len9 = data28.length;
            for (let i9 = 0; i9 < len9; i9++) {
              if (typeof data28[i9] !== 'string') {
                const err45 = {
                  instancePath: instancePath + '/height/type/' + i9,
                  schemaPath: '#/$defs/Measure/properties/type/items/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
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
              instancePath: instancePath + '/height/type',
              schemaPath: '#/$defs/Measure/properties/type/type',
              keyword: 'type',
              params: { type: 'array' },
              message: 'must be array',
            };
            if (vErrors === null) {
              vErrors = [err46];
            } else {
              vErrors.push(err46);
            }
            errors++;
          }
        }
        if (data27.value !== undefined) {
          if (!(typeof data27.value == 'number')) {
            const err47 = {
              instancePath: instancePath + '/height/value',
              schemaPath: '#/$defs/Measure/properties/value/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            };
            if (vErrors === null) {
              vErrors = [err47];
            } else {
              vErrors.push(err47);
            }
            errors++;
          }
        }
        if (data27.upperTolerance !== undefined) {
          if (!(typeof data27.upperTolerance == 'number')) {
            const err48 = {
              instancePath: instancePath + '/height/upperTolerance',
              schemaPath: '#/$defs/Measure/properties/upperTolerance/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            };
            if (vErrors === null) {
              vErrors = [err48];
            } else {
              vErrors.push(err48);
            }
            errors++;
          }
        }
        if (data27.lowerTolerance !== undefined) {
          if (!(typeof data27.lowerTolerance == 'number')) {
            const err49 = {
              instancePath: instancePath + '/height/lowerTolerance',
              schemaPath: '#/$defs/Measure/properties/lowerTolerance/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            };
            if (vErrors === null) {
              vErrors = [err49];
            } else {
              vErrors.push(err49);
            }
            errors++;
          }
        }
        if (data27.unit !== undefined) {
          if (typeof data27.unit !== 'string') {
            const err50 = {
              instancePath: instancePath + '/height/unit',
              schemaPath: '#/$defs/Measure/properties/unit/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err50];
            } else {
              vErrors.push(err50);
            }
            errors++;
          }
        }
      } else {
        const err51 = {
          instancePath: instancePath + '/height',
          schemaPath: '#/$defs/Measure/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err51];
        } else {
          vErrors.push(err51);
        }
        errors++;
      }
    }
    if (data.volume !== undefined) {
      let data35 = data.volume;
      if (data35 && typeof data35 == 'object' && !Array.isArray(data35)) {
        if (data35.value === undefined) {
          const err52 = {
            instancePath: instancePath + '/volume',
            schemaPath: '#/$defs/Measure/required',
            keyword: 'required',
            params: { missingProperty: 'value' },
            message: "must have required property '" + 'value' + "'",
          };
          if (vErrors === null) {
            vErrors = [err52];
          } else {
            vErrors.push(err52);
          }
          errors++;
        }
        if (data35.unit === undefined) {
          const err53 = {
            instancePath: instancePath + '/volume',
            schemaPath: '#/$defs/Measure/required',
            keyword: 'required',
            params: { missingProperty: 'unit' },
            message: "must have required property '" + 'unit' + "'",
          };
          if (vErrors === null) {
            vErrors = [err53];
          } else {
            vErrors.push(err53);
          }
          errors++;
        }
        for (const key4 in data35) {
          if (
            !(
              key4 === 'type' ||
              key4 === 'value' ||
              key4 === 'upperTolerance' ||
              key4 === 'lowerTolerance' ||
              key4 === 'unit'
            )
          ) {
            const err54 = {
              instancePath: instancePath + '/volume',
              schemaPath: '#/$defs/Measure/additionalProperties',
              keyword: 'additionalProperties',
              params: { additionalProperty: key4 },
              message: 'must NOT have additional properties',
            };
            if (vErrors === null) {
              vErrors = [err54];
            } else {
              vErrors.push(err54);
            }
            errors++;
          }
        }
        if (data35.type !== undefined) {
          let data36 = data35.type;
          if (Array.isArray(data36)) {
            const _errs92 = errors;
            const len10 = data36.length;
            for (let i10 = 0; i10 < len10; i10++) {
              const _errs93 = errors;
              if ('Measure' !== data36[i10]) {
                const err55 = {
                  instancePath: instancePath + '/volume/type/' + i10,
                  schemaPath: '#/$defs/Measure/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Measure' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err55];
                } else {
                  vErrors.push(err55);
                }
                errors++;
              }
              var valid32 = _errs93 === errors;
              if (valid32) {
                break;
              }
            }
            if (!valid32) {
              const err56 = {
                instancePath: instancePath + '/volume/type',
                schemaPath: '#/$defs/Measure/properties/type/allOf/0/contains',
                keyword: 'contains',
                params: { minContains: 1 },
                message: 'must contain at least 1 valid item(s)',
              };
              if (vErrors === null) {
                vErrors = [err56];
              } else {
                vErrors.push(err56);
              }
              errors++;
            } else {
              errors = _errs92;
              if (vErrors !== null) {
                if (_errs92) {
                  vErrors.length = _errs92;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data36)) {
            const len11 = data36.length;
            for (let i11 = 0; i11 < len11; i11++) {
              if (typeof data36[i11] !== 'string') {
                const err57 = {
                  instancePath: instancePath + '/volume/type/' + i11,
                  schemaPath: '#/$defs/Measure/properties/type/items/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err57];
                } else {
                  vErrors.push(err57);
                }
                errors++;
              }
            }
          } else {
            const err58 = {
              instancePath: instancePath + '/volume/type',
              schemaPath: '#/$defs/Measure/properties/type/type',
              keyword: 'type',
              params: { type: 'array' },
              message: 'must be array',
            };
            if (vErrors === null) {
              vErrors = [err58];
            } else {
              vErrors.push(err58);
            }
            errors++;
          }
        }
        if (data35.value !== undefined) {
          if (!(typeof data35.value == 'number')) {
            const err59 = {
              instancePath: instancePath + '/volume/value',
              schemaPath: '#/$defs/Measure/properties/value/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            };
            if (vErrors === null) {
              vErrors = [err59];
            } else {
              vErrors.push(err59);
            }
            errors++;
          }
        }
        if (data35.upperTolerance !== undefined) {
          if (!(typeof data35.upperTolerance == 'number')) {
            const err60 = {
              instancePath: instancePath + '/volume/upperTolerance',
              schemaPath: '#/$defs/Measure/properties/upperTolerance/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            };
            if (vErrors === null) {
              vErrors = [err60];
            } else {
              vErrors.push(err60);
            }
            errors++;
          }
        }
        if (data35.lowerTolerance !== undefined) {
          if (!(typeof data35.lowerTolerance == 'number')) {
            const err61 = {
              instancePath: instancePath + '/volume/lowerTolerance',
              schemaPath: '#/$defs/Measure/properties/lowerTolerance/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            };
            if (vErrors === null) {
              vErrors = [err61];
            } else {
              vErrors.push(err61);
            }
            errors++;
          }
        }
        if (data35.unit !== undefined) {
          if (typeof data35.unit !== 'string') {
            const err62 = {
              instancePath: instancePath + '/volume/unit',
              schemaPath: '#/$defs/Measure/properties/unit/type',
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
      } else {
        const err63 = {
          instancePath: instancePath + '/volume',
          schemaPath: '#/$defs/Measure/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
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
      instancePath,
      schemaPath: '#/type',
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
  validate27.errors = vErrors;
  return errors === 0;
}
validate27.evaluated = { props: true, dynamicProps: false, dynamicItems: false };
const schema49 = {
  type: 'object',
  additionalProperties: true,
  properties: {
    type: {
      type: 'array',
      readOnly: true,
      default: ['Material'],
      items: { type: 'string' },
      allOf: [{ contains: { const: 'Material', minContains: 1 } }],
    },
    name: {
      example: 'Lithium Spodumene',
      type: 'string',
      description: 'Name of this material (eg "Egyptian Cotton")',
    },
    originCountry: {
      $ref: '#/$defs/Country',
      description:
        'A ISO 3166-1 code representing the country of origin of the component or ingredient.',
    },
    materialType: {
      $ref: '#/$defs/Classification',
      description:
        'The type of this material - as a value drawn from a controlled vocabulary eg from UN Framework Classification for Resources (UNFC).',
    },
    massFraction: {
      maximum: 1,
      minimum: 0,
      example: 0.2,
      type: 'number',
      description:
        'The mass fraction as a decimal of the product (or facility reporting period)  represented by this material. ',
    },
    mass: { $ref: '#/$defs/Measure', description: 'The mass of the material component.' },
    recycledMassFraction: {
      maximum: 1,
      minimum: 0,
      example: 0.5,
      type: 'number',
      description: 'Mass fraction of this material that is recycled (eg 50% recycled Lithium)',
    },
    hazardous: {
      type: 'boolean',
      description:
        'Indicates whether this material is hazardous. If true then the materialSafetyInformation property must be present',
    },
    symbol: {
      $ref: '#/$defs/Image',
      description:
        'Based 64 encoded binary used to represent a visual symbol for a given material. ',
    },
    materialSafetyInformation: {
      $ref: '#/$defs/Link',
      description:
        'Reference to further information about safe handling of this hazardous material (for example a link to a material safety data sheet)',
    },
  },
  description:
    'The material class encapsulates details about the origin or source of raw materials in a product, including the country of origin and the mass fraction.',
  required: ['name', 'originCountry', 'materialType', 'massFraction'],
};
function validate29(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {},
) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate29.evaluated;
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
    if (data.originCountry === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'originCountry' },
        message: "must have required property '" + 'originCountry' + "'",
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.materialType === undefined) {
      const err2 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'materialType' },
        message: "must have required property '" + 'materialType' + "'",
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.massFraction === undefined) {
      const err3 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'massFraction' },
        message: "must have required property '" + 'massFraction' + "'",
      };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
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
          if ('Material' !== data0[i0]) {
            const err4 = {
              instancePath: instancePath + '/type/' + i0,
              schemaPath: '#/properties/type/allOf/0/contains/const',
              keyword: 'const',
              params: { allowedValue: 'Material' },
              message: 'must be equal to constant',
            };
            if (vErrors === null) {
              vErrors = [err4];
            } else {
              vErrors.push(err4);
            }
            errors++;
          }
          var valid2 = _errs6 === errors;
          if (valid2) {
            break;
          }
        }
        if (!valid2) {
          const err5 = {
            instancePath: instancePath + '/type',
            schemaPath: '#/properties/type/allOf/0/contains',
            keyword: 'contains',
            params: { minContains: 1 },
            message: 'must contain at least 1 valid item(s)',
          };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
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
            const err6 = {
              instancePath: instancePath + '/type/' + i1,
              schemaPath: '#/properties/type/items/type',
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
      } else {
        const err7 = {
          instancePath: instancePath + '/type',
          schemaPath: '#/properties/type/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data.name !== undefined) {
      if (typeof data.name !== 'string') {
        const err8 = {
          instancePath: instancePath + '/name',
          schemaPath: '#/properties/name/type',
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
    if (data.originCountry !== undefined) {
      let data4 = data.originCountry;
      if (data4 && typeof data4 == 'object' && !Array.isArray(data4)) {
        if (data4.countryCode === undefined) {
          const err9 = {
            instancePath: instancePath + '/originCountry',
            schemaPath: '#/$defs/Country/required',
            keyword: 'required',
            params: { missingProperty: 'countryCode' },
            message: "must have required property '" + 'countryCode' + "'",
          };
          if (vErrors === null) {
            vErrors = [err9];
          } else {
            vErrors.push(err9);
          }
          errors++;
        }
        for (const key0 in data4) {
          if (!(key0 === 'type' || key0 === 'countryCode' || key0 === 'countryName')) {
            const err10 = {
              instancePath: instancePath + '/originCountry',
              schemaPath: '#/$defs/Country/additionalProperties',
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
              if ('Country' !== data5[i2]) {
                const err11 = {
                  instancePath: instancePath + '/originCountry/type/' + i2,
                  schemaPath: '#/$defs/Country/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Country' },
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
                instancePath: instancePath + '/originCountry/type',
                schemaPath: '#/$defs/Country/properties/type/allOf/0/contains',
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
                  instancePath: instancePath + '/originCountry/type/' + i3,
                  schemaPath: '#/$defs/Country/properties/type/items/type',
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
              instancePath: instancePath + '/originCountry/type',
              schemaPath: '#/$defs/Country/properties/type/type',
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
        if (data4.countryCode !== undefined) {
          if (typeof data4.countryCode !== 'string') {
            const err15 = {
              instancePath: instancePath + '/originCountry/countryCode',
              schemaPath: '#/$defs/Country/properties/countryCode/type',
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
        if (data4.countryName !== undefined) {
          if (typeof data4.countryName !== 'string') {
            const err16 = {
              instancePath: instancePath + '/originCountry/countryName',
              schemaPath: '#/$defs/Country/properties/countryName/type',
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
      } else {
        const err17 = {
          instancePath: instancePath + '/originCountry',
          schemaPath: '#/$defs/Country/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err17];
        } else {
          vErrors.push(err17);
        }
        errors++;
      }
    }
    if (data.materialType !== undefined) {
      let data10 = data.materialType;
      if (data10 && typeof data10 == 'object' && !Array.isArray(data10)) {
        if (data10.code === undefined) {
          const err18 = {
            instancePath: instancePath + '/materialType',
            schemaPath: '#/$defs/Classification/required',
            keyword: 'required',
            params: { missingProperty: 'code' },
            message: "must have required property '" + 'code' + "'",
          };
          if (vErrors === null) {
            vErrors = [err18];
          } else {
            vErrors.push(err18);
          }
          errors++;
        }
        if (data10.name === undefined) {
          const err19 = {
            instancePath: instancePath + '/materialType',
            schemaPath: '#/$defs/Classification/required',
            keyword: 'required',
            params: { missingProperty: 'name' },
            message: "must have required property '" + 'name' + "'",
          };
          if (vErrors === null) {
            vErrors = [err19];
          } else {
            vErrors.push(err19);
          }
          errors++;
        }
        if (data10.schemeId === undefined) {
          const err20 = {
            instancePath: instancePath + '/materialType',
            schemaPath: '#/$defs/Classification/required',
            keyword: 'required',
            params: { missingProperty: 'schemeId' },
            message: "must have required property '" + 'schemeId' + "'",
          };
          if (vErrors === null) {
            vErrors = [err20];
          } else {
            vErrors.push(err20);
          }
          errors++;
        }
        if (data10.schemeName === undefined) {
          const err21 = {
            instancePath: instancePath + '/materialType',
            schemaPath: '#/$defs/Classification/required',
            keyword: 'required',
            params: { missingProperty: 'schemeName' },
            message: "must have required property '" + 'schemeName' + "'",
          };
          if (vErrors === null) {
            vErrors = [err21];
          } else {
            vErrors.push(err21);
          }
          errors++;
        }
        for (const key1 in data10) {
          if (
            !(
              key1 === 'type' ||
              key1 === 'code' ||
              key1 === 'name' ||
              key1 === 'definition' ||
              key1 === 'schemeId' ||
              key1 === 'schemeName'
            )
          ) {
            const err22 = {
              instancePath: instancePath + '/materialType',
              schemaPath: '#/$defs/Classification/additionalProperties',
              keyword: 'additionalProperties',
              params: { additionalProperty: key1 },
              message: 'must NOT have additional properties',
            };
            if (vErrors === null) {
              vErrors = [err22];
            } else {
              vErrors.push(err22);
            }
            errors++;
          }
        }
        if (data10.type !== undefined) {
          let data11 = data10.type;
          if (Array.isArray(data11)) {
            const _errs33 = errors;
            const len4 = data11.length;
            for (let i4 = 0; i4 < len4; i4++) {
              const _errs34 = errors;
              if ('Classification' !== data11[i4]) {
                const err23 = {
                  instancePath: instancePath + '/materialType/type/' + i4,
                  schemaPath: '#/$defs/Classification/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Classification' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err23];
                } else {
                  vErrors.push(err23);
                }
                errors++;
              }
              var valid14 = _errs34 === errors;
              if (valid14) {
                break;
              }
            }
            if (!valid14) {
              const err24 = {
                instancePath: instancePath + '/materialType/type',
                schemaPath: '#/$defs/Classification/properties/type/allOf/0/contains',
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
              errors = _errs33;
              if (vErrors !== null) {
                if (_errs33) {
                  vErrors.length = _errs33;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data11)) {
            const len5 = data11.length;
            for (let i5 = 0; i5 < len5; i5++) {
              if (typeof data11[i5] !== 'string') {
                const err25 = {
                  instancePath: instancePath + '/materialType/type/' + i5,
                  schemaPath: '#/$defs/Classification/properties/type/items/type',
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
              instancePath: instancePath + '/materialType/type',
              schemaPath: '#/$defs/Classification/properties/type/type',
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
        if (data10.code !== undefined) {
          if (typeof data10.code !== 'string') {
            const err27 = {
              instancePath: instancePath + '/materialType/code',
              schemaPath: '#/$defs/Classification/properties/code/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err27];
            } else {
              vErrors.push(err27);
            }
            errors++;
          }
        }
        if (data10.name !== undefined) {
          if (typeof data10.name !== 'string') {
            const err28 = {
              instancePath: instancePath + '/materialType/name',
              schemaPath: '#/$defs/Classification/properties/name/type',
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
        if (data10.definition !== undefined) {
          if (typeof data10.definition !== 'string') {
            const err29 = {
              instancePath: instancePath + '/materialType/definition',
              schemaPath: '#/$defs/Classification/properties/definition/type',
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
        if (data10.schemeId !== undefined) {
          let data17 = data10.schemeId;
          if (typeof data17 === 'string') {
            if (!formats0(data17)) {
              const err30 = {
                instancePath: instancePath + '/materialType/schemeId',
                schemaPath: '#/$defs/Classification/properties/schemeId/format',
                keyword: 'format',
                params: { format: 'uri' },
                message: 'must match format "' + 'uri' + '"',
              };
              if (vErrors === null) {
                vErrors = [err30];
              } else {
                vErrors.push(err30);
              }
              errors++;
            }
          } else {
            const err31 = {
              instancePath: instancePath + '/materialType/schemeId',
              schemaPath: '#/$defs/Classification/properties/schemeId/type',
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
        if (data10.schemeName !== undefined) {
          if (typeof data10.schemeName !== 'string') {
            const err32 = {
              instancePath: instancePath + '/materialType/schemeName',
              schemaPath: '#/$defs/Classification/properties/schemeName/type',
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
          instancePath: instancePath + '/materialType',
          schemaPath: '#/$defs/Classification/type',
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
    if (data.massFraction !== undefined) {
      let data19 = data.massFraction;
      if (typeof data19 == 'number') {
        if (data19 > 1 || isNaN(data19)) {
          const err34 = {
            instancePath: instancePath + '/massFraction',
            schemaPath: '#/properties/massFraction/maximum',
            keyword: 'maximum',
            params: { comparison: '<=', limit: 1 },
            message: 'must be <= 1',
          };
          if (vErrors === null) {
            vErrors = [err34];
          } else {
            vErrors.push(err34);
          }
          errors++;
        }
        if (data19 < 0 || isNaN(data19)) {
          const err35 = {
            instancePath: instancePath + '/massFraction',
            schemaPath: '#/properties/massFraction/minimum',
            keyword: 'minimum',
            params: { comparison: '>=', limit: 0 },
            message: 'must be >= 0',
          };
          if (vErrors === null) {
            vErrors = [err35];
          } else {
            vErrors.push(err35);
          }
          errors++;
        }
      } else {
        const err36 = {
          instancePath: instancePath + '/massFraction',
          schemaPath: '#/properties/massFraction/type',
          keyword: 'type',
          params: { type: 'number' },
          message: 'must be number',
        };
        if (vErrors === null) {
          vErrors = [err36];
        } else {
          vErrors.push(err36);
        }
        errors++;
      }
    }
    if (data.mass !== undefined) {
      let data20 = data.mass;
      if (data20 && typeof data20 == 'object' && !Array.isArray(data20)) {
        if (data20.value === undefined) {
          const err37 = {
            instancePath: instancePath + '/mass',
            schemaPath: '#/$defs/Measure/required',
            keyword: 'required',
            params: { missingProperty: 'value' },
            message: "must have required property '" + 'value' + "'",
          };
          if (vErrors === null) {
            vErrors = [err37];
          } else {
            vErrors.push(err37);
          }
          errors++;
        }
        if (data20.unit === undefined) {
          const err38 = {
            instancePath: instancePath + '/mass',
            schemaPath: '#/$defs/Measure/required',
            keyword: 'required',
            params: { missingProperty: 'unit' },
            message: "must have required property '" + 'unit' + "'",
          };
          if (vErrors === null) {
            vErrors = [err38];
          } else {
            vErrors.push(err38);
          }
          errors++;
        }
        for (const key2 in data20) {
          if (
            !(
              key2 === 'type' ||
              key2 === 'value' ||
              key2 === 'upperTolerance' ||
              key2 === 'lowerTolerance' ||
              key2 === 'unit'
            )
          ) {
            const err39 = {
              instancePath: instancePath + '/mass',
              schemaPath: '#/$defs/Measure/additionalProperties',
              keyword: 'additionalProperties',
              params: { additionalProperty: key2 },
              message: 'must NOT have additional properties',
            };
            if (vErrors === null) {
              vErrors = [err39];
            } else {
              vErrors.push(err39);
            }
            errors++;
          }
        }
        if (data20.type !== undefined) {
          let data21 = data20.type;
          if (Array.isArray(data21)) {
            const _errs56 = errors;
            const len6 = data21.length;
            for (let i6 = 0; i6 < len6; i6++) {
              const _errs57 = errors;
              if ('Measure' !== data21[i6]) {
                const err40 = {
                  instancePath: instancePath + '/mass/type/' + i6,
                  schemaPath: '#/$defs/Measure/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Measure' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err40];
                } else {
                  vErrors.push(err40);
                }
                errors++;
              }
              var valid20 = _errs57 === errors;
              if (valid20) {
                break;
              }
            }
            if (!valid20) {
              const err41 = {
                instancePath: instancePath + '/mass/type',
                schemaPath: '#/$defs/Measure/properties/type/allOf/0/contains',
                keyword: 'contains',
                params: { minContains: 1 },
                message: 'must contain at least 1 valid item(s)',
              };
              if (vErrors === null) {
                vErrors = [err41];
              } else {
                vErrors.push(err41);
              }
              errors++;
            } else {
              errors = _errs56;
              if (vErrors !== null) {
                if (_errs56) {
                  vErrors.length = _errs56;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data21)) {
            const len7 = data21.length;
            for (let i7 = 0; i7 < len7; i7++) {
              if (typeof data21[i7] !== 'string') {
                const err42 = {
                  instancePath: instancePath + '/mass/type/' + i7,
                  schemaPath: '#/$defs/Measure/properties/type/items/type',
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
          } else {
            const err43 = {
              instancePath: instancePath + '/mass/type',
              schemaPath: '#/$defs/Measure/properties/type/type',
              keyword: 'type',
              params: { type: 'array' },
              message: 'must be array',
            };
            if (vErrors === null) {
              vErrors = [err43];
            } else {
              vErrors.push(err43);
            }
            errors++;
          }
        }
        if (data20.value !== undefined) {
          if (!(typeof data20.value == 'number')) {
            const err44 = {
              instancePath: instancePath + '/mass/value',
              schemaPath: '#/$defs/Measure/properties/value/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            };
            if (vErrors === null) {
              vErrors = [err44];
            } else {
              vErrors.push(err44);
            }
            errors++;
          }
        }
        if (data20.upperTolerance !== undefined) {
          if (!(typeof data20.upperTolerance == 'number')) {
            const err45 = {
              instancePath: instancePath + '/mass/upperTolerance',
              schemaPath: '#/$defs/Measure/properties/upperTolerance/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            };
            if (vErrors === null) {
              vErrors = [err45];
            } else {
              vErrors.push(err45);
            }
            errors++;
          }
        }
        if (data20.lowerTolerance !== undefined) {
          if (!(typeof data20.lowerTolerance == 'number')) {
            const err46 = {
              instancePath: instancePath + '/mass/lowerTolerance',
              schemaPath: '#/$defs/Measure/properties/lowerTolerance/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            };
            if (vErrors === null) {
              vErrors = [err46];
            } else {
              vErrors.push(err46);
            }
            errors++;
          }
        }
        if (data20.unit !== undefined) {
          if (typeof data20.unit !== 'string') {
            const err47 = {
              instancePath: instancePath + '/mass/unit',
              schemaPath: '#/$defs/Measure/properties/unit/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
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
          instancePath: instancePath + '/mass',
          schemaPath: '#/$defs/Measure/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err48];
        } else {
          vErrors.push(err48);
        }
        errors++;
      }
    }
    if (data.recycledMassFraction !== undefined) {
      let data28 = data.recycledMassFraction;
      if (typeof data28 == 'number') {
        if (data28 > 1 || isNaN(data28)) {
          const err49 = {
            instancePath: instancePath + '/recycledMassFraction',
            schemaPath: '#/properties/recycledMassFraction/maximum',
            keyword: 'maximum',
            params: { comparison: '<=', limit: 1 },
            message: 'must be <= 1',
          };
          if (vErrors === null) {
            vErrors = [err49];
          } else {
            vErrors.push(err49);
          }
          errors++;
        }
        if (data28 < 0 || isNaN(data28)) {
          const err50 = {
            instancePath: instancePath + '/recycledMassFraction',
            schemaPath: '#/properties/recycledMassFraction/minimum',
            keyword: 'minimum',
            params: { comparison: '>=', limit: 0 },
            message: 'must be >= 0',
          };
          if (vErrors === null) {
            vErrors = [err50];
          } else {
            vErrors.push(err50);
          }
          errors++;
        }
      } else {
        const err51 = {
          instancePath: instancePath + '/recycledMassFraction',
          schemaPath: '#/properties/recycledMassFraction/type',
          keyword: 'type',
          params: { type: 'number' },
          message: 'must be number',
        };
        if (vErrors === null) {
          vErrors = [err51];
        } else {
          vErrors.push(err51);
        }
        errors++;
      }
    }
    if (data.hazardous !== undefined) {
      if (typeof data.hazardous !== 'boolean') {
        const err52 = {
          instancePath: instancePath + '/hazardous',
          schemaPath: '#/properties/hazardous/type',
          keyword: 'type',
          params: { type: 'boolean' },
          message: 'must be boolean',
        };
        if (vErrors === null) {
          vErrors = [err52];
        } else {
          vErrors.push(err52);
        }
        errors++;
      }
    }
    if (data.symbol !== undefined) {
      let data30 = data.symbol;
      if (data30 && typeof data30 == 'object' && !Array.isArray(data30)) {
        if (data30.name === undefined) {
          const err53 = {
            instancePath: instancePath + '/symbol',
            schemaPath: '#/$defs/Image/required',
            keyword: 'required',
            params: { missingProperty: 'name' },
            message: "must have required property '" + 'name' + "'",
          };
          if (vErrors === null) {
            vErrors = [err53];
          } else {
            vErrors.push(err53);
          }
          errors++;
        }
        if (data30.imageData === undefined) {
          const err54 = {
            instancePath: instancePath + '/symbol',
            schemaPath: '#/$defs/Image/required',
            keyword: 'required',
            params: { missingProperty: 'imageData' },
            message: "must have required property '" + 'imageData' + "'",
          };
          if (vErrors === null) {
            vErrors = [err54];
          } else {
            vErrors.push(err54);
          }
          errors++;
        }
        if (data30.mediaType === undefined) {
          const err55 = {
            instancePath: instancePath + '/symbol',
            schemaPath: '#/$defs/Image/required',
            keyword: 'required',
            params: { missingProperty: 'mediaType' },
            message: "must have required property '" + 'mediaType' + "'",
          };
          if (vErrors === null) {
            vErrors = [err55];
          } else {
            vErrors.push(err55);
          }
          errors++;
        }
        for (const key3 in data30) {
          if (
            !(
              key3 === 'type' ||
              key3 === 'name' ||
              key3 === 'description' ||
              key3 === 'imageData' ||
              key3 === 'mediaType'
            )
          ) {
            const err56 = {
              instancePath: instancePath + '/symbol',
              schemaPath: '#/$defs/Image/additionalProperties',
              keyword: 'additionalProperties',
              params: { additionalProperty: key3 },
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
        if (data30.type !== undefined) {
          let data31 = data30.type;
          if (Array.isArray(data31)) {
            const _errs79 = errors;
            const len8 = data31.length;
            for (let i8 = 0; i8 < len8; i8++) {
              const _errs80 = errors;
              if ('Image' !== data31[i8]) {
                const err57 = {
                  instancePath: instancePath + '/symbol/type/' + i8,
                  schemaPath: '#/$defs/Image/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Image' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err57];
                } else {
                  vErrors.push(err57);
                }
                errors++;
              }
              var valid26 = _errs80 === errors;
              if (valid26) {
                break;
              }
            }
            if (!valid26) {
              const err58 = {
                instancePath: instancePath + '/symbol/type',
                schemaPath: '#/$defs/Image/properties/type/allOf/0/contains',
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
              errors = _errs79;
              if (vErrors !== null) {
                if (_errs79) {
                  vErrors.length = _errs79;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data31)) {
            const len9 = data31.length;
            for (let i9 = 0; i9 < len9; i9++) {
              if (typeof data31[i9] !== 'string') {
                const err59 = {
                  instancePath: instancePath + '/symbol/type/' + i9,
                  schemaPath: '#/$defs/Image/properties/type/items/type',
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
              instancePath: instancePath + '/symbol/type',
              schemaPath: '#/$defs/Image/properties/type/type',
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
        if (data30.name !== undefined) {
          if (typeof data30.name !== 'string') {
            const err61 = {
              instancePath: instancePath + '/symbol/name',
              schemaPath: '#/$defs/Image/properties/name/type',
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
        if (data30.description !== undefined) {
          if (typeof data30.description !== 'string') {
            const err62 = {
              instancePath: instancePath + '/symbol/description',
              schemaPath: '#/$defs/Image/properties/description/type',
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
        if (data30.imageData !== undefined) {
          let data36 = data30.imageData;
          if (typeof data36 === 'string') {
            if (!formats26(data36)) {
              const err63 = {
                instancePath: instancePath + '/symbol/imageData',
                schemaPath: '#/$defs/Image/properties/imageData/format',
                keyword: 'format',
                params: { format: 'byte' },
                message: 'must match format "' + 'byte' + '"',
              };
              if (vErrors === null) {
                vErrors = [err63];
              } else {
                vErrors.push(err63);
              }
              errors++;
            }
          } else {
            const err64 = {
              instancePath: instancePath + '/symbol/imageData',
              schemaPath: '#/$defs/Image/properties/imageData/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err64];
            } else {
              vErrors.push(err64);
            }
            errors++;
          }
        }
        if (data30.mediaType !== undefined) {
          if (typeof data30.mediaType !== 'string') {
            const err65 = {
              instancePath: instancePath + '/symbol/mediaType',
              schemaPath: '#/$defs/Image/properties/mediaType/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
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
          instancePath: instancePath + '/symbol',
          schemaPath: '#/$defs/Image/type',
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
    if (data.materialSafetyInformation !== undefined) {
      let data38 = data.materialSafetyInformation;
      if (data38 && typeof data38 == 'object' && !Array.isArray(data38)) {
        if (data38.linkURL === undefined) {
          const err67 = {
            instancePath: instancePath + '/materialSafetyInformation',
            schemaPath: '#/$defs/Link/required',
            keyword: 'required',
            params: { missingProperty: 'linkURL' },
            message: "must have required property '" + 'linkURL' + "'",
          };
          if (vErrors === null) {
            vErrors = [err67];
          } else {
            vErrors.push(err67);
          }
          errors++;
        }
        if (data38.linkName === undefined) {
          const err68 = {
            instancePath: instancePath + '/materialSafetyInformation',
            schemaPath: '#/$defs/Link/required',
            keyword: 'required',
            params: { missingProperty: 'linkName' },
            message: "must have required property '" + 'linkName' + "'",
          };
          if (vErrors === null) {
            vErrors = [err68];
          } else {
            vErrors.push(err68);
          }
          errors++;
        }
        for (const key4 in data38) {
          if (
            !(
              key4 === 'type' ||
              key4 === 'linkURL' ||
              key4 === 'linkName' ||
              key4 === 'digestMultibase' ||
              key4 === 'mediaType' ||
              key4 === 'linkType'
            )
          ) {
            const err69 = {
              instancePath: instancePath + '/materialSafetyInformation',
              schemaPath: '#/$defs/Link/additionalProperties',
              keyword: 'additionalProperties',
              params: { additionalProperty: key4 },
              message: 'must NOT have additional properties',
            };
            if (vErrors === null) {
              vErrors = [err69];
            } else {
              vErrors.push(err69);
            }
            errors++;
          }
        }
        if (data38.type !== undefined) {
          let data39 = data38.type;
          if (Array.isArray(data39)) {
            const _errs98 = errors;
            const len10 = data39.length;
            for (let i10 = 0; i10 < len10; i10++) {
              const _errs99 = errors;
              if ('Link' !== data39[i10]) {
                const err70 = {
                  instancePath: instancePath + '/materialSafetyInformation/type/' + i10,
                  schemaPath: '#/$defs/Link/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Link' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err70];
                } else {
                  vErrors.push(err70);
                }
                errors++;
              }
              var valid32 = _errs99 === errors;
              if (valid32) {
                break;
              }
            }
            if (!valid32) {
              const err71 = {
                instancePath: instancePath + '/materialSafetyInformation/type',
                schemaPath: '#/$defs/Link/properties/type/allOf/0/contains',
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
              errors = _errs98;
              if (vErrors !== null) {
                if (_errs98) {
                  vErrors.length = _errs98;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data39)) {
            const len11 = data39.length;
            for (let i11 = 0; i11 < len11; i11++) {
              if (typeof data39[i11] !== 'string') {
                const err72 = {
                  instancePath: instancePath + '/materialSafetyInformation/type/' + i11,
                  schemaPath: '#/$defs/Link/properties/type/items/type',
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
              instancePath: instancePath + '/materialSafetyInformation/type',
              schemaPath: '#/$defs/Link/properties/type/type',
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
        if (data38.linkURL !== undefined) {
          let data42 = data38.linkURL;
          if (typeof data42 === 'string') {
            if (!formats0(data42)) {
              const err74 = {
                instancePath: instancePath + '/materialSafetyInformation/linkURL',
                schemaPath: '#/$defs/Link/properties/linkURL/format',
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
              instancePath: instancePath + '/materialSafetyInformation/linkURL',
              schemaPath: '#/$defs/Link/properties/linkURL/type',
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
        if (data38.linkName !== undefined) {
          if (typeof data38.linkName !== 'string') {
            const err76 = {
              instancePath: instancePath + '/materialSafetyInformation/linkName',
              schemaPath: '#/$defs/Link/properties/linkName/type',
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
        if (data38.digestMultibase !== undefined) {
          if (typeof data38.digestMultibase !== 'string') {
            const err77 = {
              instancePath: instancePath + '/materialSafetyInformation/digestMultibase',
              schemaPath: '#/$defs/Link/properties/digestMultibase/type',
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
        if (data38.mediaType !== undefined) {
          if (typeof data38.mediaType !== 'string') {
            const err78 = {
              instancePath: instancePath + '/materialSafetyInformation/mediaType',
              schemaPath: '#/$defs/Link/properties/mediaType/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err78];
            } else {
              vErrors.push(err78);
            }
            errors++;
          }
        }
        if (data38.linkType !== undefined) {
          if (typeof data38.linkType !== 'string') {
            const err79 = {
              instancePath: instancePath + '/materialSafetyInformation/linkType',
              schemaPath: '#/$defs/Link/properties/linkType/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err79];
            } else {
              vErrors.push(err79);
            }
            errors++;
          }
        }
      } else {
        const err80 = {
          instancePath: instancePath + '/materialSafetyInformation',
          schemaPath: '#/$defs/Link/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err80];
        } else {
          vErrors.push(err80);
        }
        errors++;
      }
    }
  } else {
    const err81 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: { type: 'object' },
      message: 'must be object',
    };
    if (vErrors === null) {
      vErrors = [err81];
    } else {
      vErrors.push(err81);
    }
    errors++;
  }
  validate29.errors = vErrors;
  return errors === 0;
}
validate29.evaluated = { props: true, dynamicProps: false, dynamicItems: false };
const schema55 = {
  type: 'object',
  additionalProperties: false,
  properties: {
    type: {
      type: 'array',
      readOnly: true,
      default: ['Package'],
      items: { type: 'string' },
      allOf: [{ contains: { const: 'Package', minContains: 1 } }],
    },
    description: { type: 'string', description: 'Description of the packaging.' },
    dimensions: { $ref: '#/$defs/Dimension', description: 'dimensions of the packaging' },
    materialUsed: {
      type: 'array',
      items: { $ref: '#/$defs/Material' },
      description: 'materials used for the packaging.',
    },
    packageLabel: {
      type: 'array',
      items: { $ref: '#/$defs/Image' },
      description:
        'An array of package labels that may appear on the packaging together with their meaning. Use for small images that represent certification marks or regulatory requirements. Large images should be linked as evidence to claims.',
    },
    performanceClaim: {
      type: 'array',
      items: { $ref: '#/$defs/Claim' },
      description: 'conformity claims made about the packaging.',
    },
  },
  description: 'Details of product packaging',
  required: ['description', 'dimensions', 'materialUsed'],
};
const schema57 = {
  type: 'object',
  additionalProperties: false,
  properties: {
    type: {
      type: 'array',
      readOnly: true,
      default: ['Claim'],
      items: { type: 'string' },
      allOf: [{ contains: { const: 'Claim', minContains: 1 } }],
    },
    id: {
      example: 'https://sample-company.com/claim/e78dab5d-b6f6-4bc4-a458-7feb039f6cb3',
      type: 'string',
      format: 'uri',
      description:
        'Globally unique identifier of this claim. Typically represented as a URI companyURL/claimID URI or a UUID',
    },
    name: {
      example: 'Sample company Forced Labour claim',
      type: 'string',
      description:
        'Name of this claim - typically similar or the same as the referenced criterion name.',
    },
    description: { type: 'string', description: 'Description of this conformity claim' },
    referenceCriteria: {
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
      description: 'The criterion against which the claim is made.',
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
      description:
        'List of references to regulation to which conformity is claimed claimed for this product',
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
      description:
        'List of references to standards to which conformity is claimed claimed for this product',
    },
    claimDate: {
      type: 'string',
      format: 'date',
      description: 'That date on which the claimed performance is applicable.',
    },
    applicablePeriod: {
      $ref: '#/$defs/Period',
      description: 'The applicable reporting period for this facility record.',
    },
    claimedPerformance: {
      type: 'array',
      items: { $ref: '#/$defs/Performance' },
      description: 'The claimed performance level ',
    },
    evidence: {
      type: 'array',
      items: { $ref: '#/$defs/Link' },
      description:
        'A URI pointing to the evidence supporting the claim. SHOULD be a URL to a UNTP Digital Conformity Credential (DCC)',
    },
    conformityTopic: {
      type: 'array',
      items: { $ref: '#/$defs/ConformityTopic' },
      description: 'The conformity topic category for this assessment',
    },
  },
  description:
    'A performance claim about a product, facility, or organisation that is made against a well defined criterion.',
  required: [
    'id',
    'name',
    'referenceCriteria',
    'claimDate',
    'claimedPerformance',
    'conformityTopic',
  ],
};
const schema58 = {
  type: 'object',
  additionalProperties: false,
  properties: {
    type: {
      type: 'array',
      readOnly: true,
      default: ['Period'],
      items: { type: 'string' },
      allOf: [{ contains: { const: 'Period', minContains: 1 } }],
    },
    startDate: { type: 'string', format: 'date', description: 'The period start date' },
    endDate: { type: 'string', format: 'date', description: 'The period end date' },
    periodInformation: {
      type: 'string',
      description: 'Additional information relevant to this reporting period',
    },
  },
  description:
    'A period of time, typically a month, quarter or a year, which defines the context boundary for reported facts.',
  required: ['startDate', 'endDate'],
};
const schema63 = {
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
const schema59 = {
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
const schema61 = {
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
function validate35(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {},
) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate35.evaluated;
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
  validate35.errors = vErrors;
  return errors === 0;
}
validate35.evaluated = { props: true, dynamicProps: false, dynamicItems: false };
function validate34(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {},
) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate34.evaluated;
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
    if (data.referenceCriteria === undefined) {
      const err2 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'referenceCriteria' },
        message: "must have required property '" + 'referenceCriteria' + "'",
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.claimDate === undefined) {
      const err3 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'claimDate' },
        message: "must have required property '" + 'claimDate' + "'",
      };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.claimedPerformance === undefined) {
      const err4 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'claimedPerformance' },
        message: "must have required property '" + 'claimedPerformance' + "'",
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
    for (const key0 in data) {
      if (!func1.call(schema57.properties, key0)) {
        const err6 = {
          instancePath,
          schemaPath: '#/additionalProperties',
          keyword: 'additionalProperties',
          params: { additionalProperty: key0 },
          message: 'must NOT have additional properties',
        };
        if (vErrors === null) {
          vErrors = [err6];
        } else {
          vErrors.push(err6);
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
          if ('Claim' !== data0[i0]) {
            const err7 = {
              instancePath: instancePath + '/type/' + i0,
              schemaPath: '#/properties/type/allOf/0/contains/const',
              keyword: 'const',
              params: { allowedValue: 'Claim' },
              message: 'must be equal to constant',
            };
            if (vErrors === null) {
              vErrors = [err7];
            } else {
              vErrors.push(err7);
            }
            errors++;
          }
          var valid2 = _errs6 === errors;
          if (valid2) {
            break;
          }
        }
        if (!valid2) {
          const err8 = {
            instancePath: instancePath + '/type',
            schemaPath: '#/properties/type/allOf/0/contains',
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
            const err9 = {
              instancePath: instancePath + '/type/' + i1,
              schemaPath: '#/properties/type/items/type',
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
          instancePath: instancePath + '/type',
          schemaPath: '#/properties/type/type',
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
    if (data.id !== undefined) {
      let data3 = data.id;
      if (typeof data3 === 'string') {
        if (!formats0(data3)) {
          const err11 = {
            instancePath: instancePath + '/id',
            schemaPath: '#/properties/id/format',
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
          instancePath: instancePath + '/id',
          schemaPath: '#/properties/id/type',
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
    if (data.name !== undefined) {
      if (typeof data.name !== 'string') {
        const err13 = {
          instancePath: instancePath + '/name',
          schemaPath: '#/properties/name/type',
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
    if (data.description !== undefined) {
      if (typeof data.description !== 'string') {
        const err14 = {
          instancePath: instancePath + '/description',
          schemaPath: '#/properties/description/type',
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
    if (data.referenceCriteria !== undefined) {
      let data6 = data.referenceCriteria;
      if (Array.isArray(data6)) {
        const len2 = data6.length;
        for (let i2 = 0; i2 < len2; i2++) {
          let data7 = data6[i2];
          if (data7 && typeof data7 == 'object' && !Array.isArray(data7)) {
            if (data7.id === undefined) {
              const err15 = {
                instancePath: instancePath + '/referenceCriteria/' + i2,
                schemaPath: '#/properties/referenceCriteria/items/required',
                keyword: 'required',
                params: { missingProperty: 'id' },
                message: "must have required property '" + 'id' + "'",
              };
              if (vErrors === null) {
                vErrors = [err15];
              } else {
                vErrors.push(err15);
              }
              errors++;
            }
            if (data7.name === undefined) {
              const err16 = {
                instancePath: instancePath + '/referenceCriteria/' + i2,
                schemaPath: '#/properties/referenceCriteria/items/required',
                keyword: 'required',
                params: { missingProperty: 'name' },
                message: "must have required property '" + 'name' + "'",
              };
              if (vErrors === null) {
                vErrors = [err16];
              } else {
                vErrors.push(err16);
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
                    const err17 = {
                      instancePath: instancePath + '/referenceCriteria/' + i2 + '/type/' + i3,
                      schemaPath:
                        '#/properties/referenceCriteria/items/properties/type/allOf/0/contains/const',
                      keyword: 'const',
                      params: { allowedValue: 'Criterion' },
                      message: 'must be equal to constant',
                    };
                    if (vErrors === null) {
                      vErrors = [err17];
                    } else {
                      vErrors.push(err17);
                    }
                    errors++;
                  }
                  var valid9 = _errs23 === errors;
                  if (valid9) {
                    break;
                  }
                }
                if (!valid9) {
                  const err18 = {
                    instancePath: instancePath + '/referenceCriteria/' + i2 + '/type',
                    schemaPath:
                      '#/properties/referenceCriteria/items/properties/type/allOf/0/contains',
                    keyword: 'contains',
                    params: { minContains: 1 },
                    message: 'must contain at least 1 valid item(s)',
                  };
                  if (vErrors === null) {
                    vErrors = [err18];
                  } else {
                    vErrors.push(err18);
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
                    const err19 = {
                      instancePath: instancePath + '/referenceCriteria/' + i2 + '/type/' + i4,
                      schemaPath: '#/properties/referenceCriteria/items/properties/type/items/type',
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
                  instancePath: instancePath + '/referenceCriteria/' + i2 + '/type',
                  schemaPath: '#/properties/referenceCriteria/items/properties/type/type',
                  keyword: 'type',
                  params: { type: 'array' },
                  message: 'must be array',
                };
                if (vErrors === null) {
                  vErrors = [err20];
                } else {
                  vErrors.push(err20);
                }
                errors++;
              }
            }
            if (data7.id !== undefined) {
              let data11 = data7.id;
              if (typeof data11 === 'string') {
                if (!formats0(data11)) {
                  const err21 = {
                    instancePath: instancePath + '/referenceCriteria/' + i2 + '/id',
                    schemaPath: '#/properties/referenceCriteria/items/properties/id/format',
                    keyword: 'format',
                    params: { format: 'uri' },
                    message: 'must match format "' + 'uri' + '"',
                  };
                  if (vErrors === null) {
                    vErrors = [err21];
                  } else {
                    vErrors.push(err21);
                  }
                  errors++;
                }
              } else {
                const err22 = {
                  instancePath: instancePath + '/referenceCriteria/' + i2 + '/id',
                  schemaPath: '#/properties/referenceCriteria/items/properties/id/type',
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
            if (data7.name !== undefined) {
              if (typeof data7.name !== 'string') {
                const err23 = {
                  instancePath: instancePath + '/referenceCriteria/' + i2 + '/name',
                  schemaPath: '#/properties/referenceCriteria/items/properties/name/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
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
              instancePath: instancePath + '/referenceCriteria/' + i2,
              schemaPath: '#/properties/referenceCriteria/items/type',
              keyword: 'type',
              params: { type: 'object' },
              message: 'must be object',
            };
            if (vErrors === null) {
              vErrors = [err24];
            } else {
              vErrors.push(err24);
            }
            errors++;
          }
        }
      } else {
        const err25 = {
          instancePath: instancePath + '/referenceCriteria',
          schemaPath: '#/properties/referenceCriteria/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err25];
        } else {
          vErrors.push(err25);
        }
        errors++;
      }
    }
    if (data.referenceRegulation !== undefined) {
      let data13 = data.referenceRegulation;
      if (Array.isArray(data13)) {
        const len5 = data13.length;
        for (let i5 = 0; i5 < len5; i5++) {
          let data14 = data13[i5];
          if (data14 && typeof data14 == 'object' && !Array.isArray(data14)) {
            if (data14.id === undefined) {
              const err26 = {
                instancePath: instancePath + '/referenceRegulation/' + i5,
                schemaPath: '#/properties/referenceRegulation/items/required',
                keyword: 'required',
                params: { missingProperty: 'id' },
                message: "must have required property '" + 'id' + "'",
              };
              if (vErrors === null) {
                vErrors = [err26];
              } else {
                vErrors.push(err26);
              }
              errors++;
            }
            if (data14.name === undefined) {
              const err27 = {
                instancePath: instancePath + '/referenceRegulation/' + i5,
                schemaPath: '#/properties/referenceRegulation/items/required',
                keyword: 'required',
                params: { missingProperty: 'name' },
                message: "must have required property '" + 'name' + "'",
              };
              if (vErrors === null) {
                vErrors = [err27];
              } else {
                vErrors.push(err27);
              }
              errors++;
            }
            if (data14.type !== undefined) {
              let data15 = data14.type;
              if (Array.isArray(data15)) {
                const _errs37 = errors;
                const len6 = data15.length;
                for (let i6 = 0; i6 < len6; i6++) {
                  const _errs38 = errors;
                  if ('Regulation' !== data15[i6]) {
                    const err28 = {
                      instancePath: instancePath + '/referenceRegulation/' + i5 + '/type/' + i6,
                      schemaPath:
                        '#/properties/referenceRegulation/items/properties/type/allOf/0/contains/const',
                      keyword: 'const',
                      params: { allowedValue: 'Regulation' },
                      message: 'must be equal to constant',
                    };
                    if (vErrors === null) {
                      vErrors = [err28];
                    } else {
                      vErrors.push(err28);
                    }
                    errors++;
                  }
                  var valid16 = _errs38 === errors;
                  if (valid16) {
                    break;
                  }
                }
                if (!valid16) {
                  const err29 = {
                    instancePath: instancePath + '/referenceRegulation/' + i5 + '/type',
                    schemaPath:
                      '#/properties/referenceRegulation/items/properties/type/allOf/0/contains',
                    keyword: 'contains',
                    params: { minContains: 1 },
                    message: 'must contain at least 1 valid item(s)',
                  };
                  if (vErrors === null) {
                    vErrors = [err29];
                  } else {
                    vErrors.push(err29);
                  }
                  errors++;
                } else {
                  errors = _errs37;
                  if (vErrors !== null) {
                    if (_errs37) {
                      vErrors.length = _errs37;
                    } else {
                      vErrors = null;
                    }
                  }
                }
              }
              if (Array.isArray(data15)) {
                const len7 = data15.length;
                for (let i7 = 0; i7 < len7; i7++) {
                  if (typeof data15[i7] !== 'string') {
                    const err30 = {
                      instancePath: instancePath + '/referenceRegulation/' + i5 + '/type/' + i7,
                      schemaPath:
                        '#/properties/referenceRegulation/items/properties/type/items/type',
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
                  instancePath: instancePath + '/referenceRegulation/' + i5 + '/type',
                  schemaPath: '#/properties/referenceRegulation/items/properties/type/type',
                  keyword: 'type',
                  params: { type: 'array' },
                  message: 'must be array',
                };
                if (vErrors === null) {
                  vErrors = [err31];
                } else {
                  vErrors.push(err31);
                }
                errors++;
              }
            }
            if (data14.id !== undefined) {
              let data18 = data14.id;
              if (typeof data18 === 'string') {
                if (!formats0(data18)) {
                  const err32 = {
                    instancePath: instancePath + '/referenceRegulation/' + i5 + '/id',
                    schemaPath: '#/properties/referenceRegulation/items/properties/id/format',
                    keyword: 'format',
                    params: { format: 'uri' },
                    message: 'must match format "' + 'uri' + '"',
                  };
                  if (vErrors === null) {
                    vErrors = [err32];
                  } else {
                    vErrors.push(err32);
                  }
                  errors++;
                }
              } else {
                const err33 = {
                  instancePath: instancePath + '/referenceRegulation/' + i5 + '/id',
                  schemaPath: '#/properties/referenceRegulation/items/properties/id/type',
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
            if (data14.name !== undefined) {
              if (typeof data14.name !== 'string') {
                const err34 = {
                  instancePath: instancePath + '/referenceRegulation/' + i5 + '/name',
                  schemaPath: '#/properties/referenceRegulation/items/properties/name/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err34];
                } else {
                  vErrors.push(err34);
                }
                errors++;
              }
            }
          } else {
            const err35 = {
              instancePath: instancePath + '/referenceRegulation/' + i5,
              schemaPath: '#/properties/referenceRegulation/items/type',
              keyword: 'type',
              params: { type: 'object' },
              message: 'must be object',
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
          instancePath: instancePath + '/referenceRegulation',
          schemaPath: '#/properties/referenceRegulation/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err36];
        } else {
          vErrors.push(err36);
        }
        errors++;
      }
    }
    if (data.referenceStandard !== undefined) {
      let data20 = data.referenceStandard;
      if (Array.isArray(data20)) {
        const len8 = data20.length;
        for (let i8 = 0; i8 < len8; i8++) {
          let data21 = data20[i8];
          if (data21 && typeof data21 == 'object' && !Array.isArray(data21)) {
            if (data21.id === undefined) {
              const err37 = {
                instancePath: instancePath + '/referenceStandard/' + i8,
                schemaPath: '#/properties/referenceStandard/items/required',
                keyword: 'required',
                params: { missingProperty: 'id' },
                message: "must have required property '" + 'id' + "'",
              };
              if (vErrors === null) {
                vErrors = [err37];
              } else {
                vErrors.push(err37);
              }
              errors++;
            }
            if (data21.name === undefined) {
              const err38 = {
                instancePath: instancePath + '/referenceStandard/' + i8,
                schemaPath: '#/properties/referenceStandard/items/required',
                keyword: 'required',
                params: { missingProperty: 'name' },
                message: "must have required property '" + 'name' + "'",
              };
              if (vErrors === null) {
                vErrors = [err38];
              } else {
                vErrors.push(err38);
              }
              errors++;
            }
            if (data21.type !== undefined) {
              let data22 = data21.type;
              if (Array.isArray(data22)) {
                const _errs52 = errors;
                const len9 = data22.length;
                for (let i9 = 0; i9 < len9; i9++) {
                  const _errs53 = errors;
                  if ('Standard' !== data22[i9]) {
                    const err39 = {
                      instancePath: instancePath + '/referenceStandard/' + i8 + '/type/' + i9,
                      schemaPath:
                        '#/properties/referenceStandard/items/properties/type/allOf/0/contains/const',
                      keyword: 'const',
                      params: { allowedValue: 'Standard' },
                      message: 'must be equal to constant',
                    };
                    if (vErrors === null) {
                      vErrors = [err39];
                    } else {
                      vErrors.push(err39);
                    }
                    errors++;
                  }
                  var valid23 = _errs53 === errors;
                  if (valid23) {
                    break;
                  }
                }
                if (!valid23) {
                  const err40 = {
                    instancePath: instancePath + '/referenceStandard/' + i8 + '/type',
                    schemaPath:
                      '#/properties/referenceStandard/items/properties/type/allOf/0/contains',
                    keyword: 'contains',
                    params: { minContains: 1 },
                    message: 'must contain at least 1 valid item(s)',
                  };
                  if (vErrors === null) {
                    vErrors = [err40];
                  } else {
                    vErrors.push(err40);
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
              if (Array.isArray(data22)) {
                const len10 = data22.length;
                for (let i10 = 0; i10 < len10; i10++) {
                  if (typeof data22[i10] !== 'string') {
                    const err41 = {
                      instancePath: instancePath + '/referenceStandard/' + i8 + '/type/' + i10,
                      schemaPath: '#/properties/referenceStandard/items/properties/type/items/type',
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
              } else {
                const err42 = {
                  instancePath: instancePath + '/referenceStandard/' + i8 + '/type',
                  schemaPath: '#/properties/referenceStandard/items/properties/type/type',
                  keyword: 'type',
                  params: { type: 'array' },
                  message: 'must be array',
                };
                if (vErrors === null) {
                  vErrors = [err42];
                } else {
                  vErrors.push(err42);
                }
                errors++;
              }
            }
            if (data21.id !== undefined) {
              let data25 = data21.id;
              if (typeof data25 === 'string') {
                if (!formats0(data25)) {
                  const err43 = {
                    instancePath: instancePath + '/referenceStandard/' + i8 + '/id',
                    schemaPath: '#/properties/referenceStandard/items/properties/id/format',
                    keyword: 'format',
                    params: { format: 'uri' },
                    message: 'must match format "' + 'uri' + '"',
                  };
                  if (vErrors === null) {
                    vErrors = [err43];
                  } else {
                    vErrors.push(err43);
                  }
                  errors++;
                }
              } else {
                const err44 = {
                  instancePath: instancePath + '/referenceStandard/' + i8 + '/id',
                  schemaPath: '#/properties/referenceStandard/items/properties/id/type',
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
            if (data21.name !== undefined) {
              if (typeof data21.name !== 'string') {
                const err45 = {
                  instancePath: instancePath + '/referenceStandard/' + i8 + '/name',
                  schemaPath: '#/properties/referenceStandard/items/properties/name/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
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
              instancePath: instancePath + '/referenceStandard/' + i8,
              schemaPath: '#/properties/referenceStandard/items/type',
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
        }
      } else {
        const err47 = {
          instancePath: instancePath + '/referenceStandard',
          schemaPath: '#/properties/referenceStandard/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err47];
        } else {
          vErrors.push(err47);
        }
        errors++;
      }
    }
    if (data.claimDate !== undefined) {
      let data27 = data.claimDate;
      if (typeof data27 === 'string') {
        if (!formats22.validate(data27)) {
          const err48 = {
            instancePath: instancePath + '/claimDate',
            schemaPath: '#/properties/claimDate/format',
            keyword: 'format',
            params: { format: 'date' },
            message: 'must match format "' + 'date' + '"',
          };
          if (vErrors === null) {
            vErrors = [err48];
          } else {
            vErrors.push(err48);
          }
          errors++;
        }
      } else {
        const err49 = {
          instancePath: instancePath + '/claimDate',
          schemaPath: '#/properties/claimDate/type',
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
    if (data.applicablePeriod !== undefined) {
      let data28 = data.applicablePeriod;
      if (data28 && typeof data28 == 'object' && !Array.isArray(data28)) {
        if (data28.startDate === undefined) {
          const err50 = {
            instancePath: instancePath + '/applicablePeriod',
            schemaPath: '#/$defs/Period/required',
            keyword: 'required',
            params: { missingProperty: 'startDate' },
            message: "must have required property '" + 'startDate' + "'",
          };
          if (vErrors === null) {
            vErrors = [err50];
          } else {
            vErrors.push(err50);
          }
          errors++;
        }
        if (data28.endDate === undefined) {
          const err51 = {
            instancePath: instancePath + '/applicablePeriod',
            schemaPath: '#/$defs/Period/required',
            keyword: 'required',
            params: { missingProperty: 'endDate' },
            message: "must have required property '" + 'endDate' + "'",
          };
          if (vErrors === null) {
            vErrors = [err51];
          } else {
            vErrors.push(err51);
          }
          errors++;
        }
        for (const key1 in data28) {
          if (
            !(
              key1 === 'type' ||
              key1 === 'startDate' ||
              key1 === 'endDate' ||
              key1 === 'periodInformation'
            )
          ) {
            const err52 = {
              instancePath: instancePath + '/applicablePeriod',
              schemaPath: '#/$defs/Period/additionalProperties',
              keyword: 'additionalProperties',
              params: { additionalProperty: key1 },
              message: 'must NOT have additional properties',
            };
            if (vErrors === null) {
              vErrors = [err52];
            } else {
              vErrors.push(err52);
            }
            errors++;
          }
        }
        if (data28.type !== undefined) {
          let data29 = data28.type;
          if (Array.isArray(data29)) {
            const _errs69 = errors;
            const len11 = data29.length;
            for (let i11 = 0; i11 < len11; i11++) {
              const _errs70 = errors;
              if ('Period' !== data29[i11]) {
                const err53 = {
                  instancePath: instancePath + '/applicablePeriod/type/' + i11,
                  schemaPath: '#/$defs/Period/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Period' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err53];
                } else {
                  vErrors.push(err53);
                }
                errors++;
              }
              var valid29 = _errs70 === errors;
              if (valid29) {
                break;
              }
            }
            if (!valid29) {
              const err54 = {
                instancePath: instancePath + '/applicablePeriod/type',
                schemaPath: '#/$defs/Period/properties/type/allOf/0/contains',
                keyword: 'contains',
                params: { minContains: 1 },
                message: 'must contain at least 1 valid item(s)',
              };
              if (vErrors === null) {
                vErrors = [err54];
              } else {
                vErrors.push(err54);
              }
              errors++;
            } else {
              errors = _errs69;
              if (vErrors !== null) {
                if (_errs69) {
                  vErrors.length = _errs69;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data29)) {
            const len12 = data29.length;
            for (let i12 = 0; i12 < len12; i12++) {
              if (typeof data29[i12] !== 'string') {
                const err55 = {
                  instancePath: instancePath + '/applicablePeriod/type/' + i12,
                  schemaPath: '#/$defs/Period/properties/type/items/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err55];
                } else {
                  vErrors.push(err55);
                }
                errors++;
              }
            }
          } else {
            const err56 = {
              instancePath: instancePath + '/applicablePeriod/type',
              schemaPath: '#/$defs/Period/properties/type/type',
              keyword: 'type',
              params: { type: 'array' },
              message: 'must be array',
            };
            if (vErrors === null) {
              vErrors = [err56];
            } else {
              vErrors.push(err56);
            }
            errors++;
          }
        }
        if (data28.startDate !== undefined) {
          let data32 = data28.startDate;
          if (typeof data32 === 'string') {
            if (!formats22.validate(data32)) {
              const err57 = {
                instancePath: instancePath + '/applicablePeriod/startDate',
                schemaPath: '#/$defs/Period/properties/startDate/format',
                keyword: 'format',
                params: { format: 'date' },
                message: 'must match format "' + 'date' + '"',
              };
              if (vErrors === null) {
                vErrors = [err57];
              } else {
                vErrors.push(err57);
              }
              errors++;
            }
          } else {
            const err58 = {
              instancePath: instancePath + '/applicablePeriod/startDate',
              schemaPath: '#/$defs/Period/properties/startDate/type',
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
        if (data28.endDate !== undefined) {
          let data33 = data28.endDate;
          if (typeof data33 === 'string') {
            if (!formats22.validate(data33)) {
              const err59 = {
                instancePath: instancePath + '/applicablePeriod/endDate',
                schemaPath: '#/$defs/Period/properties/endDate/format',
                keyword: 'format',
                params: { format: 'date' },
                message: 'must match format "' + 'date' + '"',
              };
              if (vErrors === null) {
                vErrors = [err59];
              } else {
                vErrors.push(err59);
              }
              errors++;
            }
          } else {
            const err60 = {
              instancePath: instancePath + '/applicablePeriod/endDate',
              schemaPath: '#/$defs/Period/properties/endDate/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err60];
            } else {
              vErrors.push(err60);
            }
            errors++;
          }
        }
        if (data28.periodInformation !== undefined) {
          if (typeof data28.periodInformation !== 'string') {
            const err61 = {
              instancePath: instancePath + '/applicablePeriod/periodInformation',
              schemaPath: '#/$defs/Period/properties/periodInformation/type',
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
      } else {
        const err62 = {
          instancePath: instancePath + '/applicablePeriod',
          schemaPath: '#/$defs/Period/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err62];
        } else {
          vErrors.push(err62);
        }
        errors++;
      }
    }
    if (data.claimedPerformance !== undefined) {
      let data35 = data.claimedPerformance;
      if (Array.isArray(data35)) {
        const len13 = data35.length;
        for (let i13 = 0; i13 < len13; i13++) {
          if (
            !validate35(data35[i13], {
              instancePath: instancePath + '/claimedPerformance/' + i13,
              parentData: data35,
              parentDataProperty: i13,
              rootData,
              dynamicAnchors,
            })
          ) {
            vErrors = vErrors === null ? validate35.errors : vErrors.concat(validate35.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err63 = {
          instancePath: instancePath + '/claimedPerformance',
          schemaPath: '#/properties/claimedPerformance/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err63];
        } else {
          vErrors.push(err63);
        }
        errors++;
      }
    }
    if (data.evidence !== undefined) {
      let data37 = data.evidence;
      if (Array.isArray(data37)) {
        const len14 = data37.length;
        for (let i14 = 0; i14 < len14; i14++) {
          let data38 = data37[i14];
          if (data38 && typeof data38 == 'object' && !Array.isArray(data38)) {
            if (data38.linkURL === undefined) {
              const err64 = {
                instancePath: instancePath + '/evidence/' + i14,
                schemaPath: '#/$defs/Link/required',
                keyword: 'required',
                params: { missingProperty: 'linkURL' },
                message: "must have required property '" + 'linkURL' + "'",
              };
              if (vErrors === null) {
                vErrors = [err64];
              } else {
                vErrors.push(err64);
              }
              errors++;
            }
            if (data38.linkName === undefined) {
              const err65 = {
                instancePath: instancePath + '/evidence/' + i14,
                schemaPath: '#/$defs/Link/required',
                keyword: 'required',
                params: { missingProperty: 'linkName' },
                message: "must have required property '" + 'linkName' + "'",
              };
              if (vErrors === null) {
                vErrors = [err65];
              } else {
                vErrors.push(err65);
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
                const err66 = {
                  instancePath: instancePath + '/evidence/' + i14,
                  schemaPath: '#/$defs/Link/additionalProperties',
                  keyword: 'additionalProperties',
                  params: { additionalProperty: key2 },
                  message: 'must NOT have additional properties',
                };
                if (vErrors === null) {
                  vErrors = [err66];
                } else {
                  vErrors.push(err66);
                }
                errors++;
              }
            }
            if (data38.type !== undefined) {
              let data39 = data38.type;
              if (Array.isArray(data39)) {
                const _errs91 = errors;
                const len15 = data39.length;
                for (let i15 = 0; i15 < len15; i15++) {
                  const _errs92 = errors;
                  if ('Link' !== data39[i15]) {
                    const err67 = {
                      instancePath: instancePath + '/evidence/' + i14 + '/type/' + i15,
                      schemaPath: '#/$defs/Link/properties/type/allOf/0/contains/const',
                      keyword: 'const',
                      params: { allowedValue: 'Link' },
                      message: 'must be equal to constant',
                    };
                    if (vErrors === null) {
                      vErrors = [err67];
                    } else {
                      vErrors.push(err67);
                    }
                    errors++;
                  }
                  var valid39 = _errs92 === errors;
                  if (valid39) {
                    break;
                  }
                }
                if (!valid39) {
                  const err68 = {
                    instancePath: instancePath + '/evidence/' + i14 + '/type',
                    schemaPath: '#/$defs/Link/properties/type/allOf/0/contains',
                    keyword: 'contains',
                    params: { minContains: 1 },
                    message: 'must contain at least 1 valid item(s)',
                  };
                  if (vErrors === null) {
                    vErrors = [err68];
                  } else {
                    vErrors.push(err68);
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
                const len16 = data39.length;
                for (let i16 = 0; i16 < len16; i16++) {
                  if (typeof data39[i16] !== 'string') {
                    const err69 = {
                      instancePath: instancePath + '/evidence/' + i14 + '/type/' + i16,
                      schemaPath: '#/$defs/Link/properties/type/items/type',
                      keyword: 'type',
                      params: { type: 'string' },
                      message: 'must be string',
                    };
                    if (vErrors === null) {
                      vErrors = [err69];
                    } else {
                      vErrors.push(err69);
                    }
                    errors++;
                  }
                }
              } else {
                const err70 = {
                  instancePath: instancePath + '/evidence/' + i14 + '/type',
                  schemaPath: '#/$defs/Link/properties/type/type',
                  keyword: 'type',
                  params: { type: 'array' },
                  message: 'must be array',
                };
                if (vErrors === null) {
                  vErrors = [err70];
                } else {
                  vErrors.push(err70);
                }
                errors++;
              }
            }
            if (data38.linkURL !== undefined) {
              let data42 = data38.linkURL;
              if (typeof data42 === 'string') {
                if (!formats0(data42)) {
                  const err71 = {
                    instancePath: instancePath + '/evidence/' + i14 + '/linkURL',
                    schemaPath: '#/$defs/Link/properties/linkURL/format',
                    keyword: 'format',
                    params: { format: 'uri' },
                    message: 'must match format "' + 'uri' + '"',
                  };
                  if (vErrors === null) {
                    vErrors = [err71];
                  } else {
                    vErrors.push(err71);
                  }
                  errors++;
                }
              } else {
                const err72 = {
                  instancePath: instancePath + '/evidence/' + i14 + '/linkURL',
                  schemaPath: '#/$defs/Link/properties/linkURL/type',
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
            if (data38.linkName !== undefined) {
              if (typeof data38.linkName !== 'string') {
                const err73 = {
                  instancePath: instancePath + '/evidence/' + i14 + '/linkName',
                  schemaPath: '#/$defs/Link/properties/linkName/type',
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
            if (data38.digestMultibase !== undefined) {
              if (typeof data38.digestMultibase !== 'string') {
                const err74 = {
                  instancePath: instancePath + '/evidence/' + i14 + '/digestMultibase',
                  schemaPath: '#/$defs/Link/properties/digestMultibase/type',
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
            if (data38.mediaType !== undefined) {
              if (typeof data38.mediaType !== 'string') {
                const err75 = {
                  instancePath: instancePath + '/evidence/' + i14 + '/mediaType',
                  schemaPath: '#/$defs/Link/properties/mediaType/type',
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
            if (data38.linkType !== undefined) {
              if (typeof data38.linkType !== 'string') {
                const err76 = {
                  instancePath: instancePath + '/evidence/' + i14 + '/linkType',
                  schemaPath: '#/$defs/Link/properties/linkType/type',
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
              instancePath: instancePath + '/evidence/' + i14,
              schemaPath: '#/$defs/Link/type',
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
      } else {
        const err78 = {
          instancePath: instancePath + '/evidence',
          schemaPath: '#/properties/evidence/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err78];
        } else {
          vErrors.push(err78);
        }
        errors++;
      }
    }
    if (data.conformityTopic !== undefined) {
      let data47 = data.conformityTopic;
      if (Array.isArray(data47)) {
        const len17 = data47.length;
        for (let i17 = 0; i17 < len17; i17++) {
          let data48 = data47[i17];
          if (data48 && typeof data48 == 'object' && !Array.isArray(data48)) {
            if (data48.id === undefined) {
              const err79 = {
                instancePath: instancePath + '/conformityTopic/' + i17,
                schemaPath: '#/$defs/ConformityTopic/required',
                keyword: 'required',
                params: { missingProperty: 'id' },
                message: "must have required property '" + 'id' + "'",
              };
              if (vErrors === null) {
                vErrors = [err79];
              } else {
                vErrors.push(err79);
              }
              errors++;
            }
            if (data48.name === undefined) {
              const err80 = {
                instancePath: instancePath + '/conformityTopic/' + i17,
                schemaPath: '#/$defs/ConformityTopic/required',
                keyword: 'required',
                params: { missingProperty: 'name' },
                message: "must have required property '" + 'name' + "'",
              };
              if (vErrors === null) {
                vErrors = [err80];
              } else {
                vErrors.push(err80);
              }
              errors++;
            }
            for (const key3 in data48) {
              if (!(key3 === 'type' || key3 === 'id' || key3 === 'name' || key3 === 'definition')) {
                const err81 = {
                  instancePath: instancePath + '/conformityTopic/' + i17,
                  schemaPath: '#/$defs/ConformityTopic/additionalProperties',
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
            if (data48.type !== undefined) {
              let data49 = data48.type;
              if (Array.isArray(data49)) {
                const _errs114 = errors;
                const len18 = data49.length;
                for (let i18 = 0; i18 < len18; i18++) {
                  const _errs115 = errors;
                  if ('ConformityTopic' !== data49[i18]) {
                    const err82 = {
                      instancePath: instancePath + '/conformityTopic/' + i17 + '/type/' + i18,
                      schemaPath: '#/$defs/ConformityTopic/properties/type/allOf/0/contains/const',
                      keyword: 'const',
                      params: { allowedValue: 'ConformityTopic' },
                      message: 'must be equal to constant',
                    };
                    if (vErrors === null) {
                      vErrors = [err82];
                    } else {
                      vErrors.push(err82);
                    }
                    errors++;
                  }
                  var valid47 = _errs115 === errors;
                  if (valid47) {
                    break;
                  }
                }
                if (!valid47) {
                  const err83 = {
                    instancePath: instancePath + '/conformityTopic/' + i17 + '/type',
                    schemaPath: '#/$defs/ConformityTopic/properties/type/allOf/0/contains',
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
                  errors = _errs114;
                  if (vErrors !== null) {
                    if (_errs114) {
                      vErrors.length = _errs114;
                    } else {
                      vErrors = null;
                    }
                  }
                }
              }
              if (Array.isArray(data49)) {
                const len19 = data49.length;
                for (let i19 = 0; i19 < len19; i19++) {
                  if (typeof data49[i19] !== 'string') {
                    const err84 = {
                      instancePath: instancePath + '/conformityTopic/' + i17 + '/type/' + i19,
                      schemaPath: '#/$defs/ConformityTopic/properties/type/items/type',
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
                  instancePath: instancePath + '/conformityTopic/' + i17 + '/type',
                  schemaPath: '#/$defs/ConformityTopic/properties/type/type',
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
            if (data48.id !== undefined) {
              let data52 = data48.id;
              if (typeof data52 === 'string') {
                if (!formats0(data52)) {
                  const err86 = {
                    instancePath: instancePath + '/conformityTopic/' + i17 + '/id',
                    schemaPath: '#/$defs/ConformityTopic/properties/id/format',
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
                  instancePath: instancePath + '/conformityTopic/' + i17 + '/id',
                  schemaPath: '#/$defs/ConformityTopic/properties/id/type',
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
            if (data48.name !== undefined) {
              if (typeof data48.name !== 'string') {
                const err88 = {
                  instancePath: instancePath + '/conformityTopic/' + i17 + '/name',
                  schemaPath: '#/$defs/ConformityTopic/properties/name/type',
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
            if (data48.definition !== undefined) {
              if (typeof data48.definition !== 'string') {
                const err89 = {
                  instancePath: instancePath + '/conformityTopic/' + i17 + '/definition',
                  schemaPath: '#/$defs/ConformityTopic/properties/definition/type',
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
          } else {
            const err90 = {
              instancePath: instancePath + '/conformityTopic/' + i17,
              schemaPath: '#/$defs/ConformityTopic/type',
              keyword: 'type',
              params: { type: 'object' },
              message: 'must be object',
            };
            if (vErrors === null) {
              vErrors = [err90];
            } else {
              vErrors.push(err90);
            }
            errors++;
          }
        }
      } else {
        const err91 = {
          instancePath: instancePath + '/conformityTopic',
          schemaPath: '#/properties/conformityTopic/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
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
      instancePath,
      schemaPath: '#/type',
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
  validate34.errors = vErrors;
  return errors === 0;
}
validate34.evaluated = { props: true, dynamicProps: false, dynamicItems: false };
function validate31(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {},
) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate31.evaluated;
  if (evaluated0.dynamicProps) {
    evaluated0.props = undefined;
  }
  if (evaluated0.dynamicItems) {
    evaluated0.items = undefined;
  }
  if (data && typeof data == 'object' && !Array.isArray(data)) {
    if (data.description === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'description' },
        message: "must have required property '" + 'description' + "'",
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.dimensions === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'dimensions' },
        message: "must have required property '" + 'dimensions' + "'",
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    if (data.materialUsed === undefined) {
      const err2 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'materialUsed' },
        message: "must have required property '" + 'materialUsed' + "'",
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    for (const key0 in data) {
      if (
        !(
          key0 === 'type' ||
          key0 === 'description' ||
          key0 === 'dimensions' ||
          key0 === 'materialUsed' ||
          key0 === 'packageLabel' ||
          key0 === 'performanceClaim'
        )
      ) {
        const err3 = {
          instancePath,
          schemaPath: '#/additionalProperties',
          keyword: 'additionalProperties',
          params: { additionalProperty: key0 },
          message: 'must NOT have additional properties',
        };
        if (vErrors === null) {
          vErrors = [err3];
        } else {
          vErrors.push(err3);
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
          if ('Package' !== data0[i0]) {
            const err4 = {
              instancePath: instancePath + '/type/' + i0,
              schemaPath: '#/properties/type/allOf/0/contains/const',
              keyword: 'const',
              params: { allowedValue: 'Package' },
              message: 'must be equal to constant',
            };
            if (vErrors === null) {
              vErrors = [err4];
            } else {
              vErrors.push(err4);
            }
            errors++;
          }
          var valid2 = _errs6 === errors;
          if (valid2) {
            break;
          }
        }
        if (!valid2) {
          const err5 = {
            instancePath: instancePath + '/type',
            schemaPath: '#/properties/type/allOf/0/contains',
            keyword: 'contains',
            params: { minContains: 1 },
            message: 'must contain at least 1 valid item(s)',
          };
          if (vErrors === null) {
            vErrors = [err5];
          } else {
            vErrors.push(err5);
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
            const err6 = {
              instancePath: instancePath + '/type/' + i1,
              schemaPath: '#/properties/type/items/type',
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
      } else {
        const err7 = {
          instancePath: instancePath + '/type',
          schemaPath: '#/properties/type/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err7];
        } else {
          vErrors.push(err7);
        }
        errors++;
      }
    }
    if (data.description !== undefined) {
      if (typeof data.description !== 'string') {
        const err8 = {
          instancePath: instancePath + '/description',
          schemaPath: '#/properties/description/type',
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
    if (data.dimensions !== undefined) {
      if (
        !validate27(data.dimensions, {
          instancePath: instancePath + '/dimensions',
          parentData: data,
          parentDataProperty: 'dimensions',
          rootData,
          dynamicAnchors,
        })
      ) {
        vErrors = vErrors === null ? validate27.errors : vErrors.concat(validate27.errors);
        errors = vErrors.length;
      }
    }
    if (data.materialUsed !== undefined) {
      let data5 = data.materialUsed;
      if (Array.isArray(data5)) {
        const len2 = data5.length;
        for (let i2 = 0; i2 < len2; i2++) {
          if (
            !validate29(data5[i2], {
              instancePath: instancePath + '/materialUsed/' + i2,
              parentData: data5,
              parentDataProperty: i2,
              rootData,
              dynamicAnchors,
            })
          ) {
            vErrors = vErrors === null ? validate29.errors : vErrors.concat(validate29.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err9 = {
          instancePath: instancePath + '/materialUsed',
          schemaPath: '#/properties/materialUsed/type',
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
    if (data.packageLabel !== undefined) {
      let data7 = data.packageLabel;
      if (Array.isArray(data7)) {
        const len3 = data7.length;
        for (let i3 = 0; i3 < len3; i3++) {
          let data8 = data7[i3];
          if (data8 && typeof data8 == 'object' && !Array.isArray(data8)) {
            if (data8.name === undefined) {
              const err10 = {
                instancePath: instancePath + '/packageLabel/' + i3,
                schemaPath: '#/$defs/Image/required',
                keyword: 'required',
                params: { missingProperty: 'name' },
                message: "must have required property '" + 'name' + "'",
              };
              if (vErrors === null) {
                vErrors = [err10];
              } else {
                vErrors.push(err10);
              }
              errors++;
            }
            if (data8.imageData === undefined) {
              const err11 = {
                instancePath: instancePath + '/packageLabel/' + i3,
                schemaPath: '#/$defs/Image/required',
                keyword: 'required',
                params: { missingProperty: 'imageData' },
                message: "must have required property '" + 'imageData' + "'",
              };
              if (vErrors === null) {
                vErrors = [err11];
              } else {
                vErrors.push(err11);
              }
              errors++;
            }
            if (data8.mediaType === undefined) {
              const err12 = {
                instancePath: instancePath + '/packageLabel/' + i3,
                schemaPath: '#/$defs/Image/required',
                keyword: 'required',
                params: { missingProperty: 'mediaType' },
                message: "must have required property '" + 'mediaType' + "'",
              };
              if (vErrors === null) {
                vErrors = [err12];
              } else {
                vErrors.push(err12);
              }
              errors++;
            }
            for (const key1 in data8) {
              if (
                !(
                  key1 === 'type' ||
                  key1 === 'name' ||
                  key1 === 'description' ||
                  key1 === 'imageData' ||
                  key1 === 'mediaType'
                )
              ) {
                const err13 = {
                  instancePath: instancePath + '/packageLabel/' + i3,
                  schemaPath: '#/$defs/Image/additionalProperties',
                  keyword: 'additionalProperties',
                  params: { additionalProperty: key1 },
                  message: 'must NOT have additional properties',
                };
                if (vErrors === null) {
                  vErrors = [err13];
                } else {
                  vErrors.push(err13);
                }
                errors++;
              }
            }
            if (data8.type !== undefined) {
              let data9 = data8.type;
              if (Array.isArray(data9)) {
                const _errs24 = errors;
                const len4 = data9.length;
                for (let i4 = 0; i4 < len4; i4++) {
                  const _errs25 = errors;
                  if ('Image' !== data9[i4]) {
                    const err14 = {
                      instancePath: instancePath + '/packageLabel/' + i3 + '/type/' + i4,
                      schemaPath: '#/$defs/Image/properties/type/allOf/0/contains/const',
                      keyword: 'const',
                      params: { allowedValue: 'Image' },
                      message: 'must be equal to constant',
                    };
                    if (vErrors === null) {
                      vErrors = [err14];
                    } else {
                      vErrors.push(err14);
                    }
                    errors++;
                  }
                  var valid12 = _errs25 === errors;
                  if (valid12) {
                    break;
                  }
                }
                if (!valid12) {
                  const err15 = {
                    instancePath: instancePath + '/packageLabel/' + i3 + '/type',
                    schemaPath: '#/$defs/Image/properties/type/allOf/0/contains',
                    keyword: 'contains',
                    params: { minContains: 1 },
                    message: 'must contain at least 1 valid item(s)',
                  };
                  if (vErrors === null) {
                    vErrors = [err15];
                  } else {
                    vErrors.push(err15);
                  }
                  errors++;
                } else {
                  errors = _errs24;
                  if (vErrors !== null) {
                    if (_errs24) {
                      vErrors.length = _errs24;
                    } else {
                      vErrors = null;
                    }
                  }
                }
              }
              if (Array.isArray(data9)) {
                const len5 = data9.length;
                for (let i5 = 0; i5 < len5; i5++) {
                  if (typeof data9[i5] !== 'string') {
                    const err16 = {
                      instancePath: instancePath + '/packageLabel/' + i3 + '/type/' + i5,
                      schemaPath: '#/$defs/Image/properties/type/items/type',
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
              } else {
                const err17 = {
                  instancePath: instancePath + '/packageLabel/' + i3 + '/type',
                  schemaPath: '#/$defs/Image/properties/type/type',
                  keyword: 'type',
                  params: { type: 'array' },
                  message: 'must be array',
                };
                if (vErrors === null) {
                  vErrors = [err17];
                } else {
                  vErrors.push(err17);
                }
                errors++;
              }
            }
            if (data8.name !== undefined) {
              if (typeof data8.name !== 'string') {
                const err18 = {
                  instancePath: instancePath + '/packageLabel/' + i3 + '/name',
                  schemaPath: '#/$defs/Image/properties/name/type',
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
            if (data8.description !== undefined) {
              if (typeof data8.description !== 'string') {
                const err19 = {
                  instancePath: instancePath + '/packageLabel/' + i3 + '/description',
                  schemaPath: '#/$defs/Image/properties/description/type',
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
            if (data8.imageData !== undefined) {
              let data14 = data8.imageData;
              if (typeof data14 === 'string') {
                if (!formats26(data14)) {
                  const err20 = {
                    instancePath: instancePath + '/packageLabel/' + i3 + '/imageData',
                    schemaPath: '#/$defs/Image/properties/imageData/format',
                    keyword: 'format',
                    params: { format: 'byte' },
                    message: 'must match format "' + 'byte' + '"',
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
                  instancePath: instancePath + '/packageLabel/' + i3 + '/imageData',
                  schemaPath: '#/$defs/Image/properties/imageData/type',
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
            if (data8.mediaType !== undefined) {
              if (typeof data8.mediaType !== 'string') {
                const err22 = {
                  instancePath: instancePath + '/packageLabel/' + i3 + '/mediaType',
                  schemaPath: '#/$defs/Image/properties/mediaType/type',
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
              instancePath: instancePath + '/packageLabel/' + i3,
              schemaPath: '#/$defs/Image/type',
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
          instancePath: instancePath + '/packageLabel',
          schemaPath: '#/properties/packageLabel/type',
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
    if (data.performanceClaim !== undefined) {
      let data16 = data.performanceClaim;
      if (Array.isArray(data16)) {
        const len6 = data16.length;
        for (let i6 = 0; i6 < len6; i6++) {
          if (
            !validate34(data16[i6], {
              instancePath: instancePath + '/performanceClaim/' + i6,
              parentData: data16,
              parentDataProperty: i6,
              rootData,
              dynamicAnchors,
            })
          ) {
            vErrors = vErrors === null ? validate34.errors : vErrors.concat(validate34.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err25 = {
          instancePath: instancePath + '/performanceClaim',
          schemaPath: '#/properties/performanceClaim/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
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
      instancePath,
      schemaPath: '#/type',
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
  validate31.errors = vErrors;
  return errors === 0;
}
validate31.evaluated = { props: true, dynamicProps: false, dynamicItems: false };
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
    if (data.idScheme === undefined) {
      const err2 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'idScheme' },
        message: "must have required property '" + 'idScheme' + "'",
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.idGranularity === undefined) {
      const err3 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'idGranularity' },
        message: "must have required property '" + 'idGranularity' + "'",
      };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.productCategory === undefined) {
      const err4 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'productCategory' },
        message: "must have required property '" + 'productCategory' + "'",
      };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.producedAtFacility === undefined) {
      const err5 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'producedAtFacility' },
        message: "must have required property '" + 'producedAtFacility' + "'",
      };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
    }
    if (data.countryOfProduction === undefined) {
      const err6 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'countryOfProduction' },
        message: "must have required property '" + 'countryOfProduction' + "'",
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
          if ('Product' !== data0[i0]) {
            const err8 = {
              instancePath: instancePath + '/type/' + i0,
              schemaPath: '#/properties/type/allOf/0/contains/const',
              keyword: 'const',
              params: { allowedValue: 'Product' },
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
    if (data.idScheme !== undefined) {
      let data6 = data.idScheme;
      if (data6 && typeof data6 == 'object' && !Array.isArray(data6)) {
        if (data6.id === undefined) {
          const err16 = {
            instancePath: instancePath + '/idScheme',
            schemaPath: '#/properties/idScheme/required',
            keyword: 'required',
            params: { missingProperty: 'id' },
            message: "must have required property '" + 'id' + "'",
          };
          if (vErrors === null) {
            vErrors = [err16];
          } else {
            vErrors.push(err16);
          }
          errors++;
        }
        if (data6.name === undefined) {
          const err17 = {
            instancePath: instancePath + '/idScheme',
            schemaPath: '#/properties/idScheme/required',
            keyword: 'required',
            params: { missingProperty: 'name' },
            message: "must have required property '" + 'name' + "'",
          };
          if (vErrors === null) {
            vErrors = [err17];
          } else {
            vErrors.push(err17);
          }
          errors++;
        }
        if (data6.type !== undefined) {
          let data7 = data6.type;
          if (Array.isArray(data7)) {
            const _errs20 = errors;
            const len2 = data7.length;
            for (let i2 = 0; i2 < len2; i2++) {
              const _errs21 = errors;
              if ('IdentifierScheme' !== data7[i2]) {
                const err18 = {
                  instancePath: instancePath + '/idScheme/type/' + i2,
                  schemaPath: '#/properties/idScheme/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'IdentifierScheme' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err18];
                } else {
                  vErrors.push(err18);
                }
                errors++;
              }
              var valid7 = _errs21 === errors;
              if (valid7) {
                break;
              }
            }
            if (!valid7) {
              const err19 = {
                instancePath: instancePath + '/idScheme/type',
                schemaPath: '#/properties/idScheme/properties/type/allOf/0/contains',
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
              errors = _errs20;
              if (vErrors !== null) {
                if (_errs20) {
                  vErrors.length = _errs20;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data7)) {
            const len3 = data7.length;
            for (let i3 = 0; i3 < len3; i3++) {
              if (typeof data7[i3] !== 'string') {
                const err20 = {
                  instancePath: instancePath + '/idScheme/type/' + i3,
                  schemaPath: '#/properties/idScheme/properties/type/items/type',
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
              instancePath: instancePath + '/idScheme/type',
              schemaPath: '#/properties/idScheme/properties/type/type',
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
        if (data6.id !== undefined) {
          let data10 = data6.id;
          if (typeof data10 === 'string') {
            if (!formats0(data10)) {
              const err22 = {
                instancePath: instancePath + '/idScheme/id',
                schemaPath: '#/properties/idScheme/properties/id/format',
                keyword: 'format',
                params: { format: 'uri' },
                message: 'must match format "' + 'uri' + '"',
              };
              if (vErrors === null) {
                vErrors = [err22];
              } else {
                vErrors.push(err22);
              }
              errors++;
            }
          } else {
            const err23 = {
              instancePath: instancePath + '/idScheme/id',
              schemaPath: '#/properties/idScheme/properties/id/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err23];
            } else {
              vErrors.push(err23);
            }
            errors++;
          }
        }
        if (data6.name !== undefined) {
          if (typeof data6.name !== 'string') {
            const err24 = {
              instancePath: instancePath + '/idScheme/name',
              schemaPath: '#/properties/idScheme/properties/name/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err24];
            } else {
              vErrors.push(err24);
            }
            errors++;
          }
        }
      } else {
        const err25 = {
          instancePath: instancePath + '/idScheme',
          schemaPath: '#/properties/idScheme/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err25];
        } else {
          vErrors.push(err25);
        }
        errors++;
      }
    }
    if (data.modelNumber !== undefined) {
      if (typeof data.modelNumber !== 'string') {
        const err26 = {
          instancePath: instancePath + '/modelNumber',
          schemaPath: '#/properties/modelNumber/type',
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
    if (data.batchNumber !== undefined) {
      if (typeof data.batchNumber !== 'string') {
        const err27 = {
          instancePath: instancePath + '/batchNumber',
          schemaPath: '#/properties/batchNumber/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err27];
        } else {
          vErrors.push(err27);
        }
        errors++;
      }
    }
    if (data.itemNumber !== undefined) {
      if (typeof data.itemNumber !== 'string') {
        const err28 = {
          instancePath: instancePath + '/itemNumber',
          schemaPath: '#/properties/itemNumber/type',
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
    if (data.idGranularity !== undefined) {
      let data15 = data.idGranularity;
      if (typeof data15 !== 'string') {
        const err29 = {
          instancePath: instancePath + '/idGranularity',
          schemaPath: '#/properties/idGranularity/type',
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
      if (!(data15 === 'model' || data15 === 'batch' || data15 === 'item')) {
        const err30 = {
          instancePath: instancePath + '/idGranularity',
          schemaPath: '#/properties/idGranularity/enum',
          keyword: 'enum',
          params: { allowedValues: schema31.properties.idGranularity.enum },
          message: 'must be equal to one of the allowed values',
        };
        if (vErrors === null) {
          vErrors = [err30];
        } else {
          vErrors.push(err30);
        }
        errors++;
      }
    }
    if (data.productImage !== undefined) {
      let data16 = data.productImage;
      if (data16 && typeof data16 == 'object' && !Array.isArray(data16)) {
        if (data16.linkURL === undefined) {
          const err31 = {
            instancePath: instancePath + '/productImage',
            schemaPath: '#/$defs/Link/required',
            keyword: 'required',
            params: { missingProperty: 'linkURL' },
            message: "must have required property '" + 'linkURL' + "'",
          };
          if (vErrors === null) {
            vErrors = [err31];
          } else {
            vErrors.push(err31);
          }
          errors++;
        }
        if (data16.linkName === undefined) {
          const err32 = {
            instancePath: instancePath + '/productImage',
            schemaPath: '#/$defs/Link/required',
            keyword: 'required',
            params: { missingProperty: 'linkName' },
            message: "must have required property '" + 'linkName' + "'",
          };
          if (vErrors === null) {
            vErrors = [err32];
          } else {
            vErrors.push(err32);
          }
          errors++;
        }
        for (const key1 in data16) {
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
            const err33 = {
              instancePath: instancePath + '/productImage',
              schemaPath: '#/$defs/Link/additionalProperties',
              keyword: 'additionalProperties',
              params: { additionalProperty: key1 },
              message: 'must NOT have additional properties',
            };
            if (vErrors === null) {
              vErrors = [err33];
            } else {
              vErrors.push(err33);
            }
            errors++;
          }
        }
        if (data16.type !== undefined) {
          let data17 = data16.type;
          if (Array.isArray(data17)) {
            const _errs43 = errors;
            const len4 = data17.length;
            for (let i4 = 0; i4 < len4; i4++) {
              const _errs44 = errors;
              if ('Link' !== data17[i4]) {
                const err34 = {
                  instancePath: instancePath + '/productImage/type/' + i4,
                  schemaPath: '#/$defs/Link/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Link' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err34];
                } else {
                  vErrors.push(err34);
                }
                errors++;
              }
              var valid13 = _errs44 === errors;
              if (valid13) {
                break;
              }
            }
            if (!valid13) {
              const err35 = {
                instancePath: instancePath + '/productImage/type',
                schemaPath: '#/$defs/Link/properties/type/allOf/0/contains',
                keyword: 'contains',
                params: { minContains: 1 },
                message: 'must contain at least 1 valid item(s)',
              };
              if (vErrors === null) {
                vErrors = [err35];
              } else {
                vErrors.push(err35);
              }
              errors++;
            } else {
              errors = _errs43;
              if (vErrors !== null) {
                if (_errs43) {
                  vErrors.length = _errs43;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data17)) {
            const len5 = data17.length;
            for (let i5 = 0; i5 < len5; i5++) {
              if (typeof data17[i5] !== 'string') {
                const err36 = {
                  instancePath: instancePath + '/productImage/type/' + i5,
                  schemaPath: '#/$defs/Link/properties/type/items/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err36];
                } else {
                  vErrors.push(err36);
                }
                errors++;
              }
            }
          } else {
            const err37 = {
              instancePath: instancePath + '/productImage/type',
              schemaPath: '#/$defs/Link/properties/type/type',
              keyword: 'type',
              params: { type: 'array' },
              message: 'must be array',
            };
            if (vErrors === null) {
              vErrors = [err37];
            } else {
              vErrors.push(err37);
            }
            errors++;
          }
        }
        if (data16.linkURL !== undefined) {
          let data20 = data16.linkURL;
          if (typeof data20 === 'string') {
            if (!formats0(data20)) {
              const err38 = {
                instancePath: instancePath + '/productImage/linkURL',
                schemaPath: '#/$defs/Link/properties/linkURL/format',
                keyword: 'format',
                params: { format: 'uri' },
                message: 'must match format "' + 'uri' + '"',
              };
              if (vErrors === null) {
                vErrors = [err38];
              } else {
                vErrors.push(err38);
              }
              errors++;
            }
          } else {
            const err39 = {
              instancePath: instancePath + '/productImage/linkURL',
              schemaPath: '#/$defs/Link/properties/linkURL/type',
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
        if (data16.linkName !== undefined) {
          if (typeof data16.linkName !== 'string') {
            const err40 = {
              instancePath: instancePath + '/productImage/linkName',
              schemaPath: '#/$defs/Link/properties/linkName/type',
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
        if (data16.digestMultibase !== undefined) {
          if (typeof data16.digestMultibase !== 'string') {
            const err41 = {
              instancePath: instancePath + '/productImage/digestMultibase',
              schemaPath: '#/$defs/Link/properties/digestMultibase/type',
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
        if (data16.mediaType !== undefined) {
          if (typeof data16.mediaType !== 'string') {
            const err42 = {
              instancePath: instancePath + '/productImage/mediaType',
              schemaPath: '#/$defs/Link/properties/mediaType/type',
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
        if (data16.linkType !== undefined) {
          if (typeof data16.linkType !== 'string') {
            const err43 = {
              instancePath: instancePath + '/productImage/linkType',
              schemaPath: '#/$defs/Link/properties/linkType/type',
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
          instancePath: instancePath + '/productImage',
          schemaPath: '#/$defs/Link/type',
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
    if (data.characteristics !== undefined) {
      let data25 = data.characteristics;
      if (data25 && typeof data25 == 'object' && !Array.isArray(data25)) {
        if (data25.type !== undefined) {
          let data26 = data25.type;
          if (Array.isArray(data26)) {
            const _errs64 = errors;
            const len6 = data26.length;
            for (let i6 = 0; i6 < len6; i6++) {
              const _errs65 = errors;
              if ('Characteristics' !== data26[i6]) {
                const err45 = {
                  instancePath: instancePath + '/characteristics/type/' + i6,
                  schemaPath: '#/$defs/Characteristics/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Characteristics' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err45];
                } else {
                  vErrors.push(err45);
                }
                errors++;
              }
              var valid19 = _errs65 === errors;
              if (valid19) {
                break;
              }
            }
            if (!valid19) {
              const err46 = {
                instancePath: instancePath + '/characteristics/type',
                schemaPath: '#/$defs/Characteristics/properties/type/allOf/0/contains',
                keyword: 'contains',
                params: { minContains: 1 },
                message: 'must contain at least 1 valid item(s)',
              };
              if (vErrors === null) {
                vErrors = [err46];
              } else {
                vErrors.push(err46);
              }
              errors++;
            } else {
              errors = _errs64;
              if (vErrors !== null) {
                if (_errs64) {
                  vErrors.length = _errs64;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data26)) {
            const len7 = data26.length;
            for (let i7 = 0; i7 < len7; i7++) {
              if (typeof data26[i7] !== 'string') {
                const err47 = {
                  instancePath: instancePath + '/characteristics/type/' + i7,
                  schemaPath: '#/$defs/Characteristics/properties/type/items/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
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
              instancePath: instancePath + '/characteristics/type',
              schemaPath: '#/$defs/Characteristics/properties/type/type',
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
      } else {
        const err49 = {
          instancePath: instancePath + '/characteristics',
          schemaPath: '#/$defs/Characteristics/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err49];
        } else {
          vErrors.push(err49);
        }
        errors++;
      }
    }
    if (data.productCategory !== undefined) {
      let data29 = data.productCategory;
      if (Array.isArray(data29)) {
        const len8 = data29.length;
        for (let i8 = 0; i8 < len8; i8++) {
          let data30 = data29[i8];
          if (data30 && typeof data30 == 'object' && !Array.isArray(data30)) {
            if (data30.code === undefined) {
              const err50 = {
                instancePath: instancePath + '/productCategory/' + i8,
                schemaPath: '#/$defs/Classification/required',
                keyword: 'required',
                params: { missingProperty: 'code' },
                message: "must have required property '" + 'code' + "'",
              };
              if (vErrors === null) {
                vErrors = [err50];
              } else {
                vErrors.push(err50);
              }
              errors++;
            }
            if (data30.name === undefined) {
              const err51 = {
                instancePath: instancePath + '/productCategory/' + i8,
                schemaPath: '#/$defs/Classification/required',
                keyword: 'required',
                params: { missingProperty: 'name' },
                message: "must have required property '" + 'name' + "'",
              };
              if (vErrors === null) {
                vErrors = [err51];
              } else {
                vErrors.push(err51);
              }
              errors++;
            }
            if (data30.schemeId === undefined) {
              const err52 = {
                instancePath: instancePath + '/productCategory/' + i8,
                schemaPath: '#/$defs/Classification/required',
                keyword: 'required',
                params: { missingProperty: 'schemeId' },
                message: "must have required property '" + 'schemeId' + "'",
              };
              if (vErrors === null) {
                vErrors = [err52];
              } else {
                vErrors.push(err52);
              }
              errors++;
            }
            if (data30.schemeName === undefined) {
              const err53 = {
                instancePath: instancePath + '/productCategory/' + i8,
                schemaPath: '#/$defs/Classification/required',
                keyword: 'required',
                params: { missingProperty: 'schemeName' },
                message: "must have required property '" + 'schemeName' + "'",
              };
              if (vErrors === null) {
                vErrors = [err53];
              } else {
                vErrors.push(err53);
              }
              errors++;
            }
            for (const key2 in data30) {
              if (
                !(
                  key2 === 'type' ||
                  key2 === 'code' ||
                  key2 === 'name' ||
                  key2 === 'definition' ||
                  key2 === 'schemeId' ||
                  key2 === 'schemeName'
                )
              ) {
                const err54 = {
                  instancePath: instancePath + '/productCategory/' + i8,
                  schemaPath: '#/$defs/Classification/additionalProperties',
                  keyword: 'additionalProperties',
                  params: { additionalProperty: key2 },
                  message: 'must NOT have additional properties',
                };
                if (vErrors === null) {
                  vErrors = [err54];
                } else {
                  vErrors.push(err54);
                }
                errors++;
              }
            }
            if (data30.type !== undefined) {
              let data31 = data30.type;
              if (Array.isArray(data31)) {
                const _errs77 = errors;
                const len9 = data31.length;
                for (let i9 = 0; i9 < len9; i9++) {
                  const _errs78 = errors;
                  if ('Classification' !== data31[i9]) {
                    const err55 = {
                      instancePath: instancePath + '/productCategory/' + i8 + '/type/' + i9,
                      schemaPath: '#/$defs/Classification/properties/type/allOf/0/contains/const',
                      keyword: 'const',
                      params: { allowedValue: 'Classification' },
                      message: 'must be equal to constant',
                    };
                    if (vErrors === null) {
                      vErrors = [err55];
                    } else {
                      vErrors.push(err55);
                    }
                    errors++;
                  }
                  var valid27 = _errs78 === errors;
                  if (valid27) {
                    break;
                  }
                }
                if (!valid27) {
                  const err56 = {
                    instancePath: instancePath + '/productCategory/' + i8 + '/type',
                    schemaPath: '#/$defs/Classification/properties/type/allOf/0/contains',
                    keyword: 'contains',
                    params: { minContains: 1 },
                    message: 'must contain at least 1 valid item(s)',
                  };
                  if (vErrors === null) {
                    vErrors = [err56];
                  } else {
                    vErrors.push(err56);
                  }
                  errors++;
                } else {
                  errors = _errs77;
                  if (vErrors !== null) {
                    if (_errs77) {
                      vErrors.length = _errs77;
                    } else {
                      vErrors = null;
                    }
                  }
                }
              }
              if (Array.isArray(data31)) {
                const len10 = data31.length;
                for (let i10 = 0; i10 < len10; i10++) {
                  if (typeof data31[i10] !== 'string') {
                    const err57 = {
                      instancePath: instancePath + '/productCategory/' + i8 + '/type/' + i10,
                      schemaPath: '#/$defs/Classification/properties/type/items/type',
                      keyword: 'type',
                      params: { type: 'string' },
                      message: 'must be string',
                    };
                    if (vErrors === null) {
                      vErrors = [err57];
                    } else {
                      vErrors.push(err57);
                    }
                    errors++;
                  }
                }
              } else {
                const err58 = {
                  instancePath: instancePath + '/productCategory/' + i8 + '/type',
                  schemaPath: '#/$defs/Classification/properties/type/type',
                  keyword: 'type',
                  params: { type: 'array' },
                  message: 'must be array',
                };
                if (vErrors === null) {
                  vErrors = [err58];
                } else {
                  vErrors.push(err58);
                }
                errors++;
              }
            }
            if (data30.code !== undefined) {
              if (typeof data30.code !== 'string') {
                const err59 = {
                  instancePath: instancePath + '/productCategory/' + i8 + '/code',
                  schemaPath: '#/$defs/Classification/properties/code/type',
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
            if (data30.name !== undefined) {
              if (typeof data30.name !== 'string') {
                const err60 = {
                  instancePath: instancePath + '/productCategory/' + i8 + '/name',
                  schemaPath: '#/$defs/Classification/properties/name/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err60];
                } else {
                  vErrors.push(err60);
                }
                errors++;
              }
            }
            if (data30.definition !== undefined) {
              if (typeof data30.definition !== 'string') {
                const err61 = {
                  instancePath: instancePath + '/productCategory/' + i8 + '/definition',
                  schemaPath: '#/$defs/Classification/properties/definition/type',
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
            if (data30.schemeId !== undefined) {
              let data37 = data30.schemeId;
              if (typeof data37 === 'string') {
                if (!formats0(data37)) {
                  const err62 = {
                    instancePath: instancePath + '/productCategory/' + i8 + '/schemeId',
                    schemaPath: '#/$defs/Classification/properties/schemeId/format',
                    keyword: 'format',
                    params: { format: 'uri' },
                    message: 'must match format "' + 'uri' + '"',
                  };
                  if (vErrors === null) {
                    vErrors = [err62];
                  } else {
                    vErrors.push(err62);
                  }
                  errors++;
                }
              } else {
                const err63 = {
                  instancePath: instancePath + '/productCategory/' + i8 + '/schemeId',
                  schemaPath: '#/$defs/Classification/properties/schemeId/type',
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
            if (data30.schemeName !== undefined) {
              if (typeof data30.schemeName !== 'string') {
                const err64 = {
                  instancePath: instancePath + '/productCategory/' + i8 + '/schemeName',
                  schemaPath: '#/$defs/Classification/properties/schemeName/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err64];
                } else {
                  vErrors.push(err64);
                }
                errors++;
              }
            }
          } else {
            const err65 = {
              instancePath: instancePath + '/productCategory/' + i8,
              schemaPath: '#/$defs/Classification/type',
              keyword: 'type',
              params: { type: 'object' },
              message: 'must be object',
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
          instancePath: instancePath + '/productCategory',
          schemaPath: '#/properties/productCategory/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err66];
        } else {
          vErrors.push(err66);
        }
        errors++;
      }
    }
    if (data.relatedDocument !== undefined) {
      let data39 = data.relatedDocument;
      if (Array.isArray(data39)) {
        const len11 = data39.length;
        for (let i11 = 0; i11 < len11; i11++) {
          let data40 = data39[i11];
          if (data40 && typeof data40 == 'object' && !Array.isArray(data40)) {
            if (data40.linkURL === undefined) {
              const err67 = {
                instancePath: instancePath + '/relatedDocument/' + i11,
                schemaPath: '#/$defs/Link/required',
                keyword: 'required',
                params: { missingProperty: 'linkURL' },
                message: "must have required property '" + 'linkURL' + "'",
              };
              if (vErrors === null) {
                vErrors = [err67];
              } else {
                vErrors.push(err67);
              }
              errors++;
            }
            if (data40.linkName === undefined) {
              const err68 = {
                instancePath: instancePath + '/relatedDocument/' + i11,
                schemaPath: '#/$defs/Link/required',
                keyword: 'required',
                params: { missingProperty: 'linkName' },
                message: "must have required property '" + 'linkName' + "'",
              };
              if (vErrors === null) {
                vErrors = [err68];
              } else {
                vErrors.push(err68);
              }
              errors++;
            }
            for (const key3 in data40) {
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
                const err69 = {
                  instancePath: instancePath + '/relatedDocument/' + i11,
                  schemaPath: '#/$defs/Link/additionalProperties',
                  keyword: 'additionalProperties',
                  params: { additionalProperty: key3 },
                  message: 'must NOT have additional properties',
                };
                if (vErrors === null) {
                  vErrors = [err69];
                } else {
                  vErrors.push(err69);
                }
                errors++;
              }
            }
            if (data40.type !== undefined) {
              let data41 = data40.type;
              if (Array.isArray(data41)) {
                const _errs100 = errors;
                const len12 = data41.length;
                for (let i12 = 0; i12 < len12; i12++) {
                  const _errs101 = errors;
                  if ('Link' !== data41[i12]) {
                    const err70 = {
                      instancePath: instancePath + '/relatedDocument/' + i11 + '/type/' + i12,
                      schemaPath: '#/$defs/Link/properties/type/allOf/0/contains/const',
                      keyword: 'const',
                      params: { allowedValue: 'Link' },
                      message: 'must be equal to constant',
                    };
                    if (vErrors === null) {
                      vErrors = [err70];
                    } else {
                      vErrors.push(err70);
                    }
                    errors++;
                  }
                  var valid35 = _errs101 === errors;
                  if (valid35) {
                    break;
                  }
                }
                if (!valid35) {
                  const err71 = {
                    instancePath: instancePath + '/relatedDocument/' + i11 + '/type',
                    schemaPath: '#/$defs/Link/properties/type/allOf/0/contains',
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
                  errors = _errs100;
                  if (vErrors !== null) {
                    if (_errs100) {
                      vErrors.length = _errs100;
                    } else {
                      vErrors = null;
                    }
                  }
                }
              }
              if (Array.isArray(data41)) {
                const len13 = data41.length;
                for (let i13 = 0; i13 < len13; i13++) {
                  if (typeof data41[i13] !== 'string') {
                    const err72 = {
                      instancePath: instancePath + '/relatedDocument/' + i11 + '/type/' + i13,
                      schemaPath: '#/$defs/Link/properties/type/items/type',
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
                  instancePath: instancePath + '/relatedDocument/' + i11 + '/type',
                  schemaPath: '#/$defs/Link/properties/type/type',
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
            if (data40.linkURL !== undefined) {
              let data44 = data40.linkURL;
              if (typeof data44 === 'string') {
                if (!formats0(data44)) {
                  const err74 = {
                    instancePath: instancePath + '/relatedDocument/' + i11 + '/linkURL',
                    schemaPath: '#/$defs/Link/properties/linkURL/format',
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
                  instancePath: instancePath + '/relatedDocument/' + i11 + '/linkURL',
                  schemaPath: '#/$defs/Link/properties/linkURL/type',
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
            if (data40.linkName !== undefined) {
              if (typeof data40.linkName !== 'string') {
                const err76 = {
                  instancePath: instancePath + '/relatedDocument/' + i11 + '/linkName',
                  schemaPath: '#/$defs/Link/properties/linkName/type',
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
            if (data40.digestMultibase !== undefined) {
              if (typeof data40.digestMultibase !== 'string') {
                const err77 = {
                  instancePath: instancePath + '/relatedDocument/' + i11 + '/digestMultibase',
                  schemaPath: '#/$defs/Link/properties/digestMultibase/type',
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
            if (data40.mediaType !== undefined) {
              if (typeof data40.mediaType !== 'string') {
                const err78 = {
                  instancePath: instancePath + '/relatedDocument/' + i11 + '/mediaType',
                  schemaPath: '#/$defs/Link/properties/mediaType/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err78];
                } else {
                  vErrors.push(err78);
                }
                errors++;
              }
            }
            if (data40.linkType !== undefined) {
              if (typeof data40.linkType !== 'string') {
                const err79 = {
                  instancePath: instancePath + '/relatedDocument/' + i11 + '/linkType',
                  schemaPath: '#/$defs/Link/properties/linkType/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err79];
                } else {
                  vErrors.push(err79);
                }
                errors++;
              }
            }
          } else {
            const err80 = {
              instancePath: instancePath + '/relatedDocument/' + i11,
              schemaPath: '#/$defs/Link/type',
              keyword: 'type',
              params: { type: 'object' },
              message: 'must be object',
            };
            if (vErrors === null) {
              vErrors = [err80];
            } else {
              vErrors.push(err80);
            }
            errors++;
          }
        }
      } else {
        const err81 = {
          instancePath: instancePath + '/relatedDocument',
          schemaPath: '#/properties/relatedDocument/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err81];
        } else {
          vErrors.push(err81);
        }
        errors++;
      }
    }
    if (data.relatedParty !== undefined) {
      let data49 = data.relatedParty;
      if (Array.isArray(data49)) {
        const len14 = data49.length;
        for (let i14 = 0; i14 < len14; i14++) {
          if (
            !validate21(data49[i14], {
              instancePath: instancePath + '/relatedParty/' + i14,
              parentData: data49,
              parentDataProperty: i14,
              rootData,
              dynamicAnchors,
            })
          ) {
            vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err82 = {
          instancePath: instancePath + '/relatedParty',
          schemaPath: '#/properties/relatedParty/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err82];
        } else {
          vErrors.push(err82);
        }
        errors++;
      }
    }
    if (data.producedAtFacility !== undefined) {
      let data51 = data.producedAtFacility;
      if (data51 && typeof data51 == 'object' && !Array.isArray(data51)) {
        if (data51.id === undefined) {
          const err83 = {
            instancePath: instancePath + '/producedAtFacility',
            schemaPath: '#/properties/producedAtFacility/required',
            keyword: 'required',
            params: { missingProperty: 'id' },
            message: "must have required property '" + 'id' + "'",
          };
          if (vErrors === null) {
            vErrors = [err83];
          } else {
            vErrors.push(err83);
          }
          errors++;
        }
        if (data51.name === undefined) {
          const err84 = {
            instancePath: instancePath + '/producedAtFacility',
            schemaPath: '#/properties/producedAtFacility/required',
            keyword: 'required',
            params: { missingProperty: 'name' },
            message: "must have required property '" + 'name' + "'",
          };
          if (vErrors === null) {
            vErrors = [err84];
          } else {
            vErrors.push(err84);
          }
          errors++;
        }
        if (data51.type !== undefined) {
          let data52 = data51.type;
          if (Array.isArray(data52)) {
            const _errs122 = errors;
            const len15 = data52.length;
            for (let i15 = 0; i15 < len15; i15++) {
              const _errs123 = errors;
              if ('Facility' !== data52[i15]) {
                const err85 = {
                  instancePath: instancePath + '/producedAtFacility/type/' + i15,
                  schemaPath:
                    '#/properties/producedAtFacility/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Facility' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err85];
                } else {
                  vErrors.push(err85);
                }
                errors++;
              }
              var valid42 = _errs123 === errors;
              if (valid42) {
                break;
              }
            }
            if (!valid42) {
              const err86 = {
                instancePath: instancePath + '/producedAtFacility/type',
                schemaPath: '#/properties/producedAtFacility/properties/type/allOf/0/contains',
                keyword: 'contains',
                params: { minContains: 1 },
                message: 'must contain at least 1 valid item(s)',
              };
              if (vErrors === null) {
                vErrors = [err86];
              } else {
                vErrors.push(err86);
              }
              errors++;
            } else {
              errors = _errs122;
              if (vErrors !== null) {
                if (_errs122) {
                  vErrors.length = _errs122;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data52)) {
            const len16 = data52.length;
            for (let i16 = 0; i16 < len16; i16++) {
              if (typeof data52[i16] !== 'string') {
                const err87 = {
                  instancePath: instancePath + '/producedAtFacility/type/' + i16,
                  schemaPath: '#/properties/producedAtFacility/properties/type/items/type',
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
          } else {
            const err88 = {
              instancePath: instancePath + '/producedAtFacility/type',
              schemaPath: '#/properties/producedAtFacility/properties/type/type',
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
        if (data51.id !== undefined) {
          let data55 = data51.id;
          if (typeof data55 === 'string') {
            if (!formats0(data55)) {
              const err89 = {
                instancePath: instancePath + '/producedAtFacility/id',
                schemaPath: '#/properties/producedAtFacility/properties/id/format',
                keyword: 'format',
                params: { format: 'uri' },
                message: 'must match format "' + 'uri' + '"',
              };
              if (vErrors === null) {
                vErrors = [err89];
              } else {
                vErrors.push(err89);
              }
              errors++;
            }
          } else {
            const err90 = {
              instancePath: instancePath + '/producedAtFacility/id',
              schemaPath: '#/properties/producedAtFacility/properties/id/type',
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
        if (data51.name !== undefined) {
          if (typeof data51.name !== 'string') {
            const err91 = {
              instancePath: instancePath + '/producedAtFacility/name',
              schemaPath: '#/properties/producedAtFacility/properties/name/type',
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
        if (data51.registeredId !== undefined) {
          if (typeof data51.registeredId !== 'string') {
            const err92 = {
              instancePath: instancePath + '/producedAtFacility/registeredId',
              schemaPath: '#/properties/producedAtFacility/properties/registeredId/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err92];
            } else {
              vErrors.push(err92);
            }
            errors++;
          }
        }
      } else {
        const err93 = {
          instancePath: instancePath + '/producedAtFacility',
          schemaPath: '#/properties/producedAtFacility/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err93];
        } else {
          vErrors.push(err93);
        }
        errors++;
      }
    }
    if (data.productionDate !== undefined) {
      let data58 = data.productionDate;
      if (typeof data58 === 'string') {
        if (!formats22.validate(data58)) {
          const err94 = {
            instancePath: instancePath + '/productionDate',
            schemaPath: '#/properties/productionDate/format',
            keyword: 'format',
            params: { format: 'date' },
            message: 'must match format "' + 'date' + '"',
          };
          if (vErrors === null) {
            vErrors = [err94];
          } else {
            vErrors.push(err94);
          }
          errors++;
        }
      } else {
        const err95 = {
          instancePath: instancePath + '/productionDate',
          schemaPath: '#/properties/productionDate/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        };
        if (vErrors === null) {
          vErrors = [err95];
        } else {
          vErrors.push(err95);
        }
        errors++;
      }
    }
    if (data.countryOfProduction !== undefined) {
      let data59 = data.countryOfProduction;
      if (data59 && typeof data59 == 'object' && !Array.isArray(data59)) {
        if (data59.countryCode === undefined) {
          const err96 = {
            instancePath: instancePath + '/countryOfProduction',
            schemaPath: '#/$defs/Country/required',
            keyword: 'required',
            params: { missingProperty: 'countryCode' },
            message: "must have required property '" + 'countryCode' + "'",
          };
          if (vErrors === null) {
            vErrors = [err96];
          } else {
            vErrors.push(err96);
          }
          errors++;
        }
        for (const key4 in data59) {
          if (!(key4 === 'type' || key4 === 'countryCode' || key4 === 'countryName')) {
            const err97 = {
              instancePath: instancePath + '/countryOfProduction',
              schemaPath: '#/$defs/Country/additionalProperties',
              keyword: 'additionalProperties',
              params: { additionalProperty: key4 },
              message: 'must NOT have additional properties',
            };
            if (vErrors === null) {
              vErrors = [err97];
            } else {
              vErrors.push(err97);
            }
            errors++;
          }
        }
        if (data59.type !== undefined) {
          let data60 = data59.type;
          if (Array.isArray(data60)) {
            const _errs141 = errors;
            const len17 = data60.length;
            for (let i17 = 0; i17 < len17; i17++) {
              const _errs142 = errors;
              if ('Country' !== data60[i17]) {
                const err98 = {
                  instancePath: instancePath + '/countryOfProduction/type/' + i17,
                  schemaPath: '#/$defs/Country/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Country' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err98];
                } else {
                  vErrors.push(err98);
                }
                errors++;
              }
              var valid48 = _errs142 === errors;
              if (valid48) {
                break;
              }
            }
            if (!valid48) {
              const err99 = {
                instancePath: instancePath + '/countryOfProduction/type',
                schemaPath: '#/$defs/Country/properties/type/allOf/0/contains',
                keyword: 'contains',
                params: { minContains: 1 },
                message: 'must contain at least 1 valid item(s)',
              };
              if (vErrors === null) {
                vErrors = [err99];
              } else {
                vErrors.push(err99);
              }
              errors++;
            } else {
              errors = _errs141;
              if (vErrors !== null) {
                if (_errs141) {
                  vErrors.length = _errs141;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data60)) {
            const len18 = data60.length;
            for (let i18 = 0; i18 < len18; i18++) {
              if (typeof data60[i18] !== 'string') {
                const err100 = {
                  instancePath: instancePath + '/countryOfProduction/type/' + i18,
                  schemaPath: '#/$defs/Country/properties/type/items/type',
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
              instancePath: instancePath + '/countryOfProduction/type',
              schemaPath: '#/$defs/Country/properties/type/type',
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
        if (data59.countryCode !== undefined) {
          if (typeof data59.countryCode !== 'string') {
            const err102 = {
              instancePath: instancePath + '/countryOfProduction/countryCode',
              schemaPath: '#/$defs/Country/properties/countryCode/type',
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
        if (data59.countryName !== undefined) {
          if (typeof data59.countryName !== 'string') {
            const err103 = {
              instancePath: instancePath + '/countryOfProduction/countryName',
              schemaPath: '#/$defs/Country/properties/countryName/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err103];
            } else {
              vErrors.push(err103);
            }
            errors++;
          }
        }
      } else {
        const err104 = {
          instancePath: instancePath + '/countryOfProduction',
          schemaPath: '#/$defs/Country/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err104];
        } else {
          vErrors.push(err104);
        }
        errors++;
      }
    }
    if (data.dimensions !== undefined) {
      if (
        !validate27(data.dimensions, {
          instancePath: instancePath + '/dimensions',
          parentData: data,
          parentDataProperty: 'dimensions',
          rootData,
          dynamicAnchors,
        })
      ) {
        vErrors = vErrors === null ? validate27.errors : vErrors.concat(validate27.errors);
        errors = vErrors.length;
      }
    }
    if (data.materialProvenance !== undefined) {
      let data66 = data.materialProvenance;
      if (Array.isArray(data66)) {
        const len19 = data66.length;
        for (let i19 = 0; i19 < len19; i19++) {
          if (
            !validate29(data66[i19], {
              instancePath: instancePath + '/materialProvenance/' + i19,
              parentData: data66,
              parentDataProperty: i19,
              rootData,
              dynamicAnchors,
            })
          ) {
            vErrors = vErrors === null ? validate29.errors : vErrors.concat(validate29.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err105 = {
          instancePath: instancePath + '/materialProvenance',
          schemaPath: '#/properties/materialProvenance/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err105];
        } else {
          vErrors.push(err105);
        }
        errors++;
      }
    }
    if (data.packaging !== undefined) {
      if (
        !validate31(data.packaging, {
          instancePath: instancePath + '/packaging',
          parentData: data,
          parentDataProperty: 'packaging',
          rootData,
          dynamicAnchors,
        })
      ) {
        vErrors = vErrors === null ? validate31.errors : vErrors.concat(validate31.errors);
        errors = vErrors.length;
      }
    }
    if (data.productLabel !== undefined) {
      let data69 = data.productLabel;
      if (Array.isArray(data69)) {
        const len20 = data69.length;
        for (let i20 = 0; i20 < len20; i20++) {
          let data70 = data69[i20];
          if (data70 && typeof data70 == 'object' && !Array.isArray(data70)) {
            if (data70.name === undefined) {
              const err106 = {
                instancePath: instancePath + '/productLabel/' + i20,
                schemaPath: '#/$defs/Image/required',
                keyword: 'required',
                params: { missingProperty: 'name' },
                message: "must have required property '" + 'name' + "'",
              };
              if (vErrors === null) {
                vErrors = [err106];
              } else {
                vErrors.push(err106);
              }
              errors++;
            }
            if (data70.imageData === undefined) {
              const err107 = {
                instancePath: instancePath + '/productLabel/' + i20,
                schemaPath: '#/$defs/Image/required',
                keyword: 'required',
                params: { missingProperty: 'imageData' },
                message: "must have required property '" + 'imageData' + "'",
              };
              if (vErrors === null) {
                vErrors = [err107];
              } else {
                vErrors.push(err107);
              }
              errors++;
            }
            if (data70.mediaType === undefined) {
              const err108 = {
                instancePath: instancePath + '/productLabel/' + i20,
                schemaPath: '#/$defs/Image/required',
                keyword: 'required',
                params: { missingProperty: 'mediaType' },
                message: "must have required property '" + 'mediaType' + "'",
              };
              if (vErrors === null) {
                vErrors = [err108];
              } else {
                vErrors.push(err108);
              }
              errors++;
            }
            for (const key5 in data70) {
              if (
                !(
                  key5 === 'type' ||
                  key5 === 'name' ||
                  key5 === 'description' ||
                  key5 === 'imageData' ||
                  key5 === 'mediaType'
                )
              ) {
                const err109 = {
                  instancePath: instancePath + '/productLabel/' + i20,
                  schemaPath: '#/$defs/Image/additionalProperties',
                  keyword: 'additionalProperties',
                  params: { additionalProperty: key5 },
                  message: 'must NOT have additional properties',
                };
                if (vErrors === null) {
                  vErrors = [err109];
                } else {
                  vErrors.push(err109);
                }
                errors++;
              }
            }
            if (data70.type !== undefined) {
              let data71 = data70.type;
              if (Array.isArray(data71)) {
                const _errs163 = errors;
                const len21 = data71.length;
                for (let i21 = 0; i21 < len21; i21++) {
                  const _errs164 = errors;
                  if ('Image' !== data71[i21]) {
                    const err110 = {
                      instancePath: instancePath + '/productLabel/' + i20 + '/type/' + i21,
                      schemaPath: '#/$defs/Image/properties/type/allOf/0/contains/const',
                      keyword: 'const',
                      params: { allowedValue: 'Image' },
                      message: 'must be equal to constant',
                    };
                    if (vErrors === null) {
                      vErrors = [err110];
                    } else {
                      vErrors.push(err110);
                    }
                    errors++;
                  }
                  var valid58 = _errs164 === errors;
                  if (valid58) {
                    break;
                  }
                }
                if (!valid58) {
                  const err111 = {
                    instancePath: instancePath + '/productLabel/' + i20 + '/type',
                    schemaPath: '#/$defs/Image/properties/type/allOf/0/contains',
                    keyword: 'contains',
                    params: { minContains: 1 },
                    message: 'must contain at least 1 valid item(s)',
                  };
                  if (vErrors === null) {
                    vErrors = [err111];
                  } else {
                    vErrors.push(err111);
                  }
                  errors++;
                } else {
                  errors = _errs163;
                  if (vErrors !== null) {
                    if (_errs163) {
                      vErrors.length = _errs163;
                    } else {
                      vErrors = null;
                    }
                  }
                }
              }
              if (Array.isArray(data71)) {
                const len22 = data71.length;
                for (let i22 = 0; i22 < len22; i22++) {
                  if (typeof data71[i22] !== 'string') {
                    const err112 = {
                      instancePath: instancePath + '/productLabel/' + i20 + '/type/' + i22,
                      schemaPath: '#/$defs/Image/properties/type/items/type',
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
              } else {
                const err113 = {
                  instancePath: instancePath + '/productLabel/' + i20 + '/type',
                  schemaPath: '#/$defs/Image/properties/type/type',
                  keyword: 'type',
                  params: { type: 'array' },
                  message: 'must be array',
                };
                if (vErrors === null) {
                  vErrors = [err113];
                } else {
                  vErrors.push(err113);
                }
                errors++;
              }
            }
            if (data70.name !== undefined) {
              if (typeof data70.name !== 'string') {
                const err114 = {
                  instancePath: instancePath + '/productLabel/' + i20 + '/name',
                  schemaPath: '#/$defs/Image/properties/name/type',
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
            if (data70.description !== undefined) {
              if (typeof data70.description !== 'string') {
                const err115 = {
                  instancePath: instancePath + '/productLabel/' + i20 + '/description',
                  schemaPath: '#/$defs/Image/properties/description/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err115];
                } else {
                  vErrors.push(err115);
                }
                errors++;
              }
            }
            if (data70.imageData !== undefined) {
              let data76 = data70.imageData;
              if (typeof data76 === 'string') {
                if (!formats26(data76)) {
                  const err116 = {
                    instancePath: instancePath + '/productLabel/' + i20 + '/imageData',
                    schemaPath: '#/$defs/Image/properties/imageData/format',
                    keyword: 'format',
                    params: { format: 'byte' },
                    message: 'must match format "' + 'byte' + '"',
                  };
                  if (vErrors === null) {
                    vErrors = [err116];
                  } else {
                    vErrors.push(err116);
                  }
                  errors++;
                }
              } else {
                const err117 = {
                  instancePath: instancePath + '/productLabel/' + i20 + '/imageData',
                  schemaPath: '#/$defs/Image/properties/imageData/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err117];
                } else {
                  vErrors.push(err117);
                }
                errors++;
              }
            }
            if (data70.mediaType !== undefined) {
              if (typeof data70.mediaType !== 'string') {
                const err118 = {
                  instancePath: instancePath + '/productLabel/' + i20 + '/mediaType',
                  schemaPath: '#/$defs/Image/properties/mediaType/type',
                  keyword: 'type',
                  params: { type: 'string' },
                  message: 'must be string',
                };
                if (vErrors === null) {
                  vErrors = [err118];
                } else {
                  vErrors.push(err118);
                }
                errors++;
              }
            }
          } else {
            const err119 = {
              instancePath: instancePath + '/productLabel/' + i20,
              schemaPath: '#/$defs/Image/type',
              keyword: 'type',
              params: { type: 'object' },
              message: 'must be object',
            };
            if (vErrors === null) {
              vErrors = [err119];
            } else {
              vErrors.push(err119);
            }
            errors++;
          }
        }
      } else {
        const err120 = {
          instancePath: instancePath + '/productLabel',
          schemaPath: '#/properties/productLabel/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err120];
        } else {
          vErrors.push(err120);
        }
        errors++;
      }
    }
    if (data.performanceClaim !== undefined) {
      let data78 = data.performanceClaim;
      if (Array.isArray(data78)) {
        const len23 = data78.length;
        for (let i23 = 0; i23 < len23; i23++) {
          if (
            !validate34(data78[i23], {
              instancePath: instancePath + '/performanceClaim/' + i23,
              parentData: data78,
              parentDataProperty: i23,
              rootData,
              dynamicAnchors,
            })
          ) {
            vErrors = vErrors === null ? validate34.errors : vErrors.concat(validate34.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err121 = {
          instancePath: instancePath + '/performanceClaim',
          schemaPath: '#/properties/performanceClaim/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err121];
        } else {
          vErrors.push(err121);
        }
        errors++;
      }
    }
  } else {
    const err122 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: { type: 'object' },
      message: 'must be object',
    };
    if (vErrors === null) {
      vErrors = [err122];
    } else {
      vErrors.push(err122);
    }
    errors++;
  }
  validate20.errors = vErrors;
  return errors === 0;
}
validate20.evaluated = { props: true, dynamicProps: false, dynamicItems: false };
