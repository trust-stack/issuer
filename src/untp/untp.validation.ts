import Ajv2020, { type ValidateFunction } from 'ajv/dist/2020';
import addFormats from 'ajv-formats';
import { UNTP_VERSIONS } from './registry';

export type ValidateResult = { valid: true } | { valid: false; errors: string[] };

/**
 * For single-schema types (dpp, dcc, dfr, dia): one ValidateFunction.
 * For multi-schema types (dte): array of ValidateFunctions (one per event type).
 */
const validators = new Map<string, ValidateFunction | ValidateFunction[]>();
let initialized = false;

function key(version: string, code: string): string {
  return `${version}:${code}`;
}

function init(): void {
  if (initialized) return;

  for (const versionConfig of UNTP_VERSIONS) {
    for (const credType of versionConfig.credentialTypes) {
      const schemas = Array.isArray(credType.subjectSchema)
        ? credType.subjectSchema
        : [credType.subjectSchema];

      if (schemas.length === 1) {
        const ajv = new Ajv2020({ allErrors: true, strict: false });
        addFormats(ajv);
        validators.set(key(versionConfig.version, credType.code), ajv.compile(schemas[0]));
      } else {
        // Multiple schemas (DTE events) — compile each in its own AJV instance
        // to avoid $defs collisions, then validate as "any of" at runtime
        const compiled = schemas.map((s) => {
          const ajv = new Ajv2020({ allErrors: true, strict: false });
          addFormats(ajv);
          return ajv.compile(s);
        });
        validators.set(key(versionConfig.version, credType.code), compiled);
      }
    }
  }

  initialized = true;
}

function validateSingle(validate: ValidateFunction, data: unknown): ValidateResult {
  const valid = validate(data);
  if (valid) return { valid: true };
  const errors = (validate.errors ?? []).map((err) => `${err.instancePath}: ${err.message}`);
  return { valid: false, errors };
}

function validateAgainstAny(
  fns: ValidateFunction[],
  data: unknown,
  prefix: string,
): ValidateResult {
  for (const fn of fns) {
    if (fn(data)) return { valid: true };
  }
  // None matched — collect errors from all validators for diagnostic value
  const errors: string[] = [];
  for (const fn of fns) {
    fn(data);
    for (const err of fn.errors ?? []) {
      const msg = `${prefix}${err.instancePath}: ${err.message}`;
      if (!errors.includes(msg)) errors.push(msg);
    }
  }
  return { valid: false, errors };
}

export function validateCredentialSubject(
  version: string,
  code: string,
  data: unknown,
): ValidateResult {
  init();

  const k = key(version, code);
  const validator = validators.get(k);

  if (!validator) {
    return { valid: false, errors: [`No schema registered for ${version}/${code}`] };
  }

  // DTE credentialSubject is an array of events
  if (Array.isArray(data)) {
    if (data.length === 0) {
      return { valid: false, errors: ['credentialSubject array must not be empty'] };
    }

    const fns = Array.isArray(validator) ? validator : [validator];
    const allErrors: string[] = [];

    for (let i = 0; i < data.length; i++) {
      const result =
        fns.length === 1
          ? validateSingle(fns[0], data[i])
          : validateAgainstAny(fns, data[i], `credentialSubject[${i}]`);

      if (!result.valid) {
        allErrors.push(
          ...result.errors.map((e) =>
            e.startsWith(`credentialSubject[${i}]`) ? e : `credentialSubject[${i}]${e}`,
          ),
        );
      }
    }

    return allErrors.length === 0 ? { valid: true } : { valid: false, errors: allErrors };
  }

  // Single object credentialSubject
  if (Array.isArray(validator)) {
    return validateAgainstAny(validator, data, '');
  }

  return validateSingle(validator, data);
}
