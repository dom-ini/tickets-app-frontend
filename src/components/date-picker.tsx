"use client";

import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  date: DateRange | undefined;
  onDateChange: Dispatch<SetStateAction<DateRange | undefined>>;
}

export function DatePicker({ className, date, onDateChange }: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal group px-3 text-muted-foreground",
            className
          )}
          data-test="date-picker-btn"
        >
          <CalendarIcon className="mr-3 h-4 w-4 group-focus:text-primary dark:group-focus:text-secondary" />
          <span className={cn(date?.from && "text-accent-foreground")}>
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
              <>Data</>
            )}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" data-test="date-picker-popover">
        <Calendar
          mode="range"
          selected={date}
          onSelect={onDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
