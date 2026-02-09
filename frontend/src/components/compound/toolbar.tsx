// components/compound/tools.tsx

import { Separator } from "@radix-ui/react-separator";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils/cn";

const Toolbar = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
	return (
		<div
			data-slot="tools"
			className={cn("w-full bg-muted/50 rounded-xl", className)}
			{...props}
		/>
	);
};

const ToolbarWrapper = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		data-slot="tools-bar"
		className={cn("px-2 sm:px-4 py-3", className)}
		{...props}
	/>
);

const ToolbarGroup = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
	<div
		data-slot="tools-group"
		className={cn(
			"flex items-center justify-center gap-1 sm:gap-2",
			className
		)}
		{...props}
	/>
);

interface ToolbarButtonProps
	extends React.ComponentProps<typeof Button> {
	size?: "sm" | "default";
}

const ToolbarButton = ({ className, variant = "default", size = "default", ...props }: ToolbarButtonProps) => {
	const btnSize = size === "sm" ? "h-9 w-9" : "h-9 w-9 sm:h-10 sm:w-10";

	return (
		<Button
			data-slot="tools-button"
			variant={variant}
			size="icon"
			className={cn(btnSize, className)}
			{...props}
		/>
	);
};

interface ToolbarToggleProps
	extends React.ComponentProps<typeof Toggle> {
	iconOn: React.ElementType;
	iconOff: React.ElementType;
}

const ToolbarToggle = ({ iconOn: IconOn, iconOff: IconOff, ...props }: ToolbarToggleProps) => {
	return (
		<Toggle defaultPressed {...props} className="data-[state=off]:[&>.icon-off]:block data-[state=on]:[&>.icon-on]:block">
			<IconOn className="icon-on hidden" />
			<IconOff className="icon-off hidden h-4 w-4 sm:h-5 sm:w-5" />
		</Toggle>
	);
};

const ToolbarDivider = ({ className, ...props }: React.ComponentProps<typeof Separator>) => (
	<Separator
		data-slot="tools-divider"
		orientation="vertical"
		className={cn("h-6 mx-1 hidden sm:block", className)}
		{...props}
	/>
);

export {
	Toolbar,
	ToolbarButton,
	ToolbarDivider,
	ToolbarGroup,
	ToolbarToggle,
	ToolbarWrapper
};
