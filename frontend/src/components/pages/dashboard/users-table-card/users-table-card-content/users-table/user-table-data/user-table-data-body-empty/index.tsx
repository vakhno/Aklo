import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle
} from "@/components/ui/empty";

export default function UserTableDataBodyEmpty() {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyTitle>No users found</EmptyTitle>
				<EmptyDescription>
					There are no users in the system yet.
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent />
		</Empty>
	);
}
