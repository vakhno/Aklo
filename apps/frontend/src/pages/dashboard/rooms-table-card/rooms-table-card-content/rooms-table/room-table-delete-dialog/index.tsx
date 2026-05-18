import type { RoomDocLeanType } from "@shared/mongo/types/room";

import { Button } from "@shared/design-system/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@shared/design-system/dialog";
import { useAdminDeleteRoom } from "@shared/queries";
import { toast } from "sonner";

interface RoomTableDeleteDialogProps {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	defaultValues: RoomDocLeanType;
}

export default function RoomTableDeleteDialog({ isOpen, setIsOpen, defaultValues }: RoomTableDeleteDialogProps) {
	const deleteMutation = useAdminDeleteRoom();

	const handleDelete = () => {
		deleteMutation.mutate({ id: String(defaultValues._id), apiBaseUrl: import.meta.env.VITE_API_URL }, {
			onSuccess: () => {
				toast.success("Room deleted");
				setIsOpen(false);
			},
			onError: e => toast.error(e.message)
		});
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete room</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete this room? This action cannot be undone.
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button variant="destructive" disabled={deleteMutation.isPending} onClick={handleDelete}>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
