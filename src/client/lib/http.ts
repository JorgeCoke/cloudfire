import { ofetch } from "ofetch";
import toast from "react-hot-toast";

export const http = ofetch.create({
	retry: 3,
	retryDelay: 1000, // ms
	timeout: 15000, // ms
	ignoreResponseError: true,
	baseURL: "/api/v1",
	async onRequest({ options }) {
		const session = localStorage.getItem("session");
		if (session) {
			const jwt = JSON.parse(session).jwt;
			options.headers.set("Authorization", `Bearer ${jwt}`);
		}
	},
	async onResponse({ response }) {
		if (
			!response.ok &&
			response._data.message &&
			!response.url.includes("/auth/profile")
		) {
			toast.error(response._data.message);
		}
		if (
			!response.ok &&
			response.url.includes("/auth/profile") &&
			response.status === 401
		) {
			localStorage.removeItem("session");
		}
	},
});
