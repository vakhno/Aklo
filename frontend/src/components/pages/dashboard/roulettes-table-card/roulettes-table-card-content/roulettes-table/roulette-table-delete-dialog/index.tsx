import { toast } from "sonner";

import type { RouletteType } from "@/lib/types/roulette";

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
import { useAdminDeleteRoulette } from "@/queries/roulette";

interface RouletteTableDeleteDialogProps {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	defaultValues: RouletteType;
}

export default function RouletteTableDeleteDialog({ isOpen, setIsOpen, defaultValues }: RouletteTableDeleteDialogProps) {
	const deleteMutation = useAdminDeleteRoulette();

	const handleDelete = () => {
		deleteMutation.mutate(defaultValues._id, {
			onSuccess: () => {
				toast.success("Roulette deleted");
				setIsOpen(false);
			},
			onError: e => toast.error(e.message)
		});
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
