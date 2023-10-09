import { useEditTransactionModalController } from "./useEditTransactionModalController";
import { TransactionModal } from "../components";


export function EditTransactionModal() {
	return (
		<TransactionModal
			useTransactionController={useEditTransactionModalController}
		/>
	)
}
