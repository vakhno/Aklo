import { useEffect, useState } from "react";
import { toast } from "sonner";

import type { LanguageType } from "@/lib/types/language";
import type { RouletteType } from "@/lib/types/roulette";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetLanguageList } from "@/queries/language";
import { useAdminUpdateRoulette } from "@/queries/roulette";

interface RouletteTableEditDialogProps {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	defaultValues: RouletteType;
}

export default function RouletteTableEditDialog({ isOpen, setIsOpen, defaultValues }: RouletteTableEditDialogProps) {
	const { data: languages = [] } = useGetLanguageList({});
	const updateMutation = useAdminUpdateRoulette();

	const [form, setForm] = useState({
		language: "",
		isCameraRequired: false,
		isMicRequired: false,
		priority: 1
	});

	useEffect(() => {
		if (isOpen && defaultValues) {
			setForm({
				language: typeof defaultValues.language === "object"
					? (defaultValues.language as LanguageType)._id
					: String(defaultValues.language),
				isCameraRequired: defaultValues.isCameraRequired,
				isMicRequired: defaultValues.isMicRequired,
				priority: defaultValues.priority
			});
		}
	}, [isOpen, defaultValues]);

	const handleUpdate = () => {
		updateMutation.mutate(
			{ id: defaultValues._id, data: form },
			{
				onSuccess: () => {
					toast.success("Roulette updated");
					setIsOpen(false);
				},
				onError: e => toast.error(e.message)
			}
		);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Edit Roulette</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid gap-2">
						<Label htmlFor="roulette-edit-language">Language</Label>
						<select
							id="roulette-edit-language"
							className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm"
							value={form.language}
							onChange={e => setForm(p => ({ ...p, language: e.target.value }))}
						>
							{languages.map(lang => (
								<option key={lang._id} value={lang._id}>{lang.name}</option>
							))}
						</select>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="roulette-priority">Priority</Label>
						<Input
							id="roulette-priority"
							type="number"
							min={1}
							value={form.priority}
							onChange={e => setForm(p => ({ ...p, priority: Number(e.target.value) }))}
						/>
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
					<Button onClick={handleUpdate} disabled={updateMutation.isPending}>
						{updateMutation.isPending ? "Saving..." : "Save"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
