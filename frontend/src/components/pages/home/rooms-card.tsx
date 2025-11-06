import { useNavigate } from "@tanstack/react-router";
import { useId, useState } from "react";

import type { FilterRoomSchemaType, NewRoomSchemaType } from "@/lib/types/room";

import CreateRoomForm from "@/components/compound/create-room-form";
import DialogModal from "@/components/compound/dialog-modal";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCreateRoom } from "@/queries/room";

import RoomsCardContent from "./rooms-card-content";
import RoomsCardHeader from "./rooms-card-header";

const RoomsCard = () => {
	const navigate = useNavigate();
	const { mutate: handleCreateRoom } = useCreateRoom({
		options: {
			onSuccess: (room) => {
				const { id } = room;

				navigate({ to: "/room/$id", params: { id } });
			}
		}
	});
	const [roomFilters, setRoomFilters] = useState<FilterRoomSchemaType>({
		language: "",
		category: ""
	});
	const createRoomFormId = useId();
	const [isCreateRoomModalOpen, setCreateRoomModalOpen] = useState(false);

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
		<>
			<Card className="h-[70vh]">
				<RoomsCardHeader onHandleFilterChange={onHandleFilterChange} handleOpenCreateRoomModal={handleOpenCreateRoomModal} />
				<ScrollArea className="overflow-auto h-full">
					<RoomsCardContent className="h-full" roomFilters={roomFilters} handleOpenCreateRoomModal={handleOpenCreateRoomModal} />
				</ScrollArea>
			</Card>
			<DialogModal isOpen={isCreateRoomModalOpen} setOpen={setCreateRoomModalOpen} title="Create New Room" description="Fill out the form to create your new conversation room." submitTitle="Submit" cancelTitle="Cancel" isCancelVisible formId={createRoomFormId}>
				<ScrollArea className="h-full">
					<CreateRoomForm formId={createRoomFormId} onHandleSubmit={handleCreateRoomSubmit} />
				</ScrollArea>
			</DialogModal>
		</>
	);
};

export default RoomsCard;
