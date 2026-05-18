import type { LanguageDocLeanType } from "@shared/mongo/types/language";

import { useGetLanguageList } from "@shared/queries";
import { useState } from "react";

import { getColumns } from "./language-table-columns";
import DataTable from "./language-table-data";
import DeleteLanguageFormDialog from "./language-table-delete-dialog";
import EditLanguageFormDialog from "./language-table-edit-dialog";

const LanguagesTable = () => {
	// state
	const [selectedLanguage, setSelectedLanguage] = useState<LanguageDocLeanType | null>(null);
	const [isEditLanguageDialogOpen, setIsEditLanguageDialogOpen] = useState(false);
	const [isDeleteLanguageDialogOpen, setIsDeleteLanguageDialogOpen] = useState(false);
	// queries query
	const { data: languages = [], isLoading } = useGetLanguageList({
		apiBaseUrl: import.meta.env.VITE_API_URL
	});
	// variables
	const isTableEmpty = !languages.length;
	// handlers
	const handleEditLanguage = (language: LanguageDocLeanType) => {
		setSelectedLanguage(language);
		setIsEditLanguageDialogOpen(true);
	};
	const handleDeleteLanguage = (language: LanguageDocLeanType) => {
		setSelectedLanguage(language);
		setIsDeleteLanguageDialogOpen(true);
	};
	// columns
	const columns = getColumns({ onEdit: handleEditLanguage, onDelete: handleDeleteLanguage });

	return (
		<>
			<DataTable columns={columns} data={languages} isLoading={isLoading} isEmpty={isTableEmpty} />

			{(isEditLanguageDialogOpen && selectedLanguage) && (
				<EditLanguageFormDialog
					isOpen={isEditLanguageDialogOpen}
					setIsOpen={setIsEditLanguageDialogOpen}
					defaultValues={selectedLanguage}
				/>
			)}

			{(isDeleteLanguageDialogOpen && selectedLanguage) && (
				<DeleteLanguageFormDialog
					isOpen={isDeleteLanguageDialogOpen}
					setIsOpen={setIsDeleteLanguageDialogOpen}
					defaultValues={selectedLanguage}
				/>
			)}
		</>
	);
};

export default LanguagesTable;
