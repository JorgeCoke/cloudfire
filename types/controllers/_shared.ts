import { z } from "@hono/zod-openapi";

export const HttpExceptionZod = z
	.object({
		message: z.string(),
	})
	.openapi("HttpExceptionZod");
export type HttpExceptionZod = z.infer<typeof HttpExceptionZod>;

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

export function BuildGenericSearchResult<T extends z.ZodTypeAny>(schema: T) {
	return z.object({
		items: z.array(schema),
		total: z.number(),
	});
}
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
