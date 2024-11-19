import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

type Color = "primary" | "danger";
type Variant = "default" | "outline" | "ghost";
type Size = "default" | "icon";

type ButtonProps = {
	variant?: Variant;
	color?: Color;
	disabled?: boolean;
	size?: Size;
};

const mergeStyles = (props: ButtonProps & { className?: string }): string => {
	const style: { [key in Color]: { [key in Variant]: string } } = {
		primary: {
			default:
				"text-white bg-neutral-950 hover:bg-neutral-800 border border-transparent",
			outline:
				"text-neutral-800 bg-transparent hover:bg-neutral-300 border border-neutral-800",
			ghost:
				"bg-transparent text-black border-transparent hover:bg-neutral-200",
		},
		danger: {
			default: "bg-red-500 hover:bg-red-600 text-white",
			outline:
				"text-red-500 bg-transparent hover:bg-red-100 border border-red-500",
			ghost: "bg-transparent text-red-500 border-transparent hover:bg-red-100",
		},
	};

	return cn(
		"rounded-md px-6 py-2 text-sm font-semibold transition-all leading-4 whitespace-nowrap inline-flex justify-center items-center gap-2 w-fit",
		props.disabled && "opacity-50 pointer-events-none",
		props.size === "icon" && "px-2",
		style[props.color || "primary"][props.variant || "default"],
		props.className,
	);
};

export const Button = (
	props: ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>,
) => {
	const { children, ...attributes } = props;
	return (
		<button {...attributes} className={mergeStyles(attributes)}>
			{props.children}
		</button>
	);
};

export const AnchorButton = (
	props: ButtonProps &
		AnchorHTMLAttributes<HTMLAnchorElement> & { href: string },
) => {
	const { children, ...attributes } = props;
	return (
		<a {...attributes} className={mergeStyles(attributes)}>
			{props.children}
		</a>
	);
};
