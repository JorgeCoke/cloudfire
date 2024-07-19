import { Hono } from "hono";
import type { GetHealthResponse } from "../../types/health.controller.types";

const HealthController = new Hono().basePath("/health").get("/", async (c) => {
	// TODO: Maybe types folder is not needed
	const response: GetHealthResponse = { status: "ok" };
	return c.json(response);
});

export default HealthController;
