import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { ROLE } from "../../../models/enums";
import type { Env } from "../../env";
import { getSession } from "../../lib/auth";
import { usersT } from "../../lib/db/schemas/users";
import {
	HttpException,
	openApiBearerGuard,
	openApiBody,
	openApiResponse,
} from "../../lib/zod-to-json-openapi";
import { GetUserByIdParamsDto, GetUserByIdResponseDto } from "./users.dtos";

const basePath = "/users";

const UsersErrors = {
	USER_NOT_FOUND: {
		status: 404,
		message: "User not found",
	},
} as const;

export const UsersController = new OpenAPIHono<{ Bindings: Env }>().openapi(
	createRoute({
		tags: [basePath],
		method: "get",
		path: `${basePath}/{id}`,
		security: openApiBearerGuard(),
		request: {
			params: GetUserByIdParamsDto,
		},
		responses: {
			...openApiResponse(GetUserByIdResponseDto, 200, "User found"),
		},
	}),
	async (c) => {
		const db = drizzle(c.env.DB);
		const params = c.req.valid("param");
		const session = await getSession(c);
		if (session.role !== ROLE.ADMIN && params.id !== session.userId) {
			throw new HttpException({ status: 403, message: "Forbidden" });
		}
		const [user] = await db
			.select()
			.from(usersT)
			.where(eq(usersT.id, params.id))
			.limit(1);
		if (!user) {
			throw new HttpException(UsersErrors.USER_NOT_FOUND);
		}
		return c.json({ user }, 200);
	},
);
