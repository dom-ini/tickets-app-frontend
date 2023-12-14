import { fetchData } from "@/lib/api";
import { mapTicketCategoriesFromApi } from "@/lib/api/ticket-categories/mapper";
import { TicketCategory } from "@/lib/api/ticket-categories/types";

export async function getTicketCategoriesByEvent(
  eventId: number
): Promise<Array<TicketCategory>> {
  try {
    const data = await fetchData(`/ticket-categories/?event_id=${eventId}`, {
      next: {
        revalidate: 1,
      },
    });
    return mapTicketCategoriesFromApi(data);
  } catch {
    return [];
  }
}
