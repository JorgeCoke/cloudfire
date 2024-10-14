import { InsertUser } from "../../../../../server/lib/db/schemas/users.table";
import { Button } from "../../../../components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "../../../../components/ui/sheet";
import AutoForm, { AutoFormSubmit } from "../../../../components/ui/auto-form";
import { useEffect, useState } from "react";
import { useUsersStore } from "../users.store";

interface UpdateTaskSheetProps
	extends React.ComponentPropsWithRef<typeof Sheet> {
	user?: Omit<InsertUser, "password">;
}
export const UserSheet = ({ user, ...props }: UpdateTaskSheetProps) => {
	const usersStore = useUsersStore();
	useEffect(() => {
		if (user) {
			setValues(user);
		}
	}, [user]);
	const [values, setValues] = useState<Partial<Omit<InsertUser, "password">>>({
		...user,
	});

	return (
		<Sheet {...props}>
			<SheetContent className=" overflow-auto">
				<SheetHeader>
					<SheetTitle>{user ? "Edit" : "Create"}</SheetTitle>
				</SheetHeader>
				<AutoForm
					values={values}
					onParsedValuesChange={setValues}
					formSchema={InsertUser}
					fieldConfig={{
						id: {
							inputProps: {
								type: "hidden",
							},
						},
						password: {
							inputProps: {
								type: "hidden",
							},
						},
						lastLogInAt: {
							inputProps: {
								disabled: true,
							},
						},
						lastLogInTries: {
							inputProps: {
								disabled: true,
							},
						},
						lastResetPasswordRequestAt: {
							inputProps: {
								disabled: true,
							},
						},
						createdAt: {
							inputProps: {
								disabled: true,
							},
						},
						updatedAt: {
							inputProps: {
								disabled: true,
							},
						},
					}}
				>
					<AutoFormSubmit
						className="w-full"
						disabled={usersStore.isLoading}
						aria-disabled={usersStore.isLoading}
					>
						{user ? "Save" : "Create"}
					</AutoFormSubmit>
				</AutoForm>
				<SheetFooter className="py-4">
					<Button className="w-full" type="button" variant="destructive">
						Delete
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
};
