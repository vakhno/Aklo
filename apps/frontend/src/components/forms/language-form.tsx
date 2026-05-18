import type { LanguageInputSchemaType } from "@shared/schemas/language";

import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@shared/design-system/form";
import { Input } from "@shared/design-system/input";
import { LanguageInputSchema } from "@shared/schemas/language";
import { useForm } from "react-hook-form";

import { cn } from "@/lib/utils/cn";

interface LanguageFormProps {
	className?: string;
	formId: string;
	defaultValue?: Partial<LanguageInputSchemaType>;
	onHandleSubmit: (data: LanguageInputSchemaType) => void;
}

const LanguageForm = ({ className, formId, onHandleSubmit, defaultValue }: LanguageFormProps) => {
	const form = useForm<LanguageInputSchemaType>({
		resolver: zodResolver(LanguageInputSchema),
		defaultValues: {
			name: defaultValue?.name || "",
			nativeName: defaultValue?.nativeName || "",
			code: defaultValue?.code || "",
			locale: defaultValue?.locale || ""
		}
	});

	const { handleSubmit } = form;

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onHandleSubmit)} id={formId} className={cn(className, "flex flex-col gap-4")}>
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Title</FormLabel>
							<FormControl>
								<Input placeholder="Name..." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="nativeName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Native Name</FormLabel>
							<FormControl>
								<Input placeholder="Native Name..." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="code"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Code</FormLabel>
							<FormControl>
								<Input placeholder="Code..." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="locale"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Locale</FormLabel>
							<FormControl>
								<Input placeholder="Locale..." {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
};

export default LanguageForm;
