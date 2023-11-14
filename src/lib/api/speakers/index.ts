import { fetchData } from "@/lib/api";
import { mapSpeakerFromApi } from "@/lib/api/speakers/mapper";

import type { Speaker } from "@/lib/api/speakers/types";
export async function getSpeakerBySlug(slug: string): Promise<Speaker | null> {
  try {
    const data = await fetchData(`/speakers/${slug}`, {
      next: { revalidate: 60 },
    });
    return mapSpeakerFromApi(data);
  } catch {
    return null;
  }
}
