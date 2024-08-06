import AutoForm, { AutoFormSubmit } from "../../components/ui/auto-form";
import { PostLogInBody } from "../../../types/auth-controller.types";
import { ROUTES } from "../../router";
import { Flame } from "lucide-react";
import { useAuthStore } from "./auth.store";

export default function LogInPage() {
	const authStore = useAuthStore();

	return (
		<div className="w-full h-[100vh] lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
			<div className="flex items-center justify-center py-12">
				<div className="mx-auto grid w-[350px] gap-6">
					<div className="grid gap-2 text-center">
						<h1 className="text-3xl font-bold">Log In</h1>
						<p className="text-balance text-muted-foreground">
							Enter your email below to login to your account
						</p>
					</div>
					<AutoForm
						onSubmit={(body) => authStore.doPostLogIn(body)}
						formSchema={PostLogInBody}
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
								description: (
									<div className="flex items-center">
										<a
											href={ROUTES.AUTH.RESET_PASSWORD}
											className="ml-auto inline-block text-sm underline"
										>
											Forgot your password?
										</a>
									</div>
								),
							},
						}}
					>
						<AutoFormSubmit
							className="w-full"
							disabled={authStore.isLoading}
							aria-disabled={authStore.isLoading}
						>
							Log In
						</AutoFormSubmit>
					</AutoForm>
					<div className="mt-4 text-center text-sm">
						Don&apos;t have an account?{" "}
						<a href={ROUTES.AUTH.SIGN_UP} className="underline">
							Sign up
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
