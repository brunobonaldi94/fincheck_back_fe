import { useState } from "react";

export function useFiltersModal() {
	const [selectedBankAccountId, setSelectedBankAccountId] = useState<string | null>(null);
	const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

	function handleSelectBankAccountId(bankAccount: string) {
		setSelectedBankAccountId(prevState => (
			prevState === bankAccount ? null : bankAccount
		));
	}

	function handleChangeYear(step: number) {
		setSelectedYear(prevState => prevState + step);
	}

	return {
		selectedBankAccountId,
		selectedYear,
		handleSelectBankAccountId,
		handleChangeYear,
	}
}
