import type {
	GetMeResponseDto,
	PostLogInBodyDto,
	PostLogInResponseDto,
	PostSignUpBodyDto,
	PostSignUpResponseDto,
} from "../../server/routes/auth/auth.dtos";
import { http } from "../lib/http";
import { createFetcherStore, createMutatorStore } from "../lib/nanoquery";

export const $doLogin = createMutatorStore<
	PostLogInBodyDto,
	PostLogInResponseDto
>(async ({ data }) =>
	http("/auth/login", {
		method: "POST",
		body: data,
	}),
);

export const $doSignup = createMutatorStore<
	PostSignUpBodyDto,
	PostSignUpResponseDto
>(async ({ data }) =>
	http("/auth/signup", {
		method: "POST",
		body: data,
	}),
);

export const $doGetMe = createFetcherStore<GetMeResponseDto>(["/auth/me"], {
	dedupeTime: Number.POSITIVE_INFINITY,
});
