import { Moon, Sun } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Header = () => {
	const [isDarkMode, setDarkMode] = useState(false);

	const toggleDarkMode = () => {
		setDarkMode(!isDarkMode);
	};

	return (
		<header className="px-4 mx-auto container fixed top-0 right-0 left-0 z-40 h-20">
			<Card>
				<CardContent className="w-full h-full flex justify-between items-center">
					<h2 className="text-2xl text-shadow-chart-1 text-shadow-[2px_2px_0px_rgb(0_0_0_/_1)]">CHAT-ROOMS</h2>
					<Button onClick={toggleDarkMode}>{isDarkMode ? <Moon /> : <Sun />}</Button>
				</CardContent>
			</Card>
		</header>
	);
};

export default Header;
