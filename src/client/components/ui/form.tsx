import {
	Calendar,
	KeyRound,
	LucideArrowDown,
	LucideChevronsUpDown,
	Mail,
	Search,
} from "lucide-react";
import {
	type InputHTMLAttributes,
	type ReactNode,
	type SelectHTMLAttributes,
	forwardRef,
} from "react";
import { cn } from "../../lib/utils";
import { Button } from "./buttons";

const Label = (props: {
	label: string;
	required?: boolean;
	name?: string;
}) => (
	<label htmlFor={props.name} className="text-neutral-900 font-medium text-sm">
		{props.label}
		{props.required && <span className="text-red-500">&nbsp;*</span>}
	</label>
);

const Description = (props: {
	description: string;
}) => <p className="text-sm text-neutral-500">{props.description}</p>;

const ErrorLabel = (props: {
	error: string;
}) => <p className="text-sm text-red-500">{props.error}</p>;

const InputWrapper = (props: {
	label?: string;
	description?: string;
	error?: string;
	disabled?: boolean;
	name?: string;
	required?: boolean;
	type?: React.HTMLInputTypeAttribute | "select";
	children: ReactNode | null;
	iconElement?: ReactNode | null;
}) => {
	if (props.type === "checkbox") {
		console.log(props);
	}
	return (
		<div className="space-y-1">
			<div
				className={cn(
					"flex flex-col gap-1",
					props.type === "checkbox" &&
						"flex-row-reverse items-center justify-end",
					props.type === "hidden" && "hidden",
					props.disabled && "opacity-40",
				)}
			>
				{props.label && (
					<Label
						name={props.name}
						label={props.label}
						required={props.required}
					/>
				)}
				<div className={cn(props.type !== "checkbox" && "flex shadow-sm")}>
					{props.children}
					{props.iconElement}
				</div>
				{props.error && <ErrorLabel error={props.error} />}
			</div>
			{props.description && <Description description={props.description} />}
		</div>
	);
};

const InputClass =
	"appearance-none grow rounded-md bg-white p-2.5 leading-4 text-neutral-800 ring-1 ring-inset ring-neutral-200 text-sm placeholder-neutral-500";
const InputIconClass = "rounded-r-none w-40";
type InputProps = {
	label?: string;
	description?: string;
	error?: string;
	icon?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
	props: InputProps,
	ref,
) {
	const { icon, ...attributes } = props;
	const iconElement = InputIcon({ icon: props.icon, type: props.type });

	return (
		<InputWrapper {...attributes} iconElement={iconElement}>
			<input
				{...attributes}
				id={props.name}
				ref={ref}
				className={cn(
					props.type !== "checkbox" && InputClass,
					props.type === "checkbox" && "accent-neutral-950",
					iconElement && InputIconClass,
				)}
			/>
		</InputWrapper>
	);
});

type SelectProps = {
	options: { label: string; value: string }[];
	label?: string;
	description?: string;
	error?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
	function Select(props: SelectProps, ref) {
		const iconElement = InputIcon({ icon: true, type: "select" });

		return (
			<InputWrapper {...props} type="select" iconElement={iconElement}>
				<select {...props} ref={ref} className={cn(InputClass, InputIconClass)}>
					{props.options.map((e: { label: string; value: string }) => (
						<option key={e.value} value={e.value}>
							{e.label}
						</option>
					))}
				</select>
			</InputWrapper>
		);
	},
);

const InputIcon = (props: {
	icon?: boolean;
	type?: React.HTMLInputTypeAttribute | "select";
}) => {
	let showIcon: ReactNode | null = null;
	switch (props.type) {
		case "search":
			showIcon = props.icon ? <Search className="h-4 w-4 text-black" /> : null;
			break;
		case "email":
			showIcon = props.icon ? <Mail className="h-4 w-4 text-black" /> : null;
			break;
		case "password":
			showIcon = props.icon ? (
				<KeyRound className="h-4 w-4 text-black" />
			) : null;
			break;
		case "number":
			showIcon = props.icon ? (
				<LucideChevronsUpDown className="h-4 w-4 text-black" />
			) : null;
			break;
		case "date":
			showIcon =
				props.icon === false ? null : (
					<Calendar className="h-4 w-4 text-black" />
				);
			break;
		case "datetime-local":
			showIcon =
				props.icon === false ? null : (
					<Calendar className="h-4 w-4 text-black" />
				);
			break;
		case "select":
			showIcon = <LucideArrowDown className="h-4 w-4 text-black" />;
			break;
	}
	if (showIcon) {
		return (
			<Button
				size="icon"
				tabIndex={-1} // don't want to be tabbed
				className="pointer-events-none rounded-l-none bg-white border-neutral-200 border-l-0"
			>
				{showIcon}
			</Button>
		);
	}
	return null;
};
