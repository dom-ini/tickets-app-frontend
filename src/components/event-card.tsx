import { format } from "date-fns";
import { Calendar, ChevronRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { EventListItem } from "@/lib/api/events/types";
import { cn } from "@/lib/utils";

interface EventCardProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  event: EventListItem;
}

export function EventCardVertical({ event, className }: EventCardProps) {
  return (
    <Link
      href={"/wydarzenie/" + event.slug}
      className={cn("group w-[200px] sm:w-[260px]", className)}
    >
      <div className="overflow-hidden rounded-sm transition-all">
        <Image
          loading="lazy"
          src={event.posterVertical || "/images/placeholder-event-vert.webp"}
          alt={event.name}
          width="260"
          height="347"
          className="group-hover:scale-125 group-hover:brightness-75 transition-all duration-300 w-[200px] h-[267px] sm:w-[260px] sm:h-[347px] object-cover"
        />
      </div>
      <p className="text-lg text-center mt-3 font-semibold group-hover:text-primary dark:group-hover:text-secondary transition-all">
        {event.name}
      </p>
      <div className="text-center mt-1 text-muted-foreground text-sm">
        <p>{format(event.heldAt, "dd.MM.y")}</p>
        <p>{event.location.city}</p>
      </div>
    </Link>
  );
}

export function EventCardHorizontal({ event, className }: EventCardProps) {
  return (
    <Link
      href={"/wydarzenie/" + event.slug}
      className={cn(
        "group flex flex-col sm:flex-row gap-4 sm:gap-6 items-center w-full p-4 shadow border hover:shadow-lg transition-all duration-300",
        className
      )}
    >
      <Image
        loading="lazy"
        src={event.posterHorizontal || "/images/placeholder-event-hor.webp"}
        alt={event.name}
        width="550"
        height="367"
        className="block sm:hidden"
      />
      <Image
        loading="lazy"
        src={event.posterHorizontal || "/images/placeholder-event-hor.webp"}
        alt={event.name}
        width="180"
        height="120"
        className="hidden sm:block md:hidden"
      />
      <Image
        loading="lazy"
        src={event.posterHorizontal || "/images/placeholder-event-hor.webp"}
        alt={event.name}
        width="240"
        height="160"
        className="hidden md:block sm:self-start"
      />
      <div className="flex flex-col flex-1 w-full sm:w-auto h-full">
        <h2 className="text-2xl flex-1 font-semibold group-hover:text-primary dark:group-hover:text-secondary transition-all">
          {event.name}
        </h2>
        <div className="mt-1 text-muted-foreground">
          <div className="flex gap-2 items-center">
            <Calendar size="1rem" />
            <p>{format(event.heldAt, "dd.MM.y")}</p>
          </div>
          <div className="flex gap-2 items-center">
            <MapPin size="1rem" />
            <p>
              {event.location.name}, {event.location.city}
            </p>
          </div>
        </div>
      </div>
      <Button className="sm:me-6 w-full sm:w-auto">
        <span className="me-2">Zobacz</span>
        <ChevronRight size="1.25rem" />
      </Button>
    </Link>
  );
}
