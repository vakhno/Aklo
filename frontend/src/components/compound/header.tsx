import { MessageCircleWarning, Moon, Sun } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";

interface HeaderProps {
	className?: string;
}

const DEFAULT_CLASSNAME: string = "" as const;

const Header = ({ className = DEFAULT_CLASSNAME }: HeaderProps) => {
	const [isDarkMode, setDarkMode] = useState(false);

	const toggleDarkMode = () => {
		setDarkMode(!isDarkMode);
	};

	return (
		<header className={cn("px-4 mx-auto container sticky top-0 z-40 h-20", className)}>
			<Card variant="ghost">
				<CardContent className="w-full h-full flex justify-between items-center">
					<MessageCircleWarning height={36} width={36} />
					<Button onClick={toggleDarkMode}>{isDarkMode ? <Moon /> : <Sun />}</Button>
				</CardContent>
			</Card>
		</header>
	);
};

export default Header;
