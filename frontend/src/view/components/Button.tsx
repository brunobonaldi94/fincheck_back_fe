import { ComponentProps } from "react";
import { cn } from "../../app/utils/cn";
import { Spinner } from "./Spinner";

export interface ButtonProps extends ComponentProps<'button'> {
	isLoading?: boolean;
	variant?: "ghost" | "danger";
}
export function Button({className, isLoading, disabled, children, variant, ...props}: ButtonProps) {
	return (
		<button
			{...props}
			disabled={isLoading || disabled}
			className={cn(
				"bg-teal-900 text-white w-full mt-2 hover:bg-teal-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed px-6 h-12 rounded-2xl font-medium transition-all",
				"flex items-center justify-center",
				variant === 'danger' && "bg-red-900 hover:bg-red-800",
				variant === 'ghost' && "bg-transparent text-gray-800 border border-gray-900 hover:bg-gray-800/5",
				className
			)}
		>
			{isLoading ? <Spinner className="w-6 h-6" /> : children}
		</button>
	)
}
