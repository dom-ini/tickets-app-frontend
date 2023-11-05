import * as React from "react";
import { LocationCard } from "@/components/location-card";
import { ReserveTicketCard } from "@/components/reserve-ticket-card";
import { SpeakerCard } from "@/components/speaker-card";
import { Button } from "@/components/ui/button";
import { getEventBySlug } from "@/lib/api/events";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Calendar, MapPin, MapPinned } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

type EventPageProps = {
  params: {
    slug: string;
  };
};

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEventBySlug(params.slug);
  if (!event) notFound();
  const eventHasSpeakers = event.speakers.length > 0;

  return (
    <div className="container my-10">
      <h1 className="font-semibold text-4xl md:text-5xl mb-4">{event.name}</h1>
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-6 mb-2">
        <div className="flex gap-1 text-muted-foreground text-sm">
          <Calendar size="1rem" />
          <span>{format(event.heldAt, "do MMMM y", { locale: pl })}</span>
        </div>
        <div className="flex gap-1 text-muted-foreground text-sm">
          <MapPin size="1rem" />
          <span>
            {event.location.name}, {event.location.city}
          </span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-12 mt-8">
        <aside className="relative md:sticky md:top-20 self-start w-full md:w-auto">
          <Image
            loading="lazy"
            alt={event.name}
            src={event.posterVertical || "/images/logo.svg"}
            height="400"
            width="300"
            className="hidden md:block w-48 lg:w-72"
          />
          <Image
            loading="lazy"
            alt={event.name}
            src={event.posterHorizontal || "/images/logo.svg"}
            height="300"
            width="400"
            className="block md:hidden w-full"
          />
          <nav className="hidden md:block mt-6">
            <ul className="flex flex-col gap-3">
              <a
                href="#zarezerwuj-bilet"
                className="hover:text-primary dark:hover:text-secondary transition-all"
              >
                <li>Zarezerwuj bilet</li>
              </a>
              <a
                href="#o-wydarzeniu"
                className="hover:text-primary dark:hover:text-secondary transition-all"
              >
                <li>O wydarzeniu</li>
              </a>
              {eventHasSpeakers && (
                <a
                  href="#uczestnicy"
                  className="hover:text-primary dark:hover:text-secondary transition-all"
                >
                  <li>Uczestnicy</li>
                </a>
              )}
              <a
                href="#lokalizacja"
                className="hover:text-primary dark:hover:text-secondary transition-all"
              >
                <li>Lokalizacja</li>
              </a>
            </ul>
          </nav>
        </aside>
        <article className="flex-1">
          <h2 className="text-3xl font-semibold" id="zarezerwuj-bilet">
            Zarezerwuj bilet
          </h2>
          <ReserveTicketCard {...event} />
          <h3 className="text-3xl font-semibold" id="o-wydarzeniu">
            O wydarzeniu
          </h3>
          <div
            dangerouslySetInnerHTML={{ __html: event.description }}
            className="my-6"
          ></div>
          {eventHasSpeakers && (
            <>
              <h3 className="text-3xl font-semibold" id="uczestnicy">
                Uczestnicy wydarzenia
              </h3>
              <div className="my-10 flex flex-wrap gap-8">
                {event.speakers.map((speaker) => (
                  <SpeakerCard key={speaker.slug} {...speaker} />
                ))}
              </div>
            </>
          )}
          <h3 className="text-3xl font-semibold" id="lokalizacja">
            Lokalizacja
          </h3>
          <div className="my-6">
            <LocationCard {...event.location} />
            <Button asChild>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${event.location.latitude},${event.location.longitude}`}
                target="_blank"
                rel="external nofollow"
              >
                <MapPinned size="1.25rem" className="me-2" />
                Otwórz w mapach Google
              </a>
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
}
