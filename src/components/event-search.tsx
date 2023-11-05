import { MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/date-picker";
import { cn } from "@/lib/utils";

interface EventSearchProps extends React.HTMLAttributes<HTMLDivElement> {}

export function EventSearch({ className }: EventSearchProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row gap-2 sm:gap-0 max-w-2xl mx-auto rounded-sm",
        className
      )}
    >
      <div className="relative flex-1">
        <Input
          className="rounded-e-none ps-10 peer"
          placeholder="Nazwa wydarzenia"
          id="event-name"
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
        <Input
          className="rounded-none ps-10 peer border-x-0"
          placeholder="Miejsce"
          id="event-location"
        />
        <label
          htmlFor="event-date"
          className="text-muted-foreground peer-focus:text-primary dark:peer-focus:text-secondary"
        >
          <MapPin
            size="1rem"
            className="absolute left-3 bottom-1/2 translate-y-1/2"
          />
        </label>
      </div>
      <div className="relative flex-1">
        <DatePicker className="rounded-none" />
      </div>
      <Button className="rounded-s-none" type="submit">
        Szukaj
      </Button>
    </div>
  );
}
