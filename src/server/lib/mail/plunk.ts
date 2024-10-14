import type { Context } from "hono";
import type { CfEnv } from "../../../types/cf-env";
import { ActionButtonTemplate } from "./templates/action-button.template";
import { render } from "@react-email/components";

const sendMail = async (args: {
	email: string;
	subject: string;
	body: string;
	key: string;
}) => {
	return await fetch("https://api.useplunk.com/v1/send", {
		method: "POST",
		body: JSON.stringify({
			to: args.email,
			subject: args.subject,
			body: args.body,
		}),
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${args.key}`,
		},
	});
};

export const sendResetPasswordMail = async (
	c: Context<{
		Bindings: CfEnv;
	}>,
	email: string,
	token: string,
) => {
	return await sendMail({
		key: c.env.PLUNK_API_KEY,
		email: email,
		subject: "Reset Password",
		body: await render(
			ActionButtonTemplate({
				url: `${c.req.url.split("/api/v1")[0]}/auth/reset-password?token=${token}`,
				paragraphs: [
					"You're receiving this e-mail because you or someone else has requested a password reset for your user account",
					"It can be safely ignored if you did not request a password reset. Click the link below to reset your password:",
				],
				buttonLabel: "Reset Password",
			}),
		),
	});
};
