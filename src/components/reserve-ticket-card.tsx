"use client";

import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { CalendarCheck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import useUser from "@/hooks/use-user";

interface ReserveTicketCardProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  heldAt: Date;
  eventId: number;
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
  const { isAuthenticated } = useUser();
  const pathname = usePathname();

  return (
    <div className="my-6 flex flex-wrap gap-6 sm:gap-0 justify-center items-center py-4 px-6 border">
      <div className="flex flex-col items-center pe-5 sm:ps-4 sm:pe-8 whitespace-nowrap">
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
      <Button type="button" className="basis-full sm:basis-auto" asChild>
        <Link
          href={isAuthenticated ? pathname + "/zarezerwuj" : "/logowanie"}
          data-test="reserve-ticket-link"
        >
          <CalendarCheck size="1.25rem" />
          <span className="ms-2 md:hidden lg:inline">Zarezerwuj</span>
        </Link>
      </Button>
    </div>
  );
}
