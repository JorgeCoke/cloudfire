import { ofetch } from "ofetch";
import toast from "react-hot-toast";
import { AuthServiceKeys } from "../services/auth.service";

export const http = ofetch.create({
	retry: 3,
	retryDelay: 1000, // ms
	timeout: 15000, // ms
	ignoreResponseError: true,
	baseURL: "/api/v1",
	async onRequest({ options }) {
		const jwt = localStorage.getItem("jwt");
		if (jwt) {
			options.headers.set("Authorization", `Bearer ${jwt}`);
		}
	},
	async onResponse({ response }) {
		if (
			!response.ok &&
			response._data.message &&
			!response.url.includes(AuthServiceKeys.GET_ME)
		) {
			toast.error(response._data.message);
		}
	},
});
