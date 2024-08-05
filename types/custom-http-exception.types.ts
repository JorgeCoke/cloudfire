import { z } from "@hono/zod-openapi";

export const HTTPExceptionZod = z
	.object({
		message: z.string(),
	})
	.openapi("HTTPExceptionZod");
export type HTTPExceptionZod = z.infer<typeof HTTPExceptionZod>;
