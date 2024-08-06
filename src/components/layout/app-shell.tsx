import { Home, LineChart, Package, ShoppingCart, Users } from "lucide-react";
import { Navbar } from "./navbar";
import { Outlet } from "react-router-dom";
import { ROUTES } from "../../router";
import { Header } from "./header";

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
		<div className="relative h-full overflow-hidden">
			<div className="hidden border-r z-10 bg-zinc-50 md:block fixed left-0 top-0 max-h-svh w-56 h-full">
				<Navbar />
			</div>
			<div className="overflow-x-hidden md:overflow-y-hidden h-full md:ml-56">
				<Header />
				<main className="p-4 overflow-auto">
					<Outlet />
				</main>
			</div>
		</div>
	);
}
