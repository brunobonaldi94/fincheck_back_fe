import { Button, ButtonProps } from "./Button";
import { GoogleIcon } from "./icons/GoogleIcon";

export function ButtonGoogle({className, isLoading, disabled, children, ...props}: ButtonProps) {
	return (
		<Button
			{...props}
			disabled={isLoading || disabled}
			className={className}
		>
			<GoogleIcon />
			<span className='ml-2'>{children}</span>
		</Button>
	)
}
