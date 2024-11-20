import type { LANG, ROLE } from "../enums";

export type JwtPayload = {
	userId: string;
	language: LANG;
	role: ROLE;
	exp: number; // The token is checked to ensure it has not expired.
	// nbf: number; // The token is checked to ensure it is not being used before a specified time.
	// iat: number; // The token is checked to ensure it is not issued in the future.
};
