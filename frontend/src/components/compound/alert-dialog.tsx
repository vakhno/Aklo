import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
} from "@/components/ui/alert-dialog";

interface AlertDialogProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	description?: string;
	triggerText?: string;
	triggerComponent?: React.ReactNode;
	isCancelVisible?: boolean;
	cancelText?: string;
	actionText: string;
	onAction: () => void;
	onCancel?: () => void;
}

export function AlertDialogComponent({
	isOpen,
	onOpenChange,
	title,
	description,
	triggerText,
	triggerComponent,
	cancelText = "Cancel",
	isCancelVisible,
	actionText,
	onAction,
	onCancel
}: AlertDialogProps) {
	const handleAction = () => {
		onAction();
		onOpenChange(false);
	};

	const handleCancel = () => {
		if (onCancel) {
			onCancel();
		}
		onOpenChange(false);
	};

	return (
		<AlertDialog open={isOpen} onOpenChange={onOpenChange}>
			{triggerComponent
				? (
						<AlertDialogTrigger asChild>
							{triggerComponent}
						</AlertDialogTrigger>
					)
				: (
						<AlertDialogTrigger>
							{triggerText}
						</AlertDialogTrigger>
					)}
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					{isCancelVisible
						? (
								<AlertDialogCancel onClick={handleCancel}>
									{cancelText}
								</AlertDialogCancel>
							)
						: null}
					<AlertDialogAction
						onClick={handleAction}
					>
						{actionText}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
