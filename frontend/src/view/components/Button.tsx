import { ComponentProps } from "react";

interface ButtonProps extends ComponentProps<'button'> {

}
export function Button({...props}: ButtonProps) {
	return (
		<button
			{...props}
			className="bg-teal-900 text-white w-full mt-2 hover:bg-teal-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed px-6 h-12 rounded-2xl font-medium transition-all"
		/>
	)
}
