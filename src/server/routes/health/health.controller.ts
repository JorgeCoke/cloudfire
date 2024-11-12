import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import type { Env } from "../../env";
import { openApiResponse } from "../../lib/zod-to-json-openapi";
import { GetHealthResponseDto } from "./health.dtos";
import { GetHealthHandler } from "./health.service";

export const HealthBasePath = "/health";

export const GetHealthRoute = createRoute({
	tags: [HealthBasePath],
	method: "get",
	path: `${HealthBasePath}`,
	responses: {
		...openApiResponse(GetHealthResponseDto, 200, "Retrieve service status"),
	},
});

export const HealthController = new OpenAPIHono<{ Bindings: Env }>().openapi(
	GetHealthRoute,
	GetHealthHandler,
);
