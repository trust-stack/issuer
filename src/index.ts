import {Hono} from "hono";
import credentialRoutes from "./credentials/routes";
import identifierRoutes from "./identifiers/routes";
import {requestContext} from "./request-context";

const app = new Hono();

app.use(requestContext);

app.get("/", (c) => c.text("Hello World"));
app.route("/dids", identifierRoutes);
app.route("/credentials", credentialRoutes);

export default app;
