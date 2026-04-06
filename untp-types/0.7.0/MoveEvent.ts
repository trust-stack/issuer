/* eslint-disable */
/**
 * UNTP 0.7.0 types generated from JSON Schema. Do not edit by hand.
 * Source: src/untp/schemas/0.7.0/MoveEvent.json
 * Regenerate: pnpm run generate:untp-types
 */

/**
 * Transfer (shipment) of products from one facility to another.
 */
export interface MoveEvent {
  type?: {
    [k: string]: unknown;
  } & string[];
  /**
   * Globally unique ID for this lifecycle event. Should be a URI. Can be a UUID.
   */
  id: string;
  /**
   * The name for this lifecycle event
   */
  name: string;
  /**
   * The description of this lifecycle event.
   */
  description?: string;
  /**
   * The date and time at which this lifecycle event occurs. use 00:00 for time if only a date is required.
   */
  eventDate: string;
  /**
   * A sensor data set associated with this lifecycle event.
   */
  sensorData?: SensorData[];
  /**
   * A list of links to documentary evidence that supports this event.
   */
  relatedDocument?: Link[];
  activityType: Classification;
  /**
   * Any related parties and their roles involved in this event (eg the carrier for a shipment event)
   */
  relatedParty?: PartyRole[];
  /**
   * An array of products and quantities for this movement / shipment process
   */
  movedProduct: EventProduct[];
  /**
   * The source facility for this movement / shipment of products
   */
  fromFacility: {
    type?: {
      [k: string]: unknown;
    } & string[];
    /**
     * Globally unique identifier of this facility. Typically represented as a URI identifierScheme/Identifier URI
     */
    id: string;
    /**
     * Name of this facility as defined the location register.
     */
    name: string;
    [k: string]: unknown;
  };
  /**
   * The destination facility for this movement / shipment of products
   */
  toFacility: {
    type?: {
      [k: string]: unknown;
    } & string[];
    /**
     * Globally unique identifier of this facility. Typically represented as a URI identifierScheme/Identifier URI
     */
    id: string;
    /**
     * Name of this facility as defined the location register.
     */
    name: string;
    [k: string]: unknown;
  };
  /**
   * The consignment ID related to this movement of products. Ideally this is a resolvable URL but if not available then use a URN notation such as urn:carrier:waybillNumber.
   */
  consignmentId?: string;
  [k: string]: unknown;
}
/**
 * A sensor data recording associated with this event
 */
export interface SensorData {
  type?: {
    [k: string]: unknown;
  } & string[];
  /**
   * The type of measurement recorded in this sensor data event.
   */
  metric: {
    type?: {
      [k: string]: unknown;
    } & string[];
    /**
     * Globally unique identifier of this reporting metric.
     */
    id: string;
    /**
     * A human readable name for this metric (for example "water usage per Kg of material")
     */
    name: string;
    [k: string]: unknown;
  };
  /**
   * The value measured by this sensor measurement event.
   */
  measure: Measure[];
  /**
   * Link to raw data file associated with this sensor reading (eg an image).
   */
  rawData?: Link[];
  /**
   * The sensor device used for this sensor measurement
   */
  sensor?: {
    type?: {
      [k: string]: unknown;
    } & string[];
    /**
     * Globally unique identifier of this product. Typically represented as a URI identifierScheme/Identifier URI or, if self-issued, as a did.
     */
    id: string;
    /**
     * The product name as known to the market.
     */
    name: string;
    [k: string]: unknown;
  };
  geoLocation?: Coordinate;
}
/**
 * The measure class defines a numeric measured value (eg 10) and a coded unit of measure (eg KG).  There is an optional upper and lower tolerance which can be used to specify uncertainty in the measure.
 */
export interface Measure {
  type?: {
    [k: string]: unknown;
  } & string[];
  /**
   * The numeric value of the measure
   */
  value: number;
  /**
   * The upper tolerance associated with this measure expressed in the same units as the measure.  For example value=10, upperTolerance=0.1, unit=KGM would mean that this measure is 10kg + 0.1kg
   */
  upperTolerance?: number;
  /**
   * The lower tolerance associated with this measure expressed in the same units as the measure.  For example value=10, lowerTolerance=0.1, unit=KGM would mean that this measure is 10kg - 0.1kg
   */
  lowerTolerance?: number;
  /**
   * Unit of measure drawn from the UNECE Rec20 measure code list.
   *
   *     This is an enumerated value, but the list of valid values are too big, or change too often to include here. You can access the list of allowable values at this URL:  https://vocabulary.uncefact.org/UnitMeasureCode#
   *
   */
  unit: string;
}
/**
 * A structure to provide a URL link plus metadata associated with the link.
 */
