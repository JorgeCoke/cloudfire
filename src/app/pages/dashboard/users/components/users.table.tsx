import { useUsersStore } from "../users.store";
import { useEffect, useState } from "react";
import type { User } from "../../../../../server/lib/db/schemas/users.table";
import { Badge } from "../../../../components/ui/badge";
import { Check, Edit, X } from "lucide-react";
import type { FilterField } from "../../../../lib/generic-search-query";
import { DataTable } from "../../../../components/ui/table/data-table";
import {
	columnBuilder,
	tableBuilder,
} from "../../../../components/ui/table/data-table-builder";
import { useEffectOnce } from "../../../../lib/hooks/use-effect-once";
import { ROLE } from "../../../../../types/enums";
import { useDebounce } from "../../../../lib/hooks/use-debounce";
import { UserSheet } from "./user.sheet";
import { Button } from "../../../../components/ui/button";

export const UsersTable = () => {
	const { tableData, tableState, doSearchUsers, set } = useUsersStore();
	const debounceTableState = useDebounce(tableState, 500);
	useEffectOnce(() => {
		if (tableData.items.length === 0) {
			doSearchUsers();
		}
	});
	useEffect(() => {
		doSearchUsers();
	}, [debounceTableState]);
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
							row.getValue("role") === ROLE.USER ? "secondary" : "default"
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
	actions: ({ row }) => {
		const [open, setOpen] = useState<boolean>(false);
		return (
			<>
				{/* // TODO: FIX ANY */}
				<UserSheet
					open={open}
					onOpenChange={setOpen}
					user={row.original as any}
				/>
				<Button
					onClick={() => setOpen(true)}
					type="button"
					size="sm"
					variant="ghost"
					title="Edit"
				>
					<Edit className="h-4 w-4" />
				</Button>
			</>
		);
	},
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
		options: Object.values(ROLE).map((role) => ({
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
