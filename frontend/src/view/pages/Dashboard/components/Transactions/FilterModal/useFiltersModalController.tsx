import { useState } from "react";
import { useBankAccount } from "../../../../../../app/hooks/useBankAccount";

export function useFiltersModalController() {
	const [selectedBankAccountId, setSelectedBankAccountId] = useState<string | undefined>();
	const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
	const {
		accounts,
	} = useBankAccount();
	function handleSelectBankAccountId(bankAccount: string) {
		setSelectedBankAccountId(prevState => (
			prevState === bankAccount ? undefined : bankAccount
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
		accounts,
	}
}
