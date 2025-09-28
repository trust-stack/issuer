import { OpenAPIHono } from '@hono/zod-openapi';
import identifiers from './identifiers/identifier.handler';
import { requestContext } from './request-context';

const app = new OpenAPIHono();

app.use(requestContext);

app.get('/', (c) => c.text('Hello World'));
app.route('/dids', identifiers);

export default app;
