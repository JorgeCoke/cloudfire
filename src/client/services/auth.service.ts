import {
  PostLogInDto,
  PostLogInResponseDto,
  PostSignUpDto,
  PostSignUpResponseDto,
} from "../../server/routes/auth/auth.dtos";
import { http } from "../lib/http";
import { createMutatorStore } from "../lib/nanoquery";

export const $doLogin = createMutatorStore<PostLogInDto, PostLogInResponseDto>(
  async ({ data }) =>
    http("/api/v1/auth/login", {
      method: "POST",
      body: data,
    })
);

export const $doSignup = createMutatorStore<
  PostSignUpDto,
  PostSignUpResponseDto
>(async ({ data }) =>
  http("/api/v1/auth/signup", {
    method: "POST",
    body: data,
  })
);
