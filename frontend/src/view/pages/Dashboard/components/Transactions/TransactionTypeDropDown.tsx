import { ChevronDownIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../components/DropDownMenu";
import { TransactionsIcon } from "../../../../components/icons/TransactionsIcon";
import { IncomesIconColorized } from "../../../../components/icons/IncomesIconColorized";
import { ExpensesIconColorized } from "../../../../components/icons/ExpensesIconColorized";
import { TransactionsIconColorized } from "../../../../components/icons/TransactionsIconColorized";
import { TransactionType } from "../../../../../app/entities/Transaction";
import { IncomeIcon } from "../../../../components/icons/IncomeIcon";
import { ExpensesIcon } from "../../../../components/icons/ExpensesIcon";


interface TransactionTypeDropDownProps {
	onSelect(type: TransactionType | undefined): void;
	selectedType?: TransactionType;
}

export function TransactionTypeDropDown({ onSelect, selectedType }: TransactionTypeDropDownProps){
	return (
		<DropdownMenu.Root>
		<DropdownMenu.Trigger className="flex items-center gap-2 group">
			<button
				className="hover:scale-105 transition-transform will-change-transform"
				style={{backfaceVisibility: "hidden"}}
				>
					{selectedType === 'EXPENSE' && <ExpensesIcon />}
					{selectedType === 'INCOME' && <IncomeIcon />}
					{selectedType === undefined && <TransactionsIcon />}
					<span className="text-sm text-gray-900 tracking-[-0.5px] font-medium">
						{selectedType === 'EXPENSE' && 'Despesas'}
						{selectedType === 'INCOME' && 'Receitas'}
						{selectedType === undefined && 'Transações'}
					</span>
				<ChevronDownIcon className="text-gray-900 group-data-[state=open]:rotate-180 transition-transform" />
			</button>
		</DropdownMenu.Trigger>
		<DropdownMenu.Content className="w-[279px]" >
			<DropdownMenu.Item className="gap-2" onSelect={() => onSelect('INCOME')}>
				<IncomesIconColorized/>
				Receitas
			</DropdownMenu.Item>
			<DropdownMenu.Item className="gap-2" onSelect={() => onSelect('EXPENSE')}>
				<ExpensesIconColorized/>
				Despesas
			</DropdownMenu.Item>
			<DropdownMenu.Item className="gap-2" onSelect={() => onSelect(undefined)}>
				<TransactionsIconColorized />
				Transações
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
	)
}
