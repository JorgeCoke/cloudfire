import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { Env } from "../../env";
import { GetHealthResponseDto } from "./health.dtos";
import { openApiResponse } from "../../lib/zod-to-json-openapi";

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
  }
);
