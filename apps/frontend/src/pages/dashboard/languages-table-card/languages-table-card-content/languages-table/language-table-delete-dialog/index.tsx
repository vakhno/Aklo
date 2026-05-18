import type { LanguageDocLeanType } from "@shared/mongo/types/language";

import { Button } from "@shared/design-system/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@shared/design-system/dialog";
import { useDeleteLanguage } from "@shared/queries";
import { toast } from "sonner";

interface DeleteLanguageDialogProps {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	defaultValues: LanguageDocLeanType;
}

const DeleteLanguageDialog = ({ isOpen, setIsOpen, defaultValues }: DeleteLanguageDialogProps) => {
	// variables
	const { _id: id } = defaultValues;
	// queries mutation
	const { mutate: deleteLanguage, isPending: isDeletePending } = useDeleteLanguage({
		options: {
			onSuccess: () => {
				toast.success("Language deleted");
				setIsOpen(false);
			},
			onError: error => toast.error(error.message)
		}
	});

	const handleDeleteLanguage = () => {
		deleteLanguage({ id: String(id), apiBaseUrl: import.meta.env.VITE_API_URL });
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete language</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete this language? This action cannot be undone and all associated data will be lost. All roulettes and rooms using this language will be deleted as well.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button variant="destructive" disabled={isDeletePending} onClick={handleDeleteLanguage}>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteLanguageDialog;
