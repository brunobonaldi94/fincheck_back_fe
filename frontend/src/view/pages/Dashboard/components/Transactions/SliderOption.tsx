import { useSwiper } from "swiper/react";
import { MONTHS } from "../../../../../app/config/constants";
import { cn } from "../../../../../app/utils/cn";
interface SliderOptionProps {
	isActive: boolean;
	month: string;
	index: number;
}

export function SliderOption({isActive, month, index}: SliderOptionProps) {
	const swiper = useSwiper();

	return (
		<button
			onClick={() => swiper.slideTo(index)}
			className={cn("w-full rounded-full h-12 tracking-[-0.5px] text-sm text-gray-900 font-medium",
						isActive && "bg-white"
									)}
		>{month}
	</button>
	)
}
