/* eslint-disable */
/**
 * UNTP 0.7.0 types generated from JSON Schema. Do not edit by hand.
 * Source: src/untp/schemas/0.7.0/Facility.json
 * Regenerate: pnpm run generate:untp-types
 */

/**
 * The physical site (eg farm or factory) where the product or materials was produced.
 */
export interface Facility {
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
  /**
   * Description of the facility including function and other names.
   */
  description?: string;
  /**
   * The registration number (alphanumeric) of the facility within the identifier scheme. Unique within the register.
   */
  registeredId?: string;
  /**
   * The ID scheme of the facility. eg a GS1 GLN or a National land registry scheme. If self issued then use the party ID of the facility owner.
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
  countryOfOperation: Country;
  /**
   * The industrial or production processes performed by this facility. Example unstats.un.org/isic/1030.
   */
  processCategory: Classification[];
  /**
   * A list of parties with a specified role relationship to this facility
   */
  relatedParty?: PartyRole[];
  /**
   * A list of links to documents providing additional facility information. Documents that support a conformity claim (e.g. permits or certificates) SHOULD be referenced as claim evidence rather than here.
   */
  relatedDocument?: Link[];
  /**
   * An optional list of other registered identifiers for this facility - eg GLNs or other schemes.
   */
  facilityAlsoKnownAs?: {
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
    /**
     * The registration number (alphanumeric) of the facility within the identifier scheme. Unique within the register.
     */
    registeredId?: string;
    [k: string]: unknown;
  }[];
  locationInformation: Location;
  address: Address1;
  materialUsage?: MaterialUsage;
  /**
   * A list of performance claims (eg deforestation status) for this facility.
   */
  performanceClaim?: Claim[];
}
/**
 * The country in which this facility is operating.using ISO-3166 code and name.
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
 * A classification scheme and code / name representing a category value for a product, entity, or facility.
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
  registrationCountry?: Country1;
  partyAddress?: Address;
  /**
   * Website for this organisation
   */
  organisationWebsite?: string;
  /**
   * The industry categories for this organisation.  Recommend use of UNCPC as the category scheme. for example - unstats.un.org/isic/1030
   */
  industryCategory?: Classification[];
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
  addressCountry: Country2;
}
/**
 * The address country as an ISO-3166 two letter country code and name.
 */
