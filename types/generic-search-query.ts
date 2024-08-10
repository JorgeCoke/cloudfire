import { z } from "@hono/zod-openapi";
import type { TableState } from "@tanstack/react-table";

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
	query: Query,
	orderBy: OrderBy.optional(),
});
export type GenericSearch = z.infer<typeof GenericSearch>;

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
	| {
			type: "date";
	  }
);

export type FilterFieldOption = {
	label: string;
	value: string;
	icon?: React.ComponentType<{ className?: string }>;
	comparator: Comparator;
};

export const convertTanStackTableState = (
	state?: TableState,
): GenericSearch => {
	const query: Query = [];
	state?.columnFilters.forEach((e) => {
		const value:
			| { comparator: Comparator; value: string }
			| { comparator: Comparator; value: string }[] = JSON.parse(
			e.value as string,
		);
		if (Array.isArray(value)) {
			value.forEach((multiple) => {
				if (multiple.value) {
					query.push({
						param: e.id,
						value:
							multiple.comparator === "inc"
								? `%${multiple.value}%`
								: multiple.value,
						comparator: multiple.comparator,
					});
				}
			});
		} else {
			if (value.value) {
				query.push({
					param: e.id,
					value: value.comparator === "inc" ? `%${value.value}%` : value.value,
					comparator: value.comparator,
				});
			}
		}
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
		query,
	};
};
