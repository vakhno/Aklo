import { CardDescription, CardHeader } from "@/components/ui/card";

export default function RoomsTableCardHeader() {
	return (
		<CardHeader className="flex w-full flex-col">
			<div className="flex w-full items-center justify-between gap-2">
				<div className="flex flex-col gap-2">
					<h2 className="font-semibold leading-none">Rooms</h2>
					<CardDescription>
						View, edit, or delete topic rooms and manage room users.
					</CardDescription>
				</div>
			</div>
		</CardHeader>
	);
}
