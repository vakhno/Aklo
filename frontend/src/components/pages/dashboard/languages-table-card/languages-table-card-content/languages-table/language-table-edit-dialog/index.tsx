import { useId } from "react";
import { toast } from "sonner";

import type { LanguageType, NewLanguageSchemaType } from "@/lib/types/language";

import LanguageForm from "@/components/forms/language-form";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useUpdateLanguage } from "@/queries/language";

interface EditLanguageFormDialogProps {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	defaultValues: LanguageType;
}

const EditLanguageFormDialog = ({ isOpen, setIsOpen, defaultValues }: EditLanguageFormDialogProps) => {
	// form
	const formId = useId();
	// queries mutation
	const { mutate: updateLanguage, isPending: isUpdatePending } = useUpdateLanguage({
		options: {
			onSuccess: () => {
				toast.success("Language updated");
				setIsOpen(false);
			},
			onError: error => toast.error(error.message)
		}
	});

	const handleSubmit = (data: NewLanguageSchemaType) => {
		updateLanguage({ id: defaultValues._id, data });
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit language</DialogTitle>
					<DialogDescription>
						Update the language details
					</DialogDescription>
				</DialogHeader>
				<div className="overflow-hidden">
					<ScrollArea className="h-full">
						<LanguageForm
							formId={formId}
							defaultValue={defaultValues}
							onHandleSubmit={handleSubmit}
						/>
					</ScrollArea>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button type="submit" form={formId} disabled={isUpdatePending}>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default EditLanguageFormDialog;
