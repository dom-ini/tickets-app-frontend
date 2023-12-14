import { TicketCategory } from "@/lib/api/ticket-categories/types";

type TicketCategoriesApi = {
  ticket_category: {
    name: string;
    id: number;
  };
  tickets_left: number;
};

export function mapTicketCategoriesFromApi(
  ticketCategories: Array<TicketCategoriesApi>
): Array<TicketCategory> {
  return ticketCategories.map((category) => ({
    name: category.ticket_category.name,
    ticketsLeft: category.tickets_left,
    id: category.ticket_category.id,
  }));
}
