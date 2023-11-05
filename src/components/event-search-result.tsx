"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { LayoutGrid, StretchHorizontal } from "lucide-react";
import { type Event } from "@/lib/constants";
import {
  EventCardHorizontal,
  EventCardVertical,
} from "@/components/event-card";

interface EventSearchResultProps extends React.HTMLAttributes<HTMLDivElement> {
  events: Array<Event>;
}

export function EventSearchResult({
  className,
  events,
}: EventSearchResultProps) {
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const changeViewMode = () => {
    setViewMode((prev) => (prev === "list" ? "grid" : "list"));
  };
  const isViewGrid = viewMode === "grid";

  const EventCard = isViewGrid ? EventCardVertical : EventCardHorizontal;

  return (
    <div className={cn(className)}>
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Wyniki wyszukiwania</p>
        <Button onClick={changeViewMode} size="icon" variant="ghost">
          {isViewGrid ? <LayoutGrid /> : <StretchHorizontal />}
        </Button>
      </div>
      <Separator className="mt-2 mb-6" />
      <div
        className={`flex flex-wrap justify-center sm:justify-start ${
          isViewGrid ? "gap-6" : "gap-4"
        }`}
      >
        {events.map((event) => (
          <EventCard key={event.slug} event={event} />
        ))}
      </div>
    </div>
  );
}
