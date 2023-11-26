import { MapPin } from "lucide-react";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { EventsCarousel } from "@/components/events-carousel";
import { LocationMap } from "@/components/location-map";
import { getEvents } from "@/lib/api/events";
import { getLocationBySlug } from "@/lib/api/locations";
import { BreadcrumbNavigationItem } from "@/lib/types";

type LocationPageProps = {
  params: {
    slug: string;
  };
};

export default async function LocationPage({ params }: LocationPageProps) {
  const location = await getLocationBySlug(params.slug);
  if (!location) notFound();
  const events = await getEvents({
    filters: { locationId: location.id, isActive: true },
    pagination: { limit: "10" },
  });
  const breadcrumbElements: Array<BreadcrumbNavigationItem> = [
    { name: "Lokalizacja" },
    { name: location.name },
  ];

  return (
    <div className="container my-10">
      <Breadcrumbs elements={breadcrumbElements} className="mb-8" />
      <h1 className="font-semibold text-4xl md:text-5xl mb-2">
        {location.name}
      </h1>
      <div className="flex gap-2 items-center text-muted-foreground mb-10">
        <MapPin size="1rem" />
        <h2 className="text-xl">{location.city}</h2>
      </div>
      <h3 className="text-3xl font-semibold">{location.name} na mapie</h3>
      <LocationMap
        latitude={location.latitude}
        longitude={location.longitude}
        className="mt-8 mb-12"
      />
      <h3 className="text-3xl font-semibold">
        {location.name} - najnowsze wydarzenia
      </h3>
      <EventsCarousel className="my-6" events={events.items} />
    </div>
  );
}
