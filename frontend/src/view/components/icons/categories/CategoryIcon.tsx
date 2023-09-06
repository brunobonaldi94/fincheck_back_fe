import { iconsMap } from "./iconsMap";

interface CategoryIconProps {
  type: 'income' | 'expense';
  category?: string;
}

type OptionsExpense = typeof iconsMap.expense;
type OptionsIncome = typeof iconsMap.income;

export function CategoryIcon({ type, category }: CategoryIconProps) {
  const Icon = iconsMap[type][
    category as keyof (OptionsExpense | OptionsIncome) ?? 'default'
  ] ?? iconsMap[type].default;

  return <Icon />
}
