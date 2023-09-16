import { NumericFormat } from 'react-number-format'
import { ErrorDisplayMessage } from './ErrorDisplayMessage';
import { cn } from '../../app/utils/cn';

interface InputCurrencyProps {
	error?: string;
	onChange?: (value: string) => void;
	value?: string;
}
export function InputCurrency({onChange, error, value}: InputCurrencyProps) {
	return (
		<div>
			<NumericFormat
				thousandSeparator='.'
				decimalSeparator=','
				className={cn(
					'text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none w-full',
					error && '!text-red-900',
				)}
				onChange={(e) => onChange?.(e.target.value)}
				value={value}
			/>
			<ErrorDisplayMessage error={error} />
		</div>
	)
}
