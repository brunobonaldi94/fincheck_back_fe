import { useState } from "react";
import { useAuth } from "../../app/hooks/useAuth";
import { cn } from "../../app/utils/cn";
import { ExitIcon } from "@radix-ui/react-icons";

export function UserMenu(){
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
	signout
  } = useAuth();
  return (
	<div className="relative">
		<div onClick={() => setIsMenuOpen(prevState => !prevState)}
			className="bg-teal-50 rounded-full w-12 h-12 flex items-center justify-center border border-teal-100 hover:bg-teal-100
					cursor-pointer">
			<span className="text-sm tracking-[-0.5px] text-teal-900 font-medium">
				BR
			</span>
		</div>
		<div onClick={signout} className={cn(
			"flex items-center justify-center gap-1 absolute top-3/4 left-1/2 -translate-x-1/2 bg-teal-50 border-teal-100 p-2 opacity-0 transition-opacity rounded-md text-gray-800 cursor-pointer hover:scale-105 hover:bg-teal-100",
			isMenuOpen && "opacity-100"
		)}>
				<span>logout</span>
				<ExitIcon />
		</div>
	</div>
  )
}
