import { CheckIcon, CircleFadingPlusIcon } from "lucide-react";
import type { Column } from "@tanstack/react-table";
import { Badge } from "../badge";
import { Button } from "../button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "../command";
import { Popover, PopoverContent, PopoverTrigger } from "../popover";
import { Separator } from "../separator";
import { cn } from "../../../lib/utils";
import type {
	Comparator,
	FilterFieldOption,
} from "../../../../types/generic-search-query";

interface DataTableFacetedFilterProps<TData, TValue> {
	column?: Column<TData, TValue>;
	title?: string;
	options: FilterFieldOption[];
	isMultiple?: boolean;
}

export function DataTableFacetedFilter<TData, TValue>({
	column,
	title,
	options,
	isMultiple,
}: DataTableFacetedFilterProps<TData, TValue>) {
	const selectedValues = new Set(
		column?.getFilterValue()
			? (JSON.parse(column?.getFilterValue() as string) as {
					value: string;
					comparator: Comparator;
				}[])
			: [],
	);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline" size="sm" className="h-8 border-dashed">
					<CircleFadingPlusIcon className="mr-2 h-4 w-4" />
					{title}
					{selectedValues?.size > 0 && (
						<>
							<Separator orientation="vertical" className="mx-2 h-4" />
							<Badge
								variant="secondary"
								className="rounded-sm px-1 font-normal lg:hidden"
							>
								1
							</Badge>
							<div className="hidden space-x-1 lg:flex">
								{selectedValues.size > 2 ? (
									<Badge
										variant="secondary"
										className="rounded-sm px-1 font-normal"
									>
										{selectedValues.size} selected
									</Badge>
								) : (
									options
										.filter((option) =>
											Array.from(selectedValues).some(
												(e) => e.value === option.value,
											),
										)
										.map((option) => (
											<Badge
												variant="secondary"
												key={option.value}
												className="rounded-sm px-1 font-normal"
											>
												{option.label}
											</Badge>
										))
								)}
							</div>
						</>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0" align="start">
				<Command>
					<CommandInput placeholder={title} />
					<CommandList>
						<CommandEmpty>No results found.</CommandEmpty>
						<CommandGroup>
							{options.map((option) => {
								const isSelected = Array.from(selectedValues).some(
									(e) => e.value === option.value,
								);
								return (
									<CommandItem
										key={option.value}
										onSelect={() => {
											if (isMultiple) {
												if (isSelected) {
													const filterValues = Array.from(
														selectedValues,
													).filter((e) => e.value !== option.value);
													selectedValues.clear();
													filterValues.forEach((e) => {
														selectedValues.add(e);
													});
												} else {
													selectedValues.add({
														value: option.value,
														comparator: option.comparator,
													});
												}
											} else {
												selectedValues.clear();
												selectedValues.add({
													value: option.value,
													comparator: option.comparator,
												});
											}
											const filterValues = Array.from(selectedValues);
											column?.setFilterValue(
												filterValues.length
													? JSON.stringify(filterValues)
													: undefined,
											);
										}}
									>
										<div
											className={cn(
												"mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
												isSelected
													? "bg-primary text-primary-foreground"
													: "opacity-50 [&_svg]:invisible",
											)}
										>
											<CheckIcon className={cn("h-4 w-4")} />
										</div>
										{option.icon && (
											<option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
										)}
										<span>{option.label}</span>
									</CommandItem>
								);
							})}
						</CommandGroup>
						{selectedValues.size > 0 && (
							<>
								<CommandSeparator />
								<CommandGroup>
									<CommandItem
										onSelect={() => column?.setFilterValue(undefined)}
										className="justify-center text-center"
									>
										Clear filters
									</CommandItem>
								</CommandGroup>
							</>
						)}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
