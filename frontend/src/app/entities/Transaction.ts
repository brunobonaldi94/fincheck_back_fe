export type TransactionType = 'INCOME' | 'EXPENSE'

export interface Transaction {
	id: string;
	bankAccountId: string;
	categoryId: string;
	name: string;
	value: number;
	date: Date | string;
	type: TransactionType;
	category?: {
		id: string;
		name: string;
		icon: string;
	};
}

export type TransactionFilters = {
	month: number;
	year: number;
	bankAccountId?: string;
	type?: TransactionType;
}
