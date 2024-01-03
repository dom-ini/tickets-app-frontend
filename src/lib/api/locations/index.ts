import { fetchData } from "@/lib/api";
import { mapLocationFromApi } from "@/lib/api/locations/mapper";
import { Location } from "@/lib/api/locations/types";

export async function getLocationBySlug(
  slug: string
): Promise<Location | null> {
  try {
    const data = await fetchData(`/locations/${slug}/`, {
      next: { revalidate: 60 },
    });
    return mapLocationFromApi(data);
  } catch {
    return null;
  }
}
