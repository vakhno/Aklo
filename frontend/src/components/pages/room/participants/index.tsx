import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import LogoSpinner from "@/assets/icon/logo-spinner.svg?react";
import Streams from "@/components/pages/room/participants/streams";
import { useCheckIsCreator, useGetRoom, useIsAvailableToVisit } from "@/queries/room";

import ErrorAlertDialog from "./error-alert-dialog";
import JoinAlertDialog from "./join-alert-dialog";

interface ParticipantsProps {
	roomId: string;
	className?: string;
}

function Participants({ roomId }: ParticipantsProps) {
	const navigate = useNavigate();
	const { data: room, isPending: isPendingGetRoom, isError: isErrorGetRoom, isRefetching: isRefetchingGetRoom, isRefetchError: isRefetchErrorGetRoom, refetch: refetchGetRoom } = useGetRoom({ id: roomId, options: { refetchOnWindowFocus: false, refetchOnReconnect: false, refetchOnMount: false, refetchInterval: false, staleTime: Infinity } });
	const { data: isAvailableToVisit, isPending: isPendingIsAvailableToVisit, isError: isErrorIsAvailableToVisit } = useIsAvailableToVisit({ id: roomId, options: { refetchOnWindowFocus: false, refetchOnReconnect: false, refetchOnMount: false, refetchInterval: false, staleTime: Infinity, enabled: !!room } });
	const { data: isCreator, isPending: isPendingCheckIsCreator, isError: isErrorCheckIsCreator } = useCheckIsCreator({ id: roomId, options: { refetchOnWindowFocus: false, refetchOnReconnect: false, refetchOnMount: false, refetchInterval: false, staleTime: Infinity, enabled: !!room } });
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

	const onHandleErrorSubmitClick = async () => {
		navigate({ to: "/rooms", hash: "topics" });
	};

	if (isErrorGetRoom || isRefetchErrorGetRoom) {
		return <ErrorAlertDialog isOpen={true} setIsOpen={() => {}} onHandleSubmitClick={onHandleErrorSubmitClick} />;
	}

	if (isPendingGetRoom || isRefetchingGetRoom || isPendingCheckIsCreator || isPendingIsAvailableToVisit) {
		return (
			<div className="w-full h-full flex items-center justify-center">
				<LogoSpinner className="size-10" />
			</div>
		);
	}

	if (!isJoined) {
		return <JoinAlertDialog room={room} isOpen={isJoinRoomModalOpen} setIsOpen={setJoinRoomModalOpen} onHandleSubmitClick={onHandleJoinSubmitClick} />;
	}

	return (
		<Streams
			room={room}
			isCreator={isCreator}
			isAvailableToVisit={isAvailableToVisit}
			isErrorCheckIsCreator={isErrorCheckIsCreator}
			isErrorIsAvailableToVisit={isErrorIsAvailableToVisit}
		/>
	);
}
export default Participants;
