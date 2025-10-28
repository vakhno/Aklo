import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useId, useState } from "react";

import type { FilterRoomSchemaType, NewRoomSchemaType } from "@/lib/types/room";
import type { FilterRouletteSchemaType } from "@/lib/types/roulette";

import CreateRoomForm from "@/components/compound/create-room-form";
import DialogModal from "@/components/compound/dialog-modal";
import RoomCardList from "@/components/compound/room-card-list";
import RoomFilters from "@/components/compound/room-filters";
import RouletteCardList from "@/components/compound/roulette-card-list";
import RouletteFilters from "@/components/compound/roulette-filters";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ROOMS_LIMIT } from "@/lib/constants/room";
import { useExistLanguages, useUsedCategories, useUsedLanguages } from "@/queries/list";
import { useCreateRoom, useGetIdListOfOwnRooms, useGetRooms } from "@/queries/room";
import { useGetRoulettes } from "@/queries/roulette";

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
	const [roomFilters, setRoomFilters] = useState<FilterRoomSchemaType>({
		language: "",
		category: ""
	});
	const [rouletteFilters, setRouletteFilters] = useState<FilterRouletteSchemaType>({
		language: ""
	});
	const { data: usedCategories, isLoading: isUsedCategoriesLoading } = useUsedCategories();
	const { data: usedLanguages, isLoading: isUsedLanguagesLoading } = useUsedLanguages();
	const { data: existLanguages, isLoading: isExistLanguagesLoading } = useExistLanguages();
	const { isPending: isPendingRooms, fetchNextPage: fetchNextRoomsPage, refetch: roomsRefetch, data: fetchedRooms, hasNextPage: hasNextRoomsPage, isFetchingNextPage: isFetchingNextRoomsPage } = useGetRooms({ limit: ROOMS_LIMIT, language: roomFilters.language, category: roomFilters.category });
	const { isPending: isPendingRoulettes, fetchNextPage: fetchNextRoulettesPage, refetch: roulettesRefetch, data: fetchedRoulettes, hasNextPage: hasNextRoulettesPage, isFetchingNextPage: isFetchingNextRoulettesPage } = useGetRoulettes({ limit: ROOMS_LIMIT, language: rouletteFilters.language });
	const rooms = fetchedRooms?.pages.flatMap(page => page?.rooms || []) || [];
	const roulettes = fetchedRoulettes?.pages.flatMap(page => page?.roulettes || []) || [];
	const [ownIds, setOwnIds] = useState<string[]>([]);
	const createRoomFormId = useId();

	const handleOpenCreateRoomModalClick = () => {
		setCreateRoomModalOpen(true);
	};

	const handleCreateRoomSubmit = async (room: NewRoomSchemaType) => {
		await handleCreateRoom({ newRoomData: room });
	};

	const handleNewRoomsPageUpload = () => {
		fetchNextRoomsPage();
	};

	const handleNewRoulettesPageUpload = () => {
		fetchNextRoulettesPage();
	};

	const onHandleRoomFiltersChange = (data: FilterRoomSchemaType) => {
		setRoomFilters(data);
		roomsRefetch();
	};

	const onHandleRouletteFiltersChange = (data: FilterRouletteSchemaType) => {
		setRouletteFilters(data);
		roulettesRefetch();
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
				<CardHeader className="flex flex-col">
					<CardTitle className="text-2xl font-black text-black">CHAT ROULETTES</CardTitle>
					<RouletteFilters className="w-full" languagesList={existLanguages} isLanguagesDisabled={isExistLanguagesLoading} onHandleChange={onHandleRouletteFiltersChange} />
				</CardHeader>
				<CardContent className="overflow-auto">
					<RouletteCardList isFetchingNextPage={isFetchingNextRoulettesPage} hasNextPage={hasNextRoulettesPage} handleNewPageUpload={handleNewRoulettesPageUpload} isPending={isPendingRoulettes} roulettes={roulettes} ROULETTE_LIMIT={ROOMS_LIMIT} />
				</CardContent>
			</Card>
			<Card variant="ghost" className=" bg-white h-1/2 min-h-[500px]">
				<CardHeader className="flex flex-col w-full">
					<div className="w-full flex justify-between items-center">
						<CardTitle className="text-2xl font-black text-black">AVAILABLE ROOMS</CardTitle>
						<Button onClick={handleOpenCreateRoomModalClick}>CREATE</Button>
					</div>
					<RoomFilters className="w-full" categoriesList={usedCategories} isCategoriesDisabled={isUsedCategoriesLoading} languagesList={usedLanguages} isLanguagesDisabled={isUsedLanguagesLoading} onHandleChange={onHandleRoomFiltersChange} />
				</CardHeader>
				<CardContent className="overflow-auto">
					<RoomCardList isFetchingNextPage={isFetchingNextRoomsPage} hasNextPage={hasNextRoomsPage} handleNewPageUpload={handleNewRoomsPageUpload} isPending={isPendingRooms} rooms={rooms} ROOMS_LIMIT={ROOMS_LIMIT} ownIds={ownIds} />
				</CardContent>
			</Card>
			<DialogModal isOpen={isCreateRoomModalOpen} setOpen={setCreateRoomModalOpen} title="Create New Room" description="Fill out the form to create your new conversation room." submitTitle="Submit" cancelTitle="Cancel" isCancelVisible formId={createRoomFormId}>
				<CreateRoomForm formId={createRoomFormId} onHandleSubmit={handleCreateRoomSubmit} />
			</DialogModal>
		</>
	);
}
