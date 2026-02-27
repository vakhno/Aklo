import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useGetLanguageList } from "@/queries/language";
import { useAdminCreateRoulette } from "@/queries/roulette";

interface RouletteTableCreateDialogProps {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
}

export default function RouletteTableCreateDialog({ isOpen, setIsOpen }: RouletteTableCreateDialogProps) {
	const { data: languages = [] } = useGetLanguageList({});
	const createMutation = useAdminCreateRoulette();

	const [form, setForm] = useState({
		language: "",
		isCameraRequired: false,
		isMicRequired: false
	});

	useEffect(() => {
		if (isOpen) {
			setForm({
				language: languages[0]?._id ?? "",
				isCameraRequired: false,
				isMicRequired: false
			});
		}
	}, [isOpen, languages]);

	const handleCreate = () => {
		createMutation.mutate(form, {
			onSuccess: () => {
				toast.success("Roulette created");
				setIsOpen(false);
			},
			onError: e => toast.error(e.message)
		});
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Create Roulette</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid gap-2">
						<Label htmlFor="roulette-create-language">Language</Label>
						<select
							id="roulette-create-language"
							className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
							value={form.language}
							onChange={e => setForm(p => ({ ...p, language: e.target.value }))}
						>
							{languages.map(lang => (
								<option key={lang._id} value={lang._id}>{lang.name}</option>
							))}
						</select>
					</div>
					<div className="flex gap-6">
						<label className="flex items-center gap-2 text-sm">
							<input
								type="checkbox"
								checked={form.isCameraRequired}
								onChange={e => setForm(p => ({ ...p, isCameraRequired: e.target.checked }))}
								className="rounded"
							/>
							Camera required
						</label>
						<label className="flex items-center gap-2 text-sm">
							<input
								type="checkbox"
								checked={form.isMicRequired}
								onChange={e => setForm(p => ({ ...p, isMicRequired: e.target.checked }))}
								className="rounded"
							/>
							Mic required
						</label>
					</div>
				</div>
				<DialogFooter>
					<Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
					<Button onClick={handleCreate} disabled={createMutation.isPending}>
						{createMutation.isPending ? "Creating..." : "Create"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
