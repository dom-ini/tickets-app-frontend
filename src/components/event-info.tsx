import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Calendar, MapPin } from "lucide-react";

import { EventDetails } from "@/lib/api/events/types";

type EventInfoProps = {
  event: EventDetails;
};

export function EventInfo({ event }: EventInfoProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:gap-6 mb-2">
      <div className="flex items-center gap-1 text-muted-foreground text-sm">
        <Calendar size="1rem" />
        <span>{format(event.heldAt, "do MMMM y", { locale: pl })}</span>
      </div>
      <div className="flex items-center gap-1 text-muted-foreground text-sm">
        <MapPin size="1rem" />
        <span>
          {event.location.name}, {event.location.city}
        </span>
      </div>
    </div>
  );
}
