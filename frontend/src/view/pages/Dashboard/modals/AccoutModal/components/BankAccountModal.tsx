import { Modal } from "../../../../../components/Modal";
import { InputCurrency } from "../../../../../components/InputCurrency";

import { Input } from "../../../../../components/Input";
import { Select } from "../../../../../components/Select";
import { ColorsDropDownInput } from "../../../../../components/ColorsDropDownInput";
import { Button } from "../../../../../components/Button";
import { Controller } from "react-hook-form";
import { BankAccountType } from "../../../../../../app/entities/BankAccount";
import { colors } from "../../../../../../app/config/constants";
import { useEditAccountModalController } from "../EditAccountModal/useEditAccountModalController";
import { useNewAccountModalController } from "../NewAccountModal/useNewAccountModalController";
import { TrashIcon } from "../../../../../components/icons/TrashIcon";
import { ConfirmDeleteModal } from "../../../../../components/ConfirmDeleteModal";
import { useBankAccountModalController } from "./useBankAccountModalController";


export interface IBankAccountModalControllerProps {
	useBankAccountController: typeof useEditAccountModalController | typeof useNewAccountModalController;
	isEdit?: boolean;
}

export function BankAccountModal({
	useBankAccountController,
	isEdit = false,
}: IBankAccountModalControllerProps) {

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
		isDeleteAccountModalOpen,
		handleOpenDeleteAccountModal,
		handleCloseDeleteAccountModal,
		handleDeleteAccount,
		isLoadingDeleteAccount
	} = useBankAccountModalController({ useBankAccountController});
	if (isDeleteAccountModalOpen){
		return <ConfirmDeleteModal
				title="Tem certeza que deseja excluir essa conta?"
				onClose={handleCloseDeleteAccountModal}
				description="Ao excluir a conta, também serão excluídas todos os registros de receitas e despesas relacionados."
				onConfirm={handleDeleteAccount}
				isLoading={isLoadingDeleteAccount}
			/>
	}
	return (
		<Modal
			title={modalTitle}
			open={isAccountModalOpen}
			onClose={closeAccountModal}
			rigthAction={isEdit ? (
			<TrashIcon onClick={handleOpenDeleteAccountModal} className="w-6 h-6 text-red-900 cursor-pointer" />) : undefined}
			>
			<form onSubmit={handleSubmit}>
				<div>
					<span className="text-gray-600 tracking-[-0.5px] text-xs">Saldo Inicial</span>
					<div className="flex items-center gap-2">
						<span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
						<Controller
							control={control}
							name="initialBalance"
							defaultValue="0"
							render={({ field: { onChange, value } }) => (
								<InputCurrency
									onChange={onChange}
									error={errors.initialBalance?.message}
									value={value}
								/>
							)}
						/>
					</div>
				</div>
				<div className="mt-10 flex flex-col gap-4">
					<Input
						type="text"
						placeholder="Nome da conta"
						error={errors.name?.message}
						{...register('name')}
					/>
					<Controller
						name="type"
						control={control}
						defaultValue={BankAccountType.CHECKING}
						render={({ field: { onChange, value } }) => (
								<Select
								error={errors.type?.message}
								placeholder="Tipo"
								onChange={onChange}
								value={value}
								options={[
									{ value: "INVESTIMENT", label: "Investimento" },
									{ value: "CHECKING", label: "Conta Corrente" },
									{ value: "CASH", label: "Dinheiro Físico" },
								]}
							/>
						)}
					/>
					<Controller
						name="color"
						defaultValue={colors[8].color}
						control={control}
						render={({ field: { onChange, value } }) => (
							<ColorsDropDownInput
								onChange={onChange}
								value={value}
								error={errors.color?.message}
							/>
						)}
					/>
				</div>
				<Button isLoading={isLoading} type='submit'>{buttonTitle}</Button>
			</form>
		</Modal>
	)
}
