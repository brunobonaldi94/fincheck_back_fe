import { z } from "zod";
import { useDashboard } from "../../../components/DashboardContext/useDashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { bankAccountsService } from "../../../../../../app/services/backAccountsService";
import { BankAccountType } from "../../../../../../app/entities/BankAccount";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";

const schema = z.object({
	initialBalance: z.union([z.string().nonempty('Saldo inicial é obrigatório'), z.number()]),
	name: z.string().nonempty('Nome é obrigatório'),
	type: z.nativeEnum(BankAccountType),
	color: z.string().nonempty('Cor é obrigatória'),
});

type FormData = z.infer<typeof schema>;

export function useEditAccountModalController() {
	const { closeEditAccountModal, isEditAccountModalOpen, accountBeingEdited } = useDashboard();
	const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] = useState(false);
	const {
		register,
		handleSubmit: hookFormHandleSubmit,
		formState: { errors },
		control,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			color: accountBeingEdited?.color,
			name: accountBeingEdited?.name,
			type: accountBeingEdited?.type,
			initialBalance: accountBeingEdited?.initialBalance
		},
	});


	const queryClient = useQueryClient();
	const { isLoading, mutateAsync } = useMutation(bankAccountsService.update);

	const handleSubmit = hookFormHandleSubmit(async (data) => {
		try {
			if (!accountBeingEdited || !accountBeingEdited?.id) return;
			const initialBalance = typeof data.initialBalance === 'string' ?  Number(data.initialBalance.replace(/,/g, '')) : data.initialBalance;
			await mutateAsync({
				...data,
				initialBalance: initialBalance,
				id: accountBeingEdited?.id,
			});
			queryClient.invalidateQueries({queryKey: ["bank-accounts"]})
			closeEditAccountModal();
			toast.success("Conta atualizada com sucesso!");
		} catch (error) {
			toast.error("Erro ao atualizar conta!")
		}
	});



	return {
		closeAccountModal: closeEditAccountModal,
		isAccountModalOpen: isEditAccountModalOpen,
		register,
		handleSubmit,
		errors,
		control,
		isLoading,
		modalTitle: "Editar conta",
		buttonTitle: "Atualizar conta",
		isDeleteAccountModalOpen,
	};
}
