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
} from "../../types/controllers/auth-controller.types";
import {
	openApiErrors,
	openApiRequest,
	openApiResponse,
} from "../lib/zod-to-json-openapi";
import { drizzle } from "drizzle-orm/d1";
import { usersT } from "../lib/db/schemas/users.table";
import { eq } from "drizzle-orm";
import { compareSync, hashSync } from "bcryptjs";
import { sign, verify } from "hono/jwt";
import type { CfEnv } from "../../types/cf-env";
import { sendResetPasswordMail } from "../lib/mail/plunk";
import { HttpException } from "../../types/controllers/shared";

const basePath = "/auth";

const AuthErrors = {
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
	INVALID_OR_EXPIRED_TOKEN: {
		status: 409,
		message:
			"Token is not valid or has expired, please request another password reset",
	},
} as const;

export const AuthController = new OpenAPIHono<{ Bindings: CfEnv }>()
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
				.from(usersT)
				.limit(1)
				.where(eq(usersT.email, body.email));
			if (!user || !user.enabled) {
				throw new HttpException(AuthErrors.USER_NOT_FOUND);
			}
			const success = compareSync(body.password, user.password);
			if (!success) {
				// Increment lastLogInTries and disable user in case anomalous login tries
				await db
					.update(usersT)
					.set({
						lastLogInTries: user.lastLogInTries + 1,
						enabled: user.lastLogInTries < 99,
					})
					.where(eq(usersT.id, user.id));
				throw new HttpException(AuthErrors.USER_NOT_FOUND);
			}
			const jwtPayload: JwtPayload = {
				userId: user.id,
				exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24h expiration
				role: user.role,
			};
			const jwt = await sign(jwtPayload, c.env.AUTH_SESSION_SECRET_KEY);
			// Update lastLogInAt and reset lastLogInTries
			await db
				.update(usersT)
				.set({ lastLogInAt: new Date(), lastLogInTries: 0 })
				.where(eq(usersT.id, user.id));
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
				.from(usersT)
				.limit(1)
				.where(eq(usersT.email, body.email));
			if (user) {
				throw new HttpException(AuthErrors.USER_ALREADY_EXISTS);
			}
			const result = await db.insert(usersT).values({
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
				.from(usersT)
				.limit(1)
				.where(eq(usersT.email, body.email));
			if (user) {
				if (
					!user.lastResetPasswordRequestAt ||
					user.lastResetPasswordRequestAt <
						new Date(new Date().getTime() - 24 * 60 * 60 * 1000)
				) {
					// Send one single email every 24h to prevent extra usage
					const jwtPayload: JwtPayload = {
						userId: user.id,
						exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24h expiration
						role: user.role,
					};
					const resetPasswordToken = await sign(
						jwtPayload,
						c.env.AUTH_RESET_PASSWORD_SECRET_KEY,
					);
					const sent = await sendResetPasswordMail(
						c,
						user.email,
						resetPasswordToken,
					);
					if (sent.ok) {
						await db
							.update(usersT)
							.set({ lastResetPasswordRequestAt: new Date() })
							.where(eq(usersT.id, user.id));
					}
				}
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
					AuthErrors.INVALID_OR_EXPIRED_TOKEN,
				]),
			},
		}),
		async (c) => {
			const db = drizzle(c.env.DB);
			const body = c.req.valid("json");
			if (body.password !== body.repeatPassword) {
				throw new HttpException(AuthErrors.PASSWORDS_DOES_NOT_MATCH);
			}
			const payload = (await verify(
				body.token,
				c.env.AUTH_RESET_PASSWORD_SECRET_KEY,
			).catch(() => {
				throw new HttpException(AuthErrors.INVALID_OR_EXPIRED_TOKEN);
			})) as JwtPayload;
			await db
				.update(usersT)
				.set({ password: hashSync(body.password, 10) })
				.where(eq(usersT.id, payload.userId));
			return c.json({ success: true }, 200);
		},
	);
