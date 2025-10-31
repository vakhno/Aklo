import { useState } from "react";

import type { FilterRoomSchemaType } from "@/lib/types/room";

import { Card } from "@/components/ui/card";

import RoomsCardContent from "./rooms-card-content";
import RoomsCardHeader from "./rooms-card-header";

const RoomsCard = () => {
	const [roomFilters, setRoomFilters] = useState<FilterRoomSchemaType>({
		language: "",
		category: ""
	});

	const onHandleFilterChange = (data: FilterRoomSchemaType) => {
		setRoomFilters(data);
	};

	return (
		<Card variant="ghost" className="h-[70vh]">
			<RoomsCardHeader onHandleFilterChange={onHandleFilterChange} />
			<RoomsCardContent roomFilters={roomFilters} />
		</Card>
	);
};

export default RoomsCard;
