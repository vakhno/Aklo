import { zodResolver } from "@hookform/resolvers/zod";
import { useId } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { convertLanguagesToComboboxValues } from "@/lib/utils/convert-categories-to-combobox-values copy";
import { convertCategoriesToComboboxValues } from "@/lib/utils/convert-languages-to-combobox-values";

interface CreateRoomModalProps {
	isOpen: boolean;
	setOpen: (value: boolean) => void;
	submitAction?: (data: NewRoomSchemaType) => Promise<void>;
}

const NewRoomSchema = z.object({
	title: z.string().min(10, "Title is too short"),
	language: z.string().min(1, "Please select a language"),
	category: z.string().min(1, "Please select a category"),
	isCameraRequired: z.boolean(),
	isMicRequired: z.boolean(),
	countOfGuests: z.number().min(1, "Minimum 1 guest").max(4, "Maximum 4 guests")
});

type NewRoomSchemaType = z.infer<typeof NewRoomSchema>;

const CreateRoomModal = ({ isOpen, setOpen, submitAction }: CreateRoomModalProps) => {
	const newRoomFormId = useId();
	const categoriesValues = convertCategoriesToComboboxValues(CATEGORY_LIST);
	const languagesValues = convertLanguagesToComboboxValues(LANGUAGE_LIST);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch
	} = useForm<NewRoomSchemaType>({
		resolver: zodResolver(NewRoomSchema),
		defaultValues: {
			title: "",
			language: "",
			category: "",
			isCameraRequired: true,
			isMicRequired: true,
			countOfGuests: 1
		}
	});

	const onSubmit = async (data: NewRoomSchemaType) => {
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
							values={languagesValues}
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
							values={categoriesValues}
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

						<div className="grid gap-2">
							<Input
								placeholder="Guests count..."
								id="countOfGuests"
								type="number"
								min={1}
								max={4}
								{...register("countOfGuests", { valueAsNumber: true })}
							/>
							{errors.countOfGuests && (
								<p className="text-sm text-red-500">
									{errors.countOfGuests.message}
								</p>
							)}
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
