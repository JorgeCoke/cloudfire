import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { GetHealthResponse } from "../../types/health.controller.types";
import { openApiResponse } from "../utils/zod-to-json-openapi";

const basePath = "/health";

const HealthController = new OpenAPIHono().openapi(
	createRoute({
		tags: [basePath],
		method: "get",
		path: `${basePath}`,
		responses: {
			...openApiResponse(GetHealthResponse, 200, "Retrieve service status"),
		},
	}),
	async (c) => {
		return c.json({ status: "ok" }, 200);
	},
);

export default HealthController;
