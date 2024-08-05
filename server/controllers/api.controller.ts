import { OpenAPIHono } from "@hono/zod-openapi";
import AuthController from "./auth.controller";
import HealthController from "./health.controller";

const ApiController = new OpenAPIHono()
	.route("/api/v1", AuthController)
	.route("/api/v1", HealthController)
	// TODO: Secure with basic auth, move variables to ENV variables, get verison from package.json
	.doc31("/api/v1/swagger/spec", {
		openapi: "3.1.0",
		info: { title: "Cloudfire API spec", version: "1.0.0" },
	});

export default ApiController;
