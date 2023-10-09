import { useState } from "react";
import { useEditTransactionModalController } from "../EditTransactionModal/useEditTransactionModalController";
import { useNewTransactionModalController } from "../NewTransactionModal/useNewTransactionModalController";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQueryKeys } from "../../../../../../app/config/useQueryKeys";
import { useDashboard } from "../../../components/DashboardContext/useDashboard";
import toast from "react-hot-toast";
import { transactionsService } from "../../../../../../app/services/transactionsService";

interface ITransactionAccountModalControllerProps {
	useTransactionController: typeof useEditTransactionModalController | typeof useNewTransactionModalController;
}

export function useTransactionModalController({useTransactionController}: ITransactionAccountModalControllerProps) {
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const {
		transactionBeingEdited,
	} = useDashboard();
    const {
		closeTransactionModal,
		isTransactionModalOpen,
		transactionType,
		register,
		control,
		errors,
		handleSubmit,
		accounts,
		isFetchingAccounts,
		categories,
		isFetchingCategories,
		isLoading,
		isEdit,
	} = useTransactionController();

	const queryClient = useQueryClient();
	const {
		isLoading: isLoadinDeleteModal,
		mutateAsync: removeTransaction,
	} = useMutation(transactionsService.remove)

	function handleDeleteModalClose() {
		setIsDeleteModalOpen(false);
	}

	function handleDeleteModalOpen() {
		setIsDeleteModalOpen(true);
	}


	async function handleDeleteTransaction() {
		try {
			await removeTransaction(transactionBeingEdited!.id);
			queryClient.invalidateQueries({queryKey: useQueryKeys.transactions})
			queryClient.invalidateQueries({queryKey: useQueryKeys.backAccounts})
			toast.success("Transação deletada com sucesso!");
			handleDeleteModalClose();
			closeTransactionModal();
		} catch {
			toast.error("Erro ao deletar transação!")
		}
	}

    return {
        closeTransactionModal,
        isTransactionModalOpen,
		isEdit,
        transactionType,
        register,
        control,
        errors,
        handleSubmit,
        accounts,
        isFetchingAccounts,
        categories,
        isFetchingCategories,
        isLoading,
		isDeleteModalOpen,
		isLoadinDeleteModal,
		handleDeleteTransaction,
		handleDeleteModalClose,
		handleDeleteModalOpen,
     };
}
