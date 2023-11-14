"use client";

import { LayoutGrid, StretchHorizontal } from "lucide-react";
import { useState } from "react";

import {
  EventCardHorizontal,
  EventCardVertical,
} from "@/components/event-card";
import { Pagination } from "@/components/pagination";
import { SortingDropdown } from "@/components/sorting-dropdown";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import type { EventListItem } from "@/lib/api/events/types";
interface EventSearchResultProps extends React.HTMLAttributes<HTMLDivElement> {
  events: Array<EventListItem>;
  eventsCount: number;
  pageSize: number;
}

export function EventSearchResult({
  className,
  events,
  eventsCount,
  pageSize,
}: EventSearchResultProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const changeViewMode = () => {
    setViewMode((prev) => (prev === "list" ? "grid" : "list"));
  };
  const isViewGrid = viewMode === "grid";

  const EventCard = isViewGrid ? EventCardVertical : EventCardHorizontal;

  return (
    <div className={cn(className)}>
      <div className="flex justify-between items-center gap-2">
        <p className="text-sm text-muted-foreground flex-1">
          Wyniki wyszukiwania
        </p>
        <SortingDropdown />
        <Button onClick={changeViewMode} size="icon" variant="ghost">
          {isViewGrid ? <LayoutGrid /> : <StretchHorizontal />}
        </Button>
      </div>
      <Separator className="mt-2 mb-6" />
      {events.length > 0 ? (
        <>
          <div
            className={`flex flex-wrap justify-center sm:justify-start ${
              isViewGrid ? "gap-6" : "gap-4"
            }`}
          >
            {events.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
          <Pagination
            className="mt-8 sm:mt-12"
            totalItemsCount={eventsCount}
            pageSize={pageSize}
          />
        </>
      ) : (
        <div>Nie znaleziono wydarzeń</div>
      )}
    </div>
  );
}
