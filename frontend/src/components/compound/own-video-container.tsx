import { useNavigate } from "@tanstack/react-router";
import { LogOut, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import Video from "@/components/ui/video";
import { cn } from "@/lib/utils/cn";
import { useDeleteRoom } from "@/queries/room";

import { AlertDialogComponent } from "./alert-dialog";

interface VideoContainerProps {
	className?: string;
	stream: MediaStream | null;
	roomId: string;
	isCreator?: boolean;
}

const OwnerVideoContainer = ({ className, stream, roomId, isCreator }: VideoContainerProps) => {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);
	const { mutate: deleteRoom } = useDeleteRoom({
		onSuccess: () => {
			navigate({ to: "/" });
		},
		onError: () => {}
	});
	const videoRef = useRef<HTMLVideoElement>(null);
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.srcObject = stream;
		}
	}, [stream]);

	const handleDeleteRoom = async () => {
		await deleteRoom({ roomId });
	};

	const handleDeleteRoomClick = async () => {
		setIsOpen(true);
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
				<Video
					className="aspect-square"
					stream={stream}
				/>
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
					</div>
				)}
			</div>
			<AlertDialogComponent
				isOpen={isOpen}
				onOpenChange={setIsOpen}
				title="Delete Room"
				description="Are you sure you want to delete this room? This action cannot be undone and all participants will be disconnected."
				actionText="Delete Room"
				onAction={handleDeleteRoom}
			/>
		</>
	);
};

export default OwnerVideoContainer;
