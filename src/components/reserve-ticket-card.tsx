import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { CalendarCheck2 } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface ReserveTicketCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  heldAt: Date;
  location: {
    name: string;
    city: string;
  };
}

export function ReserveTicketCard({
  name,
  heldAt,
  location,
}: ReserveTicketCardProps) {
  return (
    <Link href="/" aria-label={`Zarezerwuj bilet na ${name}`}>
      <div className="flex flex-wrap gap-6 sm:gap-0 justify-between items-center py-4 px-6 border my-6 hover:shadow-md transition-all">
        <div className="flex flex-col items-center pe-5 sm:ps-4 sm:pe-8 border-r whitespace-nowrap">
          <span className="text-primary dark:text-secondary font-medium text-3xl">
            {format(heldAt, "dd")}
          </span>
          <span className="font-medium">
            {format(heldAt, "MMM y", { locale: pl })}
          </span>
          <span className="text-sm">
            {format(heldAt, "eeeeee HH:mm", { locale: pl })}
          </span>
        </div>
        <div className="flex-1 sm:px-8 flex flex-col">
          <span className="font-semibold text-2xl">{location.city}</span>
          <span>{location.name}</span>
          <span className="text-muted-foreground">{name}</span>
        </div>
        <Button
          type="button"
          tabIndex={-1}
          className="basis-full sm:basis-auto"
        >
          <CalendarCheck2 size="1.25rem" />
          <span className="ms-2 md:hidden lg:inline">Zarezerwuj</span>
        </Button>
      </div>
    </Link>
  );
}
