import { useState } from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { cn } from '../../app/utils/cn';
import { ErrorDisplayMessage } from './ErrorDisplayMessage';
import { Spinner } from './Spinner';

interface SelectProps {
    className?: string;
	placeholder: string;
    error?: string;
	onChange?: (value: string) => void;
	value?: string;
	options: {
		value: string;
		label: string;
	}[];
	isLoading?: boolean;
}

export function Select({className, placeholder, error, options, onChange, value, isLoading}: SelectProps) {
	const [selectedValue, setSelectedValue] = useState(value ?? '');
	function handleSelectChange(value: string) {
		setSelectedValue(value);
		onChange?.(value);
	}
    return (
    <div>
        <div className="relative">
			<label className={cn(
				'z-10 absolute top-1/2 -translate-y-1/2 left-3 text-gray-700 pointer-events-none',
				selectedValue && 'text-xs left-[13px] top-2 transition-all translate-y-0',
			)}>
				{isLoading ? <Spinner className="w-6 h-6" /> : placeholder}
			</label>
            <RadixSelect.Root
				value={value}
				onValueChange={handleSelectChange}>
                <RadixSelect.Trigger
                className={cn(`bg-white rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 w-full
                    select-none focus:border-gray-800 transition-all outline-none text-left relative pt-4`,
                    error && "!border-red-900",
                    className
                )}
                >
                <RadixSelect.Value />
                <RadixSelect.Icon className="absolute right-3 top-1/2 -translate-y-1/2">
                    <ChevronDownIcon className='text-gray-8 w-6 h-6'/>
                </RadixSelect.Icon>
                </RadixSelect.Trigger>
                <RadixSelect.Portal>
              {!isLoading && (
				<RadixSelect.Content className="z-[99] overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)]">
                    <RadixSelect.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default">
                    <ChevronUpIcon />
                    </RadixSelect.ScrollUpButton>
                    <RadixSelect.Viewport className="p-2">
						{options.map((option) => (
							<RadixSelect.Item
							className={cn('p-2 text-gray-800 text-sm data-[state=checked]:font-bold outline-none data-[highlighted]:bg-gray-50 rounded-lg transition-colors')}
							value={option.value}
							key={option.value}
							>
							<RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
						</RadixSelect.Item>
						))}
                    </RadixSelect.Viewport>
                    <RadixSelect.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-gray-800 cursor-default">
                    <ChevronDownIcon />
                    </RadixSelect.ScrollDownButton>
                </RadixSelect.Content>
               )}
                </RadixSelect.Portal>
            </RadixSelect.Root>
        </div>
        <ErrorDisplayMessage error={error}/>
    </div>
    );
}
