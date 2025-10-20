import { useId } from "react";

import type { NewRoomSchemaType } from "@/lib/types/room";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";

import CreateRoomForm from "./create-room-form";

interface CreateRoomModalProps {
	isOpen: boolean;
	setOpen: (value: boolean) => void;
	submitAction?: (data: NewRoomSchemaType) => Promise<void>;
}

const CreateRoomModal = ({ isOpen, setOpen, submitAction }: CreateRoomModalProps) => {
	const formId = useId();

	const onSubmit = async (data: NewRoomSchemaType) => {
		submitAction && await submitAction(data);

		setOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setOpen}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Create New Room</DialogTitle>
					<DialogDescription>
						Fill out the form to create your new conversation room.
					</DialogDescription>
				</DialogHeader>
				<CreateRoomForm formId={formId} onHandleSubmit={onSubmit} />
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button type="submit" form={formId}>Create Room</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default CreateRoomModal;
