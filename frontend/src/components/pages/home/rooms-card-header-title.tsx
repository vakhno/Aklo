import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";

interface RoomsCardHeaderTitleProps {
	handleOpenCreateRoomModal: () => void;
}

const RoomsCardHeaderTitle = ({ handleOpenCreateRoomModal }: RoomsCardHeaderTitleProps) => {
	const handleOpenCreateRoomModalClick = () => {
		handleOpenCreateRoomModal();
	};

	return (
		<div className="w-full flex justify-between items-center">
			<CardTitle>AVAILABLE ROOMS</CardTitle>
			<Button onClick={handleOpenCreateRoomModalClick}>CREATE</Button>
		</div>
	);
};

export default RoomsCardHeaderTitle;
