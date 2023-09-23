import { Transaction } from "../../entities/Transaction";
import httpClient from "../HttpClient";


export interface CreateTransactionParams extends Omit<Transaction, "id"> {}

export async function create(params: CreateTransactionParams) {
	const { data } = await httpClient.post("/transactions", params);

	return data;
}
