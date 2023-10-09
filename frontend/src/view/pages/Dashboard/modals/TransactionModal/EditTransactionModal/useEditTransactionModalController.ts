import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBankAccount } from "../../../../../../app/hooks/useBankAccount";
import { useCategory } from "../../../../../../app/hooks/useCategory";
import { useMemo } from "react";
import { useMutation, useQueryClient,  } from "@tanstack/react-query";
import { transactionsService } from "../../../../../../app/services/transactionsService";
import { useQueryKeys } from "../../../../../../app/config/useQueryKeys";
import toast from "react-hot-toast";
import { useDashboard } from "../../../components/DashboardContext/useDashboard";

const schema = z.object({
    value: z.string().nonempty("Informe o valor"),
    name: z.string().nonempty("Informe o nome"),
    categoryId: z.string().nonempty("Informe a categoria"),
    bankAccountId: z.string().nonempty("Informe a conta"),
    date: z.date(),
})

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController() {
	const { isEditTransactionModalOpen, closeEditTransactionModal, transactionBeingEdited: transaction, } = useDashboard();
    const { accounts, isFetching: isFetchingAccounts } = useBankAccount();
    const { categories: categoriesList, isFetching: isFetchingCategories } = useCategory();
	const {
        mutateAsync: updateTransaction,
        isLoading
    } = useMutation(transactionsService.update)

    const categories = useMemo(() => (
        categoriesList.filter(category => category.type === transaction?.type)
    ), [categoriesList, transaction]);

    const {
        register,
        handleSubmit: hookFormHandleSubmit,
        formState: { errors },
        control,
    } = useForm<FormData>({
        resolver: zodResolver(schema),
		defaultValues: {
			bankAccountId: transaction?.bankAccountId,
			categoryId: transaction?.categoryId,
			date: transaction ? new Date(transaction.date) : new Date(),
			name: transaction?.name,
			value: transaction?.value.toString().replace(/,/g, ''),
		}
    });
	const queryClient = useQueryClient();
    const handleSubmit = hookFormHandleSubmit(async (data) => {
		try {

            await updateTransaction({
                ...data,
				id: transaction!.id,
                type: transaction!.type,
                value: Number(data.value.replace(/,/g, '')),
				date: data.date.toISOString(),
            });
			closeEditTransactionModal();
            toast.success(transaction!.type === 'INCOME' ?
                 "Receita editada com sucesso!" : "Despesa editada com sucesso!");
            queryClient.invalidateQueries({queryKey: useQueryKeys.transactions})
			queryClient.invalidateQueries({queryKey: useQueryKeys.backAccounts})
        } catch (error) {
            toast.error("Erro ao criar transação!")
			toast.error(transaction!.type === 'INCOME' ?
			"Erro ao editar a receita!" : "Erro ao editar a despesa!");
        }
    })

    return {
		closeTransactionModal: closeEditTransactionModal,
		isTransactionModalOpen: isEditTransactionModalOpen,
		transactionType: transaction?.type,
        register,
        control,
        errors,
        handleSubmit,
        accounts,
        isFetchingAccounts,
        categories,
        isFetchingCategories,
        isLoading,
		isEdit: true,
    };
}
