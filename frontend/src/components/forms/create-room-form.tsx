import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { NewRoomSchemaType } from "@/lib/types/room";

import { Combobox, type ComboboxValueType } from "@/components/ui/combobox";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils/cn";
import { NewRoomSchema } from "@/lib/zod-schemas/new-room.schema";

interface CreateRoomFormProps {
	className?: string;
	formId: string;
	languageList: ComboboxValueType[];
	onHandleSubmit: (data: NewRoomSchemaType) => void;
}

const CreateRoomForm = ({ className, formId, languageList, onHandleSubmit }: CreateRoomFormProps) => {
	const form = useForm<NewRoomSchemaType>({
		resolver: zodResolver(NewRoomSchema),
		defaultValues: {
			title: "",
			language: "",
			isCameraRequired: true,
			isMicRequired: true,
			maxUsersCount: 1
		}
	});

	const { handleSubmit } = form;

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onHandleSubmit)} id={formId} className={cn(className, "flex flex-col gap-4")}>
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
									values={languageList}
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
									disabled={true}
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
									disabled={true}
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
