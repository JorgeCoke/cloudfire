import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { forwardRef } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { cn } from "../../lib/utils";

export const DatePicker = forwardRef<
	HTMLDivElement,
	{
		date?: Date;
		disabled: boolean;
		setDate: (date?: Date) => void;
	}
>(function DatePickerCmp({ date, setDate, disabled }, ref) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					disabled={disabled}
					aria-disabled={disabled}
					variant={"outline"}
					className={cn(
						"w-full justify-start text-left font-normal",
						!date && "text-muted-foreground",
					)}
				>
					<CalendarIcon className="mr-2 h-4 w-4" />
					{date ? format(date, "PPP") : <span>Pick a date</span>}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" ref={ref}>
				<Calendar
					mode="single"
					selected={date}
					onSelect={setDate}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
});
