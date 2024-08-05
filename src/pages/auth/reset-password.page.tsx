import { Flame } from "lucide-react";
import { PostResetPasswordBody } from "../../../types/auth-controller.types";
import AutoForm, { AutoFormSubmit } from "../../components/ui/auto-form";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";
import { ROUTES } from "../../router";

export default function ResetPasswordPage() {
	return (
		<div className="container h-screen w-screen flex flex-col gap-4 justify-center items-center">
			<h1 className="text-2xl font-bold">
				<Flame className="w-12 h-12" />
			</h1>
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle className="text-2xl">Reset your password</CardTitle>
					<CardDescription>
						Enter your email and we'll send you a link to reset your password.
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<AutoForm
						formSchema={PostResetPasswordBody}
						fieldConfig={{
							email: {
								inputProps: {
									placeholder: "example@mail.com",
								},
							},
						}}
					>
						<AutoFormSubmit className="w-full">Reset Password</AutoFormSubmit>
					</AutoForm>
				</CardContent>
				<CardFooter>
					<div className="mt-4 text-center text-sm">
						Do you want to create a new account?{" "}
						<a href={ROUTES.AUTH.SIGN_UP} className="underline">
							Sign up here
						</a>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
