import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import { useAdminGetRouletteUsers, useAdminRemoveRouletteUser } from "@/queries/roulette";

interface RouletteUsersDialogProps {
	rouletteId: string;
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export default function RouletteUsersDialog({ rouletteId, open, onOpenChange }: RouletteUsersDialogProps) {
	const { data, isLoading } = useAdminGetRouletteUsers({ id: rouletteId, options: { enabled: open } });
	const removeMutation = useAdminRemoveRouletteUser();

	const handleRemove = (userId: string) => {
		removeMutation.mutate(
			{ rouletteId, userId },
			{
				onSuccess: () => toast.success("User removed"),
				onError: e => toast.error(e.message)
			}
		);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Roulette Users</DialogTitle>
				</DialogHeader>
				<div className="max-h-80 space-y-2 overflow-auto">
					{isLoading
						? <p className="text-muted-foreground text-sm">Loading...</p>
						: data?.users?.length
							? data.users.map(userId => (
									<div key={userId} className="flex items-center justify-between rounded-md border px-3 py-2">
										<span className="truncate font-mono text-sm">{userId}</span>
										<Button
											variant="ghost"
											size="icon"
											onClick={() => handleRemove(userId)}
											disabled={removeMutation.isPending}
										>
											<Trash2 className="h-4 w-4 text-destructive" />
										</Button>
									</div>
								))
							: <p className="py-4 text-center text-muted-foreground text-sm">No users in this roulette.</p>}
				</div>
			</DialogContent>
		</Dialog>
	);
}
