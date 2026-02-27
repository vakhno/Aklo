import { Skeleton } from "@/components/ui/skeleton";
import {
	TableBody,
	TableCell,
	TableRow
} from "@/components/ui/table";

const ROW_COUNT = 8;
const COLUMN_COUNT = 5;

export default function UserTableDataSkeleton() {
	return (
		<TableBody>
			{Array.from({ length: ROW_COUNT }, (_, rowIndex) => (
				<TableRow key={rowIndex}>
					{Array.from({ length: COLUMN_COUNT }, (_, colIndex) => (
						<TableCell key={colIndex}>
							<Skeleton className="h-6 w-full" />
						</TableCell>
					))}
				</TableRow>
			))}
		</TableBody>
	);
}
