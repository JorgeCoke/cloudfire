import AutoForm, { AutoFormSubmit } from "../../components/ui/auto-form";
import { PostSignUpBody } from "../../../types/auth-controller.types";
import { ROUTES } from "../../router";
import { Flame } from "lucide-react";

export default function SignUpPage() {
	return (
		<div className="w-full h-[100vh] lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
			<div className="flex items-center justify-center py-12">
				<div className="mx-auto grid w-[350px] gap-6">
					<div className="grid gap-2 text-center">
						<h1 className="text-3xl font-bold">Sign Up</h1>
						<p className="text-balance text-muted-foreground">
							Enter your information to create an account
						</p>
					</div>
					<AutoForm
						formSchema={PostSignUpBody}
						fieldConfig={{
							email: {
								inputProps: {
									placeholder: "example@mail.com",
								},
							},
							password: {
								inputProps: {
									type: "password",
								},
							},
							repeatPassword: {
								inputProps: {
									type: "password",
								},
							},
						}}
					>
						<AutoFormSubmit className="w-full">
							Create an account
						</AutoFormSubmit>
					</AutoForm>
					<div className="mt-4 text-center text-sm">
						Already have an account?{" "}
						<a href={ROUTES.AUTH.LOG_IN} className="underline">
							Log in
						</a>
					</div>
				</div>
			</div>
			<div className="hidden bg-zinc-900 lg:flex justify-center">
				<div className="flex flex-col gap-3 items-center justify-center font-medium text-white text-3xl">
					<Flame className="w-24 h-24 text-white" />
					Cloudfire
				</div>
			</div>
		</div>
	);
}
