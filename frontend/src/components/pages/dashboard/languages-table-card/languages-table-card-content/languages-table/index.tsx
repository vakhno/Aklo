import { useState } from "react";

import type { LanguageType } from "@/lib/types/language";

import { useGetLanguageList } from "@/queries/language";

import { getColumns } from "./language-table-columns";
import DataTable from "./language-table-data";
import DeleteLanguageFormDialog from "./language-table-delete-dialog";
import EditLanguageFormDialog from "./language-table-edit-dialog";

const LanguagesTable = () => {
	// state
	const [selectedLanguage, setSelectedLanguage] = useState<LanguageType | null>(null);
	const [isEditLanguageDialogOpen, setIsEditLanguageDialogOpen] = useState(false);
	const [isDeleteLanguageDialogOpen, setIsDeleteLanguageDialogOpen] = useState(false);
	// queries query
	const { data: languages = [], isLoading } = useGetLanguageList({});
	// variables
	const isTableEmpty = !languages.length;
	// handlers
	const handleEditLanguage = (language: LanguageType) => {
		setSelectedLanguage(language);
		setIsEditLanguageDialogOpen(true);
	};
	const handleDeleteLanguage = (language: LanguageType) => {
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
