import { persistentAtom } from "@nanostores/persistent";
import type { JwtPayload } from "../../models/types/jwt-payload";
import type {
	GetProfileResponseDto,
	PostLoginBodyDto,
	PostLoginResponseDto,
	PostProfileBodyDto,
	PostProfileResponseDto,
	PostSignupBodyDto,
	PostSignupResponseDto,
} from "../../server/routes/auth/auth.dtos";
import { http } from "../lib/http";
import { createFetcherStore, createMutatorStore } from "../lib/nanoquery";

export const AuthServiceKeys = {
	LOGIN: "/auth/login",
	SIGNUP: "/auth/signup",
	GET_PROFILE: "/auth/profile",
	POST_PROFILE: "/auth/profile",
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

export const $doGetProfile = createFetcherStore<GetProfileResponseDto>(
	[AuthServiceKeys.GET_PROFILE],
	{
		dedupeTime: Number.POSITIVE_INFINITY,
	},
);

export const $doPostProfile = createMutatorStore<
	PostProfileBodyDto,
	PostProfileResponseDto
>(async ({ data }) =>
	http(AuthServiceKeys.POST_PROFILE, {
		method: "POST",
		body: data,
	}),
);

export const $jwt = persistentAtom<
	{ payload: JwtPayload; jwt: string } | undefined
>("session", undefined, {
	encode: JSON.stringify,
	decode: JSON.parse,
});
