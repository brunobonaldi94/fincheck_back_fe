import httpClient from "../HttpClient";
import { Transaction } from "../../entities/Transaction";


type TransactionResponse = Array<Transaction>

export async function getAll() {
	const { data } = await httpClient.get<TransactionResponse>("/transactions");

	return data;
}
