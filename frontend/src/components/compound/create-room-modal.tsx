import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { useForm } from "react-hook-form";

import type { NewRoomType } from "@/lib/types/room";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CATEGORY_LIST } from "@/lib/constants/category-list";
import { LANGUAGE_LIST } from "@/lib/constants/language-list";
import { convertListToComboboxValues } from "@/lib/utils/convert-list-to-combobox-values";
import { NewRoomSchema } from "@/lib/zod-schemas/new-room.schema";

interface CreateRoomModalProps {
	isOpen: boolean;
	setOpen: (value: boolean) => void;
	submitAction?: (data: NewRoomType) => Promise<void>;
}

const CreateRoomModal = ({ isOpen, setOpen, submitAction }: CreateRoomModalProps) => {
	const newRoomFormId = useId();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch
	} = useForm<NewRoomType>({
		resolver: zodResolver(NewRoomSchema),
		defaultValues: {
			title: "",
			language: "",
			category: "",
			isCameraRequired: true,
			isMicRequired: true
		}
	});

	const onSubmit = async (data: NewRoomType) => {
		submitAction && await submitAction(data);

		setOpen(false);
	};

	return (
		<Dialog open={isOpen} onOpenChange={setOpen}>
			<form onSubmit={handleSubmit(onSubmit)} id={newRoomFormId}>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Create New Room</DialogTitle>
						<DialogDescription>
							Fill in the details to create a new room for your conversation.
						</DialogDescription>
					</DialogHeader>

					<div className="grid gap-4 py-4 h-full overflow-y-auto">
						<div className="grid gap-2">
							<Input
								placeholder="Title..."
								id="title"
								{...register("title")}
							/>
							{errors.title && (
								<p className="text-sm text-red-500">
									{errors.title.message}
								</p>
							)}
						</div>

						<Combobox
							label="Select language"
							values={convertListToComboboxValues(LANGUAGE_LIST)}
							value={watch("language")}
							onChange={value => setValue("language", value)}
							placeholder="Select language..."
						/>
						{errors.language && (
							<p className="text-sm text-red-500">
								{errors.language.message}
							</p>
						)}
						<Combobox
							label="Select category"
							values={convertListToComboboxValues(CATEGORY_LIST)}
							value={watch("category")}
							onChange={value => setValue("category", value)}
							placeholder="Select category..."
						/>
						{errors.category && (
							<p className="text-sm text-red-500">
								{errors.category.message}
							</p>
						)}
						<div className="flex items-center justify-between">
							<Label htmlFor="isCameraRequired">Camera Required</Label>
							<Switch
								id="isCameraRequired"
								checked={watch("isCameraRequired")}
								onCheckedChange={checked => setValue("isCameraRequired", checked)}
							/>
						</div>

						<div className="flex items-center justify-between">
							<Label htmlFor="isMicRequired">Microphone required</Label>
							<Switch
								id="isMicRequired"
								checked={watch("isMicRequired")}
								onCheckedChange={checked => setValue("isMicRequired", checked)}
							/>
						</div>
					</div>

					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>
						<Button type="submit" form={newRoomFormId}>Create Room</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
};

export default CreateRoomModal;
