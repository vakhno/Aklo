import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import type { Room } from "@/lib/types/room";

import CreateRoomModal from "@/components/compound/create-room-modal";
import RoomCard from "@/components/compound/room-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Combobox } from "@/components/ui/combobox";
import { CATEGORY_LIST } from "@/lib/constants/category-list";
import { LANGUAGE_LIST } from "@/lib/constants/language-list";
import { convertLanguagesToComboboxValues } from "@/lib/utils/convert-categories-to-combobox-values copy";
import { convertCategoriesToComboboxValues } from "@/lib/utils/convert-languages-to-combobox-values";

export const Route = createFileRoute("/")({
	component: Home
});

const filteredRooms: Room[] = [
	{
		id: "1",
		title: "Only mic",
		category: "general",
		language: "ukranian",
		maxGuestCount: 20,
		currentGuestCount: 15,
		isCameraRequired: false,
		isMicRequired: true,
		createdAt: new Date()
	},
	{
		id: "2",
		title: "Camera and mic",
		category: "programing",
		language: "english",
		maxGuestCount: 10,
		currentGuestCount: 8,
		isCameraRequired: true,
		isMicRequired: true,
		createdAt: new Date()
	},
	{
		id: "3",
		title: "Only camera",
		category: "gaming",
		language: "english",
		maxGuestCount: 15,
		currentGuestCount: 12,
		isCameraRequired: true,
		isMicRequired: false,
		createdAt: new Date()
	},
	{
		id: "4",
		title: "Gaming Night",
		category: "gaming",
		language: "english",
		maxGuestCount: 15,
		currentGuestCount: 12,
		isCameraRequired: false,
		isMicRequired: true,
		createdAt: new Date()
	},
	{
		id: "5",
		title: "Gaming Night",
		category: "gaming",
		language: "english",
		maxGuestCount: 15,
		currentGuestCount: 12,
		isCameraRequired: false,
		isMicRequired: true,
		createdAt: new Date()
	},
	{
		id: "6",
		title: "Gaming Night",
		category: "gaming",
		language: "english",
		maxGuestCount: 15,
		currentGuestCount: 12,
		isCameraRequired: false,
		isMicRequired: true,
		createdAt: new Date()
	},
	{
		id: "7",
		title: "Gaming Night",
		category: "gaming",
		language: "english",
		maxGuestCount: 15,
		currentGuestCount: 12,
		isCameraRequired: false,
		isMicRequired: true,
		createdAt: new Date()
	},
	{
		id: "8",
		title: "Gaming Night",
		category: "gaming",
		language: "english",
		maxGuestCount: 15,
		currentGuestCount: 12,
		isCameraRequired: false,
		isMicRequired: true,
		createdAt: new Date()
	},
	{
		id: "9",
		title: "Gaming Night",
		category: "gaming",
		language: "english",
		maxGuestCount: 15,
		currentGuestCount: 12,
		isCameraRequired: false,
		isMicRequired: true,
		createdAt: new Date()
	},
	{
		id: "10",
		title: "Gaming Night",
		category: "gaming",
		language: "english",
		maxGuestCount: 15,
		currentGuestCount: 12,
		isCameraRequired: false,
		isMicRequired: true,
		createdAt: new Date()
	},
	{
		id: "11",
		title: "Gaming Night",
		category: "gaming",
		language: "english",
		maxGuestCount: 15,
		currentGuestCount: 12,
		isCameraRequired: false,
		isMicRequired: true,
		createdAt: new Date()
	}
];

function Home() {
	const [isCreateRoomModalOpen, setCreateRoomModalOpen] = useState(false);
	const categoriesValues = convertCategoriesToComboboxValues(CATEGORY_LIST);
	const languagesValues = convertLanguagesToComboboxValues(LANGUAGE_LIST);

	const handleOpenCreateRoomModal = () => {
		setCreateRoomModalOpen(true);
	};

	return (
		<>
			<Card variant="secondary" className="mb-4">
				<CardHeader className="flex justify-between items-center">
					<CardTitle className="text-2xl font-black text-black">FILTERS</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="flex gap-4">
						<Combobox className="flex-1" values={categoriesValues} placeholder="Select category" label="Select category..." emptyText="No categories..." />
						<Combobox className="flex-1" values={languagesValues} placeholder="Select language" label="Select language..." emptyText="No languages..." />
					</div>
				</CardContent>
			</Card>
			<Card variant="ghost" className=" bg-white">
				<CardHeader className="flex justify-between items-center">
					<CardTitle className="text-2xl font-black text-black">AVAILABLE ROOMS</CardTitle>
					<div className="flex gap-4">
						<Button>RANDOMIZE</Button>
						<Button onClick={handleOpenCreateRoomModal}>
							CREATE
						</Button>
					</div>
				</CardHeader>
				<CardContent>
					{filteredRooms.length === 0
						? (
								<div className="text-center py-12">
									<div className="text-6xl mb-4">🤷‍♂️</div>
									<h3 className="text-2xl font-black text-black mb-2">NO ROOMS FOUND</h3>
									<p className="text-gray-700 text-lg">Try adjusting your filters or create a new room!</p>
								</div>
							)
						: (
								<div className="flex flex-col gap-6">
									{filteredRooms.map(room => (
										<RoomCard room={room} key={room.id} />
									))}
								</div>
							)}
				</CardContent>
			</Card>
			<CreateRoomModal isOpen={isCreateRoomModalOpen} setOpen={setCreateRoomModalOpen} />
		</>
	);
}
