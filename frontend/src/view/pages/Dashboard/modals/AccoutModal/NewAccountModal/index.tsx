import { useNewAccountModalController } from "./useNewAccountModalController";

import { BankAccountModal } from "../components/BankAccountModal";

export function NewAccountModal() {
	return (
	<BankAccountModal
		useBankAccountModalController={useNewAccountModalController}
	/>
	)
}
