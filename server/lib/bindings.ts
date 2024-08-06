export type Bindings = {
	DB: D1Database;
	AUTH_SESSION_SECRET_KEY: string;
	AUTH_RESET_PASSWORD_SECRET_KEY: string;
	ENV: "preview" | "production";
	DOCS_USER: string;
	DOCS_PASSWORD: string;
	DOCS_REALM: string;
};
