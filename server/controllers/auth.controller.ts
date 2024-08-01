import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { HTTPException } from "hono/http-exception";
import {
	PostLogInBody,
	PostLogInResponse,
} from "../../types/auth.controller.types";
import {
	openApiErrors,
	openApiRequest,
	openApiResponse,
} from "../utils/zod-to-json-openapi";
import type { Bindings } from "../utils/bindings";
import { drizzle } from "drizzle-orm/d1";
import { users } from "../lib/db/schemas/users";
import { eq } from "drizzle-orm";

export const AuthErrors = {
	USER_NOT_FOUND: {
		status: 404,
		message: "User not found",
	},
} as const;

const basePath = "/auth";

const AuthController = new OpenAPIHono<{ Bindings: Bindings }>().openapi(
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
			.where(eq(users.email, body.username));
		if (!user) {
			throw new HTTPException(AuthErrors.USER_NOT_FOUND.status, {
				message: AuthErrors.USER_NOT_FOUND.message,
			});
		}
		return c.json({ success: true }, 200);
	},
);

export default AuthController;