export interface Country2 {
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
 * Geo-location information for this facility as a resolvable geographic area (a Plus Code), and/or a geo-located point (latitude / longitude), and/or a defined boundary (GeoJSON Polygon).
 */
export interface Location {
  type?: {
    [k: string]: unknown;
  } & string[];
  /**
   * An open location code (https://maps.google.com/pluscodes/) representing this geographic location or region. Open location codes can represent any sized area from a point to a large region and are easily resolved to a visual map location.
   */
  plusCode?: string;
  geoLocation?: Coordinate;
  /**
   * The list of ordered coordinates that define a closed area polygon as a location boundary. The first and last coordinates in the array must match - thereby defining a closed boundary.
   */
  geoBoundary?: Coordinate1[];
  [k: string]: unknown;
}
/**
 * The latitude and longitude coordinates that best represent the specified location.
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
 * A geographic point defined by latitude and longitude using the WGS84 geodetic coordinate reference system (EPSG:4326). Latitude and longitude are expressed in decimal degrees as floating-point numbers. Coordinates follow the conventional order (latitude, longitude) and represent a point on the Earth’s surface.
 */
export interface Coordinate1 {
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
 * The Postal address of the location.
 */
export interface Address1 {
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
  addressCountry: Country2;
}
/**
 * The type and provenance of materials consumed by the facility during the reporting period.
 */
export interface MaterialUsage {
  type?: {
    [k: string]: unknown;
  } & string[];
  applicablePeriod?: Period;
  /**
   * An list of materials consumed during the usage period.
   */
  materialConsumed: Material[];
}
/**
 * The period over which this material consumption is reported
 */
export interface Period {
  type?: {
    [k: string]: unknown;
  } & string[];
  /**
   * The period start date
   */
  startDate: string;
  /**
   * The period end date
   */
  endDate: string;
  /**
   * Additional information relevant to this reporting period
   */
  periodInformation?: string;
}
/**
 * The material class encapsulates details about the origin or source of raw materials in a product, including the country of origin and the mass fraction.
 */
export interface Material {
  type?: {
    [k: string]: unknown;
  } & string[];
  /**
   * Name of this material (eg "Egyptian Cotton")
   */
  name: string;
  originCountry: Country3;
  materialType: Classification1;
  /**
   * The mass fraction as a decimal of the product (or facility reporting period)  represented by this material.
   */
  massFraction: number;
  mass?: Measure;
  /**
   * Mass fraction of this material that is recycled (eg 50% recycled Lithium)
   */
  recycledMassFraction?: number;
  /**
   * Indicates whether this material is hazardous. If true then the materialSafetyInformation property must be present
   */
  hazardous?: boolean;
  symbol?: Image;
  materialSafetyInformation?: Link1;
  [k: string]: unknown;
}
/**
 * A ISO 3166-1 code representing the country of origin of the component or ingredient.
 */
export interface Country3 {
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
 * The mass of the material component.
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
 * Based 64 encoded binary used to represent a visual symbol for a given material.
 */
export interface Image {
  type?: {
    [k: string]: unknown;
  } & string[];
  /**
   * the display name for this image
   */
  name: string;
  /**
   * The detailed description / supporting information for this image.
   */
  description?: string;
  /**
   * The image data encoded as a base64 string.
   */
  imageData: string;
  /**
   * The media type of this image (eg image/png)
   *
   *     This is an enumerated value, but the list of valid values are too big, or change too often to include here. You can access the list of allowable values at this URL:  https://mimetype.io/
   *
   */
  mediaType: string;
}
/**
 * A structure to provide a URL link plus metadata associated with the link.
 */
export interface Link1 {
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
 * A performance claim about a product, facility, or organisation that is made against a well defined criterion.
 */
export interface Claim {
  type?: {
    [k: string]: unknown;
  } & string[];
  /**
   * Globally unique identifier of this claim. Typically represented as a URI companyURL/claimID URI or a UUID
   */
  id: string;
  /**
   * Name of this claim - typically similar or the same as the referenced criterion name.
   */
  name: string;
  /**
   * Description of this conformity claim
   */
  description?: string;
  /**
   * The criterion against which the claim is made.
   */
  referenceCriteria: {
    type?: {
      [k: string]: unknown;
    } & string[];
    /**
     * Globally unique identifier of this conformity criterion. Typically represented as a URI SchemeOwner/CriterionID URI
     */
    id: string;
    /**
     * Name of this criterion as defined by the scheme owner.
     */
    name: string;
    [k: string]: unknown;
  }[];
  /**
   * List of references to regulation to which conformity is claimed claimed for this product
   */
  referenceRegulation?: {
    type?: {
      [k: string]: unknown;
    } & string[];
    /**
     * Globally unique identifier of this standard. Typically represented as a URI government/regulation URI
     */
    id: string;
    /**
     * Name of this regulation as defined by the regulator.
     */
    name: string;
    [k: string]: unknown;
  }[];
  /**
   * List of references to standards to which conformity is claimed claimed for this product
   */
  referenceStandard?: {
    type?: {
      [k: string]: unknown;
    } & string[];
    /**
     * Globally unique identifier of this standard. Typically represented as a URI issuer/standard URI
     */
    id: string;
    /**
     * Name for this standard
     */
    name: string;
    [k: string]: unknown;
  }[];
  /**
   * That date on which the claimed performance is applicable.
   */
  claimDate: string;
  applicablePeriod?: Period1;
  /**
   * The claimed performance level
   */
  claimedPerformance: Performance[];
  /**
   * A URI pointing to the evidence supporting the claim. SHOULD be a URL to a UNTP Digital Conformity Credential (DCC)
   */
  evidence?: Link[];
  /**
   * The conformity topic category for this assessment
   */
  conformityTopic: ConformityTopic[];
}
/**
 * The applicable reporting period for this facility record.
 */
export interface Period1 {
  type?: {
    [k: string]: unknown;
  } & string[];
  /**
   * The period start date
   */
  startDate: string;
  /**
   * The period end date
   */
  endDate: string;
  /**
   * Additional information relevant to this reporting period
   */
  periodInformation?: string;
}
/**
 * A claimed, assessed, or required performance level defined either by a scoring system or a numeric measure. When a numeric measure is provided, the metric classifying the measurement is required. When only a score is provided, the scoring framework is discoverable via the conformity scheme or criterion.
 */
export interface Performance {
  type?: {
    [k: string]: unknown;
  } & string[];
  /**
   * The metric (eg material emissions intensity CO2e/Kg or percentage of young workers) that is measured.
   */
  metric?: {
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
  measure?: Measure1;
  score?: Score;
}
/**
 * The measured performance value
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
/**
 * A performance score (eg "AA") drawn from a scoring framework defined by the scheme or criterion.
 */
export interface Score {
  type?: {
    [k: string]: unknown;
  } & string[];
  /**
   * The coded value for this score (eg "AAA")
   */
  code: string;
  /**
   * The ranking of this score within the scoring framework - using an integer where "1" is the highest rank.
   */
  rank?: number;
  /**
   * A description of the meaning of this score.
   */
  definition?: string;
}
/**
 * The UNTP standard classification scheme for conformity topic.  see http://vocabulary.uncefact.org/ConformityTopic
 */
export interface ConformityTopic {
  type?: {
    [k: string]: unknown;
  } & string[];
  /**
   * The unique identifier for this conformity topic
   */
  id: string;
  /**
   * The human readable name for this conformity topic.
   */
  name: string;
  /**
   * The rich definition of this conformity topic.
   */
  definition?: string;
}
