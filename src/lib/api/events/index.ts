import type { EventDetails, PaginatedEvents } from "@/lib/api/events/types";
import "server-only";

import { fetchData } from "@/lib/api";
import { EventDataOptions, EventsURLBuilder } from "@/lib/api/events/filters";
import {
  mapEventDetailsFromApi,
  mapEventListItemsFromApi,
} from "@/lib/api/events/mapper";

export async function getEvents({
  filters = {},
  sorting = {},
  pagination = {},
}: EventDataOptions = {}): Promise<PaginatedEvents> {
  const url = new EventsURLBuilder("/events")
    .addFilters(filters)
    .addSorting(sorting)
    .addPagination(pagination)
    .getURL();
  const data = await fetchData(url, {
    next: { revalidate: 60 },
  });
  return mapEventListItemsFromApi(data);
}

export async function getEventBySlug(
  slug: string
): Promise<EventDetails | null> {
  try {
    const data = await fetchData(`/events/${slug}`, {
      next: { revalidate: 60 },
    });
    return mapEventDetailsFromApi(data);
  } catch {
    return null;
  }
}
