import type {
  EventOrganizer,
  EventType,
  EventDetails,
  PaginatedEvents,
} from "@/lib/api/events/types";
import type { Location, SimpleLocation } from "@/lib/api/locations/types";
import type { Speaker } from "@/lib/api/speakers/types";

interface PaginatedApi<T> {
  items: Array<T>;
  total_count: number;
}

interface EventListItemApi {
  name: string;
  description: string;
  slug: string;
  poster_vertical?: string;
  poster_horizontal?: string;
  is_active: boolean;
  held_at: string;
  id: number;
  location: SimpleLocation;
}

interface EventDetailsApi extends Omit<EventListItemApi, "location"> {
  location: Location;
  organizer: EventOrganizer;
  event_type: EventType;
  speakers: Array<Speaker>;
}

export function mapEventListItemsFromApi(
  events: PaginatedApi<EventListItemApi>,
): PaginatedEvents {
  const items = events.items.map((event) => ({
    ...event,
    heldAt: new Date(event.held_at),
    posterHorizontal: event.poster_horizontal,
    posterVertical: event.poster_vertical,
  }));
  return { items, totalCount: events.total_count };
}

export function mapEventDetailsFromApi(event: EventDetailsApi): EventDetails {
  return {
    ...event,
    heldAt: new Date(event.held_at),
    posterHorizontal: event.poster_horizontal,
    posterVertical: event.poster_vertical,
    eventType: event.event_type,
  };
}
