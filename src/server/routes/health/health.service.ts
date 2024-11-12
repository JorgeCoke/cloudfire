import type { AppRouteHandler } from "../../lib/zod-to-json-openapi";
import type { GetHealthRoute } from "./health.controller";

export const GetHealthHandler: AppRouteHandler<typeof GetHealthRoute> = (c) => {
	return c.json({ status: "ok" }, 200);
};
