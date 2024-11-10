import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import bcryptjs from "bcryptjs";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { sign } from "hono/jwt";
import type { JwtPayload } from "../../../models/types/jwt-payload";
import type { Env } from "../../env";
import { usersT } from "../../lib/db/schemas/users";
import {
	HttpException,
	openApiBody,
	openApiErrors,
	openApiResponse,
} from "../../lib/zod-to-json-openapi";
import {
	PostLogInBodyDto,
	PostLogInResponseDto,
	PostSignUpBodyDto,
	PostSignUpResponseDto,
} from "./auth.dtos";
const { hashSync, compareSync } = bcryptjs;

const basePath = "/auth";

const AuthErrors = {
	USER_NOT_FOUND: {
		status: 404,
		message: "User not found",
	},
	ERROR_SIGN_UP: {
		status: 400,
		message: "Unable to create to create user. Please try again later",
	},
} as const;

// TODO: Move to services

export const AuthController = new OpenAPIHono<{ Bindings: Env }>()
	.openapi(
		createRoute({
			tags: [basePath],
			method: "post",
			path: `${basePath}/login`,
			request: {
				body: openApiBody(PostLogInBodyDto),
			},
			responses: {
				...openApiResponse(PostLogInResponseDto, 200, "JWT Session"),
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
			path: `${basePath}/signup`,
			request: {
				body: openApiBody(PostSignUpBodyDto),
			},
			responses: {
				...openApiResponse(PostSignUpResponseDto, 200, "Sign up result"),
				...openApiErrors([AuthErrors.USER_NOT_FOUND, AuthErrors.ERROR_SIGN_UP]),
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
				throw new HttpException(AuthErrors.ERROR_SIGN_UP);
			}
			const result = await db.insert(usersT).values({
				email: body.email,
				password: hashSync(body.password, 10),
			});
			return c.json({ success: !!result }, 200);
		},
	);
