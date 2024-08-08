import { z } from "@hono/zod-openapi";

export const HttpExceptionZod = z
	.object({
		message: z.string(),
	})
	.openapi("HttpExceptionZod");
export type HttpExceptionZod = z.infer<typeof HttpExceptionZod>;
