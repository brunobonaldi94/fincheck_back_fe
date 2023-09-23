import { useEditAccountModalController } from "./useEditAccountModalController";
import { BankAccountModal } from "../components/BankAccountModal";

export function EditAccountModal() {
	return (
		<BankAccountModal
			useBankAccountController={useEditAccountModalController}
			isEdit
		/>
	)
}
