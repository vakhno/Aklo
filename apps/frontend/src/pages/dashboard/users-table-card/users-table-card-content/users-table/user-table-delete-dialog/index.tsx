import type { ClientSessionUser } from "@shared/auth/types";

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
import { useAdminDeleteUser } from "@shared/queries";
import { toast } from "sonner";

interface UserTableDeleteDialogProps {
	isOpen: boolean;
	setIsOpen: (value: boolean) => void;
	defaultValues: ClientSessionUser;
}

export default function UserTableDeleteDialog({ isOpen, setIsOpen, defaultValues }: UserTableDeleteDialogProps) {
	const { mutate: deleteUser, isPending: isDeletePending } = useAdminDeleteUser({
		options: {
			onSuccess: () => {
				toast.success("User deleted");
				setIsOpen(false);
			},
			onError: error => toast.error(error.message)
		}
	});

	const handleDelete = () => {
		deleteUser({ apiBaseUrl: import.meta.env.VITE_API_URL, id: defaultValues.id });
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Delete user</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete this user? This will permanently remove the account and cannot be undone.
						{defaultValues.email && (
							<span className="mt-2 block font-medium">
								{defaultValues.name ? `${defaultValues.name} (${defaultValues.email})` : defaultValues.email}
							</span>
						)}
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button variant="destructive" disabled={isDeletePending} onClick={handleDelete}>
						Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
