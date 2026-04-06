import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { compileFromFile } from 'json-schema-to-typescript';

const repoRoot = path.resolve(import.meta.dirname, '..');
const schemasRoot = path.join(repoRoot, 'src/untp/schemas');
const outRoot = path.join(repoRoot, 'untp-types');

async function main() {
  const versions = (await readdir(schemasRoot, { withFileTypes: true }))
    .filter((e) => e.isDirectory())
    .map((e) => e.name);

  for (const version of versions) {
    const schemaDir = path.join(schemasRoot, version);
    const outDir = path.join(outRoot, version);
    await mkdir(outDir, { recursive: true });

    const jsonFiles = (await readdir(schemaDir)).filter((f) => f.endsWith('.json'));
    const rootNames: string[] = [];

    for (const file of jsonFiles) {
      const base = path.basename(file, '.json');
      rootNames.push(base);
      const absSchema = path.join(schemaDir, file);
      const ts = await compileFromFile(absSchema, {
        cwd: schemaDir,
        bannerComment: `/* eslint-disable */
/**
 * UNTP ${version} types generated from JSON Schema. Do not edit by hand.
 * Source: src/untp/schemas/${version}/${file}
 * Regenerate: pnpm run generate:untp-types
 */
`,
      });
      await writeFile(path.join(outDir, `${base}.ts`), ts, 'utf8');
    }

    rootNames.sort();
    const indexLines = rootNames.map((name) => `export type { ${name} } from './${name}.js';`);
    await writeFile(path.join(outDir, 'index.ts'), `${indexLines.join('\n')}\n`, 'utf8');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
