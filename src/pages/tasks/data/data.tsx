import {
	ArrowDown,
	ArrowRight,
	ArrowUp,
	ShieldQuestionIcon,
} from "lucide-react";

export const labels = [
	{
		value: "bug",
		label: "Bug",
	},
	{
		value: "feature",
		label: "Feature",
	},
	{
		value: "documentation",
		label: "Documentation",
	},
];

export const statuses = [
	{
		value: "backlog",
		label: "Backlog",
		icon: ShieldQuestionIcon,
	},
	{
		value: "todo",
		label: "Todo",
		icon: ShieldQuestionIcon,
	},
	{
		value: "in progress",
		label: "In Progress",
		icon: ShieldQuestionIcon,
	},
	{
		value: "done",
		label: "Done",
		icon: ShieldQuestionIcon,
	},
	{
		value: "canceled",
		label: "Canceled",
		icon: ShieldQuestionIcon,
	},
];

export const priorities = [
	{
		label: "Low",
		value: "low",
		icon: ArrowDown,
	},
	{
		label: "Medium",
		value: "medium",
		icon: ArrowRight,
	},
	{
		label: "High",
		value: "high",
		icon: ArrowUp,
	},
];
