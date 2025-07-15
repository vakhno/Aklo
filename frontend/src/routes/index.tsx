import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import type { FilterRoomType, NewRoomType } from "@/lib/types/room";

import CreateRoomModal from "@/components/compound/create-room-modal";
import RoomCard from "@/components/compound/room-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { ROOMS_LIMIT } from "@/lib/constants/room";
import { convertListToComboboxValues } from "@/lib/utils/convert-list-to-combobox-values";
import { FilterRoomSchema } from "@/lib/zod-schemas/filter-room.schema";
import { useUsedCategories, useUsedLanguages } from "@/queries/list";
import { useCreateRoom, useGetRooms } from "@/queries/room";

export const Route = createFileRoute("/")({
	component: Home
});

function Home() {
	const navigate = useNavigate();

	const { mutate: handleCreateRoom } = useCreateRoom({
		onSuccess: (room) => {
			const { id } = room;

			navigate({ to: "/room/$id", params: { id } });
		},
		onError: () => {}
	});
	const [isCreateRoomModalOpen, setCreateRoomModalOpen] = useState(false);
	const filterForm = useForm<FilterRoomType>({
		resolver: zodResolver(FilterRoomSchema),
		defaultValues: {
			language: "",
			category: ""
		}
	});
	const { data: usedCategories, isLoading: isUsedCategoriesLoading } = useUsedCategories();
	const { data: usedLanguages, isLoading: isUsedLanguagesLoading } = useUsedLanguages();

	const { control, formState: { isDirty }, reset, getValues } = filterForm;
	const { isPending, fetchNextPage, refetch, data: fetchedRooms, hasNextPage, isFetchingNextPage } = useGetRooms({ limit: ROOMS_LIMIT, language: getValues("language"), category: getValues("category") });
	const rooms = fetchedRooms?.pages.flatMap(page => page?.rooms || []) || [];
	const filterFormValues = getValues();

	const handleOpenCreateRoomModalClick = () => {
		setCreateRoomModalOpen(true);
	};

	const handleCreateRoomSubmit = async (room: NewRoomType) => {
		await handleCreateRoom({ newRoomData: room });
	};

	const handleNewPageUpload = () => {
		fetchNextPage();
	};

	useEffect(() => {
		if (isDirty) {
			refetch();
			reset(filterFormValues);
		}
	}, [isDirty]);

	return (
		<>
			<Card variant="secondary" className="mb-4">
				<CardHeader className="flex justify-between items-center">
					<CardTitle className="text-2xl font-black text-black">FILTERS</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...filterForm}>
						<form className="flex-col flex gap-4 md:flex-row">
							<FormField
								control={control}
								name="category"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormControl>
											<Combobox disabled={isUsedCategoriesLoading} values={[{ value: "", label: "All categories" }, ...convertListToComboboxValues(usedCategories)]} placeholder="Select category" label="Select category..." emptyText="No categories..." value={field.value} onChange={field.onChange} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={control}
								name="language"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormControl>
											<Combobox disabled={isUsedLanguagesLoading} values={[{ value: "", label: "All languages" }, ...convertListToComboboxValues(usedLanguages)]} placeholder="Select language" label="Select language..." emptyText="No languages..." value={field.value} onChange={field.onChange} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</form>
					</Form>
				</CardContent>
			</Card>
			<Card variant="ghost" className=" bg-white">
				<CardHeader className="flex justify-between items-center">
					<CardTitle className="text-2xl font-black text-black">AVAILABLE ROOMS</CardTitle>
					<Button onClick={handleOpenCreateRoomModalClick}>
						CREATE
					</Button>
				</CardHeader>

				<CardContent className="flex flex-col">
					{isPending
						? (
								<div className="flex flex-col gap-6">
									{Array.from({ length: ROOMS_LIMIT }, (_, index) => (
										<Skeleton className="h-[162px] rounded-xl" key={index} />
									))}
								</div>

							)
						: (
								<>
									{rooms.length === 0
										? (
												<div className="text-center py-12">
													<h3 className="text-2xl font-black text-black mb-2">NO ROOMS FOUND</h3>
													<p className="text-gray-700 text-lg">Try adjusting your filters or create a new room!</p>
												</div>
											)
										: (
												<div className="flex flex-col gap-6">
													{rooms.map(room => (
														<RoomCard room={room} key={room.id} />
													))}
													{hasNextPage
														? (
																<>
																	{isFetchingNextPage
																		? (
																				<div className="flex flex-col gap-6">
																					{Array.from({ length: ROOMS_LIMIT }, (_, index) => (
																						<Skeleton className="h-[162px] rounded-xl" key={`next-${index}`} />
																					))}
																				</div>
																			)
																		: (
																				<Button className="m-auto" onClick={handleNewPageUpload}>
																					Load more
																				</Button>
																			)}
																</>
															)
														: null}
												</div>
											)}
								</>
							)}
				</CardContent>
			</Card>
			<CreateRoomModal isOpen={isCreateRoomModalOpen} setOpen={setCreateRoomModalOpen} submitAction={handleCreateRoomSubmit} />
		</>
	);
}
