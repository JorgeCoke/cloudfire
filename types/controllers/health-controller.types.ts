import { z } from "@hono/zod-openapi";

export const GetHealthResponse = z
	.object({
		status: z.string(),
	})
	.openapi("GetHealthResponse");
export type GetHealthResponse = z.infer<typeof GetHealthResponse>;
