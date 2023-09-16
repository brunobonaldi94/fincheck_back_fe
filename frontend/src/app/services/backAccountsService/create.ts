import httpClient from "../HttpClient";

export enum BankAccountType {
	CHECKING = 'CHECKING',
	INVESTIMENT = 'INVESTIMENT',
	CASH = 'CASH',

}

export interface BankAccountParams {
	initialBalance: number;
	name: string;
	type: BankAccountType;
	color: string;
}

export async function create(params: BankAccountParams) {
	const { data } = await httpClient.post("/bank-accounts", params);

	return data;
}
