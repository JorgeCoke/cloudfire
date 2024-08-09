import { columns } from "./components/columns";
import { DataTable } from "../../../components/ui/table/data-table";
import { tasks } from "./data/seed";

export default function TaskPage() {
	return (
		<div className="space-y-4">
			<div className="space-y-2">
				<h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
				<p className="text-muted-foreground">
					Here&apos;s a list of your tasks for this month!
				</p>
			</div>
			<DataTable data={tasks} columns={columns} />
		</div>
	);
}
