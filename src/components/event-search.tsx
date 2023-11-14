"use client";

import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { DateRange } from "react-day-picker";

import { CitySelect } from "@/components/city-select";
import { DatePicker } from "@/components/date-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

function setQueryParam(
  params: URLSearchParams,
  name: string,
  value: string | null
): void {
  if (!value) {
    params.delete(name);
  } else {
    params.set(name, value);
  }
}

function formatDate(date: Date | undefined): string | null {
  if (!date) return null;
  return format(date, "yyyy-MM-dd", { locale: pl });
}

interface EventSearchProps extends React.HTMLAttributes<HTMLDivElement> {
  initialData?: {
    name?: string;
    city?: string;
    heldAtFrom?: Date;
    heldAtTo?: Date;
  };
  preservePath?: boolean;
}

export function EventSearch({
  className,
  initialData,
  preservePath = false,
}: EventSearchProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [name, setName] = useState(initialData?.name || "");
  const [city, setCity] = useState(initialData?.city || "");
  const [date, setDate] = useState<DateRange | undefined>({
    from: initialData?.heldAtFrom,
    to: initialData?.heldAtTo,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    setQueryParam(params, "name", name);
    setQueryParam(params, "city", city);
    setQueryParam(params, "heldAtFrom", formatDate(date?.from));
    setQueryParam(params, "heldAtTo", formatDate(date?.to));
    if (preservePath) replace(`${pathname}?${params.toString()}`);
    else replace(`/kategorie?${params.toString()}`);
  };

  return (
    <form
      className={cn(
        "flex flex-col sm:flex-row gap-2 sm:gap-0 max-w-[800px] mx-auto rounded-sm",
        className
      )}
      onSubmit={handleSubmit}
    >
      <div className="relative flex-1">
        <Input
          className="rounded-e-none ps-10 peer"
          placeholder="Nazwa wydarzenia"
          id="event-name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <label
          htmlFor="event-date"
          className="text-muted-foreground peer-focus:text-primary dark:peer-focus:text-secondary"
        >
          <Search
            size="1rem"
            className="absolute left-3 bottom-1/2 translate-y-1/2"
          />
        </label>
      </div>
      <div className="relative flex-1">
        <CitySelect
          className="rounded-none"
          value={city}
          onValueChange={setCity}
        />
      </div>
      <div className="relative flex-1">
        <DatePicker
          date={date}
          onDateChange={setDate}
          className="rounded-none"
        />
      </div>
      <Button className="rounded-s-none" type="submit">
        Szukaj
      </Button>
    </form>
  );
}
