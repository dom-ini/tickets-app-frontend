"use client";

import "keen-slider/keen-slider.min.css";

import { useKeenSlider } from "keen-slider/react";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

import { EventCardVertical } from "@/components/event-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import type { EventListItem } from "@/lib/api/events/types";
interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  events: Array<EventListItem>;
}

interface CarouselArrowProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

function CarouselArrow({ onClick, className }: CarouselArrowProps) {
  return (
    <Button
      size="icon"
      variant="secondary"
      onClick={onClick}
      className={cn(className)}
    >
      <ChevronLeft />
    </Button>
  );
}

export function EventsCarousel({ events, className }: CarouselProps) {
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { origin: "center", perView: "auto", spacing: 48 },
    created() {
      setLoaded(true);
    },
  });

  return (
    <div className={cn("relative px-5", className)}>
      <div
        ref={sliderRef}
        className={cn("keen-slider", loaded ? null : "gap-12")}
      >
        {events.map((event) => (
          <div
            className="keen-slider__slide max-w-[200px] min-w-[200px] sm:max-w-[260px] sm:min-w-[260px]"
            key={event.slug}
          >
            {loaded ? (
              <EventCardVertical event={event} />
            ) : (
              <Skeleton className="w-[200px] h-[267px] sm:w-[260px] sm:h-[347px]" />
            )}
          </div>
        ))}
      </div>
      {loaded && instanceRef.current && (
        <>
          <CarouselArrow
            onClick={() => instanceRef.current?.prev()}
            className="absolute top-1/3 left-0"
          />
          <CarouselArrow
            onClick={() => instanceRef.current?.next()}
            className="rotate-180 absolute top-1/3 right-0"
          />
        </>
      )}
    </div>
  );
}