export interface Link {
  type?: {
    [k: string]: unknown;
  } & string[];
  /**
   * The URL of the target resource.
   */
  linkURL: string;
  /**
   * Display name for this link.
   */
  linkName: string;
  /**
   * An optional multi-base encoded digest to ensure the content of the link has not changed. See https://www.w3.org/TR/vc-data-integrity/#resource-integrity for more information.
   */
  digestMultibase?: string;
  /**
   * The media type of the target resource.
   */
  mediaType?: string;
  /**
   * The type of the target resource - drawn from a controlled vocabulary
   */
  linkType?: string;
}
/**
 * The geolocation of this sensor data recording event.
 */
export interface Coordinate {
  type?: {
    [k: string]: unknown;
  } & string[];
  /**
   * latitude: Angular distance north or south of the equator, expressed in decimal degrees.Valid range: −90.0 to +90.0.
   */
  latitude: number;
  /**
   * longitude: Angular distance east or west of the Prime Meridian, expressed in decimal degrees.Valid range: −180.0 to +180.0.
   */
  longitude: number;
}
/**
 * The business activity that this event represents (eg shipping, repair, etc) using a standard classification scheme - eg https://ref.gs1.org/cbv/BizStep. This may be replaced with industry specific vocabularies (ginning, spinning, weaving, dyeing, etc in textiles)
 */
export interface Classification {
  type?: {
    [k: string]: unknown;
  } & string[];
  /**
   * classification code within the scheme
   */
  code: string;
  /**
   * Name of the classification represented by the code
   */
  name: string;
  /**
   * A rich definition of this classification code.
   */
  definition?: string;
  /**
   * Classification scheme ID
   */
  schemeId: string;
  /**
   * The name of the classification scheme
   */
  schemeName: string;
}
/**
 * A party with a defined relationship to the referencing entity
 */
export interface PartyRole {
  type?: {
    [k: string]: unknown;
  } & string[];
  /**
   * The role played by the party in this relationship
   */
  role:
    | 'owner'
    | 'producer'
    | 'manufacturer'
    | 'processor'
    | 'remanufacturer'
    | 'recycler'
    | 'operator'
    | 'serviceProvider'
    | 'inspector'
    | 'certifier'
    | 'logisticsProvider'
    | 'carrier'
    | 'consignor'
    | 'consignee'
    | 'importer'
    | 'exporter'
    | 'distributor'
    | 'retailer'
    | 'brandOwner'
    | 'regulator';
  party: Party;
}
/**
 * The party that has the specified role.
 */
export interface Party {
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
  /**
   * Description of the party including function and other names.
   */
  description?: string;
  /**
   * The registration number (alphanumeric) of the Party within the register. Unique within the register.
   */
  registeredId?: string;
  /**
   * The identifier scheme of the party.  Typically a national business register or a global scheme such as GLEIF.
   */
  idScheme?: {
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
    [k: string]: unknown;
  };
  registrationCountry?: Country;
  partyAddress?: Address;
  /**
   * Website for this organisation
   */
  organisationWebsite?: string;
  /**
   * The industry categories for this organisation.  Recommend use of UNCPC as the category scheme. for example - unstats.un.org/isic/1030
   */
  industryCategory?: Classification1[];
  /**
   * An optional list of other registered identifiers for this organisation. For example DUNS, GLN, LEI, etc
   */
  partyAlsoKnownAs?: {
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
    /**
     * The registration number (alphanumeric) of the Party within the register. Unique within the register.
     */
    registeredId?: string;
    [k: string]: unknown;
  }[];
  [k: string]: unknown;
}
/**
 * the country in which this organisation is registered - using ISO-3166 code and name.
 */
