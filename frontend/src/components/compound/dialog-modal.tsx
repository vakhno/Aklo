import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";

interface DialogModalProps {
	className?: string;
	formId?: string;
	isOpen: boolean;
	setOpen: (open: boolean) => void;
	title: string;
	description?: string;
	children?: React.ReactNode;
	isCancelVisible?: boolean;
	cancelTitle?: string;
	submitTitle: string;
	onSubmit?: () => void;
	onCancel?: () => void;
}

function DialogModal({
	formId,
	isOpen,
	setOpen,
	title,
	description,
	children,
	cancelTitle,
	isCancelVisible,
	submitTitle,
	onSubmit,
	onCancel
}: DialogModalProps) {
	return (
		<Dialog open={isOpen} onOpenChange={setOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					{description
						? <DialogDescription>{description}</DialogDescription>
						: null}
				</DialogHeader>
				<div className="overflow-hidden">
					{children}
				</div>
				<DialogFooter>
					{isCancelVisible
						? (
								<DialogClose onClick={onCancel}>
									{cancelTitle}
								</DialogClose>
							)
						: null}
					<Button type="submit" form={formId} onClick={onSubmit}>
						{submitTitle}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default DialogModal;
