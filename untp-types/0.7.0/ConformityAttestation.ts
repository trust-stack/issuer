/* eslint-disable */
/**
 * UNTP 0.7.0 types generated from JSON Schema. Do not edit by hand.
 * Source: src/untp/schemas/0.7.0/ConformityAttestation.json
 * Regenerate: pnpm run generate:untp-types
 */

/**
 * A conformity attestation issued by a competent body that defines one or more assessments (eg carbon intensity) about a product (eg battery) against a specification (eg LCA method) defined in a standard or regulation.
 */
export interface ConformityAttestation {
  type?: {
    [k: string]: unknown;
  } & string[];
  /**
   * Globally unique identifier of this attestation. Typically represented as a URI AssessmentBody/CertificateID URI or a UUID
   */
  id: string;
  /**
   * Name of this attestation - typically the title of the certificate.
   */
  name: string;
  /**
   * Description of this attestation.
   */
  description?: string;
  /**
   * Assurance code pertaining to assessor (relation to the object under assessment)
   */
  assessorLevel:
    | 'self'
    | 'commercial'
    | 'buyer'
    | 'membership'
    | 'unspecified'
    | '3rdParty'
    | 'hybrid';
  /**
   * Assurance pertaining to assessment (any authority or support for the assessment process)
   */
  assessmentLevel:
    | 'authority-benchmark'
    | 'authority-mandate'
    | 'authority-globalmra'
    | 'authority-peer'
    | 'authority-extended-mra'
    | 'scheme-self'
    | 'scheme-cab'
    | 'no-endorsement';
  /**
   * The type of criterion (optional or mandatory).
   */
  attestationType:
    | 'certification'
    | 'declaration'
    | 'inspection'
    | 'testing'
    | 'verification'
    | 'validation'
    | 'calibration';
  /**
   * The party to whom the conformity attestation was issued.
   */
  issuedToParty: {
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
    /**
     * Description of the party including function and other names.
     */
    description?: string;
    [k: string]: unknown;
  };
  /**
   * The authority under which a conformity claim is issued.  For example a national accreditation authority may authorise a test lab to issue test certificates about a product against a standard.
   */
  authorisation?: Endorsement[];
  /**
   * The conformity scheme under which this attestation is made.
   */
  referenceScheme: {
    type?: {
      [k: string]: unknown;
    } & string[];
    /**
     * Globally unique identifier of this conformity scheme. Typically represented as a URI SchemeOwner/SchemeName URI
     */
    id: string;
    /**
     * Name of this scheme as defined by the scheme owner.
     */
    name: string;
    [k: string]: unknown;
  };
  /**
   * The specific versioned conformity profile (comprising a set of versioned criteria) against which this conformity attestation is made.
   */
  referenceProfile?: {
    type?: {
      [k: string]: unknown;
    } & string[];
    /**
     * Globally unique identifier of this context specific conformity profile. Typically represented as a URI SchemeOwner/profileID URI
     */
    id: string;
    /**
     * Name of this conformity profile as defined by the scheme owner.
     */
    name: string;
    [k: string]: unknown;
  };
  profileScore?: Score;
  conformityCertificate?: Link1;
  auditableEvidence?: Link2;
  trustmark?: Image1;
  /**
   * A list of individual assessment made under this attestation.
   */
  conformityAssessment?: ConformityAssessment[];
}
/**
 * The authority under which a conformity claim is issued.  For example a national accreditation authority may authorise a test lab to issue test certificates about a product against a standard.
 */
export interface Endorsement {
  type?: {
    [k: string]: unknown;
  } & string[];
  /**
   * The name of the accreditation.
   */
  name: string;
  trustmark?: Image;
  /**
   * The competent authority that issued the accreditation.
   */
  issuingAuthority: {
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
  };
  endorsementEvidence?: Link;
  [k: string]: unknown;
}
/**
 * The trust mark image awarded by the AB to the CAB to indicate accreditation.
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
 * The evidence that supports the authority under which the attestation is issued - for an example an accreditation certificate.
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
 * The overall performance against a scheme level performance measurement framework for the referenced profile or scheme.
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
 * A reference to the human / printable version of this conformity attestation - typically represented as a PDF document. The document may have more details than are represented in the digital attestation.
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
 * Auditable evidence supporting this assessment such as raw measurements, supporting documents. This is usually private data and would normally be encrypted.
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
 * A trust mark as a small binary image encoded as base64 with a description.  Maye be displayed on the conformity credential rendering.
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
 * A specific assessment about the product or facility against a specific specification.  Eg the carbon intensity of a given product or batch.
 */
export interface ConformityAssessment {
  type?: {
    [k: string]: unknown;
  } & string[];
  /**
   * Globally unique identifier of this assessment. Typically represented as a URI AssessmentBody/Assessment URI or a UUID
   */
  id: string;
  /**
   * Name of this assessment - typically similar or the same as the referenced criterion name.
   */
  name: string;
  /**
   * Description of this conformity assessment
   */
  description?: string;
  /**
   * The specification against which the assessment is made.
   */
  assessmentCriteria: {
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
   * The date on which this assessment was made.
   */
  assessmentDate: string;
  /**
   * The assessed performance against criteria.
   */
  assessedPerformance: Performance[];
  /**
   * The product which is the subject of this assessment.
   */
  assessedProduct?: ProductVerification[];
  /**
   * The facility which is the subject of this assessment.
   */
  assessedFacility?: FacilityVerification[];
  /**
   * An organisation that is the subject of this assessment.
   */
  assessedOrganisation?: {
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
   * The reference to the standard that defines the specification / criteria
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
   * The reference to the regulation that defines the assessment criteria
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
   * A list of specific conditions that constrain this conformity assessment. For example a specific jurisdiction, material type, or test method.
   */
  specifiedCondition?: string[];
  /**
   * Evidence to support this specific assessment.
   */
  evidence?: Link3[];
  /**
   * The UNTP conformity topic used to categorise this assessment. Should match the topic defined by the scheme criterion.
   */
  conformityTopic: ConformityTopic[];
  /**
   * An indicator (true / false) whether the outcome of this assessment is conformant to the requirements defined by the standard or criterion.
   */
  conformance?: boolean;
  [k: string]: unknown;
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
  measure?: Measure;
  score?: Score1;
}
/**
 * The measured performance value
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
 * A performance score (eg "AA") drawn from a scoring framework defined by the scheme or criterion.
 */
export interface Score1 {
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
 * The product which is the subject of this conformity assessment
 */
export interface ProductVerification {
  type?: {
    [k: string]: unknown;
  } & string[];
  /**
   * The product, serial or batch that is the subject of this assessment
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
  /**
   * Indicates whether the conformity assessment body has verified the identity product that is the subject of the assessment.
   */
  idVerifiedByCAB?: boolean;
  [k: string]: unknown;
}
/**
 * The facility which is the subject of this conformity assessment
 */
export interface FacilityVerification {
  type?: {
    [k: string]: unknown;
  } & string[];
  /**
   * The facility which is the subject of this assessment
   */
  facility: {
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
   * Indicates whether the conformity assessment body has verified the identity of the facility which is the subject of the assessment.
   */
  idVerifiedByCAB?: boolean;
  [k: string]: unknown;
}
/**
 * A structure to provide a URL link plus metadata associated with the link.
 */
export interface Link3 {
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
