import { z } from "@hono/zod-openapi";

export const Query = z
	.object({
		comparator: z.enum(["eq", "inc", "gt", "lt", "gte", "lte"]),
		value: z.string().or(z.number()),
	})
	.strict()
	.or(
		z
			.object({
				comparator: z.enum(["eq"]),
				value: z.boolean(),
			})
			.strict(),
	)
	.or(
		z
			.object({
				comparator: z.enum(["null", "notnull"]),
				value: z.null(),
			})
			.strict(),
	);
export type Query = z.infer<typeof Query>;
