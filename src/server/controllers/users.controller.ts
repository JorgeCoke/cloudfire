import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import {
	openApiBearerGuard,
	openApiRequest,
	openApiResponse,
} from "../lib/zod-to-json-openapi";
import type { CfEnv } from "../lib/cf-env";
import { PostSearchUsersResponse } from "../../types/controllers/users-controller.types";
import { drizzle } from "drizzle-orm/d1";
import { usersT } from "../lib/db/schemas/users.table";
import { queryGenericSearch } from "../lib/db/query-builder";
import { hasAnyRoleGuard } from "../lib/guards/hasAnyRole.guard";
import { GenericSearch } from "../../types/controllers/shared";
import { ROLE } from "../../types/enums";

const basePath = "/users";

export const UsersController = new OpenAPIHono<{ Bindings: CfEnv }>().openapi(
	createRoute({
		security: openApiBearerGuard(),
		tags: [basePath],
		method: "post",
		path: `${basePath}/search`,
		request: openApiRequest(GenericSearch),
		responses: {
			...openApiResponse(PostSearchUsersResponse, 200, "Users"),
		},
	}),
	async (c) => {
		await hasAnyRoleGuard(c, [ROLE.ADMIN]);
		const db = drizzle(c.env.DB);
		const body = c.req.valid("json");
		const response = await queryGenericSearch(db, usersT, body);
		return c.json(
			{
				items: response.items.map((e) => ({ ...e, password: undefined })),
				total: response.total,
			},
			200,
		);
	},
);
