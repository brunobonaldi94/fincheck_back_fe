import { Modal } from "../../../../components/Modal";
import { InputCurrency } from "../../../../components/InputCurrency";

import { useNewTransactionModalController } from "./useNewTransactionModalController";
import { Input } from "../../../../components/Input";
import { Select } from "../../../../components/Select";
import { ColorsDropDownInput } from "../../../../components/ColorsDropDownInput";
import { DatePickerInput } from "../../../../components/DatePickerInput";
import { Button } from "../../../../components/Button";

export function NewTransactionModal() {
	const {
		closeNewTransactionModal,
		isNewTransactionModalOpen,
		newTransactionType,
	} = useNewTransactionModalController();
	const isExpense = newTransactionType === 'EXPENSE';
	return (
		<Modal
			title={isExpense ? 'Nova Despesa' : 'Nova Receita'}
			open={isNewTransactionModalOpen}
			onClose={closeNewTransactionModal}>
			<form>
				<div>
					<span className="text-gray-600 tracking-[-0.5px] text-xs">Valor da {
						isExpense ? 'Despesa' : 'Receita'
					}</span>
					<div className="flex items-center gap-2">
						<span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
						<InputCurrency />
					</div>
				</div>
				<div className="mt-10 flex flex-col gap-4">
					<Input
						type="text"
						name="name"
						placeholder={`Nome da ${isExpense ? 'Despesa' : 'Receita'}`}
					/>
					<Select
						error={""}
						placeholder={isExpense ? 'Pagar com' : 'Receber com'}
						options={[
							{ value: "INVESTIMENT", label: "Investimento" },
							{ value: "CHECKING", label: "Conta Corrente" },
							{ value: "CASH", label: "Dinheiro Físico" },
						]}
					/>
					<DatePickerInput />
					<Button type="button">Submeter</Button>
				</div>
			</form>
		</Modal>
	)
}
