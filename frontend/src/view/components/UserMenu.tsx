import { useState } from "react";
import { useAuth } from "../../app/hooks/useAuth";
import { cn } from "../../app/utils/cn";
import { ExitIcon, PersonIcon, GearIcon} from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

type LinkItemType = {
	path: string;
}
interface UserMenuItemsProps {
	children?: React.ReactNode;
	itemName: string;
	action?: () => void;
	LinkItem?: LinkItemType;
}

const UserMenuItems = ({children, itemName, action, LinkItem}: UserMenuItemsProps) => {
	const className = "w-full flex items-center justify-between p-2 z-50 cursor-pointer gap-1 hover:bg-white text-sm";
	const child = (
		<>
			<span>{itemName}</span>
			{children}
		</>
	)
	if (LinkItem) {
		return <Link to={LinkItem.path} className={className}>
			{child}
		</Link>
	}
	return (
		<div
			onClick={action}
			className={className}>
			{child}
		</div>
	)
}

export function UserMenu(){
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {
	signout,
	user
  } = useAuth();

  const getInitials = (name: string) => {
	const splittedName = name.split(" ");
	const firstInitial = splittedName[0][0].toUpperCase();
	if (splittedName.length === 1) {
		return firstInitial;
	}
	const lastInitial = splittedName[splittedName.length - 1][0].toUpperCase();
	return `${firstInitial}${lastInitial}`;
  }
  const closeMenuAfterOpen = () => {
	if (isMenuOpen) {
		setIsMenuOpen(false);
	}
  }
  return (
		<div onClick={closeMenuAfterOpen} className={cn(
			isMenuOpen && "before:fixed before:top-0 before:left-0 before:right-0 before:bottom-0 before:z-20",
		)}>
			<div onClick={() => setIsMenuOpen(prevState => !prevState)}
				className="bg-teal-50 rounded-full w-12 h-12 flex items-center justify-center border border-teal-100 hover:bg-teal-100
						cursor-pointer relative">
				<span className="text-sm tracking-[-0.5px] text-teal-900 font-medium">
					{getInitials(user.name)}
				</span>
				<div className={cn(
				"flex items-center w-max justify-center flex-col absolute top-[120%] -left-[160%] md:-left-[120%] z-30 -translate-x-1/2 bg-gray-50 border border-gray-200 transition-all rounded-md text-gray-800",
				!isMenuOpen && "opacity-0 pointer-events-none",
				isMenuOpen && "opacity-100 pointer-events-auto",
			)}>
				<span className="p-2 text-sm border-b-2 border-gray-100">{`${user.name.split(" ")[0]} - ${user.email}`}</span>
				<UserMenuItems
					itemName="Profile"
					>
						<PersonIcon />
				</UserMenuItems>
				<UserMenuItems
					itemName="Settings"
					LinkItem={{path: "/settings"}}>
						<GearIcon />
				</UserMenuItems>
				<UserMenuItems
					itemName="Log Out"
					action={signout}
					>
					<ExitIcon />
				</UserMenuItems>

			</div>
		</div>
		</div>
  )
}

