import { Bell, Flame } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { DashboardItems } from "./dashboard-layout";
import { useLocation } from "react-router-dom";
import { cn } from "../../lib/utils";

export const DashboardNavbar = () => {
	const path = useLocation();

	return (
		<div className="flex h-full flex-col gap-2">
			<div className="flex items-center border-b px-4 h-16">
				<a href="/" className="flex items-center gap-2 font-semibold">
					<Flame className="h-6 w-6" />
					<span className="">Cloudfire</span>
				</a>
				<Button variant="outline" size="icon" className="ml-auto h-8 w-8">
					<Bell className="h-4 w-4" />
					<span className="sr-only">Toggle notifications</span>
				</Button>
			</div>
			<div className="flex-1">
				<nav className="grid items-start px-4 text-sm font-medium">
					{DashboardItems.map((e) => (
						<a
							key={e.href}
							href={e.href}
							className={cn(
								"flex items-center gap-4 rounded-lg px-3 py-3 text-muted-foreground transition-all hover:text-primary",
								path.pathname === e.href && " bg-zinc-200 text-black font-bold",
							)}
						>
							{e.icon}
							{e.label}
							{e.badge && (
								<Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
									{e.badge}
								</Badge>
							)}
						</a>
					))}
				</nav>
			</div>
			<div className="mt-auto p-4">
				<Card>
					<CardHeader className="p-2 pt-0 md:p-4">
						<CardTitle>Upgrade to Pro</CardTitle>
						<CardDescription>
							Unlock all features and get unlimited access to our support team.
						</CardDescription>
					</CardHeader>
					<CardContent className="p-2 pt-0 md:p-4 md:pt-0">
						<Button size="sm" className="w-full">
							Upgrade
						</Button>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
