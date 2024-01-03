import { Location, SimpleLocation } from "@/lib/api/locations/types";
import { Speaker } from "@/lib/api/speakers/types";

export type PaginatedEvents = {
  items: Array<EventListItem>;
  totalCount: number;
};

export type EventListItem = {
  name: string;
  description: string;
  slug: string;
  posterVertical?: string;
  posterHorizontal?: string;
  heldAt: Date;
  location: SimpleLocation;
  id: number;
};

export type EventOrganizer = {
  name: string;
};

export type EventType = {
  name: string;
  slug: string;
};

export type EventDetails = {
  name: string;
  description: string;
  slug: string;
  posterVertical?: string;
  posterHorizontal?: string;
  heldAt: Date;
  location: Location;
  organizer: EventOrganizer;
  eventType: EventType;
  speakers: Array<Speaker>;
  id: number;
};
