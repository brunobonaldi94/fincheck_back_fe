import { CrossCircledIcon } from "@radix-ui/react-icons";

interface ErrorDisplayMessageProps {
	error: string | undefined;
}
export function ErrorDisplayMessage({error}: ErrorDisplayMessageProps) {
	if (!error) {
		return null;
	}
	return (
		<div className="flex gap-2 items-center mt-2 text-red-900">
				<CrossCircledIcon className=" pointer-events-none" />
				<p className="text-xs">{error}</p>
		</div>
	)
}