export interface Country {
  type?: {
    [k: string]: unknown;
  } & string[];
  /**
   * ISO 3166 country code
   *
   *     This is an enumerated value, but the list of valid values are too big, or change too often to include here. You can access the list of allowable values at this URL:  https://vocabulary.uncefact.org/CountryId#
   *
   */
  countryCode: string;
  /**
   * Country Name as defined in ISO 3166
   */
  countryName?: string;
}
/**
 * The address of the party
 */
export interface Address {
  type?: {
    [k: string]: unknown;
  } & string[];
  /**
   * the street address as an unstructured string.
   */
  streetAddress: string;
  /**
   * The postal code or zip code for this address.
   */
  postalCode: string;
  /**
   * The city, suburb or township name.
   */
  addressLocality: string;
  /**
   * The state or territory or province
   */
  addressRegion: string;
  addressCountry: Country1;
}
/**
 * The address country as an ISO-3166 two letter country code and name.
 */
export interface Country1 {
  type?: {
    [k: string]: unknown;
  } & string[];
  /**
   * ISO 3166 country code
   *
   *     This is an enumerated value, but the list of valid values are too big, or change too often to include here. You can access the list of allowable values at this URL:  https://vocabulary.uncefact.org/CountryId#
   *
   */
  countryCode: string;
  /**
   * Country Name as defined in ISO 3166
   */
  countryName?: string;
}
/**
 * A classification scheme and code / name representing a category value for a product, entity, or facility.
 */
export interface Classification1 {
  type?: {
    [k: string]: unknown;
  } & string[];
  /**
   * classification code within the scheme
   */
  code: string;
  /**
   * Name of the classification represented by the code
   */
  name: string;
  /**
   * A rich definition of this classification code.
   */
  definition?: string;
  /**
   * Classification scheme ID
   */
  schemeId: string;
  /**
   * The name of the classification scheme
   */
  schemeName: string;
}
/**
 * A quantity of products or materials involved in a lifecycle event.
 */
export interface EventProduct {
  type?: {
    [k: string]: unknown;
  } & string[];
  /**
   * The product item / model / batch subject to this lifecycle event.
   */
  product: {
    type?: {
      [k: string]: unknown;
    } & string[];
    /**
     * Globally unique identifier of this product. Typically represented as a URI identifierScheme/Identifier URI or, if self-issued, as a did.
     */
    id: string;
    /**
     * The product name as known to the market.
     */
    name: string;
    /**
     * The identification granularity for this product (item, batch, model)
     */
    idGranularity: 'model' | 'batch' | 'item';
    /**
     * Where available, the model number (for manufactured products) or material identification (for bulk materials)
     */
    modelNumber?: string;
    /**
     * Identifier of the specific production batch of the product.  Unique within the product class.
     */
    batchNumber?: string;
    /**
     * A number or code representing a specific serialised item of the product. Unique within product class.
     */
    itemNumber?: string;
    [k: string]: unknown;
  };
  quantity?: Measure1;
  /**
   * The status of the product after the event has happened.
   */
  disposition?: 'new' | 'repaired' | 'recycled' | 'consumed' | 'disposed';
}
/**
 * The measure class defines a numeric measured value (eg 10) and a coded unit of measure (eg KG).  There is an optional upper and lower tolerance which can be used to specify uncertainty in the measure.
 */
export interface Measure1 {
  type?: {
    [k: string]: unknown;
  } & string[];
  /**
   * The numeric value of the measure
   */
  value: number;
  /**
   * The upper tolerance associated with this measure expressed in the same units as the measure.  For example value=10, upperTolerance=0.1, unit=KGM would mean that this measure is 10kg + 0.1kg
   */
  upperTolerance?: number;
  /**
   * The lower tolerance associated with this measure expressed in the same units as the measure.  For example value=10, lowerTolerance=0.1, unit=KGM would mean that this measure is 10kg - 0.1kg
   */
  lowerTolerance?: number;
  /**
   * Unit of measure drawn from the UNECE Rec20 measure code list.
   *
   *     This is an enumerated value, but the list of valid values are too big, or change too often to include here. You can access the list of allowable values at this URL:  https://vocabulary.uncefact.org/UnitMeasureCode#
   *
   */
  unit: string;
}
