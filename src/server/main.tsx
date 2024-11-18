import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono } from "@hono/zod-openapi";
import { bodyLimit } from "hono/body-limit";
import { cors } from "hono/cors";
import { csrf } from "hono/csrf";
import { HTTPException } from "hono/http-exception";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { timeout } from "hono/timeout";
import { trimTrailingSlash } from "hono/trailing-slash";
import { renderToString } from "react-dom/server";
import type { CfEnv } from "./env";
import { NotFoundException } from "./lib/http-exceptions";
import { SwaggerSpecBasicAuthMiddleare } from "./lib/swagger-spec-basic-auth-middleware";
import { ApiVersion, Router, SwaggerSpecUrl, SwaggerUiUrl } from "./router";

const server = new OpenAPIHono<{ Bindings: CfEnv }>()
	// Global middlewares here
	.use(logger())
	.use(bodyLimit({ maxSize: 50 * 1024 })) // 50 kb
	.use(timeout(5000)) // 5 sec
	.use(cors())
	.use(secureHeaders())
	.use(trimTrailingSlash())
	.use(csrf())
	// Configure Swagger + Basic Auth
	.on("GET", `${ApiVersion}${SwaggerSpecUrl}`, SwaggerSpecBasicAuthMiddleare)
	.get(
		`${ApiVersion}${SwaggerUiUrl}`,
		swaggerUI({ url: `${ApiVersion}${SwaggerSpecUrl}` }),
	)
	// Add Api Router
	.route(ApiVersion, Router)
	// Api Not Found Error handler
	.all(`${ApiVersion}/*`, () => {
		throw new NotFoundException();
	});

if (import.meta.env) {
	// Serve HTML (VITE development enviroment only)
	server.get("*", (c) => {
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
					<body>
						<div id="root" />
						<script type="module" src="/src/client/main.tsx" />
					</body>
				</html>,
			),
		);
	});
}

// Throw Not Found for undefined paths
server.notFound(() => {
	throw new NotFoundException();
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
