import { LogOut, Settings, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { JoinRoomSchemaType, RoomType } from "@/lib/types/room";

import Audio from "@/components/ui/audio-visualizer";
import { Button } from "@/components/ui/button";
import Video from "@/components/ui/video";
import { cn } from "@/lib/utils/cn";

import { AlertDialogComponent } from "./alert-dialog";
import SettingsModal from "./settings-modal";

interface VideoContainerProps {
	room: RoomType;
	className?: string;
	stream: MediaStream | null;
	isCreator?: boolean;
	handleDelete?: (value: RoomType) => Promise<void>;
	handleSettingsSubmit?: (value: JoinRoomSchemaType) => void;
}

const OwnerVideoContainer = ({ room, className, stream, isCreator, handleDelete, handleSettingsSubmit }: VideoContainerProps) => {
	const { isCameraRequired, isMicRequired } = room;
	const [isOpen, setIsOpen] = useState(false);
	const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);

	const videoRef = useRef<HTMLVideoElement>(null);
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.srcObject = stream;
		}
	}, [stream]);

	const handleDeleteRoom = async () => {
		handleDelete && await handleDelete(room);
	};

	const handleDeleteRoomClick = async () => {
		setIsOpen(true);
	};

	const handleOpenJoinRoomModal = () => {
		setSettingsModalOpen(true);
	};

	const submitSettings = (data: JoinRoomSchemaType) => {
		handleSettingsSubmit && handleSettingsSubmit(data);
	};

	return (
		<>
			<div
				className={cn(
					"w-full h-full max-w-max max-h-max relative top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] aspect-square",
					className
				)}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{ isCameraRequired
					? <Video stream={stream} className="aspect-square" />
					: <Audio stream={stream} className="aspect-square" />}
				{isHovered && (
					<div className="absolute bottom-4 right-4 flex items-center gap-2">
						{ isCreator
							? (
									<Button
										onClick={handleDeleteRoomClick}
										variant="destructive"
										aria-label="Kick user"
									>
										<Trash className="w-10 h-10" />
									</Button>
								)
							: (
									<Button
										variant="destructive"
										aria-label="Leave"
									>
										<LogOut className="w-10 h-10" />
									</Button>
								)}
						<Button variant="secondary" onClick={handleOpenJoinRoomModal}><Settings /></Button>

					</div>
				)}
			</div>
			{ isSettingsModalOpen
				&& <SettingsModal isCameraAvailable={isCameraRequired} isMicAvailable={isMicRequired} isOpen={isSettingsModalOpen} setOpen={setSettingsModalOpen} submitAction={submitSettings} />}
			<AlertDialogComponent
				isOpen={isOpen}
				onOpenChange={setIsOpen}
				title="Delete Room"
				description="Are you sure you want to delete this room? This action cannot be undone and all participants will be disconnected."
				actionText="Delete Room"
				isCancelVisible
				onAction={handleDeleteRoom}
			/>
		</>
	);
};

export default OwnerVideoContainer;
