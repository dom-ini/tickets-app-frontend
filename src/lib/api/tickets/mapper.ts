import { ReserveTicketPayload, Ticket } from "@/lib/api/tickets/types";

type TicketApi = Omit<Ticket, "createdAt"> & {
  created_at: string;
  ticket_category: {
    name: string;
    event: {
      name: string;
      slug: string;
    };
  };
};

type ReserveTicketPayloadApi = Pick<ReserveTicketPayload, "email"> & {
  ticket_category_id: number;
};

export function mapTicketsFromApi(tickets: Array<TicketApi>): Array<Ticket> {
  return tickets.map((ticket) => ({
    ...ticket,
    createdAt: new Date(ticket.created_at),
    eventName: ticket.ticket_category.event.name,
    eventSlug: ticket.ticket_category.event.slug,
    categoryName: ticket.ticket_category.name,
  }));
}

export function mapReserveTicketToApi(
  payload: ReserveTicketPayload
): ReserveTicketPayloadApi {
  return {
    email: payload.email,
    ticket_category_id: payload.categoryId,
  };
}
