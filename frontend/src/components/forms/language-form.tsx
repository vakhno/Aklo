import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { NewLanguageSchemaType } from "@/lib/types/language";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/cn";
import { NewLanguageSchema } from "@/lib/zod-schemas/new-language.schema";

interface LanguageFormProps {
	className?: string;
	formId: string;
	defaultValue?: Partial<NewLanguageSchemaType>;
	onHandleSubmit: (data: NewLanguageSchemaType) => void;
}

const LanguageForm = ({ className, formId, onHandleSubmit, defaultValue }: LanguageFormProps) => {
	const form = useForm<NewLanguageSchemaType>({
		resolver: zodResolver(NewLanguageSchema),
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
