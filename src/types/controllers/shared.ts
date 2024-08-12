import { HTTPException } from "hono/http-exception";
import type { StatusCode } from "hono/utils/http-status";
import { z } from "zod";

export class HttpException extends HTTPException {
	constructor(error: { status: StatusCode; message: string }) {
		super(error.status, { message: error.message });
	}
}

export const HttpExceptionZod = z.object({
	message: z.string(),
});
export type HttpExceptionZod = z.infer<typeof HttpExceptionZod>;

export function BuildSearchResult<T extends z.ZodTypeAny>(schema: T) {
	return z.object({
		items: z.array(schema),
		total: z.number(),
	});
}

export const Comparator = z.enum([
	"eq",
	"inc",
	"gt",
	"lt",
	"gte",
	"lte",
	"null",
	"notnull",
]);
export type Comparator = z.infer<typeof Comparator>;

export const OrderBy = z.object({
	param: z.string().default("id"),
	sort: z.enum(["asc", "desc"]),
});
export type OrderBy = z.infer<typeof OrderBy>;

export const QueryValue = z.object({
	param: z.string(),
	comparator: Comparator,
	value: z.string().or(z.number()).or(z.boolean()).or(z.null()),
});
export type QueryValue = z.infer<typeof QueryValue>;

export const Query = z.array(QueryValue);
export type Query = z.infer<typeof Query>;

export const GenericSearch = z.object({
	limit: z.number().default(10),
	offset: z.number().default(0),
	query: Query.optional(),
	orderBy: OrderBy.optional(),
});
export type GenericSearch = z.infer<typeof GenericSearch>;
