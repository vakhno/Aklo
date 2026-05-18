import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@shared/design-system/alert-dialog";
import { Button } from "@shared/design-system/button";

interface JoinDialogProps {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	onHandleSubmitClick: () => void;
}

const ErrorAlertDialog = ({ isOpen, setIsOpen, onHandleSubmitClick }: JoinDialogProps) => {
	return (
		<AlertDialog open={isOpen} onOpenChange={setIsOpen}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Roulette is not available</AlertDialogTitle>
					<AlertDialogDescription>Invalid roulette id or roulette is not available to join.</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<Button onClick={onHandleSubmitClick}>Ok</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default ErrorAlertDialog;
