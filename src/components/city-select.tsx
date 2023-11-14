"use client";

import { Check, ChevronsUpDown, MapPin } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import cities from "@/lib/cities";
import { cn } from "@/lib/utils";

interface CitySelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  onValueChange: (value: string) => void;
}

export function CitySelect({
  className,
  value,
  onValueChange,
}: CitySelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between text-muted-foreground font-normal gap-3 group",
            className,
          )}
        >
          <MapPin
            size="1rem"
            className={open ? "text-primary dark:text-secondary" : ""}
          />
          <span
            className={cn(
              "flex-1 text-start",
              value ? "text-accent-foreground" : "",
            )}
          >
            {value
              ? cities.find((city) => city.value.toLowerCase() === value)?.value
              : "Miasto"}
          </span>
          <ChevronsUpDown size="1rem" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 max-h-60 overflow-auto">
        <Command>
          <CommandInput placeholder="Wyszukaj miasto..." />
          <CommandEmpty>Nie znaleziono miast.</CommandEmpty>
          <CommandGroup>
            {cities.map((city) => (
              <CommandItem
                key={city.label}
                value={city.value}
                onSelect={(currentValue) => {
                  onValueChange(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
                className="cursor-pointer"
              >
                <Check
                  size="1rem"
                  className={cn(
                    "mr-2",
                    value === city.value.toLowerCase()
                      ? "opacity-100"
                      : "opacity-0",
                  )}
                />
                {city.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
