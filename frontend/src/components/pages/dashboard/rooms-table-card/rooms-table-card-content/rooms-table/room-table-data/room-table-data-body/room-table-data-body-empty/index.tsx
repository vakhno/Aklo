import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle
} from "@/components/ui/empty";

export default function RoomTableDataBodyEmpty() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyTitle>No rooms found</EmptyTitle>
				<EmptyDescription>There are no topic rooms yet.</EmptyDescription>
			</EmptyHeader>
			<EmptyContent />
		</Empty>
	);
}
