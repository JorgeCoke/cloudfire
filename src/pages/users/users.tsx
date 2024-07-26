import { Search } from "lucide-react";
import { Button } from "../../components/custom/button";
import { Layout } from "../../components/custom/layout";
import { TopNav } from "../../components/top-nav";
import { UserNav } from "../../components/user-nav";
import ThemeSwitch from "../../components/theme-switch";

const topNav = [
	{
		title: "Overview",
		href: "dashboard/overview",
		isActive: true,
	},
	{
		title: "Customers",
		href: "dashboard/customers",
		isActive: false,
	},
	{
		title: "Products",
		href: "dashboard/products",
		isActive: false,
	},
	{
		title: "Settings",
		href: "dashboard/settings",
		isActive: false,
	},
];

export default function UsersPage() {
	return (
		<Layout>
			{/* ===== Top Heading ===== */}
			<Layout.Header>
				<TopNav links={topNav} />
				<div className="ml-auto flex items-center space-x-4">
					<Search />
					<ThemeSwitch />
					<UserNav />
				</div>
			</Layout.Header>

			{/* ===== Main ===== */}
			<Layout.Body>
				<div className="mb-2 flex items-center justify-between space-y-2">
					<h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
					<div className="flex items-center space-x-2">
						<Button>Download</Button>
					</div>
				</div>
			</Layout.Body>
		</Layout>
	);
}
