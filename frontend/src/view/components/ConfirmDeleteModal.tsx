import { Button } from "./Button";
import { Modal } from "./Modal";
import { TrashIcon } from "./icons/TrashIcon";

interface ConfirmDeleteModalProps {
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	description?: string;
}

export function ConfirmDeleteModal({ onClose, title, description, onConfirm }: ConfirmDeleteModalProps) {
	return (
		<Modal title="Excluir" open onClose={onClose}>
			<div className="flex flex-col items-center text-center gap-6">
				<div className="w-[52px] h-[52px] rounded-full bg-red-0 flex items-center justify-center">
					<TrashIcon className="w-6 h-6 text-red-900" />
				</div>
				<p className="w-[180px] text-gray-800 tracking-[-0.5px] font-bold">
					{title}
				</p>
				{description && (
				<p className="tracking-[-0.5px] text-gray-800">
					{description}
				</p>)}
			</div>
			<div className="mt-10">
				<Button className="" variant="danger" onClick={onConfirm}>
					Sim, desejo excluir
				</Button>
				<Button className="w-full mt-4" variant="ghost" onClick={onClose}>
					Cancelar
				</Button>
			</div>
		</Modal>
	)
}
