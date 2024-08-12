import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { bodyLimit } from "hono/body-limit";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { timeout } from "hono/timeout";
import { trimTrailingSlash } from "hono/trailing-slash";
import ApiController from "./controllers/_api.controller";
import type { Env } from "./lib/env";
import { csrf } from "hono/csrf";
import { HttpException } from "./lib/utils";
import { HTTPException } from "hono/http-exception";
import { count } from "drizzle-orm";
import { usersT } from "./lib/db/schemas/users.table";
import { drizzle } from "drizzle-orm/d1";
import { seed } from "./lib/db/seed";

const server = new OpenAPIHono<{ Bindings: Env }>()
	// Global middlewares here
	.use(logger())
	.use(bodyLimit({ maxSize: 50 * 1024 })) // 50 kb
	.use(timeout(5000)) // 5 sec
	.use(cors())
	.use(secureHeaders())
	.use(trimTrailingSlash())
	.use(csrf())
	.on("GET", "/api/v1/swagger/spec", async (c, next) => {
		// Add basic auth to swagger openapi specification
		const b64auth = (c.req.header("authorization") || "").split(" ")[1] || "";
		const [login, password] = atob(b64auth).toString().split(":");
		if (login === c.env.DOCS_USER && password === c.env.DOCS_PASSWORD) {
			// Run seed if no users found
			const db = drizzle(c.env.DB);
			const totalUsers = await db
				.select({ count: count() })
				.from(usersT)
				.then((res) => res[0].count);
			if (totalUsers === 0) {
				await seed(c);
			}
			return next();
		}
		c.header("WWW-Authenticate", `Basic realm="${c.env.DOCS_REALM}"`);
		throw new HttpException({
			status: 401,
			message: "Authentication required",
		});
	})
	.get("/api/v1/swagger/api-docs", swaggerUI({ url: "/api/v1/swagger/spec" })) // Serve SwaggerUI
	.route("/", ApiController); // Add Controllers

server.notFound(() => {
	// Throw Not Found for undefined paths
	throw new HttpException({
		status: 404,
		message: "Endpoint or method not found",
	});
});
server.onError((err, c) => {
	// Global error handler
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
