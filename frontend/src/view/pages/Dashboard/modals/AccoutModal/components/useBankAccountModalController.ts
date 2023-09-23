import { useState } from "react";
import { useEditAccountModalController } from "../EditAccountModal/useEditAccountModalController";
import { useNewAccountModalController } from "../NewAccountModal/useNewAccountModalController";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bankAccountsService } from "../../../../../../app/services/backAccountsService";
import { useDashboard } from "../../../components/DashboardContext/useDashboard";
import toast from "react-hot-toast";

export interface IBankAccountModalControllerProps {
	useBankAccountController: typeof useEditAccountModalController | typeof useNewAccountModalController;
}

export function useBankAccountModalController({useBankAccountController}: IBankAccountModalControllerProps) {
	const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);

	const {
		isAccountModalOpen,
		closeAccountModal,
		errors,
		handleSubmit,
		register,
		control,
		isLoading,
		modalTitle,
		buttonTitle,
	} = useBankAccountController();

	const {  accountBeingEdited } = useDashboard();

	function handleOpenDeleteAccountModal() {
		setIsDeleteAccountModalOpen(true);
	}

	function handleCloseDeleteAccountModal() {
		setIsDeleteAccountModalOpen(false);
	}


	async function handleDeleteAccount() {
		try {
			await removeAccount(accountBeingEdited!.id);
			queryClient.invalidateQueries({queryKey: ["bank-accounts"]})
			toast.success("Conta deletada com sucesso!");
			closeAccountModal();
		} catch (error) {
			toast.error("Erro ao deletar conta!")
		}
	}

	const queryClient = useQueryClient();
	const {
		isLoading: isLoadingDeleteAccount,
		mutateAsync: removeAccount
	} = useMutation(bankAccountsService.remove);


	return {
		isAccountModalOpen,
		closeAccountModal,
		errors,
		handleSubmit,
		register,
		control,
		isLoading,
		modalTitle,
		buttonTitle,
		isDeleteAccountModalOpen,
		handleOpenDeleteAccountModal,
		handleCloseDeleteAccountModal,
		handleDeleteAccount,
		isLoadingDeleteAccount,
	}
}
