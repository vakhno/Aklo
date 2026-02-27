import { useEffect, useState } from "react";
import { toast } from "sonner";

import type { LanguageType } from "@/lib/types/language";
import type { RoomType } from "@/lib/types/room";

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
import { type AdminUpdateRoomPayload, useAdminUpdateRoom } from "@/queries/room";

interface RoomTableEditDialogProps {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	defaultValues: RoomType;
}

export default function RoomTableEditDialog({ isOpen, setIsOpen, defaultValues }: RoomTableEditDialogProps) {
	const { data: languages = [] } = useGetLanguageList({});
	const updateMutation = useAdminUpdateRoom();

	const [form, setForm] = useState({
		title: "",
		language: "",
		isCameraRequired: false,
		isMicRequired: false,
		maxUsersCount: 1
	});

	useEffect(() => {
		if (isOpen && defaultValues) {
			setForm({
				title: defaultValues.title,
				language: typeof defaultValues.language === "object"
					? (defaultValues.language as LanguageType)._id
					: String(defaultValues.language),
				isCameraRequired: defaultValues.isCameraRequired,
				isMicRequired: defaultValues.isMicRequired,
				maxUsersCount: defaultValues.maxUsersCount
			});
		}
	}, [isOpen, defaultValues]);

	const handleUpdate = () => {
		const payload: AdminUpdateRoomPayload = {
			title: form.title,
			language: form.language,
			isCameraRequired: form.isCameraRequired,
			isMicRequired: form.isMicRequired,
			maxUsersCount: form.maxUsersCount
		};
		updateMutation.mutate(
			{ id: defaultValues._id, data: payload },
			{
				onSuccess: () => {
					toast.success("Room updated");
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
					<DialogTitle>Edit Room</DialogTitle>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid gap-2">
						<Label htmlFor="room-title">Title</Label>
						<Input
							id="room-title"
							value={form.title}
							onChange={e => setForm(p => ({ ...p, title: e.target.value }))}
						/>
					</div>
					<div className="grid gap-2">
						<Label htmlFor="room-language">Language</Label>
						<select
							id="room-language"
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
						<Label htmlFor="room-maxUsers">Max Users</Label>
						<Input
							id="room-maxUsers"
							type="number"
							min={1}
							value={form.maxUsersCount}
							onChange={e => setForm(p => ({ ...p, maxUsersCount: Number(e.target.value) }))}
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
