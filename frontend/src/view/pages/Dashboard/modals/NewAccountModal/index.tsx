import { Modal } from "../../../../components/Modal";
import { InputCurrency } from "../../../../components/InputCurrency";

import { useNewAccountModalController } from "./useNewAccountModalController";
import { Input } from "../../../../components/Input";
import { Select } from "../../../../components/Select";
import { ColorsDropDownInput } from "../../../../components/ColorsDropDownInput";
import { Button } from "../../../../components/Button";

export function NewAccountModal() {
	const {
		isNewAccountModalOpen,
		closeNewAccountModal,
	} = useNewAccountModalController();
	return (
		<Modal
			title="Nova Conta"
			open={isNewAccountModalOpen}
			onClose={closeNewAccountModal}>
			<form>
				<div>
					<span className="text-gray-600 tracking-[-0.5px] text-xs">Saldo</span>
					<div className="flex items-center gap-2">
						<span className="text-gray-600 tracking-[-0.5px] text-lg">R$</span>
						<InputCurrency />
					</div>
				</div>
				<div className="mt-10 flex flex-col gap-4">
					<Input
						type="text"
						name="name"
						placeholder="Nome da conta"
					/>
					<Select
						error={""}
						placeholder="Tipo"
						options={[
							{ value: "INVESTIMENT", label: "Investimento" },
							{ value: "CHECKING", label: "Conta Corrente" },
							{ value: "CASH", label: "Dinheiro Físico" },
						]}
					/>
					<ColorsDropDownInput />
				</div>
				<Button type='button'>Submeter</Button>
			</form>
		</Modal>
	)
}
