import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import type { Env } from "../../env";
import { openApiResponse } from "../../lib/zod-to-json-openapi";
import { GetHealthResponseDto } from "./health.dtos";

const basePath = "/health";

export const HealthController = new OpenAPIHono<{ Bindings: Env }>().openapi(
	createRoute({
		tags: [basePath],
		method: "get",
		path: `${basePath}`,
		responses: {
			...openApiResponse(GetHealthResponseDto, 200, "Retrieve service status"),
		},
	}),
	async (c) => {
		return c.json({ status: "ok" }, 200);
	},
);
