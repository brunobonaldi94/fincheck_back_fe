import httpClient from "../HttpClient";

export interface MeResponse {
	email: string;
	password: string;
}


export async function me() {
	const { data } = await httpClient.get<MeResponse>("/users/me");

	return data;
}
