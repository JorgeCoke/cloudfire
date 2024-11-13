import type { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export const Badge = (props: HTMLAttributes<HTMLDivElement>) => {
	const { children, className, ...attributes } = props;
	return (
		<span
			className={cn(
				"bg-white shadow-md border-neutral-100 border text-xs font-medium me-2 px-3 py-2 rounded-full inline-flex items-center justify-center",
				className,
			)}
			{...attributes}
		>
			{children}
		</span>
	);
};
