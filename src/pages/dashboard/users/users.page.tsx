import { Button } from "../../../components/ui/button";
import { DataTable } from "../../../components/ui/table/data-table";
import { columns } from "./columns";
import { useUsersStore } from "./users.store";

export default function UsersPage() {
	const { table, doSearchUsers } = useUsersStore();

	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">
					Wow, that's a lot of users
				</h2>
				<p className="text-muted-foreground">
					Here&apos;s a list of your users
				</p>
				<Button onClick={() => doSearchUsers()}>Search users</Button>
			</div>
			<DataTable data={table.users.items} columns={columns} />
		</div>
	);
}
