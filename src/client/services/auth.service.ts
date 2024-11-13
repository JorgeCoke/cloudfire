import type {
	GetMeResponseDto,
	PostLoginBodyDto,
	PostLoginResponseDto,
	PostSignupBodyDto,
	PostSignupResponseDto,
} from "../../server/routes/auth/auth.dtos";
import { http } from "../lib/http";
import { createFetcherStore, createMutatorStore } from "../lib/nanoquery";

export const AuthServiceKeys = {
	LOGIN: "/auth/login",
	SIGNUP: "/auth/signup",
	GET_ME: "/auth/me",
} as const;

export const $doLogin = createMutatorStore<
	PostLoginBodyDto,
	PostLoginResponseDto
>(async ({ data }) =>
	http(AuthServiceKeys.LOGIN, {
		method: "POST",
		body: data,
	}),
);

export const $doSignup = createMutatorStore<
	PostSignupBodyDto,
	PostSignupResponseDto
>(async ({ data }) =>
	http(AuthServiceKeys.SIGNUP, {
		method: "POST",
		body: data,
	}),
);

// TODO: Add dependecy with JWT (save JWT with https://github.com/nanostores/persistent)
export const $doGetMe = createFetcherStore<GetMeResponseDto>(
	[AuthServiceKeys.GET_ME],
	{
		dedupeTime: Number.POSITIVE_INFINITY,
	},
);
