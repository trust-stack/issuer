import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createApp } from '../src';
import { defaultSqliteOptions } from '../src/infra/sqlite/options';

const app = createApp(defaultSqliteOptions());

const document = app.getOpenAPIDocument({
  openapi: '3.0.0',
  info: {
    title: 'Issuer API',
    version: '1.0.0',
  },
});

const outputPath = resolve(process.cwd(), 'openapi.json');
writeFileSync(outputPath, JSON.stringify(document, null, 2));

console.log(`OpenAPI schema generated at ${outputPath}`);
