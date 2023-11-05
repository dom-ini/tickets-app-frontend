export type Category = {
  name: string;
  slug: string;
  id: number;
  children: Array<Category>;
};

export type EventLocation = {
  name: string;
  city: string;
  longitude: number;
  latitude: number;
  slug: string;
};

export type EventOrganizer = {
  name: string;
};

export type EventType = {
  name: string;
  slug: string;
};

export type EventSpeaker = {
  name: string;
  photo?: string;
  description: string;
  slug: string;
};

export type Event = {
  name: string;
  description: string;
  slug: string;
  posterVertical?: string;
  posterHorizontal?: string;
  heldAt: Date;
  location: EventLocation;
  organizer: EventOrganizer;
  eventType: EventType;
  speakers: Array<EventSpeaker>;
};

export const allEventsCategory: Category = {
  name: "Wszystkie",
  slug: "",
  id: -1,
  children: [],
};

export type SidebarNavItem = {
  name: string;
  href: string;
};
