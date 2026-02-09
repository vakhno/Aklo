import { LogOut, OctagonMinus, Pause, Play, Settings, StepForward } from "lucide-react";
import { useState } from "react";

import type { SettingsRoomSchemaType } from "@/lib/types/room";

import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarWrapper } from "@/components/compound/toolbar";
import { useTime } from "@/hooks/use-time";

import ApproveLeaveAlertDialog from "./approve-leave-alert-dialog";
import SettingsDialog from "./settings-dialog";

interface RoomToolsProps {
	isLoading: boolean;
	isFound: boolean;
	isMicRequired?: boolean;
	isCameraRequired?: boolean;
	selectedAudioDeviceId?: string | null;
	selectedVideoDeviceId?: string | null;
	onHandleMicToggle?: (value: boolean) => void;
	onHandleCameraToggle?: (value: boolean) => void;
	handleStartClick?: () => void;
	handlePauseClick?: () => void;
	handleStopClick?: () => void;
	onHandleSkipClick?: () => void;
	onHandleLeaveSubmitClick?: () => void;
	onHandleSettingsSubmitClick?: (value: SettingsRoomSchemaType) => void;
}

const Tools = ({ isLoading, isFound, isMicRequired, isCameraRequired, selectedAudioDeviceId, selectedVideoDeviceId, handleStartClick, handlePauseClick, handleStopClick, onHandleSkipClick, onHandleLeaveSubmitClick, onHandleSettingsSubmitClick }: RoomToolsProps) => {
	const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
	const [isLeaveAlertDialogOpen, setIsLeaveAlertDialogOpen] = useState(false);
	const time = useTime();
	const formattedTime = time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).slice(0, -3);

	const handleSettingsClick = () => {
		setIsSettingsDialogOpen(true);
	};

	const handleLeaveClick = () => {
		setIsLeaveAlertDialogOpen(true);
	};

	const handleSubmitLeaveClick = () => {
		onHandleLeaveSubmitClick?.();
	};

	const handleSubmitSettingsClick = (data: SettingsRoomSchemaType) => {
		onHandleSettingsSubmitClick?.(data);

		setIsSettingsDialogOpen(false);
	};

	return (
		<>
			<Toolbar>
				<ToolbarWrapper className="flex justify-between">
					<ToolbarGroup className="flex-1 justify-start">
						<span className="text-sm font-bold">
							{formattedTime}
						</span>
					</ToolbarGroup>
					<ToolbarGroup className="flex-1">
						{!isLoading && !isFound
							? <ToolbarButton onClick={handleStartClick}><Play /></ToolbarButton>
							: isLoading && !isFound
								? <ToolbarButton onClick={handlePauseClick} variant="destructive"><Pause /></ToolbarButton>
								: <ToolbarButton onClick={handleStopClick} variant="destructive"><OctagonMinus /></ToolbarButton>}
						<ToolbarButton onClick={onHandleSkipClick} variant="destructive" disabled={!isFound}><StepForward /></ToolbarButton>
						<ToolbarButton onClick={handleLeaveClick} variant="destructive"><LogOut /></ToolbarButton>
					</ToolbarGroup>
					<ToolbarGroup className="flex-1 justify-end">
						<ToolbarButton onClick={handleSettingsClick}><Settings /></ToolbarButton>
					</ToolbarGroup>
				</ToolbarWrapper>
			</Toolbar>

			<SettingsDialog isOpen={isSettingsDialogOpen} setIsOpen={setIsSettingsDialogOpen} onHandleSubmitClick={handleSubmitSettingsClick} isMicRequired={isMicRequired} isCameraRequired={isCameraRequired} selectedAudioDeviceId={selectedAudioDeviceId} selectedVideoDeviceId={selectedVideoDeviceId} />
			<ApproveLeaveAlertDialog isOpen={isLeaveAlertDialogOpen} setIsOpen={setIsLeaveAlertDialogOpen} onHandleSubmitClick={handleSubmitLeaveClick} />
		</>
	);
};

export default Tools;
