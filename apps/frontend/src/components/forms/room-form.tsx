import type { NewRoomSchemaType } from "@shared/schemas/new-room";

import { zodResolver } from "@hookform/resolvers/zod";
import { Combobox, type ComboboxValueType } from "@shared/design-system/combobox";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@shared/design-system/form";
import { Input } from "@shared/design-system/input";
import { Switch } from "@shared/design-system/switch";
import { NewRoomSchema } from "@shared/schemas/new-room";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils/cn";

interface RoomFormProps {
	className?: string;
	formId: string;
	languageList: ComboboxValueType[];
	defaultValue?: Partial<NewRoomSchemaType>;
	onHandleSubmit: (data: NewRoomSchemaType) => void;
}

const RoomForm = ({ className, formId, languageList, defaultValue, onHandleSubmit }: RoomFormProps) => {
	const form = useForm<NewRoomSchemaType>({
		resolver: zodResolver(NewRoomSchema),
		defaultValues: {
			title: defaultValue?.title || "",
			language: defaultValue?.language || "",
			isCameraRequired: defaultValue?.isCameraRequired || true,
			isMicRequired: defaultValue?.isMicRequired || true,
			maxUsersCount: defaultValue?.maxUsersCount || 1
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

export default RoomForm;
