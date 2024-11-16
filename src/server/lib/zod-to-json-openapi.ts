import type { RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { ZodType, ZodTypeAny } from "zod";
import type { CfEnv } from "../env";
import { HttpExceptionSchema } from "./http-exceptions";

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
	R,
	{
		Bindings: CfEnv;
	}
>;

export const openApiBearerGuard = () => {
	return [
		{
			Bearer: [],
		},
	];
};

// Convert Zod schema to OpenApi Body Request specification
export const openApiBody = <T extends ZodTypeAny>(body: T) => {
	return {
		content: {
			"application/json": {
				schema: body,
			},
		},
	};
};

// Convert Zod schema to OpenApi response specification
export const openApiResponse = <T extends ZodTypeAny>(
	zod: T,
	status: number,
	description: string,
) => {
	return {
		[status]: {
			description,
			content: {
				"application/json": {
					schema: zod,
				},
			},
		},
	};
};

// Convert custom errors to OpenApi response specification
export const openApiErrors = (
	errors: { status: number; message: string }[],
) => {
	const responses: {
		[key: number]: {
			description: string;
			content: {
				"application/json": {
					schema: ZodType<HttpExceptionSchema>;
				};
			};
		};
	} = {};
	for (const e of errors) {
		responses[e.status] = {
			description: e.message,
			content: {
				"application/json": {
					schema: HttpExceptionSchema,
				},
			},
		};
	}
	return responses;
};
