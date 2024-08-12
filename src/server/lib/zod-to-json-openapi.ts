import type { ZodType, ZodTypeAny } from "zod";
import { HttpExceptionZod } from "../../types/controllers/shared";

export const openApiBearerGuard = () => {
	return [
		{
			Bearer: [],
		},
	];
};

// Convert Zod schema to OpenApi Body Request specification
export const openApiRequest = <T extends ZodTypeAny>(zod: T) => {
	return {
		body: {
			content: {
				"application/json": {
					schema: zod,
				},
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
