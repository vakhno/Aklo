import RoomsCard from "./rooms-card";
import RoulettesCard from "./roulettes-card";

const ConversationPage = () => {
	return (
		<main className="flex flex-col gap-4">
			<RoulettesCard />
			<RoomsCard />
		</main>
	);
};

export default ConversationPage;
