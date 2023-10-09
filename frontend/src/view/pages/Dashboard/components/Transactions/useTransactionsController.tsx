import { useEffect, useState } from "react";
import { useDashboard } from "../DashboardContext/useDashboard";
import { useTransactions } from "../../../../../app/hooks/useTransactions";
import { Transaction, TransactionFilters } from "../../../../../app/entities/Transaction";

export function useTransactionsController() {
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

	const [isEditTransactionModalOpen, setIsEditTransactionModalOpen] = useState(false);
	const [transactionBeingEdited, setTransactionBeingEdited] = useState<Transaction | null>(null);
	const [filters, setFilters] = useState<TransactionFilters>({
		month: new Date().getMonth(),
		year: new Date().getFullYear(),
	})

	const { transactions, isLoading, isInitialLoading, refetchTransactions } = useTransactions(filters);


	function handleChangeFilters<TFilter extends keyof TransactionFilters>(filter: TFilter) {
		return (value: TransactionFilters[TFilter]) => {
			if (value === filters[filter]) return;
			setFilters((prevState) => ({
				...prevState,
				[filter]: value,
			}));
		}
	}



	useEffect(() => {
		refetchTransactions();
	}, [filters, refetchTransactions])

	const {
		areValuesVisible
	} = useDashboard();

	const handleOpenFiltersModal = () => {
		setIsFilterModalOpen(true);
	}

	const handleCloseFiltersModal = () => {
		setIsFilterModalOpen(false);
	}

	function handleApplyFilters({
		bankAccountId,
		year
	}: {
		bankAccountId: string | undefined;
		year: number;
	}) {
		handleChangeFilters('bankAccountId')(bankAccountId);
		handleChangeFilters('year')(year);
		setIsFilterModalOpen(false);
	}

	function handleOpenEditTransactionModal(transaction: Transaction) {
		setIsEditTransactionModalOpen(true);
		setTransactionBeingEdited(transaction);
	}

	function handleCloseEditTransactionModal() {
		setIsEditTransactionModalOpen(false);
		setTransactionBeingEdited(null);
	}

	return {
		areValuesVisible,
		isInitialLoading,
		isLoading,
		transactions,
		isFilterModalOpen,
		handleOpenFiltersModal,
		handleCloseFiltersModal,
		handleChangeFilters,
		filters,
		handleApplyFilters,
		isEditTransactionModalOpen,
		transactionBeingEdited,
		handleCloseEditTransactionModal,
		handleOpenEditTransactionModal,
	}
}
