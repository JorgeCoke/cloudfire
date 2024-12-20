import { zodResolver } from "@hookform/resolvers/zod";
import { getPagePath } from "@nanostores/router";
import { LucideRefreshCcw, MoveLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ROLE } from "../../../models/enums";
import { AnchorButton, Button } from "../../components/ui/buttons";
import { Card } from "../../components/ui/card";
import { Input, Select } from "../../components/ui/form";
import { H0, H1, H2, H3, H4 } from "../../components/ui/typography";
import { $router } from "../../router";

const PlaygroundFormSchema = z.object({
	email: z.string().nullish(),
	search: z.string().nullish(),
	text: z.string().nullish(),
	textRequired: z.string().min(1),
	password: z.string().nullish(),
	passwordRequired: z.string().min(1),
	number: z.coerce.number().nullish(),
	numberRequired: z.coerce.number(),
	checkbox: z.coerce.boolean().nullish(),
	checkboxRequired: z.coerce.boolean(),
	date: z.coerce.date().nullish(),
	dateRequired: z.coerce.date(),
	datetime: z.coerce.date().nullish(),
	datetimeRequired: z.coerce.date(),
	select: z.nativeEnum(ROLE).nullish(),
	selectRequired: z.nativeEnum(ROLE),
});
type PlaygroundFormSchema = z.infer<typeof PlaygroundFormSchema>;

export default function PlaygroundPage() {
	const { register, handleSubmit, formState, watch } =
		useForm<PlaygroundFormSchema>({
			resolver: zodResolver(PlaygroundFormSchema),
		});

	return (
		<main className="container pt-24 space-y-6">
			<AnchorButton href={getPagePath($router, "HOME")}>
				<MoveLeft className="w-4 h-4" />
				Homepage
			</AnchorButton>
			<Card className="p-6 space-y-6">
				<H0>H0 title</H0>
				<H1>H1 title</H1>
				<H2>H2 title</H2>
				<H3>H3 title</H3>
				<H4>H4 title</H4>
				<H1 className="text-gradient">Gradient</H1>
				<H1 className="animate-text-gradient bg-gradient-to-r from-primary via-violet-900 to-primary bg-[200%_auto] text-transparent bg-clip-text">
					Gradient Animation
				</H1>
			</Card>
			<Card className="p-6">
				<form
					className="space-y-4"
					onSubmit={handleSubmit(async (data) => {
						console.log("Here it is your form data", data);
						alert(JSON.stringify(data));
					})}
				>
					<Input
						type="email"
						label="Email"
						placeholder="Email..."
						icon
						errorLabel={formState.errors.email?.message}
						{...register("email", {
							setValueAs: (value) => value || undefined,
						})}
					/>
					<Input
						type="search"
						label="Search"
						placeholder="Search..."
						icon
						errorLabel={formState.errors.search?.message}
						{...register("search", {
							setValueAs: (value) => value || undefined,
						})}
					/>
					<Input
						type="text"
						label="Text"
						placeholder="text..."
						errorLabel={formState.errors.text?.message}
						{...register("text", {
							setValueAs: (value) => value || undefined,
						})}
					/>
					<Input
						type="text"
						label="Text required"
						placeholder="text required..."
						required
						description="This field is required"
						icon
						errorLabel={formState.errors.textRequired?.message}
						{...register("textRequired", {
							setValueAs: (value) => value || undefined,
						})}
					/>
					<Input
						type="password"
						label="Password"
						placeholder="****"
						errorLabel={formState.errors.password?.message}
						{...register("password", {
							setValueAs: (value) => value || undefined,
						})}
					/>
					<Input
						type="password"
						label="Password required"
						placeholder="****"
						required
						description="This field is required"
						icon
						errorLabel={formState.errors.passwordRequired?.message}
						{...register("passwordRequired", {
							setValueAs: (value) => value || undefined,
						})}
					/>
					<Input
						type="number"
						label="Number"
						errorLabel={formState.errors.number?.message}
						{...register("number", {
							setValueAs: (value) => value || undefined,
						})}
					/>
					<Input
						type="number"
						label="Number required"
						required
						description="This field is required"
						icon
						errorLabel={formState.errors.numberRequired?.message}
						{...register("numberRequired", {
							setValueAs: (value) => value || undefined,
						})}
					/>
					<Input
						type="checkbox"
						label="Checkbox"
						errorLabel={formState.errors.checkbox?.message}
						{...register("checkbox", {
							setValueAs: (value) => value || undefined,
						})}
					/>
					<Input
						type="checkbox"
						label="Checkbox required"
						required
						description="This field is required"
						icon
						errorLabel={formState.errors.checkboxRequired?.message}
						{...register("checkboxRequired", {
							setValueAs: (value) => value || undefined,
						})}
					/>
					<Input
						type="date"
						label="Date"
						errorLabel={formState.errors.date?.message}
						{...register("date", {
							setValueAs: (value) => value || undefined,
						})}
					/>
					<Input
						type="date"
						label="Date required"
						required
						description="This field is required"
						icon
						errorLabel={formState.errors.dateRequired?.message}
						{...register("dateRequired", {
							setValueAs: (value) => value || undefined,
						})}
					/>
					<Input
						type="datetime-local"
						label="Datetime"
						errorLabel={formState.errors.datetime?.message}
						{...register("datetime", {
							setValueAs: (value) => value || undefined,
						})}
					/>
					<Input
						type="datetime-local"
						label="Datetime required"
						required
						description="This field is required"
						icon
						errorLabel={formState.errors.datetimeRequired?.message}
						{...register("datetimeRequired", {
							setValueAs: (value) => value || undefined,
						})}
					/>
					<Select
						label="Select"
						options={[
							{ label: "NONE", value: "" },
							...Object.values(ROLE).map((e) => ({ label: e, value: e })),
						]}
						errorLabel={formState.errors.select?.message}
						{...register("select", {
							setValueAs: (value) => value || undefined,
						})}
					/>
					<Select
						label="Select required"
						required
						description="This field is required"
						options={[
							{ label: "NONE", value: "" },
							...Object.values(ROLE).map((e) => ({ label: e, value: e })),
						]}
						errorLabel={formState.errors.selectRequired?.message}
						{...register("selectRequired", {
							setValueAs: (value) => value || undefined,
						})}
					/>
					{/* <SearchInput placeholder="Search input..." /> */}
					<p>{JSON.stringify(watch(), null, 4)}</p>
					<Button type="submit">Submit Form</Button>
				</form>
			</Card>
			<Card className="p-6 space-y-6">
				<div className="flex flex-wrap gap-4">
					<Button>Button</Button>
					<Button variant="outline">Button</Button>
					<Button variant="ghost">Button</Button>
				</div>
				<div className="flex flex-wrap gap-4">
					<Button color="danger">Button</Button>
					<Button color="danger" variant="outline">
						Button
					</Button>
					<Button color="danger" variant="ghost">
						Button
					</Button>
				</div>
				<div className="flex flex-wrap gap-4">
					<Button disabled>Disabled</Button>
					<Button size="icon">
						<LucideRefreshCcw className="h-4 w-4" />
					</Button>
					<Button>
						<LucideRefreshCcw className="h-4 w-4" />
						Text with Icon
					</Button>
					<AnchorButton href="#">Anchor</AnchorButton>
					<Button className="btn-gradient">Styled</Button>
				</div>
				<div className="flex gap-4">
					<Button className="grow">Grow</Button>
				</div>
				<div className="flex gap-4">
					<Button className="grow">
						<LucideRefreshCcw className="h-4 w-4" />
						Grow with Icon
					</Button>
				</div>
			</Card>
		</main>
	);
}
