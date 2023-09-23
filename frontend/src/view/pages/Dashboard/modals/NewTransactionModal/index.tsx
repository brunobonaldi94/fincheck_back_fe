import { Modal } from "../../../../components/Modal";
import { InputCurrency } from "../../../../components/InputCurrency";

import { useNewTransactionModalController } from "./useNewTransactionModalController";
import { Input } from "../../../../components/Input";
import { Select } from "../../../../components/Select";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import { Button } from "../../../../components/Button";
import { Controller } from "react-hook-form";

export function NewTransactionModal() {
	const {
		closeNewTransactionModal,
		isNewTransactionModalOpen,
		newTransactionType,
		control,
		errors,
		register,
		handleSubmit,
		accounts,
		isFetchingAccounts,
		categories,
		isFetchingCategories,
		isLoading,
	} = useNewTransactionModalController();
	const isExpense = newTransactionType === 'EXPENSE';
	return (
		<Modal
			title={isExpense ? 'Nova Despesa' : 'Nova Receita'}
			open={isNewTransactionModalOpen}
			onClose={closeNewTransactionModal}>
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
