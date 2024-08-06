import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { bodyLimit } from "hono/body-limit";
import { cors } from "hono/cors";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { timeout } from "hono/timeout";
import { trimTrailingSlash } from "hono/trailing-slash";
import ApiController from "./controllers/api.controller";
import type { Bindings } from "./lib/bindings";
import { HttpException } from "./lib/custom-http-exception";

// TODO: Add CSRF
// TODO: Add rate limiter
const server = new OpenAPIHono<{ Bindings: Bindings }>()
	.use(logger())
	.use(bodyLimit({ maxSize: 50 * 1024 })) // 50 kb
	.use(timeout(5000)) // 5 sec
	.use(cors())
	.use(secureHeaders())
	.use(trimTrailingSlash())
	.on("GET", "/api/v1/swagger/spec", async (c, next) => {
		const b64auth = (c.req.header("authorization") || "").split(" ")[1] || "";
		const [login, password] = atob(b64auth).toString().split(":");
		if (login === c.env.DOCS_USER && password === c.env.DOCS_PASSWORD) {
			return next();
		}
		c.header("WWW-Authenticate", `Basic realm="${c.env.DOCS_REALM}"`);
		throw new HttpException({
			status: 401,
			message: "Authentication required",
		});
	})
	.get("/api/v1/swagger/api-docs", swaggerUI({ url: "/api/v1/swagger/spec" }))
	.route("/", ApiController);

server.notFound(() => {
	throw new HTTPException(404, { message: "Not found" });
});
server.onError((err, c) => {
	console.error(`❌ ${err}`);
	return err instanceof HTTPException
		? c.json({ message: err.message }, err.status)
		: c.json(
				{
					message: c.env.ENV === "preview" ? `${err}` : "Internal Server Error",
				},
				500,
			);
});

export default server;
export type ServerType = typeof server;

// TODO: Deploy prod/preview
