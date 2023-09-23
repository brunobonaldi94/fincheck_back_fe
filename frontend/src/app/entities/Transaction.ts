export type TransactionType = 'INCOME' | 'EXPENSE'

export interface Transaction {
	id: string;
	bankAccountId: string;
	categoryId: string;
	name: string;
	value: number;
	date: Date;
	type: TransactionType;
  }
