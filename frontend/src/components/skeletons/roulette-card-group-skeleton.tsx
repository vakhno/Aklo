import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils/cn";

interface RouletteCardGroupSkeletonProps {
	className?: string;
	limit: number;
}

const RouletteCardGroupSkeleton = ({ className, limit }: RouletteCardGroupSkeletonProps) => {
	return (
		<div className={cn(className, "flex flex-col gap-6")}>
			{Array.from({ length: limit }, (_, index) => (
				<Skeleton className="h-[162px] rounded-xl" key={index} />
			))}
		</div>
	);
};

export default RouletteCardGroupSkeleton;
