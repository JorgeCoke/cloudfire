import { z } from "zod";

export const PostLogInBody = z.object({
	username: z.string(),
	password: z.string(),
});
export type PostLogInBody = z.infer<typeof PostLogInBody>;

export const PostLogInResponse = z.object({
	success: z.boolean(),
});
export type PostLogInResponse = z.infer<typeof PostLogInResponse>;
