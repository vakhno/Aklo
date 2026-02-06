import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import LogoSpinner from "@/assets/icon/logo-spinner.svg?react";
import { useGetRoulette } from "@/queries/roulette";

import ErrorAlertDialog from "./error-alert-dialog";
import JoinAlertDialog from "./join-alert-dialog";
import Streams from "./streams";

interface RoulettePeersProps {
	rouletteId: string;
	className?: string;
}

function Participants({ rouletteId }: RoulettePeersProps) {
	const navigate = useNavigate();
	const { data: roulette, isPending: isPendingGetRoulette, isError: isErrorGetRoulette } = useGetRoulette({ id: rouletteId, options: { refetchOnWindowFocus: false, refetchOnReconnect: false, refetchOnMount: false, refetchInterval: false, staleTime: Infinity } });
	const [isJoinRouletteModalOpen, setJoinRouletteModalOpen] = useState(false);
	const [isJoined, setJoined] = useState(false);

	useEffect(() => {
		if (roulette && !isJoined) {
			setJoinRouletteModalOpen(true);
		}
	}, [roulette]);

	const onHandleJoinSubmitClick = async () => {
		setJoinRouletteModalOpen(false);
		setJoined(true);
	};

	const onHandleErrorSubmitClick = async () => {
		navigate({ to: "/rooms", hash: "roulettes" });
	};

	if (isErrorGetRoulette) {
		return <ErrorAlertDialog isOpen={true} setIsOpen={() => {}} onHandleSubmitClick={onHandleErrorSubmitClick} />;
	}

	if (isPendingGetRoulette) {
		return (
			<div className="w-full h-full flex items-center justify-center">
				<LogoSpinner className="size-10" />
			</div>
		);
	}

	if (!isJoined) {
		return <JoinAlertDialog roulette={roulette} isOpen={isJoinRouletteModalOpen} setIsOpen={setJoinRouletteModalOpen} onHandleSubmitClick={onHandleJoinSubmitClick} />;
	}

	return (
		<Streams roulette={roulette} />
	);
}

export default Participants;
