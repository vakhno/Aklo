import { useEffect, useId } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import type { UserType } from "@/lib/types/user";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/components/ui/select";
import { type AdminUpdateUserPayload, useAdminUpdateUser } from "@/queries/user";

interface UserTableEditDialogProps {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	defaultValues: UserType;
}

type EditUserFormValues = {
	name: string;
	email: string;
	role: string;
};

export default function UserTableEditDialog({ isOpen, setIsOpen, defaultValues }: UserTableEditDialogProps) {
	const formId = useId();

	const { mutate: updateUser, isPending: isUpdatePending } = useAdminUpdateUser({
		options: {
			onSuccess: () => {
				toast.success("User updated");
				setIsOpen(false);
			},
			onError: error => toast.error(error.message)
		}
	});

	const form = useForm<EditUserFormValues>({
		defaultValues: {
			name: defaultValues.name ?? "",
			email: defaultValues.email ?? "",
			role: defaultValues.role ?? "user"
		}
	});

	useEffect(() => {
		if (isOpen) {
			form.reset({
				name: defaultValues.name ?? "",
				email: defaultValues.email ?? "",
				role: defaultValues.role ?? "user"
			});
		}
	}, [isOpen, defaultValues.id, defaultValues.name, defaultValues.email, defaultValues.role, form]);

	const handleSubmit = (data: EditUserFormValues) => {
		const payload: AdminUpdateUserPayload = {};
		if (data.name !== (defaultValues.name ?? ""))
			payload.name = data.name;
		if (data.email !== (defaultValues.email ?? ""))
			payload.email = data.email;
		if (data.role !== (defaultValues.role ?? "user"))
			payload.role = data.role;
		if (Object.keys(payload).length === 0) {
			setIsOpen(false);
			return;
		}
		updateUser({ id: defaultValues.id, data: payload });
	};

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit user</DialogTitle>
					<DialogDescription>
						Update the user details. Leave fields unchanged to keep current values.
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(handleSubmit)} id={formId} className="flex flex-col gap-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input placeholder="Name..." {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input type="email" placeholder="Email..." {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="role"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Role</FormLabel>
									<Select
										value={field.value ? field.value : "user"}
										onValueChange={field.onChange}
									>
										<FormControl>
											<SelectTrigger className="w-full">
												<SelectValue placeholder="Select role" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="user">User</SelectItem>
											<SelectItem value="admin">Admin</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button type="submit" form={formId} disabled={isUpdatePending}>
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
