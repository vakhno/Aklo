import { ArrowUpRight, Mic, Users, Video } from "lucide-react";

import type { RouletteType } from "@/lib/types/roulette";

import { Button } from "@/components/ui/button";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemTitle
} from "@/components/ui/item";
import { cn } from "@/lib/utils/cn";

interface RouletteCardTypes {
	roulette: RouletteType;
	handleSelectRoulette?: (roulette: RouletteType) => void;
}

const RouletteCard = ({ roulette, handleSelectRoulette }: RouletteCardTypes) => {
	const { language, activeUsersCount, isCameraRequired, isMicRequired } = roulette;
	const { name, nativeName } = language;

	const handleOpenJoinRoomModal = () => {
		if (handleSelectRoulette) {
			handleSelectRoulette(roulette);
		}
	};

	return (
		<Item variant="muted">
			<ItemContent className="space-y-3">
				<div className="space-y-2">
					<ItemTitle className="line-clamp-2 wrap-anywhere">
						<div className="flex flex-col gap-1">
							<span>{name}</span>
							<span className="text-xs">
								{nativeName}
							</span>
						</div>
					</ItemTitle>
				</div>
				<div className="flex items-center justify-between pt-2">
					<div className="flex items-center gap-4">
						<Video className={cn("h-4 w-4", { "text-green-600": isCameraRequired, "text-red-600": !isCameraRequired })} />
						<Mic className={cn("h-4 w-4", { "text-green-600": isMicRequired, "text-red-600": !isMicRequired })} />
						<div className="flex items-center gap-1.5">
							<Users className="h-4 w-4 text-primary" />
							<span className="text-sm font-medium text-foreground">
								{activeUsersCount}
							</span>
						</div>
					</div>
				</div>
			</ItemContent>
			<ItemActions>
				<Button size="icon" onClick={handleOpenJoinRoomModal}>
					<ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
				</Button>
			</ItemActions>
		</Item>
	);
};

export default RouletteCard;
