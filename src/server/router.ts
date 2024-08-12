import { OpenAPIHono } from "@hono/zod-openapi";
import { AuthController } from "./controllers/auth.controller";
import { HealthController } from "./controllers/health.controller";
import { UsersController } from "./controllers/users.controller";
import type { CfEnv } from "./lib/cf-env";

export const SwaggerUrl = "/api/v1/swagger";

export const Router = new OpenAPIHono<{ Bindings: CfEnv }>()
	// Add other controllers here
	.route("/api/v1", AuthController)
	.route("/api/v1", UsersController)
	.route("/api/v1", HealthController)
	.doc31(`${SwaggerUrl}/spec`, {
		openapi: "3.1.0",
		info: { title: "Cloudfire API spec", version: "1.0.0" },
	}); // Server OpenApi spec

Router.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
	type: "http",
	scheme: "bearer",
});
