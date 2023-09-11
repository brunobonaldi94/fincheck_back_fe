import { Modal } from "../../../../components/Modal";
import { InputCurrency } from "../../../../components/InputCurrency";

import { useAccountsControllers } from "../../components/Accounts/useAccountsController";
import { Input } from "../../../../components/Input";
import { Select } from "../../../../components/Select";

export function NewAccountModal() {
	const {
		isNewAccountModalOpen,
		closeNewAccountModal,
	} = useAccountsControllers();

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
				</div>
			</form>
		</Modal>
	)
}
