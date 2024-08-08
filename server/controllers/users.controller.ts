import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { openApiRequest, openApiResponse } from "../lib/zod-to-json-openapi";
import type { Bindings } from "../lib/bindings";
import {
	PostSearchUsersBody,
	PostSearchUsersResponse,
} from "../../types/api/users-controller.types";
import { drizzle } from "drizzle-orm/d1";
import { usersT } from "../lib/db/schemas/users.table";
import { count } from "drizzle-orm";
import { convertToQuery } from "../lib/db/query-builder";

const basePath = "/users";

export const UsersErrors = {} as const;

const UsersController = new OpenAPIHono<{ Bindings: Bindings }>().openapi(
	createRoute({
		tags: [basePath],
		method: "post",
		path: `${basePath}/search`,
		request: openApiRequest(PostSearchUsersBody),
		responses: {
			...openApiResponse(PostSearchUsersResponse, 200, "Users"),
		},
	}),
	async (c) => {
		const db = drizzle(c.env.DB);
		const body = c.req.valid("json");
		const items = await db
			.select()
			.from(usersT)
			.limit(body.limit)
			.offset(body.offset)
			.where(convertToQuery(usersT, body.filter));
		const total = await db
			.select({ count: count() })
			.from(usersT)
			.where(convertToQuery(usersT, body.filter))
			.then((res) => res[0].count);
		return c.json({ items, total }, 200);
	},
);

export default UsersController;
