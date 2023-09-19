import httpClient from "../HttpClient";
import { BankAccountType } from "../../entities/BankAccount";


type BankAccountResponse = Array<{
	id: string;
	initialBalance: number;
	name: string;
	type: BankAccountType;
	color: string;
	currentBalance: number;
}>

export async function getAll() {
	const { data } = await httpClient.get<BankAccountResponse>("/bank-accounts");

	return data;
}
