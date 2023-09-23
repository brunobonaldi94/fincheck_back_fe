import { useState } from "react";
import { useEditAccountModalController } from "../EditAccountModal/useEditAccountModalController";
import { useNewAccountModalController } from "../NewAccountModal/useNewAccountModalController";

export interface IBankAccountModalControllerProps {
	useBankAccountController: typeof useEditAccountModalController | typeof useNewAccountModalController;
}

export function useBankAccountModalController({useBankAccountController}: IBankAccountModalControllerProps) {
	const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);

	function handleOpenDeleteAccountModal() {
		setIsDeleteAccountModalOpen(true);
	}

	function handleCloseDeleteAccountModal() {
		setIsDeleteAccountModalOpen(false);
	}

	function handleDeleteAccount() {
		console.log("handleDeleteAccount");
	}

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
		handleDeleteAccount
	}
}
