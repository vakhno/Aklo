import { useNavigate } from "@tanstack/react-router";
import { useId, useMemo, useState } from "react";

import type { FilterRoomSchemaType, NewRoomSchemaType } from "@/lib/types/room";

import DialogModal from "@/components/compound/dialog-modal";
import CreateRoomForm from "@/components/forms/create-room-form";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ROOMS_LIMIT } from "@/lib/constants/room";
import { convertLanguageListToComboboxList } from "@/lib/utils/convert-list-to-combobox-list";
import { useGetLanguageList } from "@/queries/language";
import { useCreateRoom, useGetRooms } from "@/queries/room";

import RoomsCardContent from "./rooms-card-content";
import RoomsCardHeader from "./rooms-card-header";

const RoomsCard = () => {
	const navigate = useNavigate();
	const { data: languageListData, isSuccess } = useGetLanguageList({});
	const languageList = isSuccess ? languageListData : [];

	const { mutate: handleCreateRoom } = useCreateRoom({
		options: {
			onSuccess: (room) => {
				const { _id } = room;

				navigate({ to: "/room/$id", params: { id: _id } });
			}
		}
	});
	const [roomFilters, setRoomFilters] = useState<FilterRoomSchemaType>({
		language: ""
	});
	const createRoomFormId = useId();
	const [isCreateRoomModalOpen, setCreateRoomModalOpen] = useState(false);

	const { data } = useGetRooms({ limit: ROOMS_LIMIT, language: roomFilters.language });

	const rooms = useMemo(() => {
		return data?.pages.flatMap(page => page?.rooms || []) ?? [];
	}, [data]);

	const totalRooms = rooms.length;
	const totalActiveUsers = useMemo(() => {
		return rooms.reduce((sum, r) => sum + (r.activeUsersCount || 0), 0);
	}, [rooms]);

	const onHandleFilterChange = (data: FilterRoomSchemaType) => {
		setRoomFilters(data);
	};

	const handleCreateRoomSubmit = async (room: NewRoomSchemaType) => {
		await handleCreateRoom({ newRoomData: room });
	};

	const handleOpenCreateRoomModal = () => {
		setCreateRoomModalOpen(true);
	};

	return (
		<section id="topics">
			<Card className="h-[80vh]">
				<RoomsCardHeader
					onHandleFilterChange={onHandleFilterChange}
					handleOpenCreateRoomModal={handleOpenCreateRoomModal}
					totalRooms={totalRooms}
					totalActiveUsers={totalActiveUsers}
				/>
				<RoomsCardContent className="h-full" roomFilters={roomFilters} handleOpenCreateRoomModal={handleOpenCreateRoomModal} />
			</Card>
			<DialogModal isOpen={isCreateRoomModalOpen} setOpen={setCreateRoomModalOpen} title="Create New Room" description="Fill out the form to create your new conversation room." submitTitle="Submit" cancelTitle="Cancel" isCancelVisible formId={createRoomFormId}>
				<ScrollArea className="h-full">
					<CreateRoomForm formId={createRoomFormId} languageList={convertLanguageListToComboboxList(languageList)} onHandleSubmit={handleCreateRoomSubmit} />
				</ScrollArea>
			</DialogModal>
		</section>
	);
};

export default RoomsCard;
