import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { EventsCarousel } from "@/components/events-carousel";
import { getEvents } from "@/lib/api/events";
import { getSpeakerBySlug } from "@/lib/api/speakers";
import { BreadcrumbNavigationItem } from "@/lib/types";

type SpeakerPageProps = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({
  params,
}: SpeakerPageProps): Promise<Metadata> {
  const speaker = await getSpeakerBySlug(params.slug);
  const name = speaker?.name;
  const image = speaker?.photo;
  return {
    title: name,
    openGraph: {
      images: [image || "/images/og.png"],
    },
  };
}

export default async function SpeakerPage({ params }: SpeakerPageProps) {
  const speaker = await getSpeakerBySlug(params.slug);
  if (!speaker) notFound();
  const events = await getEvents({
    filters: { speakerId: speaker.id, isActive: true },
    pagination: { limit: "10" },
  });
  const breadcrumbElements: Array<BreadcrumbNavigationItem> = [
    { name: "Prowadzący" },
    { name: speaker.name },
  ];

  return (
    <div className="container my-10">
      <Breadcrumbs elements={breadcrumbElements} className="mb-8" />
      <h1 className="font-semibold text-4xl md:text-5xl mb-4">
        {speaker.name}
      </h1>
      <div className="flex flex-col md:flex-row gap-12 my-8">
        <aside className="relative md:sticky md:top-20 self-start w-full md:w-auto">
          <Image
            loading="lazy"
            alt={speaker.name}
            src={speaker.photo || "/images/placeholder-speaker.webp"}
            height="300"
            width="300"
            className="w-48 lg:w-56"
          />
        </aside>
        <article className="flex-1">
          <h2 className="text-3xl font-semibold">O uczestniku</h2>
          <div
            className="my-6"
            dangerouslySetInnerHTML={{ __html: speaker.description }}
          ></div>
        </article>
      </div>
      {events.items.length > 1 && (
        <>
          <h3 className="text-3xl font-semibold">
            {speaker.name} - najnowsze wydarzenia
          </h3>
          <EventsCarousel className="my-6" events={events.items} />
        </>
      )}
    </div>
  );
}
