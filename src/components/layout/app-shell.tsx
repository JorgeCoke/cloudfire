import { Home, LineChart, Package, ShoppingCart, Users } from "lucide-react";
import { Header } from "./header";
import { Navbar } from "./navbar";
import { Outlet } from "react-router-dom";
import { ROUTES } from "../../router";

export const DashboardItems = [
	{
		href: ROUTES.DASHBOARD.USERS,
		label: "Users",
		icon: <Users className="h-5 w-5" />,
		badge: null,
	},
	{
		href: "#",
		label: "Dashboard",
		icon: <Home className="h-5 w-5" />,
		badge: null,
	},
	{
		href: "#",
		label: "Orders",
		icon: <ShoppingCart className="h-5 w-5" />,
		badge: 6,
	},
	{
		href: "#",
		label: "Products",
		icon: <Package className="h-5 w-5" />,
		badge: null,
	},
	{
		href: "#",
		label: "Analytics",
		icon: <LineChart className="h-5 w-5" />,
		badge: null,
	},
];

export default function AppShell() {
	return (
		<div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
			<div className="hidden border-r bg-muted/40 md:block">
				<Navbar />
			</div>
			<div className="flex flex-col">
				<Header />
				<main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
