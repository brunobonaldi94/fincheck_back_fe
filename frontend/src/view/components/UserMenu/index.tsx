import { ExitIcon, PersonIcon } from '@radix-ui/react-icons';
import { DropdownMenu } from '../DropDownMenu';
import { useUserMenuController } from './useUserMenuController';
import { ProfileModal } from './ProfileModal';

export function UserMenu(){
  const {
	signout,
	initialsFromName,
	openProfileModal,
	handleCloseProfileModal,
	handleOpenProfileModal
  } = useUserMenuController();
  return (
	<>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<button className="bg-teal-50 rounded-full w-12 h-12 flex items-center justify-center border border-teal-100">
					<span className="text-sm tracking-[-0.5px] text-teal-900 font-medium">
						{initialsFromName}
					</span>
				</button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content className='w-32'>
				<DropdownMenu.Item
					className='flex items-center justify-between'
					onSelect={handleOpenProfileModal}
					>
					Perfil
					<PersonIcon className='w-4 h-4'/>
				</DropdownMenu.Item>
				<DropdownMenu.Item
					className='flex items-center justify-between'
					onSelect={signout}
					>
					Sair
					<ExitIcon className='w-4 h-4'/>
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
		<ProfileModal open={openProfileModal} onClose={handleCloseProfileModal}/>
	</>
  )
}
