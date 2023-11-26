import { EventSearch } from "@/components/event-search";
import { EventsCarousel } from "@/components/events-carousel";
import { getEvents } from "@/lib/api/events";

export default async function HomePage() {
  const events = await getEvents({
    pagination: { limit: "10" },
    filters: { isActive: true },
  });

  return (
    <>
      <div className="bg-landing bg-cover bg-center">
        <div className="container py-20 sm:py-32">
          <div className="p-8">
            <h1 className="text-center mb-6 text-4xl font-bold">
              Szukaj wydarzeń
            </h1>
            <EventSearch />
          </div>
        </div>
      </div>
      <div className="container mt-10 mb-20">
        <h2 className="text-center mb-10 text-3xl font-bold">
          Najnowsze wydarzenia
        </h2>
        <EventsCarousel events={events.items} />
      </div>
    </>
  );
}
