import { Link } from "@tanstack/react-router";
import { MessageCircleWarning, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import useThemeStore from "@/store/theme-store";

interface HeaderProps {
	className?: string;
}

const DEFAULT_CLASSNAME: string = "" as const;

const Header = ({ className = DEFAULT_CLASSNAME }: HeaderProps) => {
	const { state: { theme }, toggleTheme } = useThemeStore();

	const handleToggleTheme = () => {
		toggleTheme();
	};

	return (
		<header className={cn("container mx-auto bg-card sticky top-0 z-40 h-[var(--header-height)] mb-[var(--header-margin-bottom)] rounded-bl-xl rounded-br-xl px-10 flex items-center justify-between", className)}>
			<Link
				to="/"
			>
				<MessageCircleWarning height={36} width={36} />
			</Link>
			<Button onClick={handleToggleTheme}>{theme === "dark" ? <Moon /> : <Sun />}</Button>
		</header>
	);
};

export default Header;
