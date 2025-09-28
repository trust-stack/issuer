require('ts-node/register');

const {writeFileSync} = require('node:fs');
const {resolve} = require('node:path');
const {OpenAPIHono} = require('@hono/zod-openapi');
const identifierApp = require('../src/identifiers/identifier.handler').default;

const app = new OpenAPIHono();

app.route('/identifiers', identifierApp);

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
