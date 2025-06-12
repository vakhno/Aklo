import { useNavigate } from "@tanstack/react-router";
import { Globe, Hash, Mic, Users, Video } from "lucide-react";
import { useState } from "react";

import type { Room as RoomInterface } from "@/lib/types/room";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";
import { getCategoryByKey } from "@/lib/utils/get-category-by-key";
import { getLanguageByKey } from "@/lib/utils/get-language-by-key";

import JoinRoomModal from "./join-room-modal";

interface RoomCardTypes {
	room: RoomInterface;
}

const RoomCard = ({ room }: RoomCardTypes) => {
	const navigate = useNavigate();

	const [isJoinRoomModalOpen, setJoinRoomModalOpen] = useState(false);

	const roomCategory = getCategoryByKey(room.category)?.name || "";
	const roomLanguage = getLanguageByKey(room.language)?.name || "";
	const roomMaxGuestCount = room.maxGuestCount || 0;
	const roomCurrentGuestCount = room.currentGuestCount || 0;
	const isRoomCameraRequired = room.isCameraRequired || false;
	const isRoomMicRequired = room.isMicRequired || false;

	const handleOpenJoinRoomModal = () => {
		setJoinRoomModalOpen(true);
	};

	const handleSubmitAction = () => {
		navigate({ to: "/room/$id", params: { id: room.id } });
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

					<h3 className="text-xl font-black text-black mb-3 line-clamp-2">
						{room.title}
					</h3>

					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<div className="flex items-center text-gray-700">
								<Users className="mr-1 h-4 w-4" />
								<span className="font-bold">
									{roomCurrentGuestCount}
									/
									{roomMaxGuestCount}
								</span>
							</div>
							<div className="flex space-x-1">
								<Video className={cn("h-4 w-4", { "text-green-600": isRoomCameraRequired, "text-red-600": !isRoomCameraRequired })} />
								<Mic className={cn("h-4 w-4", { "text-green-600": isRoomMicRequired, "text-red-600": !isRoomMicRequired })} />
							</div>
						</div>

						<Button onClick={handleOpenJoinRoomModal} disabled={roomCurrentGuestCount >= roomMaxGuestCount}>SELECT</Button>
					</div>
				</CardContent>
			</Card>

			{ isJoinRoomModalOpen
				&& <JoinRoomModal isCameraAvailable={isRoomCameraRequired} isMicAvailable={isRoomMicRequired} isOpen={isJoinRoomModalOpen} setOpen={setJoinRoomModalOpen} submitAction={handleSubmitAction} />}
		</>
	);
};

export default RoomCard;
