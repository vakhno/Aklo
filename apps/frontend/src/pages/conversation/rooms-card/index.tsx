import type { FilterRoomSchemaType, NewRoomSchemaType } from "@shared/schemas";

import { Card } from "@shared/design-system/card";
import { ScrollArea } from "@shared/design-system/scroll-area";
import { useCreateRoom, useGetLanguageList, useGetRooms } from "@shared/queries";
import { useNavigate } from "@tanstack/react-router";
import { useId, useState } from "react";

import DialogModal from "@/components/compound/dialog-modal";
import RoomForm from "@/components/forms/room-form";
import { ROOMS_LIMIT } from "@/lib/constants/room";
import { convertLanguageListToComboboxList } from "@/lib/utils/convert-list-to-combobox-list";

import RoomsCardContent from "./rooms-card-content";
import RoomsCardHeader from "./rooms-card-header";

const RoomsCard = () => {
	const navigate = useNavigate();
	const { data: languageListData, isSuccess } = useGetLanguageList({ apiBaseUrl: import.meta.env.VITE_API_URL });
	const languageList = isSuccess ? languageListData : [];

	const { mutate: handleCreateRoom } = useCreateRoom({
		options: {
			onSuccess: (room) => {
				const { _id } = room;

				navigate({ to: "/room/$id", params: { id: String(_id) } });
			}
		}
	});
	const [roomFilters, setRoomFilters] = useState<FilterRoomSchemaType>({
		language: ""
	});
	const createRoomFormId = useId();
	const [isCreateRoomModalOpen, setCreateRoomModalOpen] = useState(false);

	const { data } = useGetRooms({
		apiBaseUrl: import.meta.env.VITE_API_URL,
		limit: ROOMS_LIMIT,
		language: roomFilters.language
	});

	const rooms = data?.pages.flatMap(page => page?.rooms || []) ?? [];
	const totalRooms = rooms.length;

	const onHandleFilterChange = (data: FilterRoomSchemaType) => {
		setRoomFilters(data);
	};

	const handleCreateRoomSubmit = async (room: NewRoomSchemaType) => {
		await handleCreateRoom({
			apiBaseUrl: import.meta.env.VITE_API_URL,
			newRoomData: room
		});
	};

	const handleOpenCreateRoomModal = () => {
		setCreateRoomModalOpen(true);
	};

	return (
		<section id="topics" className="scroll-mt-[calc(var(--header-height)+var(--header-margin-bottom))]">
			<Card>
				<RoomsCardHeader
					onHandleFilterChange={onHandleFilterChange}
					handleOpenCreateRoomModal={handleOpenCreateRoomModal}
					totalRooms={totalRooms}
				/>
				<RoomsCardContent className="h-[50vh]" roomFilters={roomFilters} handleOpenCreateRoomModal={handleOpenCreateRoomModal} />
			</Card>
			<DialogModal isOpen={isCreateRoomModalOpen} setOpen={setCreateRoomModalOpen} title="Create New Room" description="Fill out the form to create your new conversation room." submitTitle="Submit" cancelTitle="Cancel" isCancelVisible formId={createRoomFormId} onCancel={() => setCreateRoomModalOpen(false)}>
				<ScrollArea className="h-full">
					<RoomForm formId={createRoomFormId} languageList={convertLanguageListToComboboxList(languageList)} onHandleSubmit={handleCreateRoomSubmit} />
				</ScrollArea>
			</DialogModal>
		</section>
	);
};

export default RoomsCard;
