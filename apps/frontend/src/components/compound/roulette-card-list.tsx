import type { RouletteDocLeanPopulatedType } from "@shared/mongo/types/roulette";

import { Button } from "@shared/design-system/button";
import { useNavigate } from "@tanstack/react-router";

import EmptyBlock from "@/components/compound/empty-block";

import RouletteCardGroup from "../groups/roulette-card-group";
import RouletteCardGroupSkeleton from "../skeletons/roulette-card-group-skeleton";

interface RouletteCardListTypes {
	isPending: boolean;
	ROULETTE_LIMIT: number;
	rouletteList?: RouletteDocLeanPopulatedType[];

	isHasNextPage: boolean;
	isFetchingNextPage: boolean;
	handleNewPageUpload: () => void;
}

const RouletteCardList = ({ isPending, ROULETTE_LIMIT, rouletteList, isHasNextPage, isFetchingNextPage, handleNewPageUpload }: RouletteCardListTypes) => {
	const navigate = useNavigate();

	const handleSelectRoulette = (roulette: RouletteDocLeanPopulatedType) => {
		const { _id } = roulette;

		navigate({ to: "/roulette/$id", params: { id: String(_id) } });
	};

	return (
		<>
			{isPending
				? (
						<RouletteCardGroupSkeleton limit={ROULETTE_LIMIT} />
					)
				: (
						<>
							{rouletteList && rouletteList.length !== 0
								? (
										<div className="flex flex-col gap-6">
											<RouletteCardGroup rouletteList={rouletteList} handleSelectRoulette={handleSelectRoulette} />
											{isHasNextPage
												? (
														<>
															{isFetchingNextPage
																? (
																		<RouletteCardGroupSkeleton limit={ROULETTE_LIMIT} />
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

									)
								: (
										<div className="flex items-center justify-center h-full">
											<EmptyBlock title="NO AVAILABLE ROULETTES" description="Something went wrong! Try to visit page later!" />
										</div>
									)}
						</>
					)}
		</>
	);
};

export default RouletteCardList;
