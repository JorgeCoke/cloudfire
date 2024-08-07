import type {
	PostLogInBody,
	PostLogInResponse,
	PostRequestResetPasswordBody,
	PostRequestResetPasswordResponse,
	PostResetPasswordBody,
	PostResetPasswordResponse,
	PostSignUpBody,
	PostSignUpResponse,
} from "../../../types/auth-controller.types";
import { rpc } from "../../lib/rpc";
import type { HTTPExceptionZod } from "../../../types/custom-http-exception.types";
import { toast } from "../../components/ui/use-toast";

export const postLogIn = (body: PostLogInBody) => {
	return rpc.api.v1.auth["log-in"].$post({ json: body }).then(async (res) => {
		const json = await res.json();
		if (res.ok) {
			toast({
				title: "Welcome back!",
				variant: "success",
			});
			return json as PostLogInResponse;
		}
		const error = (json as HTTPExceptionZod).message;
		toast({
			title: error,
			variant: "destructive",
		});
		throw new Error(error);
	});
};

export const postSignUp = (body: PostSignUpBody) => {
	return rpc.api.v1.auth["sign-up"].$post({ json: body }).then(async (res) => {
		const json = await res.json();
		if (res.ok) {
			toast({
				title: "Account created!",
				description: "You can now log in into your account",
				variant: "success",
			});
			return json as PostSignUpResponse;
		}
		const error = (json as HTTPExceptionZod).message;
		toast({
			title: error,
			variant: "destructive",
		});
		throw new Error(error);
	});
};

export const postRequestResetPassword = (
	body: PostRequestResetPasswordBody,
) => {
	return rpc.api.v1.auth["request-reset-password"]
		.$post({ json: body })
		.then(async (res) => {
			const json = await res.json();
			if (res.ok) {
				toast({
					title: "If your user exists, a mail has been sent to your email!",
					variant: "success",
				});
				return json as PostRequestResetPasswordResponse;
			}
			const error = (json as HTTPExceptionZod).message;
			toast({
				title: error,
				variant: "destructive",
			});
			throw new Error(error);
		});
};

export const postResetPassword = (body: PostResetPasswordBody) => {
	return rpc.api.v1.auth["reset-password"]
		.$post({ json: body })
		.then(async (res) => {
			const json = await res.json();
			if (res.ok) {
				toast({
					title: "Password updated successfully!",
					variant: "success",
				});
				return json as PostResetPasswordResponse;
			}
			const error = (json as HTTPExceptionZod).message;
			toast({
				title: error,
				variant: "destructive",
			});
			throw new Error(error);
		});
};
