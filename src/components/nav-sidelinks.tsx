import {
	LayoutDashboard,
	Users,
	Truck,
	Settings,
	CheckCircle,
	MessageCircle,
	Apple,
	User,
	HeartHandshakeIcon,
	Rocket,
	ChartArea,
	Combine,
	FileWarning,
} from "lucide-react";

export interface NavLink {
	title: string;
	label?: string;
	href: string;
	icon: JSX.Element;
}

export interface SideLink extends NavLink {
	sub?: NavLink[];
}

export const sidelinks: SideLink[] = [
	{
		title: "Dashboard",
		label: "",
		href: "/",
		icon: <LayoutDashboard size={18} />,
	},
	{
		title: "Tasks",
		label: "3",
		href: "/tasks",
		icon: <CheckCircle size={18} />,
	},
	{
		title: "Chats",
		label: "9",
		href: "/chats",
		icon: <MessageCircle size={18} />,
	},
	{
		title: "Apps",
		label: "",
		href: "/apps",
		icon: <Apple size={18} />,
	},
	{
		title: "Authentication",
		label: "",
		href: "",
		icon: <User size={18} />,
		sub: [
			{
				title: "Sign In (email + password)",
				label: "",
				href: "/sign-in",
				icon: <HeartHandshakeIcon size={18} />,
			},
			{
				title: "Sign In (Box)",
				label: "",
				href: "/sign-in-2",
				icon: <HeartHandshakeIcon size={18} />,
			},
			{
				title: "Sign Up",
				label: "",
				href: "/sign-up",
				icon: <HeartHandshakeIcon size={18} />,
			},
			{
				title: "Forgot Password",
				label: "",
				href: "/forgot-password",
				icon: <HeartHandshakeIcon size={18} />,
			},
			{
				title: "OTP",
				label: "",
				href: "/otp",
				icon: <HeartHandshakeIcon size={18} />,
			},
		],
	},
	{
		title: "Users",
		label: "",
		href: "/users",
		icon: <Users size={18} />,
	},
	{
		title: "Requests",
		label: "10",
		href: "/requests",
		icon: <Rocket size={18} />,
		sub: [
			{
				title: "Trucks",
				label: "9",
				href: "/trucks",
				icon: <Truck size={18} />,
			},
			{
				title: "Cargos",
				label: "",
				href: "/cargos",
				icon: <Truck size={18} />,
			},
		],
	},
	{
		title: "Analysis",
		label: "",
		href: "/analysis",
		icon: <ChartArea size={18} />,
	},
	{
		title: "Extra Components",
		label: "",
		href: "/extra-components",
		icon: <Combine size={18} />,
	},
	{
		title: "Error Pages",
		label: "",
		href: "",
		icon: <FileWarning size={18} />,
		sub: [
			{
				title: "Not Found",
				label: "",
				href: "/404",
				icon: <FileWarning size={18} />,
			},
			{
				title: "Internal Server Error",
				label: "",
				href: "/500",
				icon: <FileWarning size={18} />,
			},
			{
				title: "Maintenance Error",
				label: "",
				href: "/503",
				icon: <FileWarning size={18} />,
			},
			{
				title: "Unauthorised Error",
				label: "",
				href: "/401",
				icon: <FileWarning size={18} />,
			},
		],
	},
	{
		title: "Settings",
		label: "",
		href: "/settings",
		icon: <Settings size={18} />,
	},
];
