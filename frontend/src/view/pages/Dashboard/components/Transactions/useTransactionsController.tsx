import { useState } from "react";
import { useDashboard } from "../DashboardContext/useDashboard";

export function useTransactionsController() {
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

	const {
		areValuesVisible
	} = useDashboard();

	const handleOpenFiltersModal = () => {
		setIsFilterModalOpen(true);
	}

	const handleCloseFiltersModal = () => {
		setIsFilterModalOpen(false);
	}

	return {
		areValuesVisible,
		isInitialLoading: false,
		isLoading: false,
		transactions: [],
		isFilterModalOpen,
		handleOpenFiltersModal,
		handleCloseFiltersModal,
	}
}
