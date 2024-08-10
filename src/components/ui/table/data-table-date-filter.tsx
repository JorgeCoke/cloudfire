import { CalendarIcon } from "lucide-react";
import type { Column } from "@tanstack/react-table";
import { Button } from "../button";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { cn } from "../../../lib/utils";
import { Calendar } from "../calendar";
import { date } from "zod";
import type { Comparator } from "../../../../types/generic-search-query";

interface DataTableDateFilterProps<TData, TValue> {
	column?: Column<TData, TValue>;
	title?: string;
}

export function DataTableDateFilter<TData, TValue>({
	column,
	title,
}: DataTableDateFilterProps<TData, TValue>) {
	let selectedDates = title;
	const filterValue: { value: string; comparator: Comparator }[] =
		column?.getFilterValue()
			? JSON.parse(column?.getFilterValue() as string)
			: null;
	if (filterValue) {
		const from = new Date(filterValue[0].value);
		const to = new Date(Number(filterValue[1].value) - 3 * 60 * 60 * 1000);
		if (from.toISOString().split("T")[0] === to.toISOString().split("T")[0]) {
			selectedDates = from.toISOString().split("T")[0];
		} else {
			selectedDates = `${from.toISOString().split("T")[0]} / ${to.toISOString().split("T")[0]}`;
		}
	}
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={"outline"}
					className={cn(
						"justify-start text-left font-normal h-8",
						!date && "text-muted-foreground",
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					<span>{selectedDates}</span>
				</Button>
			</PopoverTrigger>
			<PopoverContent className="flex w-auto flex-col space-y-2 p-2">
				<div className="rounded-md border">
					<Calendar
						mode="range"
						numberOfMonths={1}
						weekStartsOn={1}
						selected={
							column?.getFilterValue() != null
								? {
										from: new Date(
											JSON.parse(column?.getFilterValue() as string)[0].value,
										),
										to: new Date(
											JSON.parse(column?.getFilterValue() as string)[1].value -
												3 * 60 * 60 * 1000,
										),
									}
								: undefined
						}
						onSelect={(date) => {
							if (!date) {
								column?.setFilterValue(undefined);
							}
							const from = new Date(
								date!.from!.getTime() -
									date!.from!.getTimezoneOffset() * 60 * 1000,
							);
							from.setUTCHours(0, 0, 0, 0);
							const to = date?.to
								? new Date(
										date!.to!.getTime() -
											date!.to!.getTimezoneOffset() * 60 * 1000,
									)
								: new Date(from.getTime());
							to.setUTCHours(23, 59, 59, 999);
							column?.setFilterValue(
								JSON.stringify([
									{ value: from.getTime(), comparator: "gte" },
									{ value: to.getTime(), comparator: "lte" },
								]),
							);
						}}
					/>
					<Button
						onClick={() => {
							column?.setFilterValue(undefined);
						}}
						className="justify-center text-center w-full"
					>
						Clear
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}
