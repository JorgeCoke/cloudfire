import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export const H0 = (props: HTMLAttributes<HTMLHeadingElement>) => {
	const { children, className, ...attributes } = props;
	return (
		<h1
			{...attributes}
			className={cn(
				"font-extrabold text-neutral-950 text-5xl md:text-6xl lg:text-7xl",
				className,
			)}
		>
			{children}
		</h1>
	);
};

export const H1 = (props: HTMLAttributes<HTMLHeadingElement>) => {
	const { children, className, ...attributes } = props;
	return (
		<h1
			{...attributes}
			className={cn(
				"font-bold text-neutral-950 text-4xl md:text-5xl lg:text-6xl",
				className,
			)}
		>
			{children}
		</h1>
	);
};

export const H2 = (props: HTMLAttributes<HTMLHeadingElement>) => {
	const { children, className, ...attributes } = props;
	return (
		<h1
			{...attributes}
			className={cn(
				"text-neutral-950 text-3xl md:text-4xl lg:text-5xl",
				className,
			)}
		>
			{children}
		</h1>
	);
};

export const H3 = (props: HTMLAttributes<HTMLHeadingElement>) => {
	const { children, className, ...attributes } = props;
	return (
		<h1
			{...attributes}
			className={cn(
				"text-neutral-950 text-2xl md:text-3xl lg:text-4xl",
				className,
			)}
		>
			{children}
		</h1>
	);
};

export const H4 = (props: HTMLAttributes<HTMLHeadingElement>) => {
	const { children, className, ...attributes } = props;
	return (
		<h1
			{...attributes}
			className={cn(
				"text-neutral-950 text-xl md:text-2xl lg:text-3xl",
				className,
			)}
		>
			{children}
		</h1>
	);
};
