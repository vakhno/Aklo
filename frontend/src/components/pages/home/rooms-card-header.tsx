import { useNavigate } from "@tanstack/react-router";
import { useId, useState } from "react";

import type { FilterRoomSchemaType, NewRoomSchemaType } from "@/lib/types/room";

import CreateRoomForm from "@/components/compound/create-room-form";
import DialogModal from "@/components/compound/dialog-modal";
import RoomFilters from "@/components/compound/room-filters";
import { Button } from "@/components/ui/button";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { useUsedCategories, useUsedLanguages } from "@/queries/list";
import { useCreateRoom } from "@/queries/room";

interface RoomsCardHeaderProps {
	onHandleFilterChange: (data: FilterRoomSchemaType) => void;
}

const RoomsCardHeader = ({ onHandleFilterChange }: RoomsCardHeaderProps) => {
	const navigate = useNavigate();
	const { mutate: handleCreateRoom } = useCreateRoom({
		options: {
			onSuccess: (room) => {
				const { id } = room;

				navigate({ to: "/room/$id", params: { id } });
			}
		}
	});
	const [isCreateRoomModalOpen, setCreateRoomModalOpen] = useState(false);
	const { data: usedCategories, isLoading: isUsedCategoriesLoading } = useUsedCategories();
	const { data: usedLanguages, isLoading: isUsedLanguagesLoading } = useUsedLanguages();
	const createRoomFormId = useId();

	const handleOpenCreateRoomModalClick = () => {
		setCreateRoomModalOpen(true);
	};

	const handleCreateRoomSubmit = async (room: NewRoomSchemaType) => {
		await handleCreateRoom({ newRoomData: room });
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
			<DialogModal isOpen={isCreateRoomModalOpen} setOpen={setCreateRoomModalOpen} title="Create New Room" description="Fill out the form to create your new conversation room." submitTitle="Submit" cancelTitle="Cancel" isCancelVisible formId={createRoomFormId}>
				<CreateRoomForm formId={createRoomFormId} onHandleSubmit={handleCreateRoomSubmit} />
			</DialogModal>
		</>
	);
};

export default RoomsCardHeader;
