import { LogOut, Mic, MicOff, Settings, Trash, Video, VideoOff } from "lucide-react";
import { useState } from "react";

import type { SettingsRoomSchemaType } from "@/lib/types/room";

import { Toolbar, ToolbarButton, ToolbarGroup, ToolbarToggle, ToolbarWrapper } from "@/components/compound/toolbar";
import { useTime } from "@/hooks/use-time";

import ApproveDeleteAlertDialog from "./approve-delete-alert-dialog";
import ApproveLeaveAlertDialog from "./approve-leave-alert-dialog";
import SettingsDialog from "./settings-dialog";

interface RoomToolsProps {
	isMicRequired?: boolean;
	isCameraRequired?: boolean;
	isCreator?: boolean;
	selectedAudioDeviceId?: string | null;
	selectedVideoDeviceId?: string | null;
	onHandleMicToggle?: (value: boolean) => void;
	onHandleCameraToggle?: (value: boolean) => void;
	onHandleMenuClick?: () => void;
	onHandleDeleteSubmitClick?: () => void;
	onHandleLeaveSubmitClick?: () => void;
	onHandleSettingsSubmitClick?: (value: SettingsRoomSchemaType) => void;
}

const RoomTools = ({ isMicRequired, isCameraRequired, isCreator, selectedAudioDeviceId, selectedVideoDeviceId, onHandleMicToggle, onHandleCameraToggle, onHandleLeaveSubmitClick, onHandleDeleteSubmitClick, onHandleSettingsSubmitClick }: RoomToolsProps) => {
	const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
	const [isDeleteAlertDialogOpen, setIsDeleteAlertDialogOpen] = useState(false);
	const [isLeaveAlertDialogOpen, setIsLeaveAlertDialogOpen] = useState(false);
	const time = useTime();
	const formattedTime = time.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" }).slice(0, -3);

	const handleMicToggle = (isToggled: boolean) => {
		onHandleMicToggle?.(isToggled);
	};

	const handleCameraToggle = (isToggled: boolean) => {
		onHandleCameraToggle?.(isToggled);
	};

	const handleSettingsClick = () => {
		setIsSettingsDialogOpen(true);
	};

	const handleDeleteClick = () => {
		setIsDeleteAlertDialogOpen(true);
	};

	const handleLeaveClick = () => {
		setIsLeaveAlertDialogOpen(true);
	};

	const handleSubmitSettingsClick = (data: SettingsRoomSchemaType) => {
		onHandleSettingsSubmitClick?.(data);

		setIsSettingsDialogOpen(false);
	};

	const handleSubmitLeaveClick = () => {
		onHandleLeaveSubmitClick?.();
	};

	const handleSubmitDeleteClick = async () => {
		onHandleDeleteSubmitClick?.();
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
						<ToolbarToggle onPressedChange={handleMicToggle} iconOn={Mic} iconOff={MicOff} />
						<ToolbarToggle onPressedChange={handleCameraToggle} iconOn={Video} iconOff={VideoOff} />
						{ isCreator
							? <ToolbarButton onClick={handleDeleteClick} variant="destructive"><Trash /></ToolbarButton>
							: <ToolbarButton onClick={handleLeaveClick} variant="destructive"><LogOut /></ToolbarButton>}
					</ToolbarGroup>
					<ToolbarGroup className="flex-1 justify-end">
						<ToolbarButton onClick={handleSettingsClick}><Settings /></ToolbarButton>
					</ToolbarGroup>
				</ToolbarWrapper>
			</Toolbar>

			<SettingsDialog isOpen={isSettingsDialogOpen} setIsOpen={setIsSettingsDialogOpen} onHandleSubmitClick={handleSubmitSettingsClick} isMicRequired={isMicRequired} isCameraRequired={isCameraRequired} selectedAudioDeviceId={selectedAudioDeviceId} selectedVideoDeviceId={selectedVideoDeviceId} />
			<ApproveDeleteAlertDialog isOpen={isDeleteAlertDialogOpen} setIsOpen={setIsDeleteAlertDialogOpen} onHandleSubmitClick={handleSubmitDeleteClick} />
			<ApproveLeaveAlertDialog isOpen={isLeaveAlertDialogOpen} setIsOpen={setIsLeaveAlertDialogOpen} onHandleSubmitClick={handleSubmitLeaveClick} />
		</>
	);
};

export default RoomTools;
