import { EventsCarousel } from "@/components/events-carousel";
import { getEvents } from "@/lib/api/events";
import { getSpeakerBySlug } from "@/lib/api/speakers";
import Image from "next/image";
import { notFound } from "next/navigation";

type SpeakerPageProps = {
  params: {
    slug: string;
  };
};

export default async function SpeakerPage({ params }: SpeakerPageProps) {
  const speaker = await getSpeakerBySlug(params.slug);
  if (!speaker) notFound();
  const events = await getEvents();

  return (
    <div className="container my-10">
      <h1 className="font-semibold text-4xl md:text-5xl mb-4">
        {speaker.name}
      </h1>
      <div className="flex flex-col md:flex-row gap-12 my-8">
        <aside className="relative md:sticky md:top-20 self-start w-full md:w-auto">
          <Image
            loading="lazy"
            alt={speaker.name}
            src={speaker.photo || "/images/logo.svg"}
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
      <h3 className="text-3xl font-semibold">
        {speaker.name} - najnowsze wydarzenia
      </h3>
      <EventsCarousel className="my-6" events={events} />
    </div>
  );
}
