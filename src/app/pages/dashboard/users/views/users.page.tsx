import { UsersTable } from "../components/users.table";

export default function UsersPage() {
	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">
					Wow, that's a lot of users
				</h2>
				<p className="text-muted-foreground">
					Here&apos;s a list of your users
				</p>
			</div>
			<UsersTable />
		</div>
	);
}
