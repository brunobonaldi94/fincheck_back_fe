import { BankAccount, BankAccountType } from "../../entities/BankAccount";
import httpClient from "../HttpClient";


export interface BankAccountUpdateParams {
	id: string;
	initialBalance: number;
	name: string;
	type: BankAccountType;
	color: string;
}

export async function update(params: BankAccountUpdateParams) {
	const { data } = await httpClient.put<BankAccount>(`/bank-accounts/${params.id}`, {
		initialBalance: params.initialBalance,
		name: params.name,
		type: params.type,
		color: params.color,
	});

	return data;
}
