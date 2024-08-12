import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { GetHealthResponse } from "../../types/controllers/health-controller.types";
import { openApiResponse } from "../lib/zod-to-json-openapi";
import type { Env } from "../lib/env";

const basePath = "/health";

export const HealthErrors = {} as const;

const HealthController = new OpenAPIHono<{ Bindings: Env }>().openapi(
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
