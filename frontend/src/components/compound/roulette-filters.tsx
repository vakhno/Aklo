import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";

import type { LanguagesType } from "@/lib/types/list.type";
import type { FilterRouletteSchemaType } from "@/lib/types/roulette";

import { Combobox } from "@/components/ui/combobox";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils/cn";
import { convertListToComboboxValues } from "@/lib/utils/convert-list-to-combobox-values";
import { FilterRouletteSchema } from "@/lib/zod-schemas/filter-roulette.schema";

interface RouletteFiltersTypes {
	className?: string;
	languagesList: LanguagesType;
	isLanguagesDisabled: boolean;
	onHandleChange?: (data: FilterRouletteSchemaType) => void;
	onHandleSubmit?: (data: FilterRouletteSchemaType) => void;
}

const RouletteFilters = ({ className, languagesList, isLanguagesDisabled, onHandleChange, onHandleSubmit }: RouletteFiltersTypes) => {
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

export default RouletteFilters;
