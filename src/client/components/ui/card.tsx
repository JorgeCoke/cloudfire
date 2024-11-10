import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export const Card = (props: HTMLAttributes<HTMLDivElement>) => {
	const { children, className, ...attributes } = props;
	return (
		<div
			className={cn(
				"rounded-md border border-black/[.1] bg-white px-3 py-2 shadow-sm",
				props.onClick && "cursor-pointer",
				className,
			)}
			{...attributes}
		>
			{children}
		</div>
	);
};
