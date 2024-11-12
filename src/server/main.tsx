import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { count } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { bodyLimit } from "hono/body-limit";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { timeout } from "hono/timeout";
import { trimTrailingSlash } from "hono/trailing-slash";
import { renderToString } from "react-dom/server";
import type { Env } from "./env";
import { usersT } from "./lib/db/schemas/users";
import { seed } from "./lib/db/seed";
import { HttpException } from "./lib/zod-to-json-openapi";
import { AuthController } from "./routes/auth/auth.controller";
import { HealthController } from "./routes/health/health.controller";
import { UsersController } from "./routes/users/users.controller";

const ApiVersion = "/api/v1";
const BaseSwaggerUrl = `${ApiVersion}/swagger`;
const SpecSwaggerUrl = `${BaseSwaggerUrl}/spec`;
const UiSwaggerUrl = `${BaseSwaggerUrl}/docs`;

export const Router = new OpenAPIHono<{ Bindings: Env }>()
	// Add other controllers here
	.route(ApiVersion, AuthController)
	.route(ApiVersion, UsersController)
	.route(ApiVersion, HealthController)
	.doc31(SpecSwaggerUrl, {
		openapi: "3.1.0",
		info: { title: "Cloudfire API spec", version: "1.0.0" },
	});

Router.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
	type: "http",
	scheme: "bearer",
});

const server = new OpenAPIHono<{ Bindings: Env }>()
	// Global middlewares here
	.use(logger())
	.use(bodyLimit({ maxSize: 50 * 1024 })) // 50 kb
	.use(timeout(5000)) // 5 sec
	.use(cors())
	.use(secureHeaders())
	.use(trimTrailingSlash())
	.use(csrf())
	.on("GET", SpecSwaggerUrl, async (c, next) => {
		// Add basic auth to swagger openapi specification
		const b64auth = (c.req.header("authorization") || "").split(" ")[1] || "";
		const [login, password] = atob(b64auth).toString().split(":");
		if (login === c.env.DOCS_USER && password === c.env.DOCS_PASSWORD) {
			// Run seed if no users found
			const db = drizzle(c.env.DB);
			const [users] = await db.select({ count: count() }).from(usersT);
			if (users.count === 0) {
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
	.get(UiSwaggerUrl, swaggerUI({ url: SpecSwaggerUrl })) // Serve SwaggerUI
	.route("/", Router)
	.all(`${ApiVersion}/*`, async () => {
		throw new HttpException({
			status: 404,
			message: "Endpoint or method not found",
		});
	});

// TODO: Serve app under /app domain
// TODO: Serve static HTML under "/" (static HTML landing page with astro or similar)
server.get("*", (c) => {
	if (!import.meta.env) {
		// Disable from cloudlfare enviroments
		throw new HttpException({
			status: 404,
			message: "Endpoint or method not found",
		});
	}
	// NOTE: Code duplicated here and index.html
	return c.html(
		renderToString(
			<html lang="en">
				<head>
					<meta charSet="utf-8" />
					<link rel="icon" type="image/svg+xml" href="/static/favicon.svg" />
					<meta
						content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
						name="viewport"
					/>
					<title>Cloudfire</title>
				</head>
				<body className="flex flex-col w-full bg-neutral-50">
					<div id="root" />
					<script type="module" src="/src/client/main.tsx" />
				</body>
			</html>,
		),
	);
});

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

export default server;

// TODO: Add integration tests
