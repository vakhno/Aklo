import { Mic, Users, Video } from "lucide-react";

import type { RouletteType } from "@/lib/types/roulette";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
		<>
			<Card>
				<CardContent className="px-4">
					<div className="flex justify-between items-start mb-3">
						<h3 className="text-xl font-black text-black mb-3 line-clamp-2 truncate">
							{languageLabel}
						</h3>

						<span className="flex items-center">
							<Users className="mr-1 h-4 w-4" />
							{currentUserCount}
						</span>
					</div>

					<div className="flex items-center justify-between">
						<div className="flex items-center space-x-4">
							<div className="flex space-x-1">
								<Video className={cn("h-4 w-4", { "text-green-600": isCameraRequired, "text-red-600": !isCameraRequired })} />
								<Mic className={cn("h-4 w-4", { "text-green-600": isMicRequired, "text-red-600": !isMicRequired })} />
							</div>
						</div>

						<Button onClick={handleOpenJoinRoomModal}>SELECT</Button>
					</div>
				</CardContent>
			</Card>
		</>
	);
};

export default RouletteCard;
