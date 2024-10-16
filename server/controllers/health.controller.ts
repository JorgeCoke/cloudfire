import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { GetHealthResponse } from "../../types/health-controller.types";
import { openApiResponse } from "../lib/zod-to-json-openapi";
import type { Bindings } from "../lib/bindings";

const basePath = "/health";

const HealthController = new OpenAPIHono<{ Bindings: Bindings }>().openapi(
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
