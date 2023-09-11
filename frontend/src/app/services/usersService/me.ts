import httpClient from "../HttpClient";

export enum LoginType {
    EMAIL="EMAIL",
    GOOGLE="GOOGLE",
    FACEBOOK="FACEBOOK"
}

export interface MeResponse {
	email: string;
	name: string;
	loginType: LoginType
	role: string;
}


export async function me() {
	const { data } = await httpClient.get<MeResponse>("/users/me");

	return data;
}
