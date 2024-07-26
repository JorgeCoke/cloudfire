import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { bodyLimit } from "hono/body-limit";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";
import { secureHeaders } from "hono/secure-headers";
import { timeout } from "hono/timeout";
import { trimTrailingSlash } from "hono/trailing-slash";
import ApiController from "./controllers/api.controller";

const server = new OpenAPIHono()
	.use(logger())
	.use(bodyLimit({ maxSize: 50 * 1024 })) // 50 kb
	.use(cors())
	.use(secureHeaders())
	.use(timeout(10))
	.use(trimTrailingSlash())
	.use(prettyJSON()) // TODO: Disable on PROD
	.get("/api/v1/swagger/api-docs", swaggerUI({ url: "/api/v1/swagger/spec" }))
	.route("/", ApiController);

server.notFound(() => {
	throw new HTTPException(404, { message: "Not found" });
});
server.onError((err, c) => {
	console.error(`❌ ${err}`);
	return err instanceof HTTPException
		? c.json({ message: err.message }, err.status)
		: c.json({ message: `${err}` }, 500); // TODO: Return unhandled errors info in DEV environments only, return "Internal Server Error" message otherwise (PROD)
});

export default server;
export type ServerType = typeof server;
