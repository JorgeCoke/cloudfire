import { OpenAPIHono } from "@hono/zod-openapi";
import AuthController from "./auth.controller";
import HealthController from "./health.controller";
import UsersController from "./users.controller";

const ApiController = new OpenAPIHono()
	// Add other controllers here
	.route("/api/v1", AuthController)
	.route("/api/v1", UsersController)
	.route("/api/v1", HealthController)
	.doc31("/api/v1/swagger/spec", {
		openapi: "3.1.0",
		info: { title: "Cloudfire API spec", version: "1.0.0" },
	}); // Server OpenApi spec

export default ApiController;
