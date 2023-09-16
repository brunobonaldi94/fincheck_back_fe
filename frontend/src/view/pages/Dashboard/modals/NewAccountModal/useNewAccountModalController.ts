import { z } from "zod";
import { useDashboard } from "../../components/DashboardContext/useDashboard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { bankAccountsService } from "../../../../../app/services/backAccountsService";
import { BankAccountParams, BankAccountType } from "../../../../../app/services/backAccountsService/create";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const schema = z.object({
	initialBalance: z.string().nonempty('Saldo inicial é obrigatório'),
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
	} = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {

		}
	});

	const { mutateAsync } = useMutation({
		mutationFn: async (data: BankAccountParams) => {
			return await bankAccountsService.create(data);
		},

	})
	const handleSubmit = hookFormHandleSubmit(async (data) => {
		try {

			await mutateAsync(data as unknown as BankAccountParams);
			toast.success("Conta criada com sucesso!")
		} catch (error) {
			toast.error("Erro ao criar conta!")
		}
	});

	return {
		closeNewAccountModal,
		isNewAccountModalOpen,
		register,
		handleSubmit,
		errors,
		control,
	};
}
