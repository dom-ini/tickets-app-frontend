import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { EventInfo } from "@/components/event-info";
import { TicketCategoriesPicker } from "@/components/ticket-categories-picker";
import { getEventBySlug } from "@/lib/api/events";
import { BreadcrumbNavigationItem } from "@/lib/types";

type ReserveTicketPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: ReserveTicketPageProps): Promise<Metadata> {
  const event = await getEventBySlug(params.slug);
  const image = event?.posterHorizontal;
  return {
    title: "Zarezerwuj bilet",
    openGraph: {
      images: [image || "/images/og.png"],
    },
  };
}

export default async function ReserveTicketPage({
  params,
}: ReserveTicketPageProps) {
  const event = await getEventBySlug(params.slug);
  if (!event) notFound();
  const breadcrumbElements: Array<BreadcrumbNavigationItem> = [
    { name: "Wydarzenie" },
    { name: event.name, href: `/wydarzenie/${event.slug}` },
    { name: "Zarezerwuj bilet" },
  ];

  return (
    <div className="container my-10">
      <Breadcrumbs elements={breadcrumbElements} className="mb-8" />
      <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl mb-4">
        {event.name}
      </h1>
      <EventInfo event={event} />
      <TicketCategoriesPicker eventId={event.id} />
    </div>
  );
}
