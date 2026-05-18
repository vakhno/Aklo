import type { LanguageDocLeanType } from "@shared/mongo/types/language";
import type { RouletteDocLeanPopulatedType } from "@shared/mongo/types/roulette";

import { Button } from "@shared/design-system/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@shared/design-system/dialog";
import { Input } from "@shared/design-system/input";
import { Label } from "@shared/design-system/label";
import { type AdminUpdateRoulettePayload, useAdminUpdateRoulette, useGetLanguageList } from "@shared/queries";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface RouletteTableEditDialogProps {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	defaultValues: RouletteDocLeanPopulatedType;
}

export default function RouletteTableEditDialog({ isOpen, setIsOpen, defaultValues }: RouletteTableEditDialogProps) {
	const apiBaseUrl = import.meta.env.VITE_API_URL;
	const { data: languages = [] } = useGetLanguageList({ apiBaseUrl });
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
					? String((defaultValues.language as LanguageDocLeanType)._id)
					: String(defaultValues.language),
				isCameraRequired: defaultValues.isCameraRequired,
				isMicRequired: defaultValues.isMicRequired,
				priority: defaultValues.priority
			});
		}
	}, [isOpen, defaultValues]);

	const handleUpdate = () => {
		const data: AdminUpdateRoulettePayload = {
			language: form.language,
			isCameraRequired: form.isCameraRequired,
			isMicRequired: form.isMicRequired,
			priority: form.priority
		};
		updateMutation.mutate(
			{ apiBaseUrl, id: String(defaultValues._id), data },
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
								<option key={String(lang._id)} value={String(lang._id)}>{lang.name}</option>
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
