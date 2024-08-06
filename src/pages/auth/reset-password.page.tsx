import { Flame } from "lucide-react";
import {
	PostRequestResetPasswordBody,
	PostResetPasswordBody,
} from "../../../types/auth-controller.types";
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
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import type { z } from "zod";

export default function ResetPasswordPage() {
	const [searchParams] = useSearchParams();
	const [values] = useState<Partial<z.infer<typeof PostResetPasswordBody>>>({
		token: searchParams.get("token") || undefined,
	});

	return (
		<div className="container h-screen w-screen flex flex-col gap-4 justify-center items-center bg-zinc-50">
			<h1 className="text-2xl font-bold">
				<Flame className="w-12 h-12" />
			</h1>
			<Card className="w-full max-w-sm bg-white">
				<CardHeader>
					<CardTitle className="text-2xl">Reset your password</CardTitle>
					<CardDescription>
						{searchParams.get("token")
							? "Enter your new password"
							: "Enter your email and we'll send you a link to reset your password"}
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					{searchParams.get("token") ? (
						<AutoForm
							formSchema={PostResetPasswordBody}
							values={values}
							fieldConfig={{
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
								token: {
									inputProps: {
										type: "hidden",
										showLabel: false,
									},
								},
							}}
						>
							<AutoFormSubmit className="w-full">Reset Password</AutoFormSubmit>
						</AutoForm>
					) : (
						<AutoForm
							formSchema={PostRequestResetPasswordBody}
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
					)}
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
