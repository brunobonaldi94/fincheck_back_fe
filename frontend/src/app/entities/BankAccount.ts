
export enum BankAccountType {
	CHECKING = 'CHECKING',
	INVESTIMENT = 'INVESTIMENT',
	CASH = 'CASH',

}

export interface BankAccount {
	id: string;
	initialBalance: number;
	name: string;
	type: BankAccountType;
	color: string;
	currentBalance: number;
}
