import { cn } from "../../../../app/utils/cn";
import { Button } from "../../Button";
import { Input } from "../../Input";
import { Modal } from "../../Modal";
import { useProfileModalController } from "./useProfileModalController";

interface ProfileModalProps {
	open: boolean;
	onClose: () => void;
}

export function ProfileModal({open, onClose}: ProfileModalProps) {
	const {
		errors,
		handleSubmit,
		isLoading,
		register,
		loginType,
	} = useProfileModalController();
	return (
		<div className={cn(
			!open && "hidden",
		)}>
			<Modal open={open} onClose={onClose} title="Perfil">
				<form onSubmit={handleSubmit} className="space-y-2">
					<p className="bg-yellow-100 text-center rounded-md p-1 text-gray-800 border border-gray-100 shadow-sm">
						Only the non-empty values will be updated!
					</p>
					<p className="tracking-[-0.5px] text-gray-800">
						<span className="text-gray-700">Login Type: </span>
						<span className="text-gray-900 font-medium tracking-[-0.5px]">{loginType}</span>
					</p>
					<Input
						type="text"
						placeholder="Nome" {...register('name')}
						error={errors.name?.message}
					/>
					<Input
						type="email" placeholder="Email" {...register('email')} error={errors.email?.message} />
					<Button type="submit" disabled={isLoading}>
						Submeter
					</Button>
				</form>
			</Modal>
		</div>
	)
}
