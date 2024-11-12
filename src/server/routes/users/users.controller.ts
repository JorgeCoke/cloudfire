import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import type { Env } from "../../env";
import {
	openApiBearerGuard,
	openApiResponse,
} from "../../lib/zod-to-json-openapi";
import { GetUserByIdParamsDto, GetUserByIdResponseDto } from "./users.dtos";
import { GetUserByIdHandler } from "./users.service";

export const UsersBasePath = "/users";

export const UsersErrors = {
	USER_NOT_FOUND: {
		status: 404,
		message: "User not found",
	},
} as const;

export const GetUserByIdRoute = createRoute({
	tags: [UsersBasePath],
	method: "get",
	path: `${UsersBasePath}/{id}`,
	security: openApiBearerGuard(),
	request: {
		params: GetUserByIdParamsDto,
	},
	responses: {
		...openApiResponse(GetUserByIdResponseDto, 200, "User found"),
	},
});

export const UsersController = new OpenAPIHono<{ Bindings: Env }>().openapi(
	GetUserByIdRoute,
	GetUserByIdHandler,
);
