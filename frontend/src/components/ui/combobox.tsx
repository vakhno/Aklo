"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/components/ui/popover";
import { cn } from "@/lib/utils/cn";

const DEFAULT_CLASSNAME: string = "" as const;
const DEFAULT_VALUES: ComboboxValueType[] = [] as const;
const DEFAULT_VALUE: string = "" as const;
const DEFAULT_LABEL: string = "" as const;
const DEFAULT_PLACEHOLDER: string = "" as const;
const DEFAULT_EMPTY_TEXT: string = "" as const;

export type ComboboxValueType = { value: string; label: string };

interface ComboboxTypes { className?: string; values?: ComboboxValueType[]; value?: string; placeholder?: string; label?: string; emptyText?: string }

export function Combobox({ className = DEFAULT_CLASSNAME, values = DEFAULT_VALUES, value = DEFAULT_VALUE, placeholder = DEFAULT_PLACEHOLDER, label = DEFAULT_LABEL, emptyText = DEFAULT_EMPTY_TEXT }: ComboboxTypes) {
	const [open, setOpen] = React.useState(false);
	const [selected, setSelected] = React.useState(value);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="noShadow"
					role="combobox"
					aria-expanded={open}
					className={className}
				>
					{selected
						? values.find(item => item.value === selected)?.label
						: label }
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
				<Command className="**:data-[slot=command-input-wrapper]:h-11">
					<CommandInput placeholder={placeholder} />
					<CommandList className="p-1">
						<CommandEmpty>{emptyText}</CommandEmpty>
						<CommandGroup>
							{values.map(item => (
								<CommandItem
									key={item.value}
									value={item.value}
									onSelect={(currentValue) => {
										setSelected(currentValue === selected ? "" : currentValue);
										setOpen(false);
									}}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											selected === item.value ? "opacity-100" : "opacity-0"
										)}
									/>
									{item.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
