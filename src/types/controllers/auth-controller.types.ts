import { z } from "zod";
import type { ROLE } from "../enums";

export const PostLogInBody = z
	.object({
		email: z.string().email(),
		password: z.string().min(8),
	})
	.strict();
export type PostLogInBody = z.infer<typeof PostLogInBody>;
export const PostLogInResponse = z.object({
	jwt: z.string(),
});
export type PostLogInResponse = z.infer<typeof PostLogInResponse>;

export const PostSignUpBody = z
	.object({
		email: z.string().email(),
		password: z.string().min(8),
		repeatPassword: z.string(),
	})
	.strict();
export type PostSignUpBody = z.infer<typeof PostSignUpBody>;
export const PostSignUpResponse = z.object({
	success: z.boolean(),
});
export type PostSignUpResponse = z.infer<typeof PostSignUpResponse>;

export const PostRequestResetPasswordBody = z
	.object({
		email: z.string().email(),
	})
	.strict();
export type PostRequestResetPasswordBody = z.infer<
	typeof PostRequestResetPasswordBody
>;
export const PostRequestResetPasswordResponse = z.object({
	success: z.boolean(),
});
export type PostRequestResetPasswordResponse = z.infer<
	typeof PostRequestResetPasswordResponse
>;

export const PostResetPasswordBody = z
	.object({
		password: z.string().min(8),
		repeatPassword: z.string(),
		token: z.string(),
	})
	.strict();
export type PostResetPasswordBody = z.infer<typeof PostResetPasswordBody>;
export const PostResetPasswordResponse = z.object({
	success: z.boolean(),
});
export type PostResetPasswordResponse = z.infer<
	typeof PostResetPasswordResponse
>;

export type JwtPayload = {
	userId: string;
	role: ROLE;
	exp: number; // The token is checked to ensure it has not expired.
	// nbf: number; // The token is checked to ensure it is not being used before a specified time.
	// iat: number; // The token is checked to ensure it is not issued in the future.
};
