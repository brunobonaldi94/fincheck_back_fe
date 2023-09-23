import { BankAccountType } from "../../entities/BankAccount";
import httpClient from "../HttpClient";


export interface CreateBankAccountParams {
	initialBalance: number;
	name: string;
	type: BankAccountType;
	color: string;
}

export async function create(params: CreateBankAccountParams) {
	const { data } = await httpClient.post("/bank-accounts", params);

	return data;
}
