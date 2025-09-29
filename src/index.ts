import { OpenAPIHono } from '@hono/zod-openapi';
import { contextStorage } from 'hono/context-storage';
import identifiers from './identifiers/identifiers.handler';
import { requestContext } from './request-context';

const app = new OpenAPIHono();

app.use(contextStorage());
app.use(requestContext);

app.get('/', (c) => c.text('Hello World'));
app.route('/identifiers', identifiers);

export default app;
