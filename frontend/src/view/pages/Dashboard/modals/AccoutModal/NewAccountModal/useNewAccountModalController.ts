import { z } from "zod";
import { useDashboard } from "../../../components/DashboardContext/useDashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { bankAccountsService } from "../../../../../../app/services/backAccountsService";
import { BankAccountType } from "../../../../../../app/entities/BankAccount";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const schema = z.object({
	initialBalance: z.union(
		[z.string().nonempty('Saldo inicial é obrigatório'), z.number()]),
	name: z.string().nonempty('Nome é obrigatório'),
	type: z.nativeEnum(BankAccountType),
	color: z.string().nonempty('Cor é obrigatória'),
});

type FormData = z.infer<typeof schema>;

export function useNewAccountModalController() {
	const { closeNewAccountModal, isNewAccountModalOpen, } = useDashboard();
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
	const { isLoading, mutateAsync } = useMutation(bankAccountsService.create);

	const handleSubmit = hookFormHandleSubmit(async (data) => {
		try {
			const initialBalance = typeof data.initialBalance === 'string' ? Number(data.initialBalance.replace(/,/g, '')) : data.initialBalance;
			await mutateAsync({
				...data,
				initialBalance: initialBalance,
			});
			closeNewAccountModal();
			reset();
			toast.success("Conta criada com sucesso!");
			queryClient.invalidateQueries({queryKey: ["bank-accounts"]})
		} catch (error) {
			toast.error("Erro ao criar conta!")
		}
	});

	return {
		closeAccountModal: closeNewAccountModal,
		isAccountModalOpen: isNewAccountModalOpen,
		register,
		handleSubmit,
		errors,
		control,
		isLoading,
		modalTitle: "Nova conta",
		buttonTitle: "Criar conta",
	};
}
