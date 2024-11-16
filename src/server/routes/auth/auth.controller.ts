import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import type { CfEnv } from "../../env";
import {
	openApiBearerGuard,
	openApiBody,
	openApiErrors,
	openApiResponse,
} from "../../lib/zod-to-json-openapi";
import {
	GetMeResponseDto,
	PostLoginBodyDto,
	PostLoginResponseDto,
	PostSignupBodyDto,
	PostSignupResponseDto,
} from "./auth.dtos";
import {
	GetMeHandler,
	PostLoginHandler,
	PostSignupHandler,
} from "./auth.service";

export const AuthBasePath = "/auth";

export const AuthErrors = {
	USER_NOT_FOUND: {
		status: 404,
		message: "User not found",
	},
	ERROR_SIGN_UP: {
		status: 400,
		message: "Unable to create to create user. Please try again later",
	},
} as const;

export const PostLoginRoute = createRoute({
	tags: [AuthBasePath],
	method: "post",
	path: `${AuthBasePath}/login`,
	request: {
		body: openApiBody(PostLoginBodyDto),
	},
	responses: {
		...openApiResponse(PostLoginResponseDto, 200, "JWT Session"),
		...openApiErrors([AuthErrors.USER_NOT_FOUND]),
	},
});

export const PostSignupRoute = createRoute({
	tags: [AuthBasePath],
	method: "post",
	path: `${AuthBasePath}/signup`,
	request: {
		body: openApiBody(PostSignupBodyDto),
	},
	responses: {
		...openApiResponse(PostSignupResponseDto, 200, "Sign up result"),
		...openApiErrors([AuthErrors.USER_NOT_FOUND, AuthErrors.ERROR_SIGN_UP]),
	},
});

export const GetMeRoute = createRoute({
	tags: [AuthBasePath],
	method: "get",
	path: `${AuthBasePath}/me`,
	security: openApiBearerGuard(),
	responses: {
		...openApiResponse(GetMeResponseDto, 200, "Session user"),
		...openApiErrors([AuthErrors.USER_NOT_FOUND]),
	},
});

export const AuthController = new OpenAPIHono<{ Bindings: CfEnv }>()
	.openapi(PostLoginRoute, PostLoginHandler)
	.openapi(PostSignupRoute, PostSignupHandler)
	.openapi(GetMeRoute, GetMeHandler);
