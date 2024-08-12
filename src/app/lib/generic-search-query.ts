import type { TableState } from "@tanstack/react-table";
import type {
	Comparator,
	GenericSearch,
	Query,
} from "../../types/controllers/shared";

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
