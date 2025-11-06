import { ArrowRight, Globe, Hash, Mic, Users, Video } from "lucide-react";

import type { RoomType } from "@/lib/types/room";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemTitle
} from "@/components/ui/item";
import { CATEGORY_LIST } from "@/lib/constants/category-list";
import { LANGUAGE_LIST } from "@/lib/constants/language-list";
import { cn } from "@/lib/utils/cn";

interface RoomCardTypes {
	room: RoomType;
	isOwn?: boolean;
	handleRoomSelect: (room: RoomType) => void;
}

const RoomCard = ({ room, handleRoomSelect }: RoomCardTypes) => {
	const { title, category, language, isAvailable, isCameraRequired, isMicRequired, currentGuestCount, maxGuestCount } = room;
	const categoryLabel = CATEGORY_LIST[category]?.label;
	const languageLabel = LANGUAGE_LIST[language]?.label;

	const handleOpenClick = () => {
		handleRoomSelect(room);
	};

	return (
		<Item variant="outline">
			<ItemContent className="space-y-3">
				<div className="space-y-2">
					<div className="flex flex-wrap items-center gap-2">
						<Badge variant="secondary" className="flex gap-1">
							<Hash className="mr-1 h-3 w-3" />
							{categoryLabel}
						</Badge>
						<Badge variant="secondary" className="flex gap-1">
							<Globe className="mr-1 h-3 w-3" />
							{languageLabel}
						</Badge>
					</div>
					<ItemTitle className="line-clamp-2 wrap-anywhere">
						{title}
					</ItemTitle>
				</div>
				<div className="flex items-center justify-between pt-2">
					<div className="flex items-center gap-4">
						<Video className={cn("h-4 w-4", { "text-green-600": isCameraRequired, "text-red-600": !isCameraRequired })} />
						<Mic className={cn("h-4 w-4", { "text-green-600": isMicRequired, "text-red-600": !isMicRequired })} />
						<div className="flex items-center gap-1.5">
							<Users className="h-4 w-4 text-primary" />
							<span className="text-sm font-medium text-foreground">
								{currentGuestCount}
								/
								{maxGuestCount}
							</span>
						</div>
					</div>
				</div>
			</ItemContent>
			<ItemActions>
				<Button size="icon" onClick={handleOpenClick} disabled={!isAvailable}>
					<ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
				</Button>
			</ItemActions>
		</Item>
	);
};

export default RoomCard;
