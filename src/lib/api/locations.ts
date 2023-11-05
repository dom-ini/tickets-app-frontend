import { EventLocation } from "@/lib/constants";

export async function getLocationBySlug(
  slug: string
): Promise<EventLocation | null> {
  if (slug !== "polsat-plus-arena") return null;
  return {
    name: "Polsat Plus Arena",
    city: "Gdańsk",
    slug: "polsat-plus-arena",
    latitude: 54.38979741243814,
    longitude: 18.640400552704822,
  };
}
