import { ComponentProps, forwardRef, useState} from "react";
import { CrossCircledIcon } from '@radix-ui/react-icons';
import { cn } from "../../app/utils/cn";
import { EyeOpenIcon, EyeClosedIcon } from '@radix-ui/react-icons';
interface InputProps extends ComponentProps<'input'> {
	name: string;
	error?: string;
}
export const Input = forwardRef<HTMLInputElement, InputProps>(({placeholder, name, id, error, className,...props}: InputProps, ref) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);

	const inputId = id ?? name;
	const { type } = props;
	let fixedType = type ?? "text";
	if (type === "password" && showPassword) {
		fixedType = "text";
	}

	const toggleShowPassword = () => setShowPassword(prevState => !prevState);
	return (
		<div className="relative">
			<input
				{...props}
				type={fixedType}
				ref={ref}
				id={inputId}
				name={name}
				placeholder=" "
				className={cn(`bg-white rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 w-full
				relative select-none
				pt-4 peer placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none`,
				error && "!border-red-900",
				className
				)}
			/>
			{type === "password" && !showPassword &&(
				<EyeClosedIcon
					onClick={toggleShowPassword}
					className="absolute top-1/2 left-[95%] translate-y-[-50%] translate-x-[-50%] cursor-pointer"/>
			)}
			{type === "password" && showPassword &&(
				<EyeOpenIcon
					onClick={toggleShowPassword}
					className="absolute top-1/2 left-[95%] translate-y-[-50%] translate-x-[-50%] cursor-pointer"/>
			)}
		<label
			htmlFor={inputId}
			className="absolute select-none text-xs left-[13px] top-2 pointer-events-none text-gray-700 peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 transition-all">
			{placeholder}
		</label>
		{error && (
			<div className="flex gap-2 items-center mt-2 text-red-900">
				<CrossCircledIcon className=" pointer-events-none" />
				<p className="text-xs">{error}</p>
			</div>
		)}
		</div>
	)
});

Input.displayName = 'Input';
