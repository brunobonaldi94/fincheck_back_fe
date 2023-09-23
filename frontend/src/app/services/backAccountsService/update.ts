import { BankAccount, BankAccountType } from "../../entities/BankAccount";
import httpClient from "../HttpClient";


export interface UpdateBankAccountParams {
	id: string;
	initialBalance: number;
	name: string;
	type: BankAccountType;
	color: string;
}

export async function update({
	id,
	...params
}: UpdateBankAccountParams) {
	const { data } = await httpClient.put<BankAccount>(`/bank-accounts/${id}`, params);

	return data;
}
