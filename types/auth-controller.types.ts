import { z } from "@hono/zod-openapi";

export const PostLogInBody = z
	.object({
		email: z.string().email(),
		password: z.string().min(8),
	})
	.openapi("PostLogInBody");
export type PostLogInBody = z.infer<typeof PostLogInBody>;
export const PostLogInResponse = z
	.object({
		jwt: z.string(),
	})
	.openapi("PostLogInResponse");
export type PostLogInResponse = z.infer<typeof PostLogInResponse>;

export const PostSignUpBody = z
	.object({
		email: z.string().email(),
		password: z.string().min(8),
		repeatPassword: z.string(),
	})
	.openapi("PostSignUpBody");
export type PostSignUpBody = z.infer<typeof PostSignUpBody>;
export const PostSignUpResponse = z
	.object({
		success: z.boolean(),
	})
	.openapi("PostSignUpResponse");
export type PostSignUpResponse = z.infer<typeof PostSignUpResponse>;

export const PostRequestResetPasswordBody = z
	.object({
		email: z.string().email(),
	})
	.openapi("PostRequestResetPasswordBody");
export type PostRequestResetPasswordBody = z.infer<
	typeof PostRequestResetPasswordBody
>;
export const PostRequestResetPasswordResponse = z
	.object({
		success: z.boolean(),
	})
	.openapi("PostRequestResetPasswordResponse");
export type PostRequestResetPasswordResponse = z.infer<
	typeof PostRequestResetPasswordResponse
>;

export const PostResetPasswordBody = z
	.object({
		password: z.string().min(8),
		repeatPassword: z.string(),
		token: z.string(),
	})
	.openapi("PostResetPasswordBody");
export type PostResetPasswordBody = z.infer<typeof PostResetPasswordBody>;
export const PostResetPasswordResponse = z
	.object({
		success: z.boolean(),
	})
	.openapi("PostResetPasswordResponse");
export type PostResetPasswordResponse = z.infer<
	typeof PostResetPasswordResponse
>;

export type JwtPayload = {
	userId: string;
	exp: number; // The token is checked to ensure it has not expired.
	// nbf: number; // The token is checked to ensure it is not being used before a specified time.
	// iat: number; // The token is checked to ensure it is not issued in the future.
};
