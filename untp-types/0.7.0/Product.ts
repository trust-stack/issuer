/* eslint-disable */
/**
 * UNTP 0.7.0 types generated from JSON Schema. Do not edit by hand.
 * Source: src/untp/schemas/0.7.0/Product.json
 * Regenerate: pnpm run generate:untp-types
 */

/**
 * The ProductInformation class encapsulates detailed information regarding a specific product, including its identification details, manufacturer, and other pertinent details.
 */
export interface Product {
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
   * Description of the product.
   */
  description?: string;
  /**
   * The identifier scheme for this product.  Eg a GS1 GTIN or an AU Livestock NLIS, or similar. If self issued then use the party ID of the issuer.
   */
  idScheme: {
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
  /**
   * The identification granularity for this product (item, batch, model)
   */
  idGranularity: 'model' | 'batch' | 'item';
  productImage?: Link;
  characteristics?: Characteristics;
  /**
   * A code representing the product's class, typically using the UN CPC (United Nations Central Product Classification) https://unstats.un.org/unsd/classifications/Econ/cpc
   */
  productCategory: Classification[];
  /**
   * A list of links to documents providing additional product information. Documents that support a conformity claim (e.g. permits or certificates) SHOULD be referenced as claim evidence rather than here.
   */
  relatedDocument?: Link1[];
  /**
   * A list of parties with a defined relationship to this product
   */
  relatedParty?: PartyRole[];
  /**
   * The Facility where the product batch was produced / manufactured.
   */
  producedAtFacility: {
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
  };
  /**
   * The ISO 8601 date on which the product batch or individual serialised item was manufactured.
   */
  productionDate?: string;
  countryOfProduction: Country2;
  dimensions?: Dimension;
  /**
   * A list of materials provenance objects providing details on the origin and mass fraction of materials of the product or batch.
   */
  materialProvenance?: Material[];
  packaging?: Package;
  /**
   * An array of labels that may appear on the product such as certification marks or regulatory labels.
   */
  productLabel?: Image1[];
  /**
   * A list of performance claims (eg emissions intensity) for this product.
   */
  performanceClaim?: Claim[];
}
/**
 * Reference information (location, type, name) of an image of the product.
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
 * A set of indusutry specific product information.
 */
export interface Characteristics {
  type?: {
    [k: string]: unknown;
  } & string[];
  [k: string]: unknown;
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
 * The country in which this item was produced / manufactured.using ISO-3166 code and name.
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
 * The physical dimensions of the product. Not every dimension is relevant to every products.  For example bulk materials may have weight and volume but not length, width, or height."weight":{"value":10, "unit":"KGM"}
 */
export interface Dimension {
  type?: {
    [k: string]: unknown;
  } & string[];
  weight?: Measure;
  length?: Measure1;
  width?: Measure2;
  height?: Measure3;
  volume?: Measure4;
  [k: string]: unknown;
}
/**
 * the weight of the product. EG {"value":10, "unit":"KGM"}
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
 * The length of the product or packaging eg {"value":840, "unit":"MMT"}
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
 * The width of the product or packaging. eg {"value":150, "unit":"MMT"}
 */
export interface Measure2 {
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
 * The height of the product or packaging. eg {"value":220, "unit":"MMT"}
 */
export interface Measure3 {
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
 * The displacement volume of the product. eg {"value":7.5, "unit":"LTR"}
 */
export interface Measure4 {
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
  mass?: Measure5;
  /**
   * Mass fraction of this material that is recycled (eg 50% recycled Lithium)
   */
  recycledMassFraction?: number;
  /**
   * Indicates whether this material is hazardous. If true then the materialSafetyInformation property must be present
   */
  hazardous?: boolean;
  symbol?: Image;
  materialSafetyInformation?: Link2;
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
export interface Measure5 {
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
export interface Link2 {
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
 * The packaging for this product.
 */
export interface Package {
  type?: {
    [k: string]: unknown;
  } & string[];
  /**
   * Description of the packaging.
   */
  description: string;
  dimensions: Dimension1;
  /**
   * materials used for the packaging.
   */
  materialUsed: Material[];
  /**
   * An array of package labels that may appear on the packaging together with their meaning. Use for small images that represent certification marks or regulatory requirements. Large images should be linked as evidence to claims.
   */
  packageLabel?: Image1[];
  /**
   * conformity claims made about the packaging.
   */
  performanceClaim?: Claim[];
}
/**
 * dimensions of the packaging
 */
export interface Dimension1 {
  type?: {
    [k: string]: unknown;
  } & string[];
  weight?: Measure;
  length?: Measure1;
  width?: Measure2;
  height?: Measure3;
  volume?: Measure4;
  [k: string]: unknown;
}
/**
 * A binary image encoded as base64 text and embedded into the data.  Use this for small images like certification trust marks or regulated labels.  Large impages should be external links.
 */
export interface Image1 {
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
  applicablePeriod?: Period;
  /**
   * The claimed performance level
   */
  claimedPerformance: Performance[];
  /**
   * A URI pointing to the evidence supporting the claim. SHOULD be a URL to a UNTP Digital Conformity Credential (DCC)
   */
  evidence?: Link1[];
  /**
   * The conformity topic category for this assessment
   */
  conformityTopic: ConformityTopic[];
}
/**
 * The applicable reporting period for this facility record.
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
  measure?: Measure6;
  score?: Score;
}
/**
 * The measured performance value
 */
export interface Measure6 {
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
