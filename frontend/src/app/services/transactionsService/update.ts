import { Transaction } from "../../entities/Transaction";
import httpClient from "../HttpClient";


export interface UpdateTransactionParams extends Transaction {}
export async function update({
	id,
	...params
}: UpdateTransactionParams) {
	const { data } = await httpClient.put<Transaction>(`/transactions/${id}`, params);

	return data;
}
