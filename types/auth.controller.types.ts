import { z } from "@hono/zod-openapi";

export const PostLogInBody = z
	.object({
		username: z.string(),
		password: z.string(),
	})
	.openapi("PostLogInBody");
export type PostLogInBody = z.infer<typeof PostLogInBody>;

export const PostLogInResponse = z
	.object({
		success: z.boolean(),
	})
	.openapi("PostLogInResponse");
export type PostLogInResponse = z.infer<typeof PostLogInResponse>;
