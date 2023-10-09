import httpClient from "../HttpClient";
import { type Transaction, type TransactionFilters } from "../../entities/Transaction";


type TransactionResponse = Array<Transaction>

export async function getAll(filters: TransactionFilters) {
	const { data } = await httpClient.get<TransactionResponse>("/transactions", {
		params: filters,
	});

	return data;
}
