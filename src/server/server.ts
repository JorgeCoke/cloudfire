import { swaggerUI } from "@hono/swagger-ui";
import { bodyLimit } from "hono/body-limit";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { timeout } from "hono/timeout";
import { trimTrailingSlash } from "hono/trailing-slash";
import type { CfEnv } from "../types/cf-env";
import { csrf } from "hono/csrf";
import { HTTPException } from "hono/http-exception";
import { count } from "drizzle-orm";
import { usersT } from "./lib/db/schemas/users.table";
import { drizzle } from "drizzle-orm/d1";
import { seed } from "./lib/db/seed";
import { Router, SwaggerUrl } from "./router";
import { Hono } from "hono";
import { HttpException } from "../types/controllers/shared";

export const server = new Hono<{ Bindings: CfEnv }>()
	// Global middlewares here
	.use(logger())
	.use(bodyLimit({ maxSize: 50 * 1024 })) // 50 kb
	.use(timeout(5000)) // 5 sec
	.use(cors())
	.use(secureHeaders())
	.use(trimTrailingSlash())
	.use(csrf())
	.on("GET", `${SwaggerUrl}/spec`, async (c, next) => {
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
	.get(`${SwaggerUrl}/api-docs`, swaggerUI({ url: `${SwaggerUrl}/spec` })) // Serve SwaggerUI
	.route("/", Router);

// Throw Not Found for undefined paths
server.notFound(() => {
	throw new HttpException({
		status: 404,
		message: "Endpoint or method not found",
	});
});

// Global error handler
server.onError((err, c) => {
	console.error(`❌ ${err}`);
	return err instanceof HTTPException
		? c.json({ message: err.message }, err.status)
		: c.json(
				{
					message:
						c.env.ENV === "production" ? "Internal Server Error" : `${err}`,
				},
				500,
			);
});
