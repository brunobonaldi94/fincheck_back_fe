import { Modal } from "../../../../../components/Modal";
import { InputCurrency } from "../../../../../components/InputCurrency";

import { useEditTransactionModalController } from "./useEditTransactionModalController";
import { Input } from "../../../../../components/Input";
import { Select } from "../../../../../components/Select";
import { DatePickerInput } from "../../../../../components/DatePickerInput";
import { Button } from "../../../../../components/Button";
import { Controller } from "react-hook-form";
import { Transaction } from "../../../../../../app/entities/Transaction";
import { ConfirmDeleteModal } from "../../../../../components/ConfirmDeleteModal";
import { TrashIcon } from "../../../../../components/icons/TrashIcon";

interface EditTransactionModalProps {
	transaction: Transaction | null;
	open: boolean;
	onClose: () => void;
}

export function EditTransactionModal({transaction, open, onClose}: EditTransactionModalProps) {
	const {
		control,
		errors,
		register,
		handleSubmit,
		accounts,
		isFetchingAccounts,
		categories,
		isFetchingCategories,
		isLoading,
		isDeleteModalOpen,
		handleDeleteModalClose,
		handleDeleteTransaction,
		handleDeleteModalOpen,
		isLoadinDeleteModal
	} = useEditTransactionModalController(transaction, onClose);
	const isExpense = transaction?.type === 'EXPENSE';
	if (isDeleteModalOpen) {
		return <ConfirmDeleteModal
			onClose={handleDeleteModalClose}
			onConfirm={handleDeleteTransaction}
			isLoading={isLoadinDeleteModal}
			title={`Tem certeza que deseja excluir essa ${isExpense ? "despesa" : "receita"}?`}
		/>
	}
	return (
		<Modal
			title={isExpense ? 'Editar Despesa' : 'Editar Receita'}
			open={open}
			onClose={onClose}
			rigthAction={<TrashIcon onClick={handleDeleteModalOpen} className="w-6 h-6 text-red-900 cursor-pointer" />}
			>
			<form onSubmit={handleSubmit}>
				<div>
					<span className="text-gray-600 tracking-[-0.5px] text-xs">Valor da {
						isExpense ? 'Despesa' : 'Receita'
					}</span>
					<div className="flex items-center gap-2">
						<span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
						<Controller
							control={control}
							name="value"
							defaultValue="0"
							render={({ field: { onChange, value } }) => (
								<InputCurrency
									onChange={onChange}
									error={errors.value?.message}
									value={value}
								/>
							)}
						/>
					</div>
				</div>
				<div className="mt-10 flex flex-col gap-4">
					<Input
						type="text"
						placeholder={`Nome da ${isExpense ? 'Despesa' : 'Receita'}`}
						error={errors.name?.message}
						{...register('name')}
					/>
						<Controller
							name="categoryId"
							control={control}
							defaultValue=""
							render={({ field: { onChange, value } }) => (
									<Select
									error={errors.categoryId?.message}
									onChange={onChange}
									value={value}
									placeholder="Categoria"
									options={categories.map((category) => ({
										value: category.id,
										label: category.name,
									}))}
									isLoading={isFetchingCategories}
									/>
								)}
						/>
						<Controller
							name="bankAccountId"
							control={control}
							defaultValue=""
							render={({ field: { onChange, value } }) => (
									<Select
										error={errors.bankAccountId?.message}
										onChange={onChange}
										value={value}
										placeholder={isExpense ? 'Pagar com' : 'Receber com'}
										options={accounts.map((account) => ({
											value: account.id,
											label: account.name,
										}))}
										isLoading={isFetchingAccounts}
									/>
								)}
						/>
					<Controller
						name="date"
						control={control}
						defaultValue={new Date()}
						render={({ field: { onChange, value } }) => (
							<DatePickerInput
								onChange={onChange}
								value={value}
								error={errors.date?.message}
							/>
						)}
					/>
					<Button type="submit" isLoading={isLoading}>Submeter</Button>
				</div>
			</form>
		</Modal>
	)
}
