import { HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export const H0 = (props: HTMLAttributes<HTMLHeadingElement>) => {
  const { children, className, ...attributes } = props;
  return (
    <h1
      {...attributes}
      className={cn(
        "pb-2 font-semibold text-slate-900 text-5xl md:text-6xl lg:text-7xl",
        className
      )}
    >
      {children}
    </h1>
  );
};
