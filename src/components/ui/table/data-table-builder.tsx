import {
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type TableState,
	useReactTable,
	type CellContext,
	type ColumnDef,
	type RowData,
} from "@tanstack/react-table";
import { Checkbox } from "../checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { cn } from "../../../lib/utils";

export const tableBuilder = <TData extends RowData>(
	data: { items: TData[]; total: number },
	tableState: TableState | undefined,
	columns: ColumnDef<TData, string>[],
	setFn: (fn: (a: unknown) => void) => void,
) => {
	const table = useReactTable<TData>({
		data: data.items,
		pageCount: Math.ceil(data.total / (tableState?.pagination.pageSize || 10)),
		columns,
		state: tableState,
		onStateChange: (updater) => {
			// make sure updater is callable (to avoid typescript warning)
			if (typeof updater !== "function") return;
			const tableState = updater(table.getState());
			setFn((state) => {
				(state as any).tableState = tableState;
			});
		},
		enableRowSelection: true,
		getCoreRowModel: getCoreRowModel<TData>(),
		getFilteredRowModel: getFilteredRowModel<TData>(),
		getPaginationRowModel: getPaginationRowModel<TData>(),
		getSortedRowModel: getSortedRowModel<TData>(),
		getFacetedRowModel: getFacetedRowModel<TData>(),
		getFacetedUniqueValues: getFacetedUniqueValues<TData>(),
		manualPagination: true,
		manualSorting: true,
		manualFiltering: true,
	});
	return table;
};

export const columnBuilder = <TData extends RowData>({
	enableSelect,
	columns,
	actions,
}: {
	enableSelect: boolean;
	columns: {
		title: string;
		accessorKey: keyof TData;
		enableSorting?: boolean;
		enableHiding?: boolean;
		className?: string;
		cell?: ({ row }: CellContext<TData, string>) => JSX.Element;
	}[];
	actions?: ({ row }: CellContext<TData, string>) => JSX.Element;
}): ColumnDef<TData, string>[] => {
	const result: ColumnDef<TData, string>[] = [];
	if (enableSelect) {
		result.push({
			id: "select",
			header: ({ table }) => (
				<Checkbox
					checked={
						table.getIsAllPageRowsSelected() ||
						(table.getIsSomePageRowsSelected() && "indeterminate")
					}
					onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
					aria-label="Select all"
					className="translate-y-[2px]"
				/>
			),
			cell: ({ row }) => (
				<Checkbox
					checked={row.getIsSelected()}
					onCheckedChange={(value) => row.toggleSelected(!!value)}
					aria-label="Select row"
					className="translate-y-[2px]"
				/>
			),
			enableSorting: false,
			enableHiding: false,
		});
	}
	columns.forEach((e) => {
		result.push({
			accessorKey: e.accessorKey,
			enableSorting: e.enableSorting || false,
			enableHiding: e.enableHiding || false,
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title={e.title} />
			),
			cell:
				e.cell != null
					? e.cell
					: ({ row }) => {
							return (
								<div className="flex space-x-2">
									{row.getValue(e.accessorKey as string) != null && (
										<span
											className={cn(
												"max-w-[300px] truncate font-medium",
												e.className,
											)}
										>
											{row.getValue(e.accessorKey as string)}
										</span>
									)}
								</div>
							);
						},
		});
	});
	if (actions) {
		result.push({
			id: "actions",
			cell: actions,
		});
	}
	return result;
};
