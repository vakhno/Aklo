import type { LanguageDocLeanType } from "@shared/mongo/types/language";
import type { LanguageInputSchemaType } from "@shared/schemas/language";

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
import { ScrollArea } from "@shared/design-system/scroll-area";
import { useUpdateLanguage } from "@shared/queries";
import { useId } from "react";
import { toast } from "sonner";

import LanguageForm from "@/components/forms/language-form";

interface EditLanguageFormDialogProps {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	defaultValues: LanguageDocLeanType;
}

const EditLanguageFormDialog = ({ isOpen, setIsOpen, defaultValues }: EditLanguageFormDialogProps) => {
	const formId = useId();

	const { mutate: updateLanguage, isPending: isUpdatePending } = useUpdateLanguage({
		options: {
			onSuccess: () => {
				toast.success("Language updated");
				setIsOpen(false);
			},
			onError: error => toast.error(error.message)
		}
	});

	const handleSubmit = (data: LanguageInputSchemaType) => {
		updateLanguage({
			apiBaseUrl: import.meta.env.VITE_API_URL,
			id: String(defaultValues._id),
			data
		});
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
