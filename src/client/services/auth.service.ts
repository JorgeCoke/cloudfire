import { persistentAtom } from "@nanostores/persistent";
import type { JwtPayload } from "../../models/types/jwt-payload";
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

export const $doGetMe = createFetcherStore<GetMeResponseDto>(
	[AuthServiceKeys.GET_ME],
	{
		dedupeTime: Number.POSITIVE_INFINITY,
	},
);

export const $jwt = persistentAtom<
	{ payload: JwtPayload; jwt: string } | undefined
>("session", undefined, {
	encode: JSON.stringify,
	decode: JSON.parse,
});
