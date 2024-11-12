import { z } from "@hono/zod-openapi";
import { User } from "../../lib/db/schemas/users";

export const PostSignupBodyDto = z
	.object({
		email: z
			.string()
			.trim()
			.min(1)
			.email({ message: "Email is not a valid email address" }),
		password: z
			.string()
			.trim()
			.min(8, { message: "Password must containt at least 8 characteres" })
			.max(50),
		repeatPassword: z
			.string()
			.trim()
			.min(8, { message: "Password must containt at least 8 characteres" })
			.max(50),
	})
	.refine(({ password, repeatPassword }) => password === repeatPassword, {
		path: ["repeatPassword"],
		message: "Passwords do not match",
	});
export type PostSignupBodyDto = z.infer<typeof PostSignupBodyDto>;
export const PostSignupResponseDto = z.object({
	success: z.boolean(),
});
export type PostSignupResponseDto = z.infer<typeof PostSignupResponseDto>;

export const PostLoginBodyDto = z.object({
	email: z
		.string()
		.trim()
		.min(1)
		.email({ message: "Email is not a valid email address" }),
	password: z.string().trim().min(1),
});
export type PostLoginBodyDto = z.infer<typeof PostLoginBodyDto>;
export const PostLoginResponseDto = z.object({
	jwt: z.string(),
});
export type PostLoginResponseDto = z.infer<typeof PostLoginResponseDto>;

export const GetMeResponseDto = z.object({
	user: User,
});
export type GetMeResponseDto = z.infer<typeof GetMeResponseDto>;
