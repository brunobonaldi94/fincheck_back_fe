import {useMemo, useState} from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../DashboardContext/useDashboard";
import { useQuery } from "@tanstack/react-query";
import { bankAccountsService } from "../../../../../app/services/backAccountsService";
import { useQueryKeys } from "../../../../../app/config/useQueryKeys";

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

	const { data, isFetching} = useQuery({
		queryKey: useQueryKeys.backAccounts,
		queryFn: bankAccountsService.getAll,

	})

	const currentBalance = useMemo(() => {
		if (!data) return 0;
		return data.reduce((acc, account) => {
			return acc + account.currentBalance;
		}, 0);
	}, [data])

	return {
		sliderState,
		setSliderState,
		windowWidth,
		areValuesVisible,
		toggleValueVisibility,
		isLoading: isFetching,
		accounts: data ?? [],
		closeNewAccountModal,
		isNewAccountModalOpen,
		openNewAccountModal,
		currentBalance,
	}
}
