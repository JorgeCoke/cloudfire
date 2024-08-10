import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { queryStore, type QueryStore } from "../../lib/zustand-query";
import type {
	PostLogInBody,
	PostLogInResponse,
	PostRequestResetPasswordBody,
	PostRequestResetPasswordResponse,
	PostResetPasswordBody,
	PostResetPasswordResponse,
	PostSignUpBody,
	PostSignUpResponse,
} from "../../../types/controllers/auth-controller.types";
import { fetcher, rpc } from "../../lib/rpc";
import { destructiveToast, successToast } from "../../components/ui/use-toast";

// biome-ignore lint/complexity/noBannedTypes: <explanation>
type State = {};

type Actions = {
	doPostLogIn: (body: PostLogInBody) => Promise<void>;
	doPostSignUp: (body: PostSignUpBody) => Promise<void>;
	doPostRequestResetPassword: (
		body: PostRequestResetPasswordBody,
	) => Promise<void>;
	doPostResetPassword: (body: PostResetPasswordBody) => Promise<void>;
};

const initialState: State = {};

export const useAuthStore = create<
	State & Actions & QueryStore<typeof initialState>
>()(
	immer((set, get) => ({
		...queryStore(set, get, initialState),
		doPostLogIn: (body) =>
			get().query({
				queryKey: "doPostLogIn",
				queryFn: () =>
					fetcher<PostLogInResponse>(
						rpc.api.v1.auth["log-in"].$post({ json: body }),
					),
				onSuccess: (res) => {
					successToast({
						title: "Welcome back!",
					});
					localStorage.setItem("jwt", res.jwt);
				},
				onError: (error) => {
					destructiveToast({
						title: error.message,
					});
				},
			}),
		doPostSignUp: (body) =>
			get().query({
				queryKey: "doPostSignUp",
				queryFn: () =>
					fetcher<PostSignUpResponse>(
						rpc.api.v1.auth["sign-up"].$post({ json: body }),
					),
				onSuccess: () => {
					successToast({
						title: "Account created!",
						description: "You can now log in into your account",
					});
				},
				onError: (error) => {
					destructiveToast({
						title: error.message,
					});
				},
			}),
		doPostRequestResetPassword: (body) =>
			get().query({
				queryKey: "doPostRequestResetPassword",
				queryFn: () =>
					fetcher<PostRequestResetPasswordResponse>(
						rpc.api.v1.auth["request-reset-password"].$post({ json: body }),
					),
				onSuccess: () => {
					successToast({
						title: "If your user exists, a mail has been sent to your email!",
					});
				},
				onError: (error) => {
					destructiveToast({
						title: error.message,
					});
				},
			}),
		doPostResetPassword: (body) =>
			get().query({
				queryKey: "doPostResetPassword",
				queryFn: () =>
					fetcher<PostResetPasswordResponse>(
						rpc.api.v1.auth["reset-password"].$post({ json: body }),
					),
				onSuccess: () => {
					successToast({
						title: "Password updated successfully!",
						description: "You can now log in with your new credentials",
					});
				},
				onError: (error) => {
					destructiveToast({
						title: error.message,
					});
				},
			}),
	})),
);
