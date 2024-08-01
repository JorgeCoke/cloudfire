import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";
import { tasks } from "./data/tasks";
import ThemeSwitch from "../../components/theme-switch";
import { UserNav } from "../../components/user-nav";
import { Layout } from "../../components/custom/layout";
import { Input } from "../../components/ui/input";

export default function Tasks() {
	return (
		<Layout>
			{/* ===== Top Heading ===== */}
			<Layout.Header sticky>
				<div>
					<Input
						type="search"
						placeholder="Search..."
						className="md:w-[100px] lg:w-[300px]"
					/>
				</div>
				<div className="ml-auto flex items-center space-x-4">
					<ThemeSwitch />
					<UserNav />
				</div>
			</Layout.Header>

			<Layout.Body>
				<div className="mb-2 flex items-center justify-between space-y-2">
					<div>
						<h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
						<p className="text-muted-foreground">
							Here&apos;s a list of your tasks for this month!
						</p>
					</div>
				</div>
				<div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
					<DataTable data={tasks} columns={columns} />
				</div>
			</Layout.Body>
		</Layout>
	);
}
