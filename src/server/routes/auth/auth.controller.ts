import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import type { CfEnv } from "../../env";
import {
	openApiBearerGuard,
	openApiBody,
	openApiErrors,
	openApiResponse,
} from "../../lib/zod-to-json-openapi";
import {
	GetProfileResponseDto,
	PostLoginBodyDto,
	PostLoginResponseDto,
	PostProfileBodyDto,
	PostProfileResponseDto,
	PostSignupBodyDto,
	PostSignupResponseDto,
} from "./auth.dtos";
import {
	GetProfileHandler,
	PostLoginHandler,
	PostProfileHandler,
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

export const GetProfileRoute = createRoute({
	tags: [AuthBasePath],
	method: "get",
	path: `${AuthBasePath}/profile`,
	security: openApiBearerGuard(),
	responses: {
		...openApiResponse(GetProfileResponseDto, 200, "Session user"),
		...openApiErrors([AuthErrors.USER_NOT_FOUND]),
	},
});

export const PostProfileRoute = createRoute({
	tags: [AuthBasePath],
	method: "post",
	path: `${AuthBasePath}/profile`,
	request: {
		body: openApiBody(PostProfileBodyDto),
	},
	security: openApiBearerGuard(),
	responses: {
		...openApiResponse(PostProfileResponseDto, 200, "Updated user"),
		...openApiErrors([AuthErrors.USER_NOT_FOUND]),
	},
});

export const AuthController = new OpenAPIHono<{ Bindings: CfEnv }>()
	.openapi(PostLoginRoute, PostLoginHandler)
	.openapi(PostSignupRoute, PostSignupHandler)
	.openapi(GetProfileRoute, GetProfileHandler)
	.openapi(PostProfileRoute, PostProfileHandler);
