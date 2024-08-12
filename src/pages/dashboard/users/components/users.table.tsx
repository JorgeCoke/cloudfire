import { useUsersStore } from "../users.store";
import { useEffect } from "react";
import type { User } from "../../../../../server/lib/db/schemas/users.table";
import { Badge } from "../../../../components/ui/badge";
import { ROLES } from "../../../../../types/enums";
import { Check, X } from "lucide-react";
import type { FilterField } from "../../../../lib/generic-search-query";
import { DataTable } from "../../../../components/ui/table/data-table";
import { DataTableRowActionsExample } from "../../../../components/ui/table/data-table-row-actions-example";
import {
	columnBuilder,
	tableBuilder,
} from "../../../../components/ui/table/data-table-builder";
import { useEffectOnce } from "../../../../lib/use-effect-once";

export const UsersTable = () => {
	const { tableData, tableState, doSearchUsers, set } = useUsersStore();
	useEffectOnce(() => {
		if (tableData.items.length === 0) {
			doSearchUsers();
		}
	});
	useEffect(() => {
		doSearchUsers();
	}, [tableState]);
	const table = tableBuilder(tableData, tableState, usersColumns, set);
	return <DataTable table={table} filterFields={usersFilterFields} />;
};

export const usersColumns = columnBuilder<Omit<User, "password">>({
	enableSelect: true,
	columns: [
		{ title: "#", accessorKey: "id" },
		{
			title: "Email",
			accessorKey: "email",
			enableSorting: true,
			enableHiding: true,
		},
		{
			title: "Enabled",
			accessorKey: "enabled",
			enableSorting: true,
			enableHiding: true,
			cell: ({ row }) => (
				<span>
					{row.getValue("enabled") ? (
						<Check className="text-green-500 h-4 w-4" />
					) : (
						<X className="text-red-500 h-4 w-4" />
					)}
				</span>
			),
		},
		{
			title: "Role",
			accessorKey: "role",
			enableSorting: true,
			enableHiding: true,
			cell: ({ row }) => (
				<span>
					<Badge
						variant={
							row.getValue("role") === ROLES.USER ? "secondary" : "default"
						}
					>
						{row.getValue("role")}
					</Badge>
				</span>
			),
		},
		{
			title: "LastLogInAt",
			accessorKey: "lastLogInAt",
			enableSorting: true,
			enableHiding: true,
			cell: ({ row }) => (
				<span>
					{row.getValue("lastLogInAt") != null && (
						<span>
							{new Date(row.getValue("lastLogInAt")).toLocaleString()}
						</span>
					)}
				</span>
			),
		},
		{
			title: "LastLogInTries",
			accessorKey: "lastLogInTries",
			enableSorting: true,
			enableHiding: true,
		},
		{
			accessorKey: "createdAt",
			hidden: true,
		},
	],
	actions: ({ row }) => <DataTableRowActionsExample row={row} />,
});

export const usersFilterFields: FilterField<Omit<User, "password">>[] = [
	{
		type: "string",
		title: "Email",
		accessorKey: "email",
		comparator: "inc",
	},
	{
		type: "number",
		title: "LastLogInTries > than",
		accessorKey: "lastLogInTries",
		comparator: "gte",
	},
	{
		type: "selector",
		title: "Role",
		accessorKey: "role",
		isMultiple: true,
		options: Object.keys(ROLES).map((role) => ({
			comparator: "eq",
			label: role,
			value: role,
		})),
	},
	{
		type: "selector",
		title: "Enabled",
		accessorKey: "enabled",
		options: [
			{ label: "true", comparator: "eq", value: "true", icon: Check },
			{ label: "false", comparator: "eq", value: "false", icon: X },
		],
	},
	{
		type: "selector",
		title: "Has logged in",
		accessorKey: "lastLogInAt",
		options: [
			{ label: "Yes", comparator: "notnull", value: "notnull", icon: Check },
			{ label: "no", comparator: "null", value: "null", icon: X },
		],
	},
	{
		type: "date",
		title: "Created at",
		accessorKey: "createdAt",
	},
];
