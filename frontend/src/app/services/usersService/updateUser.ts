import httpClient from "../HttpClient";
import { MeResponse } from "./me";

export interface UpdatedUserResponse extends MeResponse {}
export interface UpdateUserParams {
	name?: string | undefined;
	email?: string | undefined;
}


export  async function updateUser(updateUserParams: UpdateUserParams) {
	const { data } = await httpClient.put<UpdatedUserResponse>("/users", updateUserParams);

	return data;
}
