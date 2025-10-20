// import type { Control, UseFormReturn } from "react-hook-form";

// import type { CategoriesType, LanguagesType } from "@/lib/types/list.type";
// import type { FilterRoomSchemaType } from "@/lib/types/room";

// import { Combobox } from "@/components/ui/combobox";
// import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
// import { cn } from "@/lib/utils/cn";
// import { convertListToComboboxValues } from "@/lib/utils/convert-list-to-combobox-values";

// interface RoomFiltersTypes {
// 	className?: string;
// 	filterForm: UseFormReturn<FilterRoomSchemaType>;
// 	isCategoriesDisabled: boolean;
// 	categoriesList: CategoriesType;
// 	languagesList: LanguagesType;
// 	isLanguagesDisabled: boolean;
// 	control: Control<FilterRoomSchemaType>;
// }

// const RoomFilters = ({ className, filterForm, isCategoriesDisabled, categoriesList, languagesList, isLanguagesDisabled, control }: RoomFiltersTypes) => {
// 	return (
// 		<Form {...filterForm}>
// 			<form
// 				className={cn(
// 					"flex-col flex gap-4 md:flex-row",
// 					className
// 				)}
// 			>
// 				<FormField
// 					control={control}
// 					name="category"
// 					render={({ field }) => (
// 						<FormItem className="flex-1">
// 							<FormControl>
// 								<Combobox disabled={isCategoriesDisabled} values={[{ value: "", label: "All categories" }, ...convertListToComboboxValues(categoriesList)]} placeholder="Select category" label="Select category..." emptyText="No categories..." value={field.value} onChange={field.onChange} />
// 							</FormControl>
// 							<FormMessage />
// 						</FormItem>
// 					)}
// 				/>
// 				<FormField
// 					control={control}
// 					name="language"
// 					render={({ field }) => (
// 						<FormItem className="flex-1">
// 							<FormControl>
// 								<Combobox disabled={isLanguagesDisabled} values={[{ value: "", label: "All languages" }, ...convertListToComboboxValues(languagesList)]} placeholder="Select language" label="Select language..." emptyText="No languages..." value={field.value} onChange={field.onChange} />
// 							</FormControl>
// 							<FormMessage />
// 						</FormItem>
// 					)}
// 				/>
// 			</form>
// 		</Form>
// 	);
// };

// export default RoomFilters;

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import type { CategoriesType, LanguagesType } from "@/lib/types/list.type";
import type { FilterRoomSchemaType } from "@/lib/types/room";

import { Combobox } from "@/components/ui/combobox";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils/cn";
import { convertListToComboboxValues } from "@/lib/utils/convert-list-to-combobox-values";
import { FilterRoomSchema } from "@/lib/zod-schemas/filter-room.schema";

interface RoomFiltersTypes {
	className?: string;
	isCategoriesDisabled: boolean;
	categoriesList: CategoriesType;
	languagesList: LanguagesType;
	isLanguagesDisabled: boolean;
	onHandleChange?: (data: FilterRoomSchemaType) => void;
	onHandleSubmit?: (data: FilterRoomSchemaType) => void;
}

const RoomFilters = ({ className, isCategoriesDisabled, categoriesList, languagesList, isLanguagesDisabled, onHandleChange, onHandleSubmit }: RoomFiltersTypes) => {
	const form = useForm<FilterRoomSchemaType>({
		resolver: zodResolver(FilterRoomSchema),
		defaultValues: {
			language: "",
			category: ""
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
					name="category"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormControl>
								<Combobox disabled={isCategoriesDisabled} values={[{ value: "", label: "All categories" }, ...convertListToComboboxValues(categoriesList)]} placeholder="Select category" label="Select category..." emptyText="No categories..." value={field.value} onChange={field.onChange} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="language"
					render={({ field }) => (
						<FormItem className="flex-1">
							<FormControl>
								<Combobox disabled={isLanguagesDisabled} values={[{ value: "", label: "All languages" }, ...convertListToComboboxValues(languagesList)]} placeholder="Select language" label="Select language..." emptyText="No languages..." value={field.value} onChange={field.onChange} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
};

export default RoomFilters;
