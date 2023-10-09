import { z } from "zod";
import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBankAccount } from "../../../../../app/hooks/useBankAccount";
import { useCategory } from "../../../../../app/hooks/useCategory";
import { useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionsService } from "../../../../../app/services/transactionsService";
import toast from "react-hot-toast";
import { useQueryKeys } from "../../../../..../app/config/useQueryKeys";

const schema = z.object({
    value: z.string().nonempty("Informe o valor"),
    name: z.string().nonempty("Informe o nome"),
    categoryId: z.string().nonempty("Informe a categoria"),
    bankAccountId: z.string().nonempty("Informe a conta"),
    date: z.date(),
})

type FormData = z.infer<typeof schema>;

export function useNewTransactionModalController() {
    const { closeNewTransactionModal, isNewTransactionModalOpen, newTransactionType} = useDashboard();

    const { accounts, isFetching: isFetchingAccounts } = useBankAccount();
    const { categories: categoriesList, isFetching: isFetchingCategories } = useCategory();
    const {
        mutateAsync: createTransaction,
        isLoading
    } = useMutation(transactionsService.create)

    const categories = useMemo(() => (
        categoriesList.filter(category => category.type === newTransactionType)
    ), [categoriesList, newTransactionType]);

    const {
        register,
        handleSubmit: hookFormHandleSubmit,
        formState: { errors },
        control,
        reset
    } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const queryClient = useQueryClient();
    const handleSubmit = hookFormHandleSubmit(async (data) => {
        try {
            if (newTransactionType  === null ){
                return ;
            }
            await createTransaction({
                ...data,
                type: newTransactionType,
                value: Number(data.value.replace(/,/g, '')),
            });
            closeNewTransactionModal();
            reset();
            toast.success(newTransactionType === 'INCOME' ?
                 "Receita criada com sucesso!" : "Despesa criada com sucesso!");
            queryClient.invalidateQueries({queryKey: useQueryKeys.transactions})
        } catch (error) {
            toast.error("Erro ao criar transação!")
			toast.error(newTransactionType === 'INCOME' ?
			"Erro ao cadastrar a receita!" : "Erro ao cadastrar a despesa!");
        }
    })

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
