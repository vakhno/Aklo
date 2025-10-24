import { Globe, Hash, Mic, Video } from "lucide-react";

import type { RoomType } from "@/lib/types/room";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CATEGORY_LIST } from "@/lib/constants/category-list";
import { LANGUAGE_LIST } from "@/lib/constants/language-list";
import { cn } from "@/lib/utils/cn";

interface RoomCardTypes {
	room: RoomType;
	isOwn?: boolean;
	handleRoomSelect: (room: RoomType) => void;
}

const RoomCard = ({ room, handleRoomSelect }: RoomCardTypes) => {
	const { title, category, language, isAvailable, isCameraRequired, isMicRequired } = room;
	const categoryLabel = CATEGORY_LIST[category]?.label;
	const languageLabel = LANGUAGE_LIST[language]?.label;

	const handleOpenClick = () => {
		handleRoomSelect(room);
	};

	return (
		<>
			<Card>
				<CardContent className="px-4">
					<div className="flex justify-between items-start mb-3">
						<Badge className="border-2 border-black font-black">
							<Hash className="mr-1 h-3 w-3" />
							{categoryLabel}
						</Badge>
						<div className="flex items-center text-sm text-gray-600">
							<Globe className="mr-1 h-4 w-4" />
							{languageLabel}
						</div>
					</div>

					<h3 className="text-xl font-black text-black mb-3 line-clamp-2 truncate">
						{title}
					</h3>

					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<div className="flex space-x-1">
								<Video className={cn("h-4 w-4", { "text-green-600": isCameraRequired, "text-red-600": !isCameraRequired })} />
								<Mic className={cn("h-4 w-4", { "text-green-600": isMicRequired, "text-red-600": !isMicRequired })} />
							</div>
						</div>

						<Button onClick={handleOpenClick} disabled={!isAvailable}>SELECT</Button>
					</div>
				</CardContent>
			</Card>
		</>
	);
};

export default RoomCard;
