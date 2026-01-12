import { Mic, MicOff, OctagonMinus, Pause, Play, Settings, StepForward, Video, VideoOff } from "lucide-react";
import { useState } from "react";

import type { SettingsRoomSchemaType } from "@/lib/types/room";

import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarToggle, ToolbarWrapper } from "@/components/compound/toolbar";

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
	onHandleSettingsSubmitClick?: (value: SettingsRoomSchemaType) => void;
}

const Tools = ({ isLoading, isFound, isMicRequired, isCameraRequired, selectedAudioDeviceId, selectedVideoDeviceId, onHandleMicToggle, onHandleCameraToggle, handleStartClick, handlePauseClick, handleStopClick, onHandleSkipClick, onHandleSettingsSubmitClick }: RoomToolsProps) => {
	const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);

	const handleMicToggle = (isToggled: boolean) => {
		onHandleMicToggle?.(isToggled);
	};

	const handleCameraToggle = (isToggled: boolean) => {
		onHandleCameraToggle?.(isToggled);
	};

	const handleSettingsClick = () => {
		setIsSettingsDialogOpen(true);
	};

	const handleSubmitSettingsClick = (data: SettingsRoomSchemaType) => {
		onHandleSettingsSubmitClick?.(data);

		setIsSettingsDialogOpen(false);
	};

	return (
		<>
			<Toolbar>
				<ToolbarWrapper>
					<ToolbarGroup>
						<ToolbarToggle onPressedChange={handleMicToggle} iconOn={Mic} iconOff={MicOff} />
						<ToolbarToggle onPressedChange={handleCameraToggle} iconOn={Video} iconOff={VideoOff} />
						<ToolbarButton onClick={handleSettingsClick}><Settings /></ToolbarButton>
						{!isLoading && !isFound
							? <ToolbarButton onClick={handleStartClick}><Play /></ToolbarButton>
							: isLoading && !isFound
								? <ToolbarButton onClick={handlePauseClick} variant="destructive"><Pause /></ToolbarButton>
								: <ToolbarButton onClick={handleStopClick} variant="destructive"><OctagonMinus /></ToolbarButton>}
						<ToolbarButton onClick={onHandleSkipClick} variant="destructive" disabled={!isFound}><StepForward /></ToolbarButton>
					</ToolbarGroup>
				</ToolbarWrapper>
			</Toolbar>

			<SettingsDialog isOpen={isSettingsDialogOpen} setIsOpen={setIsSettingsDialogOpen} onHandleSubmitClick={handleSubmitSettingsClick} isMicRequired={isMicRequired} isCameraRequired={isCameraRequired} selectedAudioDeviceId={selectedAudioDeviceId} selectedVideoDeviceId={selectedVideoDeviceId} />
		</>
	);
};

export default Tools;
