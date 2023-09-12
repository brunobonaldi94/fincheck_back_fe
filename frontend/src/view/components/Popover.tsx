import * as RadixPopover from "@radix-ui/react-popover";
import { cn } from "../../app/utils/cn";

interface PopoverGenericsProps {
	children: React.ReactNode,
	className?: string
}

function PopoverRoot({children} :  {children: React.ReactNode}) {
	return (
		<RadixPopover.Root>
			{children}
		</RadixPopover.Root>
	)
}

function PopoverTrigger({children, className} :  PopoverGenericsProps) {
	return (
		<RadixPopover.Trigger className={cn("outline-none",className)} asChild>
			{children}
		</RadixPopover.Trigger>
	)
}

function PopoverContent({children, className} :  PopoverGenericsProps) {
	return (
		<RadixPopover.Portal>
			<RadixPopover.Content
			className={cn(
				"z-[99] rounded-2xl p-4 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.1)]", "data-[side=bottom]:animate-slide-up-and-fade",
				"data-[side=top]:animate-slide-down-and-fade",
				className
			)}>
				{children}
			</RadixPopover.Content>
		</RadixPopover.Portal>
	)
}

export const Popover = {
	Root: PopoverRoot,
	Trigger: PopoverTrigger,
	Content: PopoverContent,
}
