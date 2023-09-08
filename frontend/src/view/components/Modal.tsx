import * as Dialog from "@radix-ui/react-dialog";
import { cn } from "../../app/utils/cn";

export function Modal() {
	return (
		<Dialog.Root>
			<Dialog.Trigger />
			<Dialog.Portal>
				<Dialog.Overlay className={cn(
					"fixed inset-0 bg-black/80 backdrop-blur-sm",
				)}/>
				<Dialog.Content className={cn(
					'',
					"data-[state=open]:animate-content-show",
				)}>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
