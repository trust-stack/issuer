// @ts-nocheck
import { fullFormats } from 'ajv-formats/dist/formats.js';
export const validate = validate20;
export default validate20;
const schema31 = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  additionalProperties: true,
  properties: {
    type: {
      type: 'array',
      readOnly: true,
      default: ['MakeEvent', 'LifecycleEvent'],
      items: { type: 'string' },
      allOf: [
        { contains: { const: 'MakeEvent', minContains: 1 } },
        { contains: { const: 'LifecycleEvent', minContains: 1 } },
      ],
    },
    id: {
      type: 'string',
      format: 'uri',
      description: 'Globally unique ID for this lifecycle event. Should be a URI. Can be a UUID.',
    },
    name: {
      example: 'battery manufacturing',
      type: 'string',
      description: 'The name for this lifecycle event ',
    },
    description: { type: 'string', description: 'The description of this lifecycle event.' },
    eventDate: {
      type: 'string',
      format: 'date-time',
      description:
        'The date and time at which this lifecycle event occurs. use 00:00 for time if only a date is required.',
    },
    sensorData: {
      type: 'array',
      items: { $ref: '#/$defs/SensorData' },
      description: 'A sensor data set associated with this lifecycle event.',
    },
    relatedDocument: {
      type: 'array',
      items: { $ref: '#/$defs/Link' },
      description: 'A list of links to documentary evidence that supports this event. ',
    },
    activityType: {
      $ref: '#/$defs/Classification',
      description:
        'The business activity that this event represents (eg shipping, repair, etc) using a standard classification scheme - eg https://ref.gs1.org/cbv/BizStep. This may be replaced with industry specific vocabularies (ginning, spinning, weaving, dyeing, etc in textiles)',
    },
    relatedParty: {
      type: 'array',
      items: { $ref: '#/$defs/PartyRole' },
      description:
        'Any related parties and their roles involved in this event (eg the carrier for a shipment event)',
    },
    inputProduct: {
      type: 'array',
      items: { $ref: '#/$defs/EventProduct' },
      description:
        'An array of input products and quantities for this production or manufacturing process',
    },
    outputProduct: {
      type: 'array',
      items: { $ref: '#/$defs/EventProduct' },
      description:
        'An array of output products and quantities for this produciton or manufacturing process',
    },
    madeAtFacility: {
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
      },
      required: ['id', 'name'],
      description: 'The facility at which this production / manufacturing event happens.',
    },
  },
  description:
    'Transformation (manufacture/  production) of input products to output products at a given facility.',
  required: [
    'id',
    'name',
    'eventDate',
    'activityType',
    'inputProduct',
    'outputProduct',
    'madeAtFacility',
  ],
  $defs: {
    SensorData: {
      type: 'object',
      additionalProperties: false,
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['SensorData'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'SensorData', minContains: 1 } }],
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
          description: 'The type of measurement recorded in this sensor data event.',
        },
        measure: {
          type: 'array',
          items: { $ref: '#/$defs/Measure' },
          description: 'The value measured by this sensor measurement event.',
        },
        rawData: {
          type: 'array',
          items: { $ref: '#/$defs/Link' },
          description: 'Link to raw data file associated with this sensor reading (eg an image).',
        },
        sensor: {
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
          },
          required: ['id', 'name'],
          description: 'The sensor device used for this sensor measurement',
        },
        geoLocation: {
          $ref: '#/$defs/Coordinate',
          description: 'The geolocation of this sensor data recording event.',
        },
      },
      description: 'A sensor data recording associated with this event',
      required: ['metric', 'measure'],
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
    Coordinate: {
      type: 'object',
      additionalProperties: false,
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['Coordinate'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'Coordinate', minContains: 1 } }],
        },
        latitude: {
          maximum: 90,
          minimum: -90,
          example: -33.87,
          type: 'number',
          description:
            'latitude: Angular distance north or south of the equator, expressed in decimal degrees.Valid range: −90.0 to +90.0.',
        },
        longitude: {
          maximum: 180,
          minimum: -180,
          example: -151.21,
          type: 'number',
          description:
            'longitude: Angular distance east or west of the Prime Meridian, expressed in decimal degrees.Valid range: −180.0 to +180.0.',
        },
      },
      description:
        'A geographic point defined by latitude and longitude using the WGS84 geodetic coordinate reference system (EPSG:4326). Latitude and longitude are expressed in decimal degrees as floating-point numbers. Coordinates follow the conventional order (latitude, longitude) and represent a point on the Earth’s surface.',
      required: ['latitude', 'longitude'],
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
    EventProduct: {
      type: 'object',
      additionalProperties: false,
      properties: {
        type: {
          type: 'array',
          readOnly: true,
          default: ['EventProduct'],
          items: { type: 'string' },
          allOf: [{ contains: { const: 'EventProduct', minContains: 1 } }],
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
            idGranularity: {
              type: 'string',
              enum: ['model', 'batch', 'item'],
              example: 'model',
              description: 'The identification granularity for this product (item, batch, model)',
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
          required: ['id', 'name', 'idGranularity'],
          description: 'The product item / model / batch subject to this lifecycle event.',
        },
        quantity: {
          $ref: '#/$defs/Measure',
          description:
            'The quantity of product subject to this lifecycle event.  Not needed for serialised items.',
        },
        disposition: {
          type: 'string',
          enum: ['new', 'repaired', 'recycled', 'consumed', 'disposed'],
          example: 'new',
          description: 'The status of the product after the event has happened.',
        },
      },
      description: 'A quantity of products or materials involved in a lifecycle event.',
      required: ['product'],
    },
  },
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
const schema37 = {
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
const formats0 = fullFormats.uri;
const formats2 = fullFormats['date-time'];
const schema32 = {
  type: 'object',
  additionalProperties: false,
  properties: {
    type: {
      type: 'array',
      readOnly: true,
      default: ['SensorData'],
      items: { type: 'string' },
      allOf: [{ contains: { const: 'SensorData', minContains: 1 } }],
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
      description: 'The type of measurement recorded in this sensor data event.',
    },
    measure: {
      type: 'array',
      items: { $ref: '#/$defs/Measure' },
      description: 'The value measured by this sensor measurement event.',
    },
    rawData: {
      type: 'array',
      items: { $ref: '#/$defs/Link' },
      description: 'Link to raw data file associated with this sensor reading (eg an image).',
    },
    sensor: {
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
      },
      required: ['id', 'name'],
      description: 'The sensor device used for this sensor measurement',
    },
    geoLocation: {
      $ref: '#/$defs/Coordinate',
      description: 'The geolocation of this sensor data recording event.',
    },
  },
  description: 'A sensor data recording associated with this event',
  required: ['metric', 'measure'],
};
const schema33 = {
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
const schema35 = {
  type: 'object',
  additionalProperties: false,
  properties: {
    type: {
      type: 'array',
      readOnly: true,
      default: ['Coordinate'],
      items: { type: 'string' },
      allOf: [{ contains: { const: 'Coordinate', minContains: 1 } }],
    },
    latitude: {
      maximum: 90,
      minimum: -90,
      example: -33.87,
      type: 'number',
      description:
        'latitude: Angular distance north or south of the equator, expressed in decimal degrees.Valid range: −90.0 to +90.0.',
    },
    longitude: {
      maximum: 180,
      minimum: -180,
      example: -151.21,
      type: 'number',
      description:
        'longitude: Angular distance east or west of the Prime Meridian, expressed in decimal degrees.Valid range: −180.0 to +180.0.',
    },
  },
  description:
    'A geographic point defined by latitude and longitude using the WGS84 geodetic coordinate reference system (EPSG:4326). Latitude and longitude are expressed in decimal degrees as floating-point numbers. Coordinates follow the conventional order (latitude, longitude) and represent a point on the Earth’s surface.',
  required: ['latitude', 'longitude'],
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
    if (data.metric === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'metric' },
        message: "must have required property '" + 'metric' + "'",
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    if (data.measure === undefined) {
      const err1 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'measure' },
        message: "must have required property '" + 'measure' + "'",
      };
      if (vErrors === null) {
        vErrors = [err1];
      } else {
        vErrors.push(err1);
      }
      errors++;
    }
    for (const key0 in data) {
      if (
        !(
          key0 === 'type' ||
          key0 === 'metric' ||
          key0 === 'measure' ||
          key0 === 'rawData' ||
          key0 === 'sensor' ||
          key0 === 'geoLocation'
        )
      ) {
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
          if ('SensorData' !== data0[i0]) {
            const err3 = {
              instancePath: instancePath + '/type/' + i0,
              schemaPath: '#/properties/type/allOf/0/contains/const',
              keyword: 'const',
              params: { allowedValue: 'SensorData' },
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
    if (data.metric !== undefined) {
      let data3 = data.metric;
      if (data3 && typeof data3 == 'object' && !Array.isArray(data3)) {
        if (data3.id === undefined) {
          const err7 = {
            instancePath: instancePath + '/metric',
            schemaPath: '#/properties/metric/required',
            keyword: 'required',
            params: { missingProperty: 'id' },
            message: "must have required property '" + 'id' + "'",
          };
          if (vErrors === null) {
            vErrors = [err7];
          } else {
            vErrors.push(err7);
          }
          errors++;
        }
        if (data3.name === undefined) {
          const err8 = {
            instancePath: instancePath + '/metric',
            schemaPath: '#/properties/metric/required',
            keyword: 'required',
            params: { missingProperty: 'name' },
            message: "must have required property '" + 'name' + "'",
          };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
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
                const err9 = {
                  instancePath: instancePath + '/metric/type/' + i2,
                  schemaPath: '#/properties/metric/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'PerformanceMetric' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err9];
                } else {
                  vErrors.push(err9);
                }
                errors++;
              }
              var valid7 = _errs15 === errors;
              if (valid7) {
                break;
              }
            }
            if (!valid7) {
              const err10 = {
                instancePath: instancePath + '/metric/type',
                schemaPath: '#/properties/metric/properties/type/allOf/0/contains',
                keyword: 'contains',
                params: { minContains: 1 },
                message: 'must contain at least 1 valid item(s)',
              };
              if (vErrors === null) {
                vErrors = [err10];
              } else {
                vErrors.push(err10);
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
                const err11 = {
                  instancePath: instancePath + '/metric/type/' + i3,
                  schemaPath: '#/properties/metric/properties/type/items/type',
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
          } else {
            const err12 = {
              instancePath: instancePath + '/metric/type',
              schemaPath: '#/properties/metric/properties/type/type',
              keyword: 'type',
              params: { type: 'array' },
              message: 'must be array',
            };
            if (vErrors === null) {
              vErrors = [err12];
            } else {
              vErrors.push(err12);
            }
            errors++;
          }
        }
        if (data3.id !== undefined) {
          let data7 = data3.id;
          if (typeof data7 === 'string') {
            if (!formats0(data7)) {
              const err13 = {
                instancePath: instancePath + '/metric/id',
                schemaPath: '#/properties/metric/properties/id/format',
                keyword: 'format',
                params: { format: 'uri' },
                message: 'must match format "' + 'uri' + '"',
              };
              if (vErrors === null) {
                vErrors = [err13];
              } else {
                vErrors.push(err13);
              }
              errors++;
            }
          } else {
            const err14 = {
              instancePath: instancePath + '/metric/id',
              schemaPath: '#/properties/metric/properties/id/type',
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
        if (data3.name !== undefined) {
          if (typeof data3.name !== 'string') {
            const err15 = {
              instancePath: instancePath + '/metric/name',
              schemaPath: '#/properties/metric/properties/name/type',
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
          instancePath: instancePath + '/metric',
          schemaPath: '#/properties/metric/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err16];
        } else {
          vErrors.push(err16);
        }
        errors++;
      }
    }
    if (data.measure !== undefined) {
      let data9 = data.measure;
      if (Array.isArray(data9)) {
        const len4 = data9.length;
        for (let i4 = 0; i4 < len4; i4++) {
          let data10 = data9[i4];
          if (data10 && typeof data10 == 'object' && !Array.isArray(data10)) {
            if (data10.value === undefined) {
              const err17 = {
                instancePath: instancePath + '/measure/' + i4,
                schemaPath: '#/$defs/Measure/required',
                keyword: 'required',
                params: { missingProperty: 'value' },
                message: "must have required property '" + 'value' + "'",
              };
              if (vErrors === null) {
                vErrors = [err17];
              } else {
                vErrors.push(err17);
              }
              errors++;
            }
            if (data10.unit === undefined) {
              const err18 = {
                instancePath: instancePath + '/measure/' + i4,
                schemaPath: '#/$defs/Measure/required',
                keyword: 'required',
                params: { missingProperty: 'unit' },
                message: "must have required property '" + 'unit' + "'",
              };
              if (vErrors === null) {
                vErrors = [err18];
              } else {
                vErrors.push(err18);
              }
              errors++;
            }
            for (const key1 in data10) {
              if (
                !(
                  key1 === 'type' ||
                  key1 === 'value' ||
                  key1 === 'upperTolerance' ||
                  key1 === 'lowerTolerance' ||
                  key1 === 'unit'
                )
              ) {
                const err19 = {
                  instancePath: instancePath + '/measure/' + i4,
                  schemaPath: '#/$defs/Measure/additionalProperties',
                  keyword: 'additionalProperties',
                  params: { additionalProperty: key1 },
                  message: 'must NOT have additional properties',
                };
                if (vErrors === null) {
                  vErrors = [err19];
                } else {
                  vErrors.push(err19);
                }
                errors++;
              }
            }
            if (data10.type !== undefined) {
              let data11 = data10.type;
              if (Array.isArray(data11)) {
                const _errs31 = errors;
                const len5 = data11.length;
                for (let i5 = 0; i5 < len5; i5++) {
                  const _errs32 = errors;
                  if ('Measure' !== data11[i5]) {
                    const err20 = {
                      instancePath: instancePath + '/measure/' + i4 + '/type/' + i5,
                      schemaPath: '#/$defs/Measure/properties/type/allOf/0/contains/const',
                      keyword: 'const',
                      params: { allowedValue: 'Measure' },
                      message: 'must be equal to constant',
                    };
                    if (vErrors === null) {
                      vErrors = [err20];
                    } else {
                      vErrors.push(err20);
                    }
                    errors++;
                  }
                  var valid15 = _errs32 === errors;
                  if (valid15) {
                    break;
                  }
                }
                if (!valid15) {
                  const err21 = {
                    instancePath: instancePath + '/measure/' + i4 + '/type',
                    schemaPath: '#/$defs/Measure/properties/type/allOf/0/contains',
                    keyword: 'contains',
                    params: { minContains: 1 },
                    message: 'must contain at least 1 valid item(s)',
                  };
                  if (vErrors === null) {
                    vErrors = [err21];
                  } else {
                    vErrors.push(err21);
                  }
                  errors++;
                } else {
                  errors = _errs31;
                  if (vErrors !== null) {
                    if (_errs31) {
                      vErrors.length = _errs31;
                    } else {
                      vErrors = null;
                    }
                  }
                }
              }
              if (Array.isArray(data11)) {
                const len6 = data11.length;
                for (let i6 = 0; i6 < len6; i6++) {
                  if (typeof data11[i6] !== 'string') {
                    const err22 = {
                      instancePath: instancePath + '/measure/' + i4 + '/type/' + i6,
                      schemaPath: '#/$defs/Measure/properties/type/items/type',
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
                  instancePath: instancePath + '/measure/' + i4 + '/type',
                  schemaPath: '#/$defs/Measure/properties/type/type',
                  keyword: 'type',
                  params: { type: 'array' },
                  message: 'must be array',
                };
                if (vErrors === null) {
                  vErrors = [err23];
                } else {
                  vErrors.push(err23);
                }
                errors++;
              }
            }
            if (data10.value !== undefined) {
              if (!(typeof data10.value == 'number')) {
                const err24 = {
                  instancePath: instancePath + '/measure/' + i4 + '/value',
                  schemaPath: '#/$defs/Measure/properties/value/type',
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
            if (data10.upperTolerance !== undefined) {
              if (!(typeof data10.upperTolerance == 'number')) {
                const err25 = {
                  instancePath: instancePath + '/measure/' + i4 + '/upperTolerance',
                  schemaPath: '#/$defs/Measure/properties/upperTolerance/type',
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
            if (data10.lowerTolerance !== undefined) {
              if (!(typeof data10.lowerTolerance == 'number')) {
                const err26 = {
                  instancePath: instancePath + '/measure/' + i4 + '/lowerTolerance',
                  schemaPath: '#/$defs/Measure/properties/lowerTolerance/type',
                  keyword: 'type',
                  params: { type: 'number' },
                  message: 'must be number',
                };
                if (vErrors === null) {
                  vErrors = [err26];
                } else {
                  vErrors.push(err26);
                }
                errors++;
              }
            }
            if (data10.unit !== undefined) {
              if (typeof data10.unit !== 'string') {
                const err27 = {
                  instancePath: instancePath + '/measure/' + i4 + '/unit',
                  schemaPath: '#/$defs/Measure/properties/unit/type',
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
          } else {
            const err28 = {
              instancePath: instancePath + '/measure/' + i4,
              schemaPath: '#/$defs/Measure/type',
              keyword: 'type',
              params: { type: 'object' },
              message: 'must be object',
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
          instancePath: instancePath + '/measure',
          schemaPath: '#/properties/measure/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err29];
        } else {
          vErrors.push(err29);
        }
        errors++;
      }
    }
    if (data.rawData !== undefined) {
      let data18 = data.rawData;
      if (Array.isArray(data18)) {
        const len7 = data18.length;
        for (let i7 = 0; i7 < len7; i7++) {
          let data19 = data18[i7];
          if (data19 && typeof data19 == 'object' && !Array.isArray(data19)) {
            if (data19.linkURL === undefined) {
              const err30 = {
                instancePath: instancePath + '/rawData/' + i7,
                schemaPath: '#/$defs/Link/required',
                keyword: 'required',
                params: { missingProperty: 'linkURL' },
                message: "must have required property '" + 'linkURL' + "'",
              };
              if (vErrors === null) {
                vErrors = [err30];
              } else {
                vErrors.push(err30);
              }
              errors++;
            }
            if (data19.linkName === undefined) {
              const err31 = {
                instancePath: instancePath + '/rawData/' + i7,
                schemaPath: '#/$defs/Link/required',
                keyword: 'required',
                params: { missingProperty: 'linkName' },
                message: "must have required property '" + 'linkName' + "'",
              };
              if (vErrors === null) {
                vErrors = [err31];
              } else {
                vErrors.push(err31);
              }
              errors++;
            }
            for (const key2 in data19) {
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
                const err32 = {
                  instancePath: instancePath + '/rawData/' + i7,
                  schemaPath: '#/$defs/Link/additionalProperties',
                  keyword: 'additionalProperties',
                  params: { additionalProperty: key2 },
                  message: 'must NOT have additional properties',
                };
                if (vErrors === null) {
                  vErrors = [err32];
                } else {
                  vErrors.push(err32);
                }
                errors++;
              }
            }
            if (data19.type !== undefined) {
              let data20 = data19.type;
              if (Array.isArray(data20)) {
                const _errs52 = errors;
                const len8 = data20.length;
                for (let i8 = 0; i8 < len8; i8++) {
                  const _errs53 = errors;
                  if ('Link' !== data20[i8]) {
                    const err33 = {
                      instancePath: instancePath + '/rawData/' + i7 + '/type/' + i8,
                      schemaPath: '#/$defs/Link/properties/type/allOf/0/contains/const',
                      keyword: 'const',
                      params: { allowedValue: 'Link' },
                      message: 'must be equal to constant',
                    };
                    if (vErrors === null) {
                      vErrors = [err33];
                    } else {
                      vErrors.push(err33);
                    }
                    errors++;
                  }
                  var valid23 = _errs53 === errors;
                  if (valid23) {
                    break;
                  }
                }
                if (!valid23) {
                  const err34 = {
                    instancePath: instancePath + '/rawData/' + i7 + '/type',
                    schemaPath: '#/$defs/Link/properties/type/allOf/0/contains',
                    keyword: 'contains',
                    params: { minContains: 1 },
                    message: 'must contain at least 1 valid item(s)',
                  };
                  if (vErrors === null) {
                    vErrors = [err34];
                  } else {
                    vErrors.push(err34);
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
                const len9 = data20.length;
                for (let i9 = 0; i9 < len9; i9++) {
                  if (typeof data20[i9] !== 'string') {
                    const err35 = {
                      instancePath: instancePath + '/rawData/' + i7 + '/type/' + i9,
                      schemaPath: '#/$defs/Link/properties/type/items/type',
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
                  instancePath: instancePath + '/rawData/' + i7 + '/type',
                  schemaPath: '#/$defs/Link/properties/type/type',
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
            if (data19.linkURL !== undefined) {
              let data23 = data19.linkURL;
              if (typeof data23 === 'string') {
                if (!formats0(data23)) {
                  const err37 = {
                    instancePath: instancePath + '/rawData/' + i7 + '/linkURL',
                    schemaPath: '#/$defs/Link/properties/linkURL/format',
                    keyword: 'format',
                    params: { format: 'uri' },
                    message: 'must match format "' + 'uri' + '"',
                  };
                  if (vErrors === null) {
                    vErrors = [err37];
                  } else {
                    vErrors.push(err37);
                  }
                  errors++;
                }
              } else {
                const err38 = {
                  instancePath: instancePath + '/rawData/' + i7 + '/linkURL',
                  schemaPath: '#/$defs/Link/properties/linkURL/type',
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
            if (data19.linkName !== undefined) {
              if (typeof data19.linkName !== 'string') {
                const err39 = {
                  instancePath: instancePath + '/rawData/' + i7 + '/linkName',
                  schemaPath: '#/$defs/Link/properties/linkName/type',
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
            if (data19.digestMultibase !== undefined) {
              if (typeof data19.digestMultibase !== 'string') {
                const err40 = {
                  instancePath: instancePath + '/rawData/' + i7 + '/digestMultibase',
                  schemaPath: '#/$defs/Link/properties/digestMultibase/type',
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
            if (data19.mediaType !== undefined) {
              if (typeof data19.mediaType !== 'string') {
                const err41 = {
                  instancePath: instancePath + '/rawData/' + i7 + '/mediaType',
                  schemaPath: '#/$defs/Link/properties/mediaType/type',
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
            if (data19.linkType !== undefined) {
              if (typeof data19.linkType !== 'string') {
                const err42 = {
                  instancePath: instancePath + '/rawData/' + i7 + '/linkType',
                  schemaPath: '#/$defs/Link/properties/linkType/type',
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
              instancePath: instancePath + '/rawData/' + i7,
              schemaPath: '#/$defs/Link/type',
              keyword: 'type',
              params: { type: 'object' },
              message: 'must be object',
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
          instancePath: instancePath + '/rawData',
          schemaPath: '#/properties/rawData/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err44];
        } else {
          vErrors.push(err44);
        }
        errors++;
      }
    }
    if (data.sensor !== undefined) {
      let data28 = data.sensor;
      if (data28 && typeof data28 == 'object' && !Array.isArray(data28)) {
        if (data28.id === undefined) {
          const err45 = {
            instancePath: instancePath + '/sensor',
            schemaPath: '#/properties/sensor/required',
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
        if (data28.name === undefined) {
          const err46 = {
            instancePath: instancePath + '/sensor',
            schemaPath: '#/properties/sensor/required',
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
        if (data28.type !== undefined) {
          let data29 = data28.type;
          if (Array.isArray(data29)) {
            const _errs71 = errors;
            const len10 = data29.length;
            for (let i10 = 0; i10 < len10; i10++) {
              const _errs72 = errors;
              if ('Product' !== data29[i10]) {
                const err47 = {
                  instancePath: instancePath + '/sensor/type/' + i10,
                  schemaPath: '#/properties/sensor/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Product' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err47];
                } else {
                  vErrors.push(err47);
                }
                errors++;
              }
              var valid28 = _errs72 === errors;
              if (valid28) {
                break;
              }
            }
            if (!valid28) {
              const err48 = {
                instancePath: instancePath + '/sensor/type',
                schemaPath: '#/properties/sensor/properties/type/allOf/0/contains',
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
              errors = _errs71;
              if (vErrors !== null) {
                if (_errs71) {
                  vErrors.length = _errs71;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data29)) {
            const len11 = data29.length;
            for (let i11 = 0; i11 < len11; i11++) {
              if (typeof data29[i11] !== 'string') {
                const err49 = {
                  instancePath: instancePath + '/sensor/type/' + i11,
                  schemaPath: '#/properties/sensor/properties/type/items/type',
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
              instancePath: instancePath + '/sensor/type',
              schemaPath: '#/properties/sensor/properties/type/type',
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
        if (data28.id !== undefined) {
          let data32 = data28.id;
          if (typeof data32 === 'string') {
            if (!formats0(data32)) {
              const err51 = {
                instancePath: instancePath + '/sensor/id',
                schemaPath: '#/properties/sensor/properties/id/format',
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
              instancePath: instancePath + '/sensor/id',
              schemaPath: '#/properties/sensor/properties/id/type',
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
        if (data28.name !== undefined) {
          if (typeof data28.name !== 'string') {
            const err53 = {
              instancePath: instancePath + '/sensor/name',
              schemaPath: '#/properties/sensor/properties/name/type',
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
          instancePath: instancePath + '/sensor',
          schemaPath: '#/properties/sensor/type',
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
    if (data.geoLocation !== undefined) {
      let data34 = data.geoLocation;
      if (data34 && typeof data34 == 'object' && !Array.isArray(data34)) {
        if (data34.latitude === undefined) {
          const err55 = {
            instancePath: instancePath + '/geoLocation',
            schemaPath: '#/$defs/Coordinate/required',
            keyword: 'required',
            params: { missingProperty: 'latitude' },
            message: "must have required property '" + 'latitude' + "'",
          };
          if (vErrors === null) {
            vErrors = [err55];
          } else {
            vErrors.push(err55);
          }
          errors++;
        }
        if (data34.longitude === undefined) {
          const err56 = {
            instancePath: instancePath + '/geoLocation',
            schemaPath: '#/$defs/Coordinate/required',
            keyword: 'required',
            params: { missingProperty: 'longitude' },
            message: "must have required property '" + 'longitude' + "'",
          };
          if (vErrors === null) {
            vErrors = [err56];
          } else {
            vErrors.push(err56);
          }
          errors++;
        }
        for (const key3 in data34) {
          if (!(key3 === 'type' || key3 === 'latitude' || key3 === 'longitude')) {
            const err57 = {
              instancePath: instancePath + '/geoLocation',
              schemaPath: '#/$defs/Coordinate/additionalProperties',
              keyword: 'additionalProperties',
              params: { additionalProperty: key3 },
              message: 'must NOT have additional properties',
            };
            if (vErrors === null) {
              vErrors = [err57];
            } else {
              vErrors.push(err57);
            }
            errors++;
          }
        }
        if (data34.type !== undefined) {
          let data35 = data34.type;
          if (Array.isArray(data35)) {
            const _errs86 = errors;
            const len12 = data35.length;
            for (let i12 = 0; i12 < len12; i12++) {
              const _errs87 = errors;
              if ('Coordinate' !== data35[i12]) {
                const err58 = {
                  instancePath: instancePath + '/geoLocation/type/' + i12,
                  schemaPath: '#/$defs/Coordinate/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Coordinate' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err58];
                } else {
                  vErrors.push(err58);
                }
                errors++;
              }
              var valid34 = _errs87 === errors;
              if (valid34) {
                break;
              }
            }
            if (!valid34) {
              const err59 = {
                instancePath: instancePath + '/geoLocation/type',
                schemaPath: '#/$defs/Coordinate/properties/type/allOf/0/contains',
                keyword: 'contains',
                params: { minContains: 1 },
                message: 'must contain at least 1 valid item(s)',
              };
              if (vErrors === null) {
                vErrors = [err59];
              } else {
                vErrors.push(err59);
              }
              errors++;
            } else {
              errors = _errs86;
              if (vErrors !== null) {
                if (_errs86) {
                  vErrors.length = _errs86;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data35)) {
            const len13 = data35.length;
            for (let i13 = 0; i13 < len13; i13++) {
              if (typeof data35[i13] !== 'string') {
                const err60 = {
                  instancePath: instancePath + '/geoLocation/type/' + i13,
                  schemaPath: '#/$defs/Coordinate/properties/type/items/type',
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
          } else {
            const err61 = {
              instancePath: instancePath + '/geoLocation/type',
              schemaPath: '#/$defs/Coordinate/properties/type/type',
              keyword: 'type',
              params: { type: 'array' },
              message: 'must be array',
            };
            if (vErrors === null) {
              vErrors = [err61];
            } else {
              vErrors.push(err61);
            }
            errors++;
          }
        }
        if (data34.latitude !== undefined) {
          let data38 = data34.latitude;
          if (typeof data38 == 'number') {
            if (data38 > 90 || isNaN(data38)) {
              const err62 = {
                instancePath: instancePath + '/geoLocation/latitude',
                schemaPath: '#/$defs/Coordinate/properties/latitude/maximum',
                keyword: 'maximum',
                params: { comparison: '<=', limit: 90 },
                message: 'must be <= 90',
              };
              if (vErrors === null) {
                vErrors = [err62];
              } else {
                vErrors.push(err62);
              }
              errors++;
            }
            if (data38 < -90 || isNaN(data38)) {
              const err63 = {
                instancePath: instancePath + '/geoLocation/latitude',
                schemaPath: '#/$defs/Coordinate/properties/latitude/minimum',
                keyword: 'minimum',
                params: { comparison: '>=', limit: -90 },
                message: 'must be >= -90',
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
              instancePath: instancePath + '/geoLocation/latitude',
              schemaPath: '#/$defs/Coordinate/properties/latitude/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            };
            if (vErrors === null) {
              vErrors = [err64];
            } else {
              vErrors.push(err64);
            }
            errors++;
          }
        }
        if (data34.longitude !== undefined) {
          let data39 = data34.longitude;
          if (typeof data39 == 'number') {
            if (data39 > 180 || isNaN(data39)) {
              const err65 = {
                instancePath: instancePath + '/geoLocation/longitude',
                schemaPath: '#/$defs/Coordinate/properties/longitude/maximum',
                keyword: 'maximum',
                params: { comparison: '<=', limit: 180 },
                message: 'must be <= 180',
              };
              if (vErrors === null) {
                vErrors = [err65];
              } else {
                vErrors.push(err65);
              }
              errors++;
            }
            if (data39 < -180 || isNaN(data39)) {
              const err66 = {
                instancePath: instancePath + '/geoLocation/longitude',
                schemaPath: '#/$defs/Coordinate/properties/longitude/minimum',
                keyword: 'minimum',
                params: { comparison: '>=', limit: -180 },
                message: 'must be >= -180',
              };
              if (vErrors === null) {
                vErrors = [err66];
              } else {
                vErrors.push(err66);
              }
              errors++;
            }
          } else {
            const err67 = {
              instancePath: instancePath + '/geoLocation/longitude',
              schemaPath: '#/$defs/Coordinate/properties/longitude/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            };
            if (vErrors === null) {
              vErrors = [err67];
            } else {
              vErrors.push(err67);
            }
            errors++;
          }
        }
      } else {
        const err68 = {
          instancePath: instancePath + '/geoLocation',
          schemaPath: '#/$defs/Coordinate/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err68];
        } else {
          vErrors.push(err68);
        }
        errors++;
      }
    }
  } else {
    const err69 = {
      instancePath,
      schemaPath: '#/type',
      keyword: 'type',
      params: { type: 'object' },
      message: 'must be object',
    };
    if (vErrors === null) {
      vErrors = [err69];
    } else {
      vErrors.push(err69);
    }
    errors++;
  }
  validate21.errors = vErrors;
  return errors === 0;
}
validate21.evaluated = { props: true, dynamicProps: false, dynamicItems: false };
const schema38 = {
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
const schema39 = {
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
const schema40 = {
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
const schema41 = {
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
function validate25(
  data,
  { instancePath = '', parentData, parentDataProperty, rootData = data, dynamicAnchors = {} } = {},
) {
  let vErrors = null;
  let errors = 0;
  const evaluated0 = validate25.evaluated;
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
  validate25.errors = vErrors;
  return errors === 0;
}
validate25.evaluated = { props: true, dynamicProps: false, dynamicItems: false };
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
        !validate25(data.partyAddress, {
          instancePath: instancePath + '/partyAddress',
          parentData: data,
          parentDataProperty: 'partyAddress',
          rootData,
          dynamicAnchors,
        })
      ) {
        vErrors = vErrors === null ? validate25.errors : vErrors.concat(validate25.errors);
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
          params: { allowedValues: schema38.properties.role.enum },
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
        !validate24(data.party, {
          instancePath: instancePath + '/party',
          parentData: data,
          parentDataProperty: 'party',
          rootData,
          dynamicAnchors,
        })
      ) {
        vErrors = vErrors === null ? validate24.errors : vErrors.concat(validate24.errors);
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
  validate23.errors = vErrors;
  return errors === 0;
}
validate23.evaluated = { props: true, dynamicProps: false, dynamicItems: false };
const schema44 = {
  type: 'object',
  additionalProperties: false,
  properties: {
    type: {
      type: 'array',
      readOnly: true,
      default: ['EventProduct'],
      items: { type: 'string' },
      allOf: [{ contains: { const: 'EventProduct', minContains: 1 } }],
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
        idGranularity: {
          type: 'string',
          enum: ['model', 'batch', 'item'],
          example: 'model',
          description: 'The identification granularity for this product (item, batch, model)',
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
      required: ['id', 'name', 'idGranularity'],
      description: 'The product item / model / batch subject to this lifecycle event.',
    },
    quantity: {
      $ref: '#/$defs/Measure',
      description:
        'The quantity of product subject to this lifecycle event.  Not needed for serialised items.',
    },
    disposition: {
      type: 'string',
      enum: ['new', 'repaired', 'recycled', 'consumed', 'disposed'],
      example: 'new',
      description: 'The status of the product after the event has happened.',
    },
  },
  description: 'A quantity of products or materials involved in a lifecycle event.',
  required: ['product'],
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
    if (data.product === undefined) {
      const err0 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'product' },
        message: "must have required property '" + 'product' + "'",
      };
      if (vErrors === null) {
        vErrors = [err0];
      } else {
        vErrors.push(err0);
      }
      errors++;
    }
    for (const key0 in data) {
      if (
        !(key0 === 'type' || key0 === 'product' || key0 === 'quantity' || key0 === 'disposition')
      ) {
        const err1 = {
          instancePath,
          schemaPath: '#/additionalProperties',
          keyword: 'additionalProperties',
          params: { additionalProperty: key0 },
          message: 'must NOT have additional properties',
        };
        if (vErrors === null) {
          vErrors = [err1];
        } else {
          vErrors.push(err1);
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
          if ('EventProduct' !== data0[i0]) {
            const err2 = {
              instancePath: instancePath + '/type/' + i0,
              schemaPath: '#/properties/type/allOf/0/contains/const',
              keyword: 'const',
              params: { allowedValue: 'EventProduct' },
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
    if (data.product !== undefined) {
      let data3 = data.product;
      if (data3 && typeof data3 == 'object' && !Array.isArray(data3)) {
        if (data3.id === undefined) {
          const err6 = {
            instancePath: instancePath + '/product',
            schemaPath: '#/properties/product/required',
            keyword: 'required',
            params: { missingProperty: 'id' },
            message: "must have required property '" + 'id' + "'",
          };
          if (vErrors === null) {
            vErrors = [err6];
          } else {
            vErrors.push(err6);
          }
          errors++;
        }
        if (data3.name === undefined) {
          const err7 = {
            instancePath: instancePath + '/product',
            schemaPath: '#/properties/product/required',
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
        if (data3.idGranularity === undefined) {
          const err8 = {
            instancePath: instancePath + '/product',
            schemaPath: '#/properties/product/required',
            keyword: 'required',
            params: { missingProperty: 'idGranularity' },
            message: "must have required property '" + 'idGranularity' + "'",
          };
          if (vErrors === null) {
            vErrors = [err8];
          } else {
            vErrors.push(err8);
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
              if ('Product' !== data4[i2]) {
                const err9 = {
                  instancePath: instancePath + '/product/type/' + i2,
                  schemaPath: '#/properties/product/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Product' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err9];
                } else {
                  vErrors.push(err9);
                }
                errors++;
              }
              var valid7 = _errs15 === errors;
              if (valid7) {
                break;
              }
            }
            if (!valid7) {
              const err10 = {
                instancePath: instancePath + '/product/type',
                schemaPath: '#/properties/product/properties/type/allOf/0/contains',
                keyword: 'contains',
                params: { minContains: 1 },
                message: 'must contain at least 1 valid item(s)',
              };
              if (vErrors === null) {
                vErrors = [err10];
              } else {
                vErrors.push(err10);
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
                const err11 = {
                  instancePath: instancePath + '/product/type/' + i3,
                  schemaPath: '#/properties/product/properties/type/items/type',
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
          } else {
            const err12 = {
              instancePath: instancePath + '/product/type',
              schemaPath: '#/properties/product/properties/type/type',
              keyword: 'type',
              params: { type: 'array' },
              message: 'must be array',
            };
            if (vErrors === null) {
              vErrors = [err12];
            } else {
              vErrors.push(err12);
            }
            errors++;
          }
        }
        if (data3.id !== undefined) {
          let data7 = data3.id;
          if (typeof data7 === 'string') {
            if (!formats0(data7)) {
              const err13 = {
                instancePath: instancePath + '/product/id',
                schemaPath: '#/properties/product/properties/id/format',
                keyword: 'format',
                params: { format: 'uri' },
                message: 'must match format "' + 'uri' + '"',
              };
              if (vErrors === null) {
                vErrors = [err13];
              } else {
                vErrors.push(err13);
              }
              errors++;
            }
          } else {
            const err14 = {
              instancePath: instancePath + '/product/id',
              schemaPath: '#/properties/product/properties/id/type',
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
        if (data3.name !== undefined) {
          if (typeof data3.name !== 'string') {
            const err15 = {
              instancePath: instancePath + '/product/name',
              schemaPath: '#/properties/product/properties/name/type',
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
        if (data3.idGranularity !== undefined) {
          let data9 = data3.idGranularity;
          if (typeof data9 !== 'string') {
            const err16 = {
              instancePath: instancePath + '/product/idGranularity',
              schemaPath: '#/properties/product/properties/idGranularity/type',
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
          if (!(data9 === 'model' || data9 === 'batch' || data9 === 'item')) {
            const err17 = {
              instancePath: instancePath + '/product/idGranularity',
              schemaPath: '#/properties/product/properties/idGranularity/enum',
              keyword: 'enum',
              params: { allowedValues: schema44.properties.product.properties.idGranularity.enum },
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
        if (data3.modelNumber !== undefined) {
          if (typeof data3.modelNumber !== 'string') {
            const err18 = {
              instancePath: instancePath + '/product/modelNumber',
              schemaPath: '#/properties/product/properties/modelNumber/type',
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
        if (data3.batchNumber !== undefined) {
          if (typeof data3.batchNumber !== 'string') {
            const err19 = {
              instancePath: instancePath + '/product/batchNumber',
              schemaPath: '#/properties/product/properties/batchNumber/type',
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
        if (data3.itemNumber !== undefined) {
          if (typeof data3.itemNumber !== 'string') {
            const err20 = {
              instancePath: instancePath + '/product/itemNumber',
              schemaPath: '#/properties/product/properties/itemNumber/type',
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
          instancePath: instancePath + '/product',
          schemaPath: '#/properties/product/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err21];
        } else {
          vErrors.push(err21);
        }
        errors++;
      }
    }
    if (data.quantity !== undefined) {
      let data13 = data.quantity;
      if (data13 && typeof data13 == 'object' && !Array.isArray(data13)) {
        if (data13.value === undefined) {
          const err22 = {
            instancePath: instancePath + '/quantity',
            schemaPath: '#/$defs/Measure/required',
            keyword: 'required',
            params: { missingProperty: 'value' },
            message: "must have required property '" + 'value' + "'",
          };
          if (vErrors === null) {
            vErrors = [err22];
          } else {
            vErrors.push(err22);
          }
          errors++;
        }
        if (data13.unit === undefined) {
          const err23 = {
            instancePath: instancePath + '/quantity',
            schemaPath: '#/$defs/Measure/required',
            keyword: 'required',
            params: { missingProperty: 'unit' },
            message: "must have required property '" + 'unit' + "'",
          };
          if (vErrors === null) {
            vErrors = [err23];
          } else {
            vErrors.push(err23);
          }
          errors++;
        }
        for (const key1 in data13) {
          if (
            !(
              key1 === 'type' ||
              key1 === 'value' ||
              key1 === 'upperTolerance' ||
              key1 === 'lowerTolerance' ||
              key1 === 'unit'
            )
          ) {
            const err24 = {
              instancePath: instancePath + '/quantity',
              schemaPath: '#/$defs/Measure/additionalProperties',
              keyword: 'additionalProperties',
              params: { additionalProperty: key1 },
              message: 'must NOT have additional properties',
            };
            if (vErrors === null) {
              vErrors = [err24];
            } else {
              vErrors.push(err24);
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
              if ('Measure' !== data14[i4]) {
                const err25 = {
                  instancePath: instancePath + '/quantity/type/' + i4,
                  schemaPath: '#/$defs/Measure/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Measure' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err25];
                } else {
                  vErrors.push(err25);
                }
                errors++;
              }
              var valid13 = _errs38 === errors;
              if (valid13) {
                break;
              }
            }
            if (!valid13) {
              const err26 = {
                instancePath: instancePath + '/quantity/type',
                schemaPath: '#/$defs/Measure/properties/type/allOf/0/contains',
                keyword: 'contains',
                params: { minContains: 1 },
                message: 'must contain at least 1 valid item(s)',
              };
              if (vErrors === null) {
                vErrors = [err26];
              } else {
                vErrors.push(err26);
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
                const err27 = {
                  instancePath: instancePath + '/quantity/type/' + i5,
                  schemaPath: '#/$defs/Measure/properties/type/items/type',
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
          } else {
            const err28 = {
              instancePath: instancePath + '/quantity/type',
              schemaPath: '#/$defs/Measure/properties/type/type',
              keyword: 'type',
              params: { type: 'array' },
              message: 'must be array',
            };
            if (vErrors === null) {
              vErrors = [err28];
            } else {
              vErrors.push(err28);
            }
            errors++;
          }
        }
        if (data13.value !== undefined) {
          if (!(typeof data13.value == 'number')) {
            const err29 = {
              instancePath: instancePath + '/quantity/value',
              schemaPath: '#/$defs/Measure/properties/value/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            };
            if (vErrors === null) {
              vErrors = [err29];
            } else {
              vErrors.push(err29);
            }
            errors++;
          }
        }
        if (data13.upperTolerance !== undefined) {
          if (!(typeof data13.upperTolerance == 'number')) {
            const err30 = {
              instancePath: instancePath + '/quantity/upperTolerance',
              schemaPath: '#/$defs/Measure/properties/upperTolerance/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            };
            if (vErrors === null) {
              vErrors = [err30];
            } else {
              vErrors.push(err30);
            }
            errors++;
          }
        }
        if (data13.lowerTolerance !== undefined) {
          if (!(typeof data13.lowerTolerance == 'number')) {
            const err31 = {
              instancePath: instancePath + '/quantity/lowerTolerance',
              schemaPath: '#/$defs/Measure/properties/lowerTolerance/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            };
            if (vErrors === null) {
              vErrors = [err31];
            } else {
              vErrors.push(err31);
            }
            errors++;
          }
        }
        if (data13.unit !== undefined) {
          if (typeof data13.unit !== 'string') {
            const err32 = {
              instancePath: instancePath + '/quantity/unit',
              schemaPath: '#/$defs/Measure/properties/unit/type',
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
          instancePath: instancePath + '/quantity',
          schemaPath: '#/$defs/Measure/type',
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
    if (data.disposition !== undefined) {
      let data21 = data.disposition;
      if (typeof data21 !== 'string') {
        const err34 = {
          instancePath: instancePath + '/disposition',
          schemaPath: '#/properties/disposition/type',
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
      if (
        !(
          data21 === 'new' ||
          data21 === 'repaired' ||
          data21 === 'recycled' ||
          data21 === 'consumed' ||
          data21 === 'disposed'
        )
      ) {
        const err35 = {
          instancePath: instancePath + '/disposition',
          schemaPath: '#/properties/disposition/enum',
          keyword: 'enum',
          params: { allowedValues: schema44.properties.disposition.enum },
          message: 'must be equal to one of the allowed values',
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
      instancePath,
      schemaPath: '#/type',
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
  validate29.errors = vErrors;
  return errors === 0;
}
validate29.evaluated = { props: true, dynamicProps: false, dynamicItems: false };
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
    if (data.eventDate === undefined) {
      const err2 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'eventDate' },
        message: "must have required property '" + 'eventDate' + "'",
      };
      if (vErrors === null) {
        vErrors = [err2];
      } else {
        vErrors.push(err2);
      }
      errors++;
    }
    if (data.activityType === undefined) {
      const err3 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'activityType' },
        message: "must have required property '" + 'activityType' + "'",
      };
      if (vErrors === null) {
        vErrors = [err3];
      } else {
        vErrors.push(err3);
      }
      errors++;
    }
    if (data.inputProduct === undefined) {
      const err4 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'inputProduct' },
        message: "must have required property '" + 'inputProduct' + "'",
      };
      if (vErrors === null) {
        vErrors = [err4];
      } else {
        vErrors.push(err4);
      }
      errors++;
    }
    if (data.outputProduct === undefined) {
      const err5 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'outputProduct' },
        message: "must have required property '" + 'outputProduct' + "'",
      };
      if (vErrors === null) {
        vErrors = [err5];
      } else {
        vErrors.push(err5);
      }
      errors++;
    }
    if (data.madeAtFacility === undefined) {
      const err6 = {
        instancePath,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: 'madeAtFacility' },
        message: "must have required property '" + 'madeAtFacility' + "'",
      };
      if (vErrors === null) {
        vErrors = [err6];
      } else {
        vErrors.push(err6);
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
          if ('MakeEvent' !== data0[i0]) {
            const err7 = {
              instancePath: instancePath + '/type/' + i0,
              schemaPath: '#/properties/type/allOf/0/contains/const',
              keyword: 'const',
              params: { allowedValue: 'MakeEvent' },
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
        const _errs8 = errors;
        const len1 = data0.length;
        for (let i1 = 0; i1 < len1; i1++) {
          const _errs9 = errors;
          if ('LifecycleEvent' !== data0[i1]) {
            const err9 = {
              instancePath: instancePath + '/type/' + i1,
              schemaPath: '#/properties/type/allOf/1/contains/const',
              keyword: 'const',
              params: { allowedValue: 'LifecycleEvent' },
              message: 'must be equal to constant',
            };
            if (vErrors === null) {
              vErrors = [err9];
            } else {
              vErrors.push(err9);
            }
            errors++;
          }
          var valid3 = _errs9 === errors;
          if (valid3) {
            break;
          }
        }
        if (!valid3) {
          const err10 = {
            instancePath: instancePath + '/type',
            schemaPath: '#/properties/type/allOf/1/contains',
            keyword: 'contains',
            params: { minContains: 1 },
            message: 'must contain at least 1 valid item(s)',
          };
          if (vErrors === null) {
            vErrors = [err10];
          } else {
            vErrors.push(err10);
          }
          errors++;
        } else {
          errors = _errs8;
          if (vErrors !== null) {
            if (_errs8) {
              vErrors.length = _errs8;
            } else {
              vErrors = null;
            }
          }
        }
      }
      if (Array.isArray(data0)) {
        const len2 = data0.length;
        for (let i2 = 0; i2 < len2; i2++) {
          if (typeof data0[i2] !== 'string') {
            const err11 = {
              instancePath: instancePath + '/type/' + i2,
              schemaPath: '#/properties/type/items/type',
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
      } else {
        const err12 = {
          instancePath: instancePath + '/type',
          schemaPath: '#/properties/type/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err12];
        } else {
          vErrors.push(err12);
        }
        errors++;
      }
    }
    if (data.id !== undefined) {
      let data4 = data.id;
      if (typeof data4 === 'string') {
        if (!formats0(data4)) {
          const err13 = {
            instancePath: instancePath + '/id',
            schemaPath: '#/properties/id/format',
            keyword: 'format',
            params: { format: 'uri' },
            message: 'must match format "' + 'uri' + '"',
          };
          if (vErrors === null) {
            vErrors = [err13];
          } else {
            vErrors.push(err13);
          }
          errors++;
        }
      } else {
        const err14 = {
          instancePath: instancePath + '/id',
          schemaPath: '#/properties/id/type',
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
    if (data.name !== undefined) {
      if (typeof data.name !== 'string') {
        const err15 = {
          instancePath: instancePath + '/name',
          schemaPath: '#/properties/name/type',
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
    if (data.description !== undefined) {
      if (typeof data.description !== 'string') {
        const err16 = {
          instancePath: instancePath + '/description',
          schemaPath: '#/properties/description/type',
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
    if (data.eventDate !== undefined) {
      let data7 = data.eventDate;
      if (typeof data7 === 'string') {
        if (!formats2.validate(data7)) {
          const err17 = {
            instancePath: instancePath + '/eventDate',
            schemaPath: '#/properties/eventDate/format',
            keyword: 'format',
            params: { format: 'date-time' },
            message: 'must match format "' + 'date-time' + '"',
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
          instancePath: instancePath + '/eventDate',
          schemaPath: '#/properties/eventDate/type',
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
    if (data.sensorData !== undefined) {
      let data8 = data.sensorData;
      if (Array.isArray(data8)) {
        const len3 = data8.length;
        for (let i3 = 0; i3 < len3; i3++) {
          if (
            !validate21(data8[i3], {
              instancePath: instancePath + '/sensorData/' + i3,
              parentData: data8,
              parentDataProperty: i3,
              rootData,
              dynamicAnchors,
            })
          ) {
            vErrors = vErrors === null ? validate21.errors : vErrors.concat(validate21.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err19 = {
          instancePath: instancePath + '/sensorData',
          schemaPath: '#/properties/sensorData/type',
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
    if (data.relatedDocument !== undefined) {
      let data10 = data.relatedDocument;
      if (Array.isArray(data10)) {
        const len4 = data10.length;
        for (let i4 = 0; i4 < len4; i4++) {
          let data11 = data10[i4];
          if (data11 && typeof data11 == 'object' && !Array.isArray(data11)) {
            if (data11.linkURL === undefined) {
              const err20 = {
                instancePath: instancePath + '/relatedDocument/' + i4,
                schemaPath: '#/$defs/Link/required',
                keyword: 'required',
                params: { missingProperty: 'linkURL' },
                message: "must have required property '" + 'linkURL' + "'",
              };
              if (vErrors === null) {
                vErrors = [err20];
              } else {
                vErrors.push(err20);
              }
              errors++;
            }
            if (data11.linkName === undefined) {
              const err21 = {
                instancePath: instancePath + '/relatedDocument/' + i4,
                schemaPath: '#/$defs/Link/required',
                keyword: 'required',
                params: { missingProperty: 'linkName' },
                message: "must have required property '" + 'linkName' + "'",
              };
              if (vErrors === null) {
                vErrors = [err21];
              } else {
                vErrors.push(err21);
              }
              errors++;
            }
            for (const key0 in data11) {
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
                const err22 = {
                  instancePath: instancePath + '/relatedDocument/' + i4,
                  schemaPath: '#/$defs/Link/additionalProperties',
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
            if (data11.type !== undefined) {
              let data12 = data11.type;
              if (Array.isArray(data12)) {
                const _errs32 = errors;
                const len5 = data12.length;
                for (let i5 = 0; i5 < len5; i5++) {
                  const _errs33 = errors;
                  if ('Link' !== data12[i5]) {
                    const err23 = {
                      instancePath: instancePath + '/relatedDocument/' + i4 + '/type/' + i5,
                      schemaPath: '#/$defs/Link/properties/type/allOf/0/contains/const',
                      keyword: 'const',
                      params: { allowedValue: 'Link' },
                      message: 'must be equal to constant',
                    };
                    if (vErrors === null) {
                      vErrors = [err23];
                    } else {
                      vErrors.push(err23);
                    }
                    errors++;
                  }
                  var valid13 = _errs33 === errors;
                  if (valid13) {
                    break;
                  }
                }
                if (!valid13) {
                  const err24 = {
                    instancePath: instancePath + '/relatedDocument/' + i4 + '/type',
                    schemaPath: '#/$defs/Link/properties/type/allOf/0/contains',
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
                  errors = _errs32;
                  if (vErrors !== null) {
                    if (_errs32) {
                      vErrors.length = _errs32;
                    } else {
                      vErrors = null;
                    }
                  }
                }
              }
              if (Array.isArray(data12)) {
                const len6 = data12.length;
                for (let i6 = 0; i6 < len6; i6++) {
                  if (typeof data12[i6] !== 'string') {
                    const err25 = {
                      instancePath: instancePath + '/relatedDocument/' + i4 + '/type/' + i6,
                      schemaPath: '#/$defs/Link/properties/type/items/type',
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
                  instancePath: instancePath + '/relatedDocument/' + i4 + '/type',
                  schemaPath: '#/$defs/Link/properties/type/type',
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
            if (data11.linkURL !== undefined) {
              let data15 = data11.linkURL;
              if (typeof data15 === 'string') {
                if (!formats0(data15)) {
                  const err27 = {
                    instancePath: instancePath + '/relatedDocument/' + i4 + '/linkURL',
                    schemaPath: '#/$defs/Link/properties/linkURL/format',
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
                  instancePath: instancePath + '/relatedDocument/' + i4 + '/linkURL',
                  schemaPath: '#/$defs/Link/properties/linkURL/type',
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
            if (data11.linkName !== undefined) {
              if (typeof data11.linkName !== 'string') {
                const err29 = {
                  instancePath: instancePath + '/relatedDocument/' + i4 + '/linkName',
                  schemaPath: '#/$defs/Link/properties/linkName/type',
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
            if (data11.digestMultibase !== undefined) {
              if (typeof data11.digestMultibase !== 'string') {
                const err30 = {
                  instancePath: instancePath + '/relatedDocument/' + i4 + '/digestMultibase',
                  schemaPath: '#/$defs/Link/properties/digestMultibase/type',
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
            if (data11.mediaType !== undefined) {
              if (typeof data11.mediaType !== 'string') {
                const err31 = {
                  instancePath: instancePath + '/relatedDocument/' + i4 + '/mediaType',
                  schemaPath: '#/$defs/Link/properties/mediaType/type',
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
            if (data11.linkType !== undefined) {
              if (typeof data11.linkType !== 'string') {
                const err32 = {
                  instancePath: instancePath + '/relatedDocument/' + i4 + '/linkType',
                  schemaPath: '#/$defs/Link/properties/linkType/type',
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
              instancePath: instancePath + '/relatedDocument/' + i4,
              schemaPath: '#/$defs/Link/type',
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
      } else {
        const err34 = {
          instancePath: instancePath + '/relatedDocument',
          schemaPath: '#/properties/relatedDocument/type',
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
    if (data.activityType !== undefined) {
      let data20 = data.activityType;
      if (data20 && typeof data20 == 'object' && !Array.isArray(data20)) {
        if (data20.code === undefined) {
          const err35 = {
            instancePath: instancePath + '/activityType',
            schemaPath: '#/$defs/Classification/required',
            keyword: 'required',
            params: { missingProperty: 'code' },
            message: "must have required property '" + 'code' + "'",
          };
          if (vErrors === null) {
            vErrors = [err35];
          } else {
            vErrors.push(err35);
          }
          errors++;
        }
        if (data20.name === undefined) {
          const err36 = {
            instancePath: instancePath + '/activityType',
            schemaPath: '#/$defs/Classification/required',
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
        if (data20.schemeId === undefined) {
          const err37 = {
            instancePath: instancePath + '/activityType',
            schemaPath: '#/$defs/Classification/required',
            keyword: 'required',
            params: { missingProperty: 'schemeId' },
            message: "must have required property '" + 'schemeId' + "'",
          };
          if (vErrors === null) {
            vErrors = [err37];
          } else {
            vErrors.push(err37);
          }
          errors++;
        }
        if (data20.schemeName === undefined) {
          const err38 = {
            instancePath: instancePath + '/activityType',
            schemaPath: '#/$defs/Classification/required',
            keyword: 'required',
            params: { missingProperty: 'schemeName' },
            message: "must have required property '" + 'schemeName' + "'",
          };
          if (vErrors === null) {
            vErrors = [err38];
          } else {
            vErrors.push(err38);
          }
          errors++;
        }
        for (const key1 in data20) {
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
            const err39 = {
              instancePath: instancePath + '/activityType',
              schemaPath: '#/$defs/Classification/additionalProperties',
              keyword: 'additionalProperties',
              params: { additionalProperty: key1 },
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
            const _errs53 = errors;
            const len7 = data21.length;
            for (let i7 = 0; i7 < len7; i7++) {
              const _errs54 = errors;
              if ('Classification' !== data21[i7]) {
                const err40 = {
                  instancePath: instancePath + '/activityType/type/' + i7,
                  schemaPath: '#/$defs/Classification/properties/type/allOf/0/contains/const',
                  keyword: 'const',
                  params: { allowedValue: 'Classification' },
                  message: 'must be equal to constant',
                };
                if (vErrors === null) {
                  vErrors = [err40];
                } else {
                  vErrors.push(err40);
                }
                errors++;
              }
              var valid19 = _errs54 === errors;
              if (valid19) {
                break;
              }
            }
            if (!valid19) {
              const err41 = {
                instancePath: instancePath + '/activityType/type',
                schemaPath: '#/$defs/Classification/properties/type/allOf/0/contains',
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
          if (Array.isArray(data21)) {
            const len8 = data21.length;
            for (let i8 = 0; i8 < len8; i8++) {
              if (typeof data21[i8] !== 'string') {
                const err42 = {
                  instancePath: instancePath + '/activityType/type/' + i8,
                  schemaPath: '#/$defs/Classification/properties/type/items/type',
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
              instancePath: instancePath + '/activityType/type',
              schemaPath: '#/$defs/Classification/properties/type/type',
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
        if (data20.code !== undefined) {
          if (typeof data20.code !== 'string') {
            const err44 = {
              instancePath: instancePath + '/activityType/code',
              schemaPath: '#/$defs/Classification/properties/code/type',
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
        if (data20.name !== undefined) {
          if (typeof data20.name !== 'string') {
            const err45 = {
              instancePath: instancePath + '/activityType/name',
              schemaPath: '#/$defs/Classification/properties/name/type',
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
        if (data20.definition !== undefined) {
          if (typeof data20.definition !== 'string') {
            const err46 = {
              instancePath: instancePath + '/activityType/definition',
              schemaPath: '#/$defs/Classification/properties/definition/type',
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
        if (data20.schemeId !== undefined) {
          let data27 = data20.schemeId;
          if (typeof data27 === 'string') {
            if (!formats0(data27)) {
              const err47 = {
                instancePath: instancePath + '/activityType/schemeId',
                schemaPath: '#/$defs/Classification/properties/schemeId/format',
                keyword: 'format',
                params: { format: 'uri' },
                message: 'must match format "' + 'uri' + '"',
              };
              if (vErrors === null) {
                vErrors = [err47];
              } else {
                vErrors.push(err47);
              }
              errors++;
            }
          } else {
            const err48 = {
              instancePath: instancePath + '/activityType/schemeId',
              schemaPath: '#/$defs/Classification/properties/schemeId/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            };
            if (vErrors === null) {
              vErrors = [err48];
            } else {
              vErrors.push(err48);
            }
            errors++;
          }
        }
        if (data20.schemeName !== undefined) {
          if (typeof data20.schemeName !== 'string') {
            const err49 = {
              instancePath: instancePath + '/activityType/schemeName',
              schemaPath: '#/$defs/Classification/properties/schemeName/type',
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
          instancePath: instancePath + '/activityType',
          schemaPath: '#/$defs/Classification/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        };
        if (vErrors === null) {
          vErrors = [err50];
        } else {
          vErrors.push(err50);
        }
        errors++;
      }
    }
    if (data.relatedParty !== undefined) {
      let data29 = data.relatedParty;
      if (Array.isArray(data29)) {
        const len9 = data29.length;
        for (let i9 = 0; i9 < len9; i9++) {
          if (
            !validate23(data29[i9], {
              instancePath: instancePath + '/relatedParty/' + i9,
              parentData: data29,
              parentDataProperty: i9,
              rootData,
              dynamicAnchors,
            })
          ) {
            vErrors = vErrors === null ? validate23.errors : vErrors.concat(validate23.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err51 = {
          instancePath: instancePath + '/relatedParty',
          schemaPath: '#/properties/relatedParty/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err51];
        } else {
          vErrors.push(err51);
        }
        errors++;
      }
    }
    if (data.inputProduct !== undefined) {
      let data31 = data.inputProduct;
      if (Array.isArray(data31)) {
        const len10 = data31.length;
        for (let i10 = 0; i10 < len10; i10++) {
          if (
            !validate29(data31[i10], {
              instancePath: instancePath + '/inputProduct/' + i10,
              parentData: data31,
              parentDataProperty: i10,
              rootData,
              dynamicAnchors,
            })
          ) {
            vErrors = vErrors === null ? validate29.errors : vErrors.concat(validate29.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err52 = {
          instancePath: instancePath + '/inputProduct',
          schemaPath: '#/properties/inputProduct/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        };
        if (vErrors === null) {
          vErrors = [err52];
        } else {
          vErrors.push(err52);
        }
        errors++;
      }
    }
    if (data.outputProduct !== undefined) {
      let data33 = data.outputProduct;
      if (Array.isArray(data33)) {
        const len11 = data33.length;
        for (let i11 = 0; i11 < len11; i11++) {
          if (
            !validate29(data33[i11], {
              instancePath: instancePath + '/outputProduct/' + i11,
              parentData: data33,
              parentDataProperty: i11,
              rootData,
              dynamicAnchors,
            })
          ) {
            vErrors = vErrors === null ? validate29.errors : vErrors.concat(validate29.errors);
            errors = vErrors.length;
          }
        }
      } else {
        const err53 = {
          instancePath: instancePath + '/outputProduct',
          schemaPath: '#/properties/outputProduct/type',
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
    if (data.madeAtFacility !== undefined) {
      let data35 = data.madeAtFacility;
      if (data35 && typeof data35 == 'object' && !Array.isArray(data35)) {
        if (data35.id === undefined) {
          const err54 = {
            instancePath: instancePath + '/madeAtFacility',
            schemaPath: '#/properties/madeAtFacility/required',
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
        if (data35.name === undefined) {
          const err55 = {
            instancePath: instancePath + '/madeAtFacility',
            schemaPath: '#/properties/madeAtFacility/required',
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
        if (data35.type !== undefined) {
          let data36 = data35.type;
          if (Array.isArray(data36)) {
            const _errs81 = errors;
            const len12 = data36.length;
            for (let i12 = 0; i12 < len12; i12++) {
              const _errs82 = errors;
              if ('Facility' !== data36[i12]) {
                const err56 = {
                  instancePath: instancePath + '/madeAtFacility/type/' + i12,
                  schemaPath: '#/properties/madeAtFacility/properties/type/allOf/0/contains/const',
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
              var valid30 = _errs82 === errors;
              if (valid30) {
                break;
              }
            }
            if (!valid30) {
              const err57 = {
                instancePath: instancePath + '/madeAtFacility/type',
                schemaPath: '#/properties/madeAtFacility/properties/type/allOf/0/contains',
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
              errors = _errs81;
              if (vErrors !== null) {
                if (_errs81) {
                  vErrors.length = _errs81;
                } else {
                  vErrors = null;
                }
              }
            }
          }
          if (Array.isArray(data36)) {
            const len13 = data36.length;
            for (let i13 = 0; i13 < len13; i13++) {
              if (typeof data36[i13] !== 'string') {
                const err58 = {
                  instancePath: instancePath + '/madeAtFacility/type/' + i13,
                  schemaPath: '#/properties/madeAtFacility/properties/type/items/type',
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
              instancePath: instancePath + '/madeAtFacility/type',
              schemaPath: '#/properties/madeAtFacility/properties/type/type',
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
        if (data35.id !== undefined) {
          let data39 = data35.id;
          if (typeof data39 === 'string') {
            if (!formats0(data39)) {
              const err60 = {
                instancePath: instancePath + '/madeAtFacility/id',
                schemaPath: '#/properties/madeAtFacility/properties/id/format',
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
              instancePath: instancePath + '/madeAtFacility/id',
              schemaPath: '#/properties/madeAtFacility/properties/id/type',
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
        if (data35.name !== undefined) {
          if (typeof data35.name !== 'string') {
            const err62 = {
              instancePath: instancePath + '/madeAtFacility/name',
              schemaPath: '#/properties/madeAtFacility/properties/name/type',
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
          instancePath: instancePath + '/madeAtFacility',
          schemaPath: '#/properties/madeAtFacility/type',
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
  validate20.errors = vErrors;
  return errors === 0;
}
validate20.evaluated = { props: true, dynamicProps: false, dynamicItems: false };
