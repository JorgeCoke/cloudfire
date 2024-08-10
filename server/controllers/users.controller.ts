import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import { openApiRequest, openApiResponse } from "../lib/zod-to-json-openapi";
import type { Bindings } from "../lib/bindings";
import { PostSearchUsersResponse } from "../../types/controllers/users-controller.types";
import { drizzle } from "drizzle-orm/d1";
import { usersT } from "../lib/db/schemas/users.table";
import { count } from "drizzle-orm";
import { convertToOrderBy, convertToQuery } from "../lib/db/query-builder";
import { GenericSearch } from "../../types/generic-search-query";

const basePath = "/users";

export const UsersErrors = {} as const;

const UsersController = new OpenAPIHono<{ Bindings: Bindings }>().openapi(
	createRoute({
		tags: [basePath],
		method: "post",
		path: `${basePath}/search`,
		request: openApiRequest(GenericSearch),
		responses: {
			...openApiResponse(PostSearchUsersResponse, 200, "Users"),
		},
	}),
	async (c) => {
		const db = drizzle(c.env.DB);
		const body = c.req.valid("json");
		const users = await db
			.select()
			.from(usersT)
			.limit(body.limit)
			.offset(body.offset)
			.where(convertToQuery(usersT, body.query))
			.orderBy(convertToOrderBy(usersT, body.orderBy));
		const total = await db
			.select({ count: count() })
			.from(usersT)
			.where(convertToQuery(usersT, body.query))
			.then((res) => res[0].count);
		return c.json(
			{
				items: users.map((e) => ({ ...e, password: undefined })),
				total,
			},
			200,
		);
	},
);

export default UsersController;
