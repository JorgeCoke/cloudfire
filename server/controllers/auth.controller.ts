import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import {
	type JwtPayload,
	PostLogInBody,
	PostLogInResponse,
	PostRequestResetPasswordBody,
	PostRequestResetPasswordResponse,
	PostResetPasswordBody,
	PostResetPasswordResponse,
	PostSignUpBody,
	PostSignUpResponse,
} from "../../types/auth-controller.types";
import {
	openApiErrors,
	openApiRequest,
	openApiResponse,
} from "../lib/zod-to-json-openapi";
import type { Bindings } from "../lib/bindings";
import { drizzle } from "drizzle-orm/d1";
import { users } from "../lib/db/schemas/users";
import { eq } from "drizzle-orm";
import { compareSync, hashSync } from "bcryptjs";
import { HttpException } from "../lib/custom-http-exception";
import { sign, verify } from "hono/jwt";

export const AuthErrors = {
	USER_NOT_FOUND: {
		status: 404,
		message: "User not found",
	},
	USER_ALREADY_EXISTS: {
		status: 409,
		message: "User already exists",
	},
	PASSWORDS_DOES_NOT_MATCH: {
		status: 400,
		message: "Passwords does not match",
	},
	INVALID__OR_EXPIRED_TOKEN: {
		status: 409,
		message:
			"Token is not valid or has expired, please request another password reset",
	},
} as const;

const basePath = "/auth";

const AuthController = new OpenAPIHono<{ Bindings: Bindings }>()
	.openapi(
		createRoute({
			tags: [basePath],
			method: "post",
			path: `${basePath}/log-in`,
			request: openApiRequest(PostLogInBody),
			responses: {
				...openApiResponse(PostLogInResponse, 200, "JWT Session"),
				...openApiErrors([AuthErrors.USER_NOT_FOUND]),
			},
		}),
		async (c) => {
			const db = drizzle(c.env.DB);
			const body = c.req.valid("json");
			const [user] = await db
				.select()
				.from(users)
				.limit(1)
				.where(eq(users.email, body.email));
			if (!user) {
				throw new HttpException(AuthErrors.USER_NOT_FOUND);
			}
			const success = compareSync(body.password, user.password);
			if (!success) {
				throw new HttpException(AuthErrors.USER_NOT_FOUND);
			}
			const jwtPayload: JwtPayload = {
				userId: user.id,
				exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24h expiration
			};
			const jwt = await sign(jwtPayload, "session-secret"); // TODO: Move to secrets
			return c.json({ jwt }, 200);
		},
	)
	.openapi(
		createRoute({
			tags: [basePath],
			method: "post",
			path: `${basePath}/sign-up`,
			request: openApiRequest(PostSignUpBody),
			responses: {
				...openApiResponse(PostSignUpResponse, 200, "Sign up result"),
				...openApiErrors([
					AuthErrors.PASSWORDS_DOES_NOT_MATCH,
					AuthErrors.USER_ALREADY_EXISTS,
				]),
			},
		}),
		async (c) => {
			const db = drizzle(c.env.DB);
			const body = c.req.valid("json");
			if (body.password !== body.repeatPassword) {
				throw new HttpException(AuthErrors.PASSWORDS_DOES_NOT_MATCH);
			}
			const [user] = await db
				.select()
				.from(users)
				.limit(1)
				.where(eq(users.email, body.email));
			if (user) {
				throw new HttpException(AuthErrors.USER_ALREADY_EXISTS);
			}
			const result = await db.insert(users).values({
				email: body.email,
				password: hashSync(body.password, 10),
			});
			return c.json({ success: !!result }, 200);
		},
	)
	.openapi(
		createRoute({
			tags: [basePath],
			method: "post",
			path: `${basePath}/request-reset-password`,
			request: openApiRequest(PostRequestResetPasswordBody),
			responses: {
				...openApiResponse(
					PostRequestResetPasswordResponse,
					200,
					"Request reset password result, return always true, regardless the internal behaviour",
				),
				...openApiErrors([]),
			},
		}),
		async (c) => {
			const db = drizzle(c.env.DB);
			const body = c.req.valid("json");
			const [user] = await db
				.select()
				.from(users)
				.limit(1)
				.where(eq(users.email, body.email));
			if (user) {
				const jwtPayload: JwtPayload = {
					userId: user.id,
					exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24h expiration
				};
				const resetPasswordToken = await sign(
					jwtPayload,
					"reset-password-secret", // TODO: Move to secrets
				);
				console.log("🚀  resetPasswordToken:", resetPasswordToken); // TODO: Send link via email
			}
			return c.json({ success: true }, 200); // Return always true
		},
	)
	.openapi(
		createRoute({
			tags: [basePath],
			method: "post",
			path: `${basePath}/reset-password`,
			request: openApiRequest(PostResetPasswordBody),
			responses: {
				...openApiResponse(
					PostResetPasswordResponse,
					200,
					"Reset password result",
				),
				...openApiErrors([
					AuthErrors.PASSWORDS_DOES_NOT_MATCH,
					AuthErrors.INVALID__OR_EXPIRED_TOKEN,
				]),
			},
		}),
		async (c) => {
			const db = drizzle(c.env.DB);
			const body = c.req.valid("json");
			if (body.password !== body.repeatPassword) {
				throw new HttpException(AuthErrors.PASSWORDS_DOES_NOT_MATCH);
			}
			const payload = (await verify(body.token, "reset-password-secret").catch(
				() => {
					throw new HttpException(AuthErrors.INVALID__OR_EXPIRED_TOKEN);
				},
			)) as JwtPayload; // TODO: Move to secrets
			await db
				.update(users)
				.set({ password: hashSync(body.password, 10) })
				.where(eq(users.id, payload.userId));
			return c.json({ success: true }, 200);
		},
	);

export default AuthController;
