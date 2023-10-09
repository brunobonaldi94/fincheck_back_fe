import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBankAccount } from "../../../../../../app/hooks/useBankAccount";
import { useCategory } from "../../../../../../app/hooks/useCategory";
import { useMemo, useState } from "react";
import { useMutation, useQueryClient,  } from "@tanstack/react-query";
import { transactionsService } from "../../../../../../app/services/transactionsService";
import { Transaction } from "../../../../../../app/entities/Transaction";
import { useQueryKeys } from "../../../../../../app/config/useQueryKeys";
import toast from "react-hot-toast";

const schema = z.object({
    value: z.string().nonempty("Informe o valor"),
    name: z.string().nonempty("Informe o nome"),
    categoryId: z.string().nonempty("Informe a categoria"),
    bankAccountId: z.string().nonempty("Informe a conta"),
    date: z.date(),
})

type FormData = z.infer<typeof schema>;

export function useEditTransactionModalController(transaction: Transaction | null, onClose: () => void) {

    const { accounts, isFetching: isFetchingAccounts } = useBankAccount();
    const { categories: categoriesList, isFetching: isFetchingCategories } = useCategory();

	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
            onClose();
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

	const {
		isLoading: isLoadinDeleteModal,
		mutateAsync: removeTransaction,
	} = useMutation(transactionsService.remove)
	async function handleDeleteTransaction() {
		try {
			await removeTransaction(transaction!.id);
			queryClient.invalidateQueries({queryKey: useQueryKeys.transactions})
			queryClient.invalidateQueries({queryKey: useQueryKeys.backAccounts})
			toast.success("Transação deletada com sucesso!");
			onClose();
		} catch {
			toast.error("Erro ao deletar transação!")
		}
	}

	function handleDeleteModalOpen() {
		setIsDeleteModalOpen(true);
	}
	function handleDeleteModalClose() {
		setIsDeleteModalOpen(false);
	}
    return {
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
