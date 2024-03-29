import { PlusIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../components/DropDownMenu";
import { BankAccountColorized } from "../../../../components/icons/BankAccountColorized";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";
import { useDashboard } from "../DashboardContext/useDashboard";

export function Fab() {
	const {
		openNewAccountModal,
		openNewTransactionModal,
	} = useDashboard();
	return (
		<div className="fixed right-4 bottom-4 hover:scale-105 transition-transform cursor-pointer">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<div className="bg-teal-900 rounded-full text-white w-12 h-12 flex items-center justify-center">
						<PlusIcon className="w-6 h-6" />
					</div>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Item className="gap-2" onSelect={() => openNewTransactionModal('EXPENSE')}>
						<CategoryIcon type="expense"/>
						Nova Despesa
					</DropdownMenu.Item>
					<DropdownMenu.Item className="gap-2" onSelect={() => openNewTransactionModal('INCOME')}>
						<CategoryIcon type="income" />
						Nova Receita
					</DropdownMenu.Item>
					<DropdownMenu.Item className="gap-2" onSelect={openNewAccountModal}>
						<BankAccountColorized />
						Nova Conta
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	)
}
