import { useEditTransactionModalController } from "../EditTransactionModal/useEditTransactionModalController";
import { useNewTransactionModalController } from "../NewTransactionModal/useNewTransactionModalController";

interface ITransactionAccountModalControllerProps {
	useTransactionAccountController: typeof useEditTransactionModalController | typeof useNewTransactionModalController;
}

export function useTransactionModalController({useTransactionAccountController}: ITransactionAccountModalControllerProps) {
    const {
		closeNewTransactionModal,
		isNewTransactionModalOpen,
		newTransactionType,
		register,
		control,
		errors,
		handleSubmit,
		accounts,
		isFetchingAccounts,
		categories,
		isFetchingCategories,
		isLoading,
	} = useTransactionAccountController();

    return {
        closeNewTransactionModal,
        isNewTransactionModalOpen,
        newTransactionType,
        register,
        control,
        errors,
        handleSubmit,
        accounts,
        isFetchingAccounts,
        categories,
        isFetchingCategories,
        isLoading,
    };
}
