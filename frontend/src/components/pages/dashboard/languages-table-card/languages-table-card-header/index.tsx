import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader } from "@/components/ui/card";

import { useLanguagesTableCardStore } from "../store";

const LanguagesTableCardHeader = () => {
	const { setIsCreateLanguageDialog } = useLanguagesTableCardStore();

	return (
		<CardHeader className="flex flex-col w-full">
			<div className="w-full flex justify-between items-center gap-2">
				<div className="flex flex-col gap-2">
					<h2 className="leading-none font-semibold">Languages</h2>
					<CardDescription>
						Create, edit, or remove languages used across rooms and roulettes.
					</CardDescription>
				</div>
				<Button variant="secondary" onClick={() => setIsCreateLanguageDialog(true)}>
					Create
				</Button>
			</div>
		</CardHeader>
	);
};

export default LanguagesTableCardHeader;
