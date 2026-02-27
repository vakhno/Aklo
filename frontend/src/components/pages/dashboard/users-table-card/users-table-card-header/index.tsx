import { CardDescription, CardHeader } from "@/components/ui/card";

export default function UsersTableCardHeader() {
	return (
		<CardHeader className="flex w-full flex-col">
			<div className="flex w-full items-center justify-between gap-2">
				<div className="flex flex-col gap-2">
					<h2 className="font-semibold leading-none">Users</h2>
					<CardDescription>
						View and manage users across the platform.
					</CardDescription>
				</div>
			</div>
		</CardHeader>
	);
}
