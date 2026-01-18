import RoomsCard from "./rooms-card";
import RoulettesCard from "./roulettes-card.tsx";

const ConversationPage = () => {
	return (
		<div className="flex flex-col gap-4">
			<RoulettesCard />
			<RoomsCard />
		</div>
	);
};

export default ConversationPage;
