import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { GetHealthResponse } from "../../types/controllers/health-controller.types";
import { openApiResponse } from "../lib/zod-to-json-openapi";
import type { CfEnv } from "../../types/cf-env";

const basePath = "/health";

export const HealthController = new OpenAPIHono<{ Bindings: CfEnv }>().openapi(
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
