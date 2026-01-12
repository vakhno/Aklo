import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

import Streams from "@/components/pages/room/participants/streams";
import { useGetRoom } from "@/queries/room";

import JoinAlertDialog from "./join-alert-dialog";

interface ParticipantsProps {
	roomId: string;
	className?: string;
}

function Participants({ roomId }: ParticipantsProps) {
	const { data: room, isPending: isPendingGetRoom, isError: isErrorGetRoom, isRefetching: isRefetchingGetRoom, isRefetchError: isRefetchErrorGetRoom, refetch: refetchGetRoom } = useGetRoom({ id: roomId, options: { refetchOnWindowFocus: false, refetchOnReconnect: false, refetchOnMount: false, refetchInterval: false, staleTime: Infinity } });
	const [isJoined, setJoined] = useState(false);
	const [isJoinRoomModalOpen, setJoinRoomModalOpen] = useState(false);

	useEffect(() => {
		if (room && !isJoined) {
			setJoinRoomModalOpen(true);
		}
	}, [room]);

	const onHandleJoinSubmitClick = async () => {
		setJoinRoomModalOpen(false);
		setJoined(true);

		await refetchGetRoom();
	};

	if (isPendingGetRoom || isRefetchingGetRoom) {
		return (
			<div className="w-full h-full flex items-center justify-center">
				<Loader className="w-6 h-6 text-red animate-spin" />
			</div>
		);
	}

	if (isErrorGetRoom || isRefetchErrorGetRoom) {
		return (
			<div className="w-full h-full flex items-center justify-center">
				Error
			</div>
		);
	}

	if (!isJoined) {
		return <JoinAlertDialog room={room} isOpen={isJoinRoomModalOpen} setIsOpen={setJoinRoomModalOpen} onHandleSubmitClick={onHandleJoinSubmitClick} />;
	}

	return (
		<Streams room={room} />
	);
}
export default Participants;
