import type { TurnstileServerValidationResponse } from "@marsidev/react-turnstile";
import { ofetch } from "ofetch";

export const validateTurnstileToken = async (token: string, key: string) => {
	const res = await ofetch<TurnstileServerValidationResponse>(
		"https://challenges.cloudflare.com/turnstile/v0/siteverify",
		{
			method: "POST",
			headers: {
				"content-type": "application/x-www-form-urlencoded",
			},
			body: `secret=${encodeURIComponent(key)}&response=${encodeURIComponent(token)}`,
		},
	);

	return res.success;
};
