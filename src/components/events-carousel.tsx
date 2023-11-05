"use client";

import * as React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Button } from "@/components/ui/button";
import { EventCardVertical } from "@/components/event-card";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Event } from "@/lib/constants";

interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  events: Array<Event>;
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
  const [loaded, setLoaded] = React.useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { origin: "center", perView: "auto", spacing: 48 },
    created() {
      setLoaded(true);
    },
  });

  return (
    <div className={cn("relative px-5", className)}>
      <div ref={sliderRef} className="keen-slider">
        {events.map((event) => (
          <div
            className="keen-slider__slide max-w-[200px] min-w-[200px] sm:max-w-[260px] sm:min-w-[260px]"
            key={event.slug}
          >
            <EventCardVertical
              event={event}
              className="w-[200px] sm:w-[260px]"
            />
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
