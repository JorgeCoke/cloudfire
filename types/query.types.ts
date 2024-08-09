import { z } from "@hono/zod-openapi";
import type { TableState } from "@tanstack/react-table";

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

export type Comparator =
	| "eq"
	| "inc"
	| "gt"
	| "lt"
	| "gte"
	| "lte"
	| "null"
	| "notnull";

export type FilterFieldOption = {
	label: string;
	value: string;
	icon?: React.ComponentType<{ className?: string }>;
	comparator: Comparator;
};

export type FilterField<TData> = {
	title: string;
	accessorKey: keyof TData;
} & (
	| {
			type: "string" | "number";
			comparator: Comparator;
	  }
	| {
			type: "selector";
			isMultiple?: boolean;
			options: FilterFieldOption[];
	  }
);

// TODO: Get comparator from Columns, add type from Zod Schemas, move/refactor types
export const convertTanStackTableState = (state?: TableState): any => {
	const filter: any = {};
	state?.columnFilters.forEach((e) => {
		filter[e.id] = {
			value: Array.isArray(e.value) ? e.value[0].value : `%${e.value}%`,
			comparator: Array.isArray(e.value) ? e.value[0].comparator : "inc",
		};
	});
	return {
		limit: state?.pagination.pageSize || 10,
		offset:
			(state?.pagination.pageSize || 10) * (state?.pagination.pageIndex || 0),
		orderBy: state?.sorting[0]
			? {
					param: state.sorting[0].id,
					sort: state.sorting[0].desc ? "desc" : "asc",
				}
			: undefined,
		filter,
	};
};
