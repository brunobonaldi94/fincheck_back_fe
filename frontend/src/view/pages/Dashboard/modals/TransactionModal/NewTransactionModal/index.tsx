import { useNewTransactionModalController } from "./useNewTransactionModalController";
import { TransactionModal } from "../components";


export function NewTransactionModal() {
	return (
		<TransactionModal
			useTransactionController={useNewTransactionModalController}
		/>
	)
}
