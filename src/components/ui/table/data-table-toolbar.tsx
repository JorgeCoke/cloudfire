import type { Table } from "@tanstack/react-table";

import { Button } from "../button";

import { DataTableViewOptions } from "./data-table-view-options";
import type { FilterField } from "../../../../types/query.types";
import { cn } from "../../../lib/utils";
import { Eraser } from "lucide-react";
import { Input } from "../input";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData>
	extends React.HTMLAttributes<HTMLDivElement> {
	table: Table<TData>;
	filterFields?: FilterField<TData>[];
}

export function DataTableToolbar<TData>({
	table,
	filterFields = [],
	children,
	className,
	...props
}: DataTableToolbarProps<TData>) {
	const isFiltered = table.getState().columnFilters.length > 0;

	return (
		<div
			className={cn(
				"flex w-full items-center justify-between space-x-2 overflow-auto p-1",
				className,
			)}
			{...props}
		>
			<div className="flex flex-1 items-center space-x-2">
				{filterFields.map((filter) => (
					<div key={String(filter.accessorKey)}>
						{filter.type === "string" && (
							<Input
								title={filter.title}
								type="text"
								placeholder={filter.title}
								value={
									(table
										.getColumn(String(filter.accessorKey))
										?.getFilterValue() as string) ?? ""
								}
								onChange={(event) =>
									table
										.getColumn(String(filter.accessorKey))
										?.setFilterValue(event.target.value)
								}
								className="h-8"
							/>
						)}
						{filter.type === "number" && (
							<Input
								title={filter.title}
								type="number"
								placeholder={filter.title}
								value={
									(table
										.getColumn(String(filter.accessorKey))
										?.getFilterValue() as string) ?? ""
								}
								onChange={(event) =>
									table
										.getColumn(String(filter.accessorKey))
										?.setFilterValue(event.target.value)
								}
								className="h-8"
							/>
						)}
						{filter.type === "selector" && (
							<DataTableFacetedFilter
								column={table.getColumn(
									filter.accessorKey ? String(filter.accessorKey) : "",
								)}
								title={filter.title}
								options={filter.options ?? []}
								isMultiple={filter.isMultiple}
							/>
						)}
					</div>
				))}
				{isFiltered && (
					<Button
						aria-label="Reset filters"
						variant="ghost"
						className="h-8 px-2 lg:px-3"
						onClick={() => table.resetColumnFilters()}
					>
						Reset
						<Eraser className="ml-2 size-4" aria-hidden="true" />
					</Button>
				)}
			</div>
			<div className="flex items-center gap-2">
				{children}
				<DataTableViewOptions table={table} />
			</div>
		</div>
	);
}
