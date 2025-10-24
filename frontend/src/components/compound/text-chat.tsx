import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";

const TextChat = () => {
	return (
		<Card className="h-full w-full">
			<CardContent className="p-4 flex flex-col h-full w-full">
				<div className="flex-1 overflow-y-auto mb-4 space-y-2">

				</div>
				<div className="flex gap-2">
					<Input
						placeholder="Type a message..."
						className="w-full"
					/>
					<Button>Send</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default TextChat;
