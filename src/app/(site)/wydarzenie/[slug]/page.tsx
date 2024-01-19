import { MapPinned } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { EventInfo } from "@/components/event-info";
import { LocationCard } from "@/components/location-card";
import { ReserveTicketCard } from "@/components/reserve-ticket-card";
import { SpeakerCard } from "@/components/speaker-card";
import { Button } from "@/components/ui/button";
import { getEventBySlug } from "@/lib/api/events";
import { BreadcrumbNavigationItem } from "@/lib/types";

type EventPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const event = await getEventBySlug(params.slug);
  const name = event?.name;
  const image = event?.posterHorizontal;
  return {
    title: name,
    openGraph: {
      images: [image || "/images/og.png"],
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEventBySlug(params.slug);
  if (!event) notFound();
  const eventHasSpeakers = event.speakers.length > 0;
  const breadcrumbElements: Array<BreadcrumbNavigationItem> = [
    { name: "Wydarzenie" },
    { name: event.name },
  ];

  return (
    <div className="container my-10">
      <Breadcrumbs elements={breadcrumbElements} className="mb-8" />
      <h1
        className="font-semibold text-3xl sm:text-4xl md:text-5xl mb-4"
        data-test="event-name"
      >
        {event.name}
      </h1>
      <EventInfo event={event} />
      <div className="flex flex-col md:flex-row gap-12 mt-8">
        <aside className="relative md:sticky md:top-20 self-start w-full md:w-auto">
          <Image
            loading="lazy"
            alt={event.name}
            src={event.posterVertical || "/images/placeholder-event-vert.webp"}
            height="400"
            width="300"
            className="hidden md:block w-48 lg:w-72"
          />
          <Image
            loading="lazy"
            alt={event.name}
            src={event.posterHorizontal || "/images/placeholder-event-hor.webp"}
            height="300"
            width="400"
            className="block md:hidden w-full"
          />
          <nav className="hidden md:block mt-6">
            <menu className="flex flex-col gap-3">
              <li>
                <a
                  href="#zarezerwuj-bilet"
                  className="hover:text-primary dark:hover:text-secondary transition-all"
                >
                  Zarezerwuj bilet
                </a>
              </li>
              <li>
                <a
                  href="#o-wydarzeniu"
                  className="hover:text-primary dark:hover:text-secondary transition-all"
                >
                  O wydarzeniu
                </a>
              </li>
              {eventHasSpeakers && (
                <li>
                  <a
                    href="#uczestnicy"
                    className="hover:text-primary dark:hover:text-secondary transition-all"
                  >
                    Uczestnicy
                  </a>
                </li>
              )}
              <li>
                <a
                  href="#lokalizacja"
                  className="hover:text-primary dark:hover:text-secondary transition-all"
                >
                  Lokalizacja
                </a>
              </li>
            </menu>
          </nav>
        </aside>
        <article className="flex-1">
          <h2 className="text-3xl font-semibold" id="zarezerwuj-bilet">
            Zarezerwuj bilet
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Pamiętaj, możesz zarezerwować tylko 1 bilet na dane wydarzenie!
          </p>
          <ReserveTicketCard {...event} id="" eventId={event.id} />
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
                  <SpeakerCard key={speaker.slug} {...speaker} id="" />
                ))}
              </div>
            </>
          )}
          <h3 className="text-3xl font-semibold" id="lokalizacja">
            Lokalizacja
          </h3>
          <div className="my-6">
            <LocationCard {...event.location} id="" />
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
