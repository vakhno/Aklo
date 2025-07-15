import { useNavigate } from "@tanstack/react-router";
import { Globe, Hash, Mic, Video } from "lucide-react";
import { useState } from "react";

import type { RoomType } from "@/lib/types/room";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORY_LIST } from "@/lib/constants/category-list";
import { LANGUAGE_LIST } from "@/lib/constants/language-list";
import { cn } from "@/lib/utils/cn";
import { useJoinRoom } from "@/queries/room";

import JoinRoomModal from "./join-room-modal";

interface RoomCardTypes {
	room: RoomType;
}

const RoomCard = ({ room }: RoomCardTypes) => {
	const navigate = useNavigate();

	const [isJoinRoomModalOpen, setJoinRoomModalOpen] = useState(false);

	const roomId = room.id;
	const roomTitle = room.title;
	const roomCategory = CATEGORY_LIST[room.category]?.label;
	const roomLanguage = LANGUAGE_LIST[room.language]?.label;
	const isRoomAvailable = room.isAvailable;
	const isRoomCameraRequired = room.isCameraRequired || false;
	const isRoomMicRequired = room.isMicRequired || false;

	const { mutate: joinRoom } = useJoinRoom({
		onSuccess: () => {
			navigate({ to: "/room/$id", params: { id: roomId } });
		},
		onError: () => {}
	});

	const handleOpenJoinRoomModal = () => {
		setJoinRoomModalOpen(true);
	};

	const handleSubmitAction = () => {
		joinRoom({ roomId });
	};

	return (
		<>
			<Card>
				<CardContent className="px-4">
					<div className="flex justify-between items-start mb-3">
						<Badge className="border-2 border-black font-black">
							<Hash className="mr-1 h-3 w-3" />
							{roomCategory}
						</Badge>
						<div className="flex items-center text-sm text-gray-600">
							<Globe className="mr-1 h-4 w-4" />
							{roomLanguage}
						</div>
					</div>

					<h3 className="text-xl font-black text-black mb-3 line-clamp-2 truncate">
						{roomTitle}
					</h3>

					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<div className="flex space-x-1">
								<Video className={cn("h-4 w-4", { "text-green-600": isRoomCameraRequired, "text-red-600": !isRoomCameraRequired })} />
								<Mic className={cn("h-4 w-4", { "text-green-600": isRoomMicRequired, "text-red-600": !isRoomMicRequired })} />
							</div>
						</div>

						<Button onClick={handleOpenJoinRoomModal} disabled={!isRoomAvailable}>SELECT</Button>
					</div>
				</CardContent>
			</Card>

			{ isJoinRoomModalOpen
				&& <JoinRoomModal isCameraAvailable={isRoomCameraRequired} isMicAvailable={isRoomMicRequired} isOpen={isJoinRoomModalOpen} setOpen={setJoinRoomModalOpen} submitAction={handleSubmitAction} />}
		</>
	);
};

export default RoomCard;
