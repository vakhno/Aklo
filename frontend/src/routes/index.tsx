import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import type { FilterRoomSchemaType, NewRoomSchemaType } from "@/lib/types/room";

import CreateRoomModal from "@/components/compound/create-room-modal";
import RoomCardList from "@/components/compound/room-card-list";
import RoomFilters from "@/components/compound/room-filters";
import RouletteCardList from "@/components/compound/roulette-card-list";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROOMS_LIMIT } from "@/lib/constants/room";
import { useUsedCategories, useUsedLanguages } from "@/queries/list";
import { useCreateRoom, useGetIdListOfOwnRooms, useGetRooms } from "@/queries/room";

export const Route = createFileRoute("/")({
	component: Home
});

function Home() {
	const navigate = useNavigate();
	const { mutateAsync: getOwnIds } = useGetIdListOfOwnRooms({});
	const { mutate: handleCreateRoom } = useCreateRoom({
		options: {
			onSuccess: (room) => {
				const { id } = room;

				navigate({ to: "/room/$id", params: { id } });
			}
		}
	});
	const [isCreateRoomModalOpen, setCreateRoomModalOpen] = useState(false);
	const [filters, setFilters] = useState<FilterRoomSchemaType>({
		language: "",
		category: ""
	});
	const { data: usedCategories, isLoading: isUsedCategoriesLoading } = useUsedCategories();
	const { data: usedLanguages, isLoading: isUsedLanguagesLoading } = useUsedLanguages();
	const { isPending: isPendingRooms, fetchNextPage, refetch, data: fetchedRooms, hasNextPage, isFetchingNextPage } = useGetRooms({ limit: ROOMS_LIMIT, language: filters.language, category: filters.category });
	const rooms = fetchedRooms?.pages.flatMap(page => page?.rooms || []) || [];
	const [ownIds, setOwnIds] = useState<string[]>([]);

	const handleOpenCreateRoomModalClick = () => {
		setCreateRoomModalOpen(true);
	};

	const handleCreateRoomSubmit = async (room: NewRoomSchemaType) => {
		await handleCreateRoom({ newRoomData: room });
	};

	const handleNewPageUpload = () => {
		fetchNextPage();
	};

	const onHandleChange = (data: FilterRoomSchemaType) => {
		setFilters(data);
		refetch();
	};

	useEffect(() => {
		(async () => {
			const ids = await getOwnIds();

			setOwnIds(ids);
		})();
	}, []);

	return (
		<>
			<Card variant="ghost" className="bg-white h-1/2 min-h-[300px]">
				<CardHeader className="flex justify-between items-center">
					<CardTitle className="text-2xl font-black text-black">CHAT ROULETTES</CardTitle>
				</CardHeader>
				<CardContent className="overflow-auto">
					<RouletteCardList ROULETTE_LIMIT={ROOMS_LIMIT} />
				</CardContent>
			</Card>
			<Card variant="ghost" className=" bg-white h-1/2 min-h-[500px]">
				<CardHeader className="flex flex-col w-full">
					<div className="w-full flex justify-between items-center">
						<CardTitle className="text-2xl font-black text-black">AVAILABLE ROOMS</CardTitle>
						<Button onClick={handleOpenCreateRoomModalClick}>CREATE</Button>
					</div>
					<RoomFilters className="w-full" categoriesList={usedCategories} isCategoriesDisabled={isUsedCategoriesLoading} languagesList={usedLanguages} isLanguagesDisabled={isUsedLanguagesLoading} onHandleChange={onHandleChange} />
				</CardHeader>
				<CardContent className="overflow-auto">
					<RoomCardList isFetchingNextPage={isFetchingNextPage} hasNextPage={hasNextPage} handleNewPageUpload={handleNewPageUpload} isPending={isPendingRooms} rooms={rooms} ROOMS_LIMIT={ROOMS_LIMIT} ownIds={ownIds} />
				</CardContent>
			</Card>
			<CreateRoomModal isOpen={isCreateRoomModalOpen} setOpen={setCreateRoomModalOpen} submitAction={handleCreateRoomSubmit} />
		</>
	);
}
