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
import { useCreateLanguage } from "@shared/queries";
import { useId } from "react";
import { toast } from "sonner";

import LanguageForm from "@/components/forms/language-form";

interface LanguageFormDialogProps {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
}

const LanguageFormDialog = ({ isOpen, setIsOpen }: LanguageFormDialogProps) => {
	// form
	const formId = useId();
	// queries mutation
	const { mutate: createLanguage, isPending: isCreateLanguagePending } = useCreateLanguage({
		options: {
			onSuccess: () => {
				toast.success("Language created");
				setIsOpen(false);
			},
			onError: error => toast.error(error.message)
		}
	});
	// handlers
	const handleSubmit = (data: LanguageInputSchemaType) => {
		createLanguage({ apiBaseUrl: import.meta.env.VITE_API_URL, data });
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New language</DialogTitle>
					<DialogDescription>
						Fill out the form to create a new language
					</DialogDescription>
				</DialogHeader>
				<div className="overflow-hidden">
					<ScrollArea className="h-full">
						<LanguageForm
							formId={formId}
							onHandleSubmit={handleSubmit}
						/>
					</ScrollArea>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button type="submit" form={formId} disabled={isCreateLanguagePending}>
						Submit
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default LanguageFormDialog;
