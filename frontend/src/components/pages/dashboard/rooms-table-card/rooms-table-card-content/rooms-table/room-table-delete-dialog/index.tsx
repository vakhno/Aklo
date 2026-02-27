import { toast } from "sonner";

import type { RoomType } from "@/lib/types/room";

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
import { useAdminDeleteRoom } from "@/queries/room";

interface RoomTableDeleteDialogProps {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	defaultValues: RoomType;
}

export default function RoomTableDeleteDialog({ isOpen, setIsOpen, defaultValues }: RoomTableDeleteDialogProps) {
	const deleteMutation = useAdminDeleteRoom();

	const handleDelete = () => {
		deleteMutation.mutate(defaultValues._id, {
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
