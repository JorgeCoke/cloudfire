import { Menu, Search, CircleUser, Flame } from "lucide-react";
import {
	Card,
	CardHeader,
	CardTitle,
	CardDescription,
	CardContent,
} from "../ui/card";
import { Input } from "../ui/input";
import { SheetTrigger, SheetContent, Sheet } from "../ui/sheet";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { ROUTES } from "../../router";
import { DashboardItems } from "./app-shell";
import { cn } from "../../lib/utils";
import { useLocation } from "react-router-dom";

export const Header = () => {
	const path = useLocation();

	return (
		<header className="flex h-16 items-center gap-4 border-b bg-muted/40 px-4">
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" size="icon" className="shrink-0 md:hidden">
						<Menu className="h-5 w-5" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="flex flex-col">
					<nav className="grid gap-2 text-lg font-medium">
						<a
							href="/"
							className="flex items-center gap-2 text-lg font-semibold"
						>
							<Flame className="h-6 w-6" />
							<span className="sr-only">Cloudfire</span>
						</a>
						{DashboardItems.map((e) => (
							<a
								key={e.href}
								href={e.href}
								className={cn(
									"mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground",
									path.pathname === e.href && "bg-muted text-black font-bold",
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
					<div className="mt-auto">
						<Card>
							<CardHeader>
								<CardTitle>Upgrade to Pro</CardTitle>
								<CardDescription>
									Unlock all features and get unlimited access to our support
									team.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<Button size="sm" className="w-full">
									Upgrade
								</Button>
							</CardContent>
						</Card>
					</div>
				</SheetContent>
			</Sheet>
			<div className="w-full flex-1">
				<form>
					<div className="relative">
						<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
						<Input
							type="search"
							placeholder="Search products..."
							className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
						/>
					</div>
				</form>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="secondary" size="icon" className="rounded-full">
						<CircleUser className="h-5 w-5" />
						<span className="sr-only">Toggle user menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel>My Account</DropdownMenuLabel>
					<DropdownMenuSeparator />
					<DropdownMenuItem asChild>
						<a href={ROUTES.DASHBOARD.SETTINGS}>Settings</a>
					</DropdownMenuItem>
					<DropdownMenuItem>Support</DropdownMenuItem>
					<DropdownMenuSeparator />
					<DropdownMenuItem asChild>
						<a href={ROUTES.AUTH.LOG_IN}>Log out</a>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	);
};
