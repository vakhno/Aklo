import type { FilterRoomSchemaType } from "@shared/schemas/filter-room";

import { useGetRoomsLanguages } from "@shared/queries";

import RoomFiltersForm from "@/components/forms/room-filters-form";

interface RoomFiltersTypes {
	className?: string;
	onHandleChange?: (data: FilterRoomSchemaType) => void;
	onHandleSubmit?: (data: FilterRoomSchemaType) => void;
}

const RoomFilters = ({ className, onHandleChange }: RoomFiltersTypes) => {
	const { data, isLoading, isError, isSuccess } = useGetRoomsLanguages({
		apiBaseUrl: import.meta.env.VITE_API_URL
	});
	const languageList = isSuccess ? data : [];
	const isDisabled = isLoading || isError;

	return (
		<RoomFiltersForm className={className} languageList={languageList} isDisabled={isDisabled} onHandleChange={onHandleChange} />
	);
};

export default RoomFilters;
