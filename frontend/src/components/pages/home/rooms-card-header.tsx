import type { FilterRoomSchemaType } from "@/lib/types/room";

import RoomFilters from "@/components/compound/room-filters";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { useUsedCategories, useUsedLanguages } from "@/queries/list";

interface RoomsCardHeaderProps {
	onHandleFilterChange: (data: FilterRoomSchemaType) => void;
	handleOpenCreateRoomModal: () => void;
}

const RoomsCardHeader = ({ onHandleFilterChange, handleOpenCreateRoomModal }: RoomsCardHeaderProps) => {
	const { data: usedCategories, isLoading: isUsedCategoriesLoading } = useUsedCategories();
	const { data: usedLanguages, isLoading: isUsedLanguagesLoading } = useUsedLanguages();

	const handleOpenCreateRoomModalClick = () => {
		handleOpenCreateRoomModal();
	};

	const onHandleRoomFiltersChange = (data: FilterRoomSchemaType) => {
		onHandleFilterChange(data);
	};

	return (
		<>
			<CardHeader className="flex flex-col w-full">
				<div className="w-full flex justify-between items-center">
					<CardTitle>AVAILABLE ROOMS</CardTitle>
					<Button onClick={handleOpenCreateRoomModalClick}>CREATE</Button>
				</div>
				<RoomFilters className="w-full" categoriesList={usedCategories} isCategoriesDisabled={isUsedCategoriesLoading} languagesList={usedLanguages} isLanguagesDisabled={isUsedLanguagesLoading} onHandleChange={onHandleRoomFiltersChange} />
			</CardHeader>
		</>
	);
};

export default RoomsCardHeader;
