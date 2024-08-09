import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../../components/ui/checkbox";
import type { User } from "../../../../server/lib/db/schemas/users.table";
import { DataTableColumnHeader } from "../../../components/ui/table/data-table-column-header";
import { DataTableRowActions } from "../tasks/components/data-table-row-actions";
import { Badge } from "../../../components/ui/badge";
import { ROLES } from "../../../../types/enums";
import { Check, X } from "lucide-react";

export const columns: ColumnDef<User>[] = [
	{
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
	},
	{
		accessorKey: "id",
		header: ({ column }) => <DataTableColumnHeader column={column} title="#" />,
		cell: ({ row }) => (
			<div className="flex space-x-2">
				<span className="max-w-[500px] truncate font-medium">
					{row.getValue("id")}
				</span>
			</div>
		),
		enableSorting: true,
		enableHiding: true,
	},
	{
		accessorKey: "email",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Email" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex space-x-2">
					<span className="max-w-[500px] truncate font-medium">
						{row.getValue("email")}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "enabled",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Enabled" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex items-center text-center">
					<span>
						{row.getValue("enabled") ? (
							<Check className="text-green-500 h-4 w-4" />
						) : (
							<X className="text-red-500 h-4 w-4" />
						)}
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "role",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Role" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex items-center">
					<span>
						<Badge
							variant={
								row.getValue("role") === ROLES.USER ? "secondary" : "default"
							}
						>
							{row.getValue("role")}
						</Badge>
					</span>
				</div>
			);
		},
	},
	{
		accessorKey: "lastLogInAt",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="LastLogInAt" />
		),
		cell: ({ row }) => {
			return (
				<div className="flex items-center">
					{row.getValue("lastLogInAt") !== null && (
						<span>
							{new Date(row.getValue("lastLogInAt")).toLocaleString()}
						</span>
					)}
				</div>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }) => <DataTableRowActions row={row} />, // TODO: Fix action bar to the right, like https://table.sadmn.com/?page=1&per_page=10&sort=createdAt.desc
	},
];
