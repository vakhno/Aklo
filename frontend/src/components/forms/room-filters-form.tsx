import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import type { LanguageType } from "@/lib/types/language";
import type { FilterRoomSchemaType } from "@/lib/types/room";

import { Combobox } from "@/components/ui/combobox";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils/cn";
import { convertLanguageListToComboboxList } from "@/lib/utils/conver-language-list-to-combobox-list";
import { FilterRoomSchema } from "@/lib/zod-schemas/filter-room.schema";

interface RoomFiltersFormTypes {
	className?: string;
	languageList: LanguageType[];
	isDisabled: boolean;
	onHandleChange?: (data: FilterRoomSchemaType) => void;
	onHandleSubmit?: (data: FilterRoomSchemaType) => void;
}

const RoomFiltersForm = ({ className, languageList, isDisabled, onHandleChange, onHandleSubmit }: RoomFiltersFormTypes) => {
	const form = useForm<FilterRoomSchemaType>({
		resolver: zodResolver(FilterRoomSchema),
		defaultValues: {
			language: ""
		}
	});

	const { handleSubmit, control, formState: { isDirty }, reset, getValues } = form;
	const watch = useWatch({ control: form.control }) as FilterRoomSchemaType;
	const filterFormValues = getValues();

	useEffect(() => {
		if (isDirty) {
			reset(filterFormValues);
			onHandleChange && onHandleChange(watch);
		}
	}, [isDirty]);

	return (
		<Form {...form}>
			<form
				onSubmit={onHandleSubmit && handleSubmit(onHandleSubmit)}
				className={cn(
					"flex-col flex gap-4 md:flex-row",
					className
				)}
			>
				<FormField
					control={control}
					name="language"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormControl>
								<Combobox disabled={isDisabled} values={[{ value: "", label: "All languages" }, ...convertLanguageListToComboboxList(languageList)]} placeholder="Select language" label="Select language..." emptyText="No languages..." value={field.value} onChange={field.onChange} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
};

export default RoomFiltersForm;
