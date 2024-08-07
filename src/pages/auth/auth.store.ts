import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { queryStore, type QueryStore } from "../../lib/zustand-query";
import type {
	PostLogInBody,
	PostRequestResetPasswordBody,
	PostResetPasswordBody,
	PostSignUpBody,
} from "../../../types/auth-controller.types";
import {
	postLogIn,
	postRequestResetPassword,
	postResetPassword,
	postSignUp,
} from "./auth.service";

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
				queryFn: () => postLogIn(body),
				queryKey: "doPostLogIn",
				onSuccess: (res) => {
					localStorage.setItem("jwt", res.jwt);
				},
			}),
		doPostSignUp: (body) =>
			get().query({
				queryFn: () => postSignUp(body),
				queryKey: "doPostSignUp",
			}),
		doPostRequestResetPassword: (body) =>
			get().query({
				queryFn: () => postRequestResetPassword(body),
				queryKey: "doPostRequestResetPassword",
			}),
		doPostResetPassword: (body) =>
			get().query({
				queryFn: () => postResetPassword(body),
				queryKey: "doPostResetPassword",
			}),
	})),
);
