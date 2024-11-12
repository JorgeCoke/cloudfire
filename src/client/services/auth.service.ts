import type {
	GetMeResponseDto,
	PostLoginBodyDto,
	PostLoginResponseDto,
	PostSignupBodyDto,
	PostSignupResponseDto,
} from "../../server/routes/auth/auth.dtos";
import { http } from "../lib/http";
import { createFetcherStore, createMutatorStore } from "../lib/nanoquery";

export const $doLogin = createMutatorStore<
	PostLoginBodyDto,
	PostLoginResponseDto
>(async ({ data }) =>
	http("/auth/login", {
		method: "POST",
		body: data,
	}),
);

export const $doSignup = createMutatorStore<
	PostSignupBodyDto,
	PostSignupResponseDto
>(async ({ data }) =>
	http("/auth/signup", {
		method: "POST",
		body: data,
	}),
);

export const $doGetMe = createFetcherStore<GetMeResponseDto>(["/auth/me"], {
	dedupeTime: Number.POSITIVE_INFINITY,
});
