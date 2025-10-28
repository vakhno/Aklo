import { useNavigate } from "@tanstack/react-router";

import type { RouletteType } from "@/lib/types/roulette";

import RouletteCard from "@/components/compound/roulette-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface RouletteCardListTypes {
	isPending: boolean;
	ROULETTE_LIMIT: number;
	roulettes?: RouletteType[];
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
	handleNewPageUpload: () => void;
}

const RouletteCardList = ({ isPending, ROULETTE_LIMIT, roulettes, hasNextPage, isFetchingNextPage, handleNewPageUpload }: RouletteCardListTypes) => {
	const navigate = useNavigate();

	const handleSelectRoulette = (roulette: RouletteType) => {
		const { id } = roulette;

		navigate({ to: "/roulette/$id", params: { id } });
	};

	return (
		<>
			{isPending
				? (
						<div className="flex flex-col gap-6">
							{Array.from({ length: ROULETTE_LIMIT }, (_, index) => (
								<Skeleton className="h-[162px] rounded-xl" key={index} />
							))}
						</div>

					)
				: (
						<>
							{!roulettes || roulettes.length === 0
								? (
										<div className="text-center py-12">
											<h3 className="text-2xl font-black text-black mb-2">NO ROULETTES FOUND</h3>
											<p className="text-gray-700 text-lg">Try to visit!</p>
										</div>
									)
								: (
										<div className="flex flex-col gap-6">
											{roulettes.map(roulette => (
												<RouletteCard roulette={roulette} key={roulette.id} handleSelectRoulette={handleSelectRoulette} />
											))}
											{hasNextPage
												? (
														<>
															{isFetchingNextPage
																? (
																		<div className="flex flex-col gap-6">
																			{Array.from({ length: ROULETTE_LIMIT }, (_, index) => (
																				<Skeleton className="h-[162px] rounded-xl" key={`next-${index}`} />
																			))}
																		</div>
																	)
																: (
																		<Button className="m-auto" onClick={handleNewPageUpload}>
																			Load more
																		</Button>
																	)}
														</>
													)
												: null}
										</div>
									)}
						</>
					)}
		</>
	);
};

export default RouletteCardList;
