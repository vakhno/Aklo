import { ArrowRight, Mic, Users, Video } from "lucide-react";

import type { RouletteType } from "@/lib/types/roulette";

import { Button } from "@/components/ui/button";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemTitle
} from "@/components/ui/item";
import { LANGUAGE_LIST } from "@/lib/constants/language-list";
import { cn } from "@/lib/utils/cn";

interface RouletteCardTypes {
	roulette: RouletteType;
	handleSelectRoulette?: (roulette: RouletteType) => void;
}

const RouletteCard = ({ roulette, handleSelectRoulette }: RouletteCardTypes) => {
	const { language, currentUserCount, isCameraRequired, isMicRequired } = roulette;
	const languageLabel = LANGUAGE_LIST[language]?.label;

	const handleOpenJoinRoomModal = () => {
		if (handleSelectRoulette) {
			handleSelectRoulette(roulette);
		}
	};

	return (
		<Item variant="outline">
			<ItemContent className="space-y-3">
				<div className="space-y-2">
					<ItemTitle className="line-clamp-2 wrap-anywhere">
						{languageLabel}
					</ItemTitle>
				</div>
				<div className="flex items-center justify-between pt-2">
					<div className="flex items-center gap-4">
						<Video className={cn("h-4 w-4", { "text-green-600": isCameraRequired, "text-red-600": !isCameraRequired })} />
						<Mic className={cn("h-4 w-4", { "text-green-600": isMicRequired, "text-red-600": !isMicRequired })} />
						<div className="flex items-center gap-1.5">
							<Users className="h-4 w-4 text-primary" />
							<span className="text-sm font-medium text-foreground">
								{currentUserCount}
							</span>
						</div>
					</div>
				</div>
			</ItemContent>
			<ItemActions>
				<Button size="icon" onClick={handleOpenJoinRoomModal}>
					<ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
				</Button>
			</ItemActions>
		</Item>
	);
};

export default RouletteCard;
