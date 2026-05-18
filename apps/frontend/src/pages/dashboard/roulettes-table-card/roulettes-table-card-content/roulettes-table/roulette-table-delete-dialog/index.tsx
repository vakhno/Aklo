import type { RouletteDocLeanPopulatedType } from "@shared/mongo/types/roulette";

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
import { useAdminDeleteRoulette } from "@shared/queries";
import { toast } from "sonner";

interface RouletteTableDeleteDialogProps {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	defaultValues: RouletteDocLeanPopulatedType;
}

export default function RouletteTableDeleteDialog({ isOpen, setIsOpen, defaultValues }: RouletteTableDeleteDialogProps) {
	const deleteMutation = useAdminDeleteRoulette();

	const handleDelete = () => {
		deleteMutation.mutate(
			{ apiBaseUrl: import.meta.env.VITE_API_URL, id: String(defaultValues._id) },
			{
				onSuccess: () => {
					toast.success("Roulette deleted");
					setIsOpen(false);
				},
				onError: e => toast.error(e.message)
			}
		);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete roulette</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete this roulette? This action cannot be undone.
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
