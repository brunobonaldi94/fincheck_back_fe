import { ChevronDownIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../components/DropDownMenu";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { IncomesIconColorized } from "../../../../components/icons/IncomesIconColorized";
import { ExpensesIconColorized } from "../../../../components/icons/ExpensesIconColorized";
import { TransactionsIconColorized } from "../../../../components/icons/TransactionsIconColorized";


export function TransactionTypeDropDown(){
	return (
		<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			<button className="flex items-center gap-2">
				<TransactionsIcon />
				<span className="text-sm text-gray-900 tracking-[-0.5px] font-medium">Transacoes</span>
				<ChevronDownIcon className="text-gray-900" />
			</button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content className="w-[279px]">
			<DropdownMenu.Item className="gap-2">
				<IncomesIconColorized/>
				Receitas
			</DropdownMenu.Item>
			<DropdownMenu.Item className="gap-2">
				<ExpensesIconColorized/>
				Despesas
			</DropdownMenu.Item>
			<DropdownMenu.Item className="gap-2">
				<TransactionsIconColorized />
				Transações
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
	)
}
