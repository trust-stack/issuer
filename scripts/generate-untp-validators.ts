import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import standaloneCode from 'ajv/dist/standalone/index.js';
import { UNTP_VERSIONS } from '../src/untp/registry.js';

const repoRoot = path.resolve(import.meta.dirname, '..');

/** ajv-formats injects CommonJS `require()` into standalone code; Workers / ESM bundlers need imports. */
const AJV_FORMATS_REQUIRE = /require\(['"]ajv-formats\/dist\/formats['"]\)\.fullFormats/g;

function patchStandaloneForEsmFormats(source: string): string {
  if (!source.includes('ajv-formats/dist/formats')) return source;
  let body = source.replace(AJV_FORMATS_REQUIRE, 'fullFormats');
  body = body.replace(/^["']use strict["'];?\s*/, '');
  const importLine = "import { fullFormats } from 'ajv-formats/dist/formats.js';\n";
  return importLine + body;
}

function pascal(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function exportName(code: string, eventPart?: string): string {
  return `validate${pascal(code)}${eventPart ? pascal(eventPart) : ''}`;
}

async function writeStandaloneValidator(
  outDir: string,
  baseName: string,
  schema: Record<string, unknown>,
): Promise<void> {
  const ajv = new Ajv2020({
    allErrors: true,
    strict: false,
    code: { source: true, esm: true },
  });
  addFormats(ajv);
  const validate = ajv.compile(schema);
  const code = patchStandaloneForEsmFormats(standaloneCode(ajv, validate));
  // Machine-generated: not valid strict TypeScript; skip checking (see untp.validation.ts types).
  await writeFile(path.join(outDir, `${baseName}.ts`), `// @ts-nocheck\n${code}`, 'utf8');
}

async function main() {
  for (const versionConfig of UNTP_VERSIONS) {
    const outDir = path.join(repoRoot, 'src/untp/validators-generated', versionConfig.version);
    await mkdir(outDir, { recursive: true });

    const indexLines: string[] = [];

    for (const credType of versionConfig.credentialTypes) {
      const schemas = Array.isArray(credType.subjectSchema)
        ? credType.subjectSchema
        : [credType.subjectSchema];

      if (schemas.length === 1) {
        const fileBase = credType.code;
        await writeStandaloneValidator(outDir, fileBase, schemas[0] as Record<string, unknown>);
        const name = exportName(credType.code);
        indexLines.push(`export { default as ${name} } from './${fileBase}.js';`);
      } else {
        const parts = ['make', 'move', 'modify'] as const;
        if (schemas.length !== parts.length) {
          throw new Error(
            `Expected ${parts.length} DTE event schemas for ${versionConfig.version}, got ${schemas.length}`,
          );
        }
        for (let i = 0; i < schemas.length; i++) {
          const fileBase = `${credType.code}-${parts[i]}`;
          await writeStandaloneValidator(outDir, fileBase, schemas[i] as Record<string, unknown>);
          const name = exportName(credType.code, parts[i]);
          indexLines.push(`export { default as ${name} } from './${fileBase}.js';`);
        }
      }
    }

    indexLines.sort();
    await writeFile(path.join(outDir, 'index.ts'), `${indexLines.join('\n')}\n`, 'utf8');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
