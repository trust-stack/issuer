import { describe, expect, it } from 'vitest';
import { validateCredentialSubject } from './untp.validation';

describe('validateCredentialSubject', () => {
  describe('DPP (Product)', () => {
    const validProduct = {
      id: 'https://id.example.com/product/test-001',
      name: 'Test Product',
      idScheme: { id: 'https://id.example.com', name: 'Example ID Scheme' },
      idGranularity: 'model',
      productCategory: [
        {
          code: '46410',
          name: 'Primary cells',
          schemeId: 'https://unstats.un.org/unsd/classifications/Econ/cpc/',
          schemeName: 'UN CPC',
        },
      ],
      producedAtFacility: { id: 'https://facility.example.com/fac-001', name: 'Example Factory' },
      countryOfProduction: { countryCode: 'DE' },
    };

    it('accepts a valid Product', () => {
      expect(validateCredentialSubject('0.7.0', 'dpp', validProduct)).toEqual({ valid: true });
    });

    it('rejects when required field is missing', () => {
      const { name, ...incomplete } = validProduct;
      const result = validateCredentialSubject('0.7.0', 'dpp', incomplete);
      expect(result.valid).toBe(false);
      if (!result.valid) expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('DCC (ConformityAttestation)', () => {
    const validAttestation = {
      id: 'https://example.com/attestation/001',
      name: 'Test Certification',
      assessorLevel: '3rdParty',
      assessmentLevel: 'authority-benchmark',
      attestationType: 'certification',
      issuedToParty: { id: 'did:web:example.com', name: 'Test Corp' },
      referenceScheme: { id: 'https://example.com/scheme', name: 'Test Scheme' },
    };

    it('accepts a valid ConformityAttestation', () => {
      expect(validateCredentialSubject('0.7.0', 'dcc', validAttestation)).toEqual({ valid: true });
    });

    it('rejects invalid enum value', () => {
      const result = validateCredentialSubject('0.7.0', 'dcc', {
        ...validAttestation,
        assessorLevel: 'invalid',
      });
      expect(result.valid).toBe(false);
    });
  });

  describe('DTE (LifecycleEvents)', () => {
    const validMoveEvent = {
      id: 'https://example.com/events/move-001',
      name: 'Test Move',
      eventDate: '2025-03-01T08:00:00Z',
      activityType: {
        code: 'shipping',
        name: 'Shipping',
        schemeId: 'https://ref.gs1.org/cbv/BizStep',
        schemeName: 'GS1 CBV',
      },
      movedProduct: [
        { product: { id: 'https://example.com/p/1', name: 'Test', idGranularity: 'model' } },
      ],
      fromFacility: { id: 'https://example.com/f/1', name: 'Fac A' },
      toFacility: { id: 'https://example.com/f/2', name: 'Fac B' },
    };

    it('accepts a valid MoveEvent array', () => {
      expect(validateCredentialSubject('0.7.0', 'dte', [validMoveEvent])).toEqual({ valid: true });
    });

    it('rejects empty array', () => {
      const result = validateCredentialSubject('0.7.0', 'dte', []);
      expect(result.valid).toBe(false);
    });

    it('rejects event with missing required field', () => {
      const { eventDate, ...incomplete } = validMoveEvent;
      const result = validateCredentialSubject('0.7.0', 'dte', [incomplete]);
      expect(result.valid).toBe(false);
    });
  });

  describe('DFR (Facility)', () => {
    const validFacility = {
      id: 'https://example.com/fac/001',
      name: 'Test Facility',
      countryOfOperation: { countryCode: 'DE' },
      processCategory: [
        { code: '14110', name: 'Copper', schemeId: 'https://unstats.un.org/', schemeName: 'CPC' },
      ],
      locationInformation: { geoLocation: { latitude: -12.17, longitude: 26.4 } },
      address: {
        streetAddress: '123 Main',
        postalCode: '10101',
        addressLocality: 'Berlin',
        addressRegion: 'Berlin',
        addressCountry: { countryCode: 'DE' },
      },
    };

    it('accepts a valid Facility', () => {
      expect(validateCredentialSubject('0.7.0', 'dfr', validFacility)).toEqual({ valid: true });
    });

    it('rejects when address is missing', () => {
      const { address, ...incomplete } = validFacility;
      const result = validateCredentialSubject('0.7.0', 'dfr', incomplete);
      expect(result.valid).toBe(false);
    });
  });

  describe('DIA (RegisteredIdentity)', () => {
    const validIdentity = {
      id: 'did:web:example.com',
      registeredName: 'Test Corp',
      registeredId: 'REF-001',
      registeredDate: '1985-06-15',
      idScheme: { id: 'https://example.com/register', name: 'Test Register' },
      registerType: 'business',
    };

    it('accepts a valid RegisteredIdentity', () => {
      expect(validateCredentialSubject('0.7.0', 'dia', validIdentity)).toEqual({ valid: true });
    });

    it('rejects invalid registerType enum', () => {
      const result = validateCredentialSubject('0.7.0', 'dia', {
        ...validIdentity,
        registerType: 'invalid',
      });
      expect(result.valid).toBe(false);
    });
  });

  describe('unknown version/type', () => {
    it('returns error for unregistered version', () => {
      const result = validateCredentialSubject('9.9.9', 'dpp', {});
      expect(result.valid).toBe(false);
      if (!result.valid) expect(result.errors[0]).toContain('No schema registered');
    });
  });
});
