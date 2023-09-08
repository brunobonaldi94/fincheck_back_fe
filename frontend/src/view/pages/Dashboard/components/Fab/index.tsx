import { PlusIcon } from "@radix-ui/react-icons";
import { DropdownMenu } from "../../../../components/DropDownMenu";
import { BankAccountColorized } from "../../../../components/icons/BankAccountColorized";
import { CategoryIcon } from "../../../../components/icons/categories/CategoryIcon";

export function Fab() {
	return (
		<div className="fixed right-4 bottom-4">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<button className="bg-teal-900 rounded-full text-white w-12 h-12 flex items-center justify-center">
						<PlusIcon className="w-6 h-6" />
					</button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Item className="gap-2">
						<CategoryIcon type="expense"/>
						Nova Despesa
					</DropdownMenu.Item>
					<DropdownMenu.Item className="gap-2">
						<CategoryIcon type="income" />
						Nova Receita
					</DropdownMenu.Item>
					<DropdownMenu.Item className="gap-2">
						<BankAccountColorized />
						Nova Conta
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	)
}
