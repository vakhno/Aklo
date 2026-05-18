import { Button } from "@shared/design-system/button";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle
} from "@shared/design-system/empty";
import {
	TableBody,
	TableCell,
	TableRow
} from "@shared/design-system/table";

import { useLanguagesTableCardStore } from "../../../../store";

interface LanguageTableDataBodyEmptyProps {
	columnCount: number;
}

export default function LanguageTableDataBodyEmpty({ columnCount }: LanguageTableDataBodyEmptyProps) {
	const { setIsCreateLanguageDialog } = useLanguagesTableCardStore();

	const handleCreateLanguage = () => {
		setIsCreateLanguageDialog(true);
	};

	return (
		<TableBody>
			<TableRow className="border-0 hover:bg-transparent">
				<TableCell colSpan={columnCount} className="h-[60vh] min-h-[300px] align-middle border-0 p-6">
					<Empty>
						<EmptyHeader>
							<EmptyTitle>No languages found</EmptyTitle>
							<EmptyDescription>Create a language to get started.</EmptyDescription>
						</EmptyHeader>
						<EmptyContent>
							<Button variant="secondary" onClick={handleCreateLanguage}>Create</Button>
						</EmptyContent>
					</Empty>
				</TableCell>
			</TableRow>
		</TableBody>
	);
}
