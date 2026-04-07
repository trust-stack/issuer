import type { ErrorObject } from 'ajv';
import * as untpValidators070 from './validators-generated/0.7.0/index.js';

export type ValidateResult = { valid: true } | { valid: false; errors: string[] };

/** Shape of Ajv standalone `compile()` output (not assignable to `ValidateFunction` in types). */
type StandaloneValidator = ((data: unknown) => boolean) & {
  errors?: ErrorObject[] | null;
};

/**
 * Precompiled Ajv validators (standalone code, no `new Function`).
 * Safe for Cloudflare Workers and other contexts that disallow eval / dynamic codegen.
 */
const validators = new Map<string, StandaloneValidator | StandaloneValidator[]>();
let initialized = false;

function key(version: string, code: string): string {
  return `${version}:${code}`;
}

/** Maps each supported UNTP version to credential validators from generated modules. */
const VERSION_VALIDATORS: Record<
  string,
  Record<string, StandaloneValidator | StandaloneValidator[]>
> = {
  '0.7.0': {
    dpp: untpValidators070.validateDpp,
    dcc: untpValidators070.validateDcc,
    dfr: untpValidators070.validateDfr,
    dia: untpValidators070.validateDia,
    dte: [
      untpValidators070.validateDteMake,
      untpValidators070.validateDteMove,
      untpValidators070.validateDteModify,
    ],
  },
};

function init(): void {
  if (initialized) return;

  for (const [version, byCode] of Object.entries(VERSION_VALIDATORS)) {
    for (const [code, v] of Object.entries(byCode)) {
      validators.set(key(version, code), v);
    }
  }

  initialized = true;
}

function validateSingle(validate: StandaloneValidator, data: unknown): ValidateResult {
  const valid = validate(data);
  if (valid) return { valid: true };
  const errors = (validate.errors ?? []).map((err) => `${err.instancePath}: ${err.message}`);
  return { valid: false, errors };
}

function validateAgainstAny(
  fns: StandaloneValidator[],
  data: unknown,
  prefix: string,
): ValidateResult {
  for (const fn of fns) {
    if (fn(data)) return { valid: true };
  }
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

  if (Array.isArray(validator)) {
    return validateAgainstAny(validator, data, '');
  }

  return validateSingle(validator, data);
}
