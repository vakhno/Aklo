import { Card } from "@/components/ui/card";

import LanguagesTableCardContent from "./languages-table-card-content";
import LanguagesTableCardHeader from "./languages-table-card-header";
import NewLanguageFormDialog from "./new-language-form-dialog";
import { useLanguagesTableCardStore } from "./store";

const LanguagesTableCard = () => {
	// store
	const { isCreateLanguageDialogOpen, setIsCreateLanguageDialog } = useLanguagesTableCardStore();

	return (
		<>
			<Card>
				<LanguagesTableCardHeader />
				<LanguagesTableCardContent />
			</Card>

			{isCreateLanguageDialogOpen
				&& <NewLanguageFormDialog isOpen={isCreateLanguageDialogOpen} setIsOpen={setIsCreateLanguageDialog} />}
		</>
	);
};

export default LanguagesTableCard;
