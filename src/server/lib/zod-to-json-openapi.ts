import { HTTPException } from "hono/http-exception";
import type { StatusCode } from "hono/utils/http-status";
import { type ZodType, type ZodTypeAny, z } from "zod";

export class HttpException extends HTTPException {
	constructor(error: { status: StatusCode; message: string }) {
		super(error.status, { message: error.message });
	}
}

const HttpExceptionZod = z.object({
	message: z.string(),
});
type HttpExceptionZod = z.infer<typeof HttpExceptionZod>;

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
					schema: ZodType<HttpExceptionZod>;
				};
			};
		};
	} = {};
	for (const e of errors) {
		responses[e.status] = {
			description: e.message,
			content: {
				"application/json": {
					schema: HttpExceptionZod,
				},
			},
		};
	}
	return responses;
};
