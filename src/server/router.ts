import { OpenAPIHono } from "@hono/zod-openapi";
import type { CfEnv } from "./env";
import { AuthController } from "./routes/auth/auth.controller";
import { HealthController } from "./routes/health/health.controller";
import { UsersController } from "./routes/users/users.controller";

export const ApiVersion = "/api/v1";
export const SwaggerSpecUrl = "/swagger/spec";
export const SwaggerUiUrl = "/swagger/docs";

export const Router = new OpenAPIHono<{ Bindings: CfEnv }>()
	.route(ApiVersion, AuthController)
	.route(ApiVersion, UsersController)
	.route(ApiVersion, HealthController)
	.doc31(`${ApiVersion}${SwaggerSpecUrl}`, {
		openapi: "3.1.0",
		info: { title: "Cloudfire API spec", version: "1.0.0" },
	});

Router.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
	type: "http",
	scheme: "bearer",
});
