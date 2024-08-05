import type { ZodType, ZodTypeAny } from "zod";
import { HTTPExceptionZod } from "../../types/custom-http-exception.types";

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

export const openApiErrors = (
	errors: { status: number; message: string }[],
) => {
	const responses: {
		[key: number]: {
			description: string;
			content: {
				"application/json": {
					schema: ZodType<HTTPExceptionZod>;
				};
			};
		};
	} = {};
	for (const e of errors) {
		responses[e.status] = {
			description: e.message,
			content: {
				"application/json": {
					schema: HTTPExceptionZod,
				},
			},
		};
	}
	return responses;
};
