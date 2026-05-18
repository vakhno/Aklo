import type { LanguageDocLeanType } from "@shared/mongo/types/language";
import type { FilterRouletteSchemaType } from "@shared/schemas/filter-roulette";

import { zodResolver } from "@hookform/resolvers/zod";
import { Combobox } from "@shared/design-system/combobox";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@shared/design-system/form";
import { FilterRouletteSchema } from "@shared/schemas/filter-roulette";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import { cn } from "@/lib/utils/cn";
import { convertLanguageListToComboboxList } from "@/lib/utils/conver-language-list-to-combobox-list";

interface RouletteFiltersFormTypes {
	className?: string;
	languageList: LanguageDocLeanType[];
	isDisabled: boolean;
	onHandleChange?: (data: FilterRouletteSchemaType) => void;
	onHandleSubmit?: (data: FilterRouletteSchemaType) => void;
}

const RouletteFiltersForm = ({ className, languageList, isDisabled, onHandleChange, onHandleSubmit }: RouletteFiltersFormTypes) => {
	const form = useForm<FilterRouletteSchemaType>({
		resolver: zodResolver(FilterRouletteSchema),
		defaultValues: {
			language: ""
		}
	});
	const { handleSubmit, control, formState: { isDirty }, reset, getValues } = form;
	const watch = useWatch({ control: form.control }) as FilterRouletteSchemaType;
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
						<FormItem className="w-full">
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

export default RouletteFiltersForm;
