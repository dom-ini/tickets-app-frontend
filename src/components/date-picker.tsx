"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { pl } from "date-fns/locale";
import { DateRange } from "react-day-picker";

interface DatePickerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function DatePicker({ className }: DatePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal group px-3",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-3 h-4 w-4 group-focus:text-primary dark:group-focus:text-secondary" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "dd.MM.yyyy", { locale: pl })}
                {" - "}
                {format(date.to, "dd.MM.yyyy", { locale: pl })}
              </>
            ) : (
              format(date.from, "PPP", { locale: pl })
            )
          ) : (
            <span>Data</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="range"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
