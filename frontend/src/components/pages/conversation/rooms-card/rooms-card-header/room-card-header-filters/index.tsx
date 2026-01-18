import type { FilterRoomSchemaType } from "@/lib/types/room";

import RoomFiltersForm from "@/components/forms/room-filters-form";
import { useGetRoomsLanguages } from "@/queries/room";

interface RoomFiltersTypes {
	className?: string;
	onHandleChange?: (data: FilterRoomSchemaType) => void;
	onHandleSubmit?: (data: FilterRoomSchemaType) => void;
}

const RoomFilters = ({ className, onHandleChange }: RoomFiltersTypes) => {
	const { data, isLoading, isError, isSuccess } = useGetRoomsLanguages();
	const languageList = isSuccess ? data : [];
	const isDisabled = isLoading || isError;

	return (
		<RoomFiltersForm className={className} languageList={languageList} isDisabled={isDisabled} onHandleChange={onHandleChange} />
	);
};

export default RoomFilters;
