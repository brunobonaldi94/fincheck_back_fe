import { ChevronDownIcon } from "@radix-ui/react-icons";
import { cn } from "../../app/utils/cn";
import { DropdownMenu } from "./DropDownMenu";
import { ColorIcon} from "./icons/ColorIcon";
import { useState } from "react";
import { ErrorDisplayMessage } from "./ErrorDisplayMessage";
import { colors, type Color } from "../../app/config/constants";
interface ColorsDropDownInputProps {
    className?: string;
    error?: string;
	onChange?: (value: string) => void;
	value?: string;
}

 export function ColorsDropDownInput({className, error, onChange, value}: ColorsDropDownInputProps) {
    const [selectedColor, setSelectedColor] = useState<Color | null>(() => {
		if (!value) return null;
		return colors.find((color) => color.color === value) ?? null;
	});
    function handleSelectColor(_color: Color) {
        setSelectedColor(_color);
		onChange?.(_color.color);
    }
    return (
        <div>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <button
                        className={cn(`bg-white rounded-lg border border-gray-500 px-3 h-[52px] text-gray-700 w-full
                        select-none focus:border-gray-800 transition-all outline-none text-left relative`,
                        error && "!border-red-900",
                        className
                        )}>
							Cor
                       <div className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-800'>
                        {!selectedColor && (
                                <ChevronDownIcon className="w-6 h-6" />
                            )}
                            {selectedColor && (
                                <ColorIcon color={selectedColor.color} bg={selectedColor.bg} />
                            )}
                       </div>
                    </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content className="grid grid-cols-4">
                        {colors.map((color) => (
                            <DropdownMenu.Item key={color.color}
                                onSelect={() => handleSelectColor(color)}
                            >
                                <ColorIcon color={color.color} bg={color.bg} />
                            </DropdownMenu.Item>
                        ))}
                </DropdownMenu.Content>
            </DropdownMenu.Root>
			<ErrorDisplayMessage error={error} />
        </div>
    )
}
