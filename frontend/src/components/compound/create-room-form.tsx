import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { NewRoomSchemaType } from "@/lib/types/room";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { CATEGORY_LIST } from "@/lib/constants/category-list";
import { LANGUAGE_LIST } from "@/lib/constants/language-list";
import { convertListToComboboxValues } from "@/lib/utils/convert-list-to-combobox-values";
import { NewRoomSchema } from "@/lib/zod-schemas/new-room.schema";

import { Combobox } from "../ui/combobox";
import { Input } from "../ui/input";

interface CreateRoomFormProps {
	formId: string;
	onHandleSubmit: (data: NewRoomSchemaType) => void;
}

const CreateRoomForm = ({ formId, onHandleSubmit }: CreateRoomFormProps) => {
	const form = useForm<NewRoomSchemaType>({
		resolver: zodResolver(NewRoomSchema),
		defaultValues: {
			title: "",
			language: "",
			category: "",
			isCameraRequired: true,
			isMicRequired: true
		}
	});

	const { handleSubmit } = form;

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onHandleSubmit)} id={formId} className="flex flex-col gap-4">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder="Title..." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="language"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Language</FormLabel>
							<FormControl>
								<Combobox
									label="Select language"
									values={convertListToComboboxValues(LANGUAGE_LIST)}
									value={field.value}
									onChange={field.onChange}
									placeholder="Select language..."
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="category"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Category</FormLabel>
							<FormControl>
								<Combobox
									label="Select category"
									values={convertListToComboboxValues(CATEGORY_LIST)}
									value={field.value}
									onChange={field.onChange}
									placeholder="Select category..."
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="isCameraRequired"
					render={({ field }) => (
						<FormItem className="flex items-center justify-between rounded-lg border p-3">
							<div className="flex flex-col">
								<FormLabel>Camera Required</FormLabel>
								<FormDescription>
									Require users to enable camera before joining
								</FormDescription>
							</div>
							<FormControl>
								<Switch
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="isMicRequired"
					render={({ field }) => (
						<FormItem className="flex items-center justify-between rounded-lg border p-3">
							<div className="flex flex-col">
								<FormLabel>Microphone Required</FormLabel>
								<FormDescription>
									Require users to enable microphone before joining
								</FormDescription>
							</div>
							<FormControl>
								<Switch
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
};

export default CreateRoomForm;
