import type { ReactNode } from "react";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@/components/ui/alert-dialog";

interface AlertDialogModalProps {
	children?: ReactNode;
	isOpen: boolean;
	setOpen: (open: boolean) => void;
	title: string;
	description?: string;
	isCancelVisible?: boolean;
	submitTitle: string;
	cancelTitle?: string;
	onSubmit?: () => void;
	onCancel?: () => void;
}

function AlertDialogModal({
	children,
	isOpen,
	setOpen,
	title,
	description,
	cancelTitle,
	isCancelVisible,
	submitTitle,
	onSubmit,
	onCancel
}: AlertDialogModalProps) {
	const onHandleSubmit = () => {
		onSubmit &&	onSubmit();
	};

	const onHandleCancel = () => {
		onCancel && onCancel();
	};

	return (
		<AlertDialog open={isOpen} onOpenChange={setOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					{description
						? <AlertDialogDescription>{description}</AlertDialogDescription>
						: null}
				</AlertDialogHeader>
				{children}
				<AlertDialogFooter>
					{isCancelVisible
						? (
								<AlertDialogCancel onClick={onHandleCancel}>
									{cancelTitle}
								</AlertDialogCancel>
							)

						: null}
					<AlertDialogAction
						onClick={onHandleSubmit}
					>
						{submitTitle}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export default AlertDialogModal;
