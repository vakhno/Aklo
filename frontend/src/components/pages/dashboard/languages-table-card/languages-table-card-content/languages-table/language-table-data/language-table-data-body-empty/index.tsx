import { Button } from "@/components/ui/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle
} from "@/components/ui/empty";

import { useLanguagesTableCardStore } from "../../../../store";

export default function LanguageTableDataBodyEmpty() {
	// store
	const { setIsCreateLanguageDialog } = useLanguagesTableCardStore();
	// handlers
	const handleCreateLanguage = () => {
		setIsCreateLanguageDialog(true);
	};

	return (
		<Empty>
			<EmptyHeader>
				<EmptyTitle>No languages found</EmptyTitle>
				<EmptyDescription>Create a language to get started.</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button variant="secondary" onClick={handleCreateLanguage}>Create</Button>
			</EmptyContent>
		</Empty>
	);
}
