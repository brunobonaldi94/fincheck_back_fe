import {useState} from "react";
import { useWindowWidth } from "../../../../../app/hooks/useWindowWidth";
import { useDashboard } from "../DashboardContext/useDashboard";

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

	return {
		sliderState,
		setSliderState,
		windowWidth,
		areValuesVisible,
		toggleValueVisibility,
		isLoading: false,
		accounts: [],
		closeNewAccountModal,
		isNewAccountModalOpen,
		openNewAccountModal,
	}
}
