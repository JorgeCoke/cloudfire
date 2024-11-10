import { z } from "@hono/zod-openapi";

export const PostSignUpBodyDto = z
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
export type PostSignUpBodyDto = z.infer<typeof PostSignUpBodyDto>;
export const PostSignUpResponseDto = z.object({
	success: z.boolean(),
});
export type PostSignUpResponseDto = z.infer<typeof PostSignUpResponseDto>;

export const PostLogInBodyDto = z.object({
	email: z
		.string()
		.trim()
		.min(1)
		.email({ message: "Email is not a valid email address" }),
	password: z.string().trim().min(1),
});
export type PostLogInBodyDto = z.infer<typeof PostLogInBodyDto>;
export const PostLogInResponseDto = z.object({
	jwt: z.string(),
});
export type PostLogInResponseDto = z.infer<typeof PostLogInResponseDto>;
