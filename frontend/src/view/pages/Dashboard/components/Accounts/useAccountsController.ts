import {useMemo, useState} from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../DashboardContext/useDashboard";
import { useBankAccount } from "../../../../../app/hooks/useBankAccount";

export function useAccountsControllers() {
	const windowWidth = useWindowWidth();
	const {
		areValuesVisible,
		toggleValueVisibility,
		closeNewAccountModal,
		isNewAccountModalOpen,
		openNewAccountModal,
	} = useDashboard();
	const [sliderState, setSliderState] = useState({
		isBeginning: true,
		isEnd: false,
	});

	const { accounts, isFetching} = useBankAccount();

	const currentBalance = useMemo(() => {
		if (!accounts) return 0;
		return accounts.reduce((acc, account) => {
			return acc + account.currentBalance;
		}, 0);
	}, [accounts])

	return {
		sliderState,
		setSliderState,
		windowWidth,
		areValuesVisible,
		toggleValueVisibility,
		isLoading: isFetching,
		accounts,
		closeNewAccountModal,
		isNewAccountModalOpen,
		openNewAccountModal,
		currentBalance,
	}
}
