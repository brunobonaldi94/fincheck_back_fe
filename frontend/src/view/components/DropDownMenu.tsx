import * as RadixDropDownMenu from "@radix-ui/react-dropdown-menu";
import { cn } from "../../app/utils/cn";

interface DropDownMenuGenericsProps {
	children: React.ReactNode,
	className?: string
}

function DropdownMenuRoot({children} :  {children: React.ReactNode}) {
	return (
		<RadixDropDownMenu.Root>
			{children}
		</RadixDropDownMenu.Root>
	)
}

function DropdownMenuTrigger({children, className} :  DropDownMenuGenericsProps) {
	return (
		<RadixDropDownMenu.Trigger className={cn("outline-none",className)} asChild>
			{children}
		</RadixDropDownMenu.Trigger>
	)
}

function DropdownMenuContent({children, className} :  DropDownMenuGenericsProps) {
	return (
		<RadixDropDownMenu.Portal>
			<RadixDropDownMenu.Content
			className={cn(
				"z-[99] rounded-2xl p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.1)]", "data-[side=bottom]:animate-slide-up-and-fade",
				"data-[side=top]:animate-slide-down-and-fade",
				className
			)}>
				{children}
			</RadixDropDownMenu.Content>
		</RadixDropDownMenu.Portal>
	)
}

interface DropdownMenuItemProps extends DropDownMenuGenericsProps {
	onSelect?: () => void
}

function DropdownMenuItem({children, className, onSelect} : DropdownMenuItemProps) {
	return (
		<RadixDropDownMenu.Item
			onSelect={onSelect}
			className={cn(
			"min-h-[40px] outline-none flex items-center py-2 px-3 text-gray-800 text-sm rounded-2xl transition-colors data-[highlighted]:bg-gray-50 cursor-pointer",
			className
		)}>
			{children}
		</RadixDropDownMenu.Item>
	)
}

export const DropdownMenu = {
	Root: DropdownMenuRoot,
	Trigger: DropdownMenuTrigger,
	Content: DropdownMenuContent,
	Item: DropdownMenuItem
}
