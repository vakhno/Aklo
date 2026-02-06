import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

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
					<AlertDialogTitle>Room is not available</AlertDialogTitle>
					<AlertDialogDescription>Invalid room id or room is not available to join.</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<Button onClick={onHandleSubmitClick}>Ok</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default ErrorAlertDialog;
