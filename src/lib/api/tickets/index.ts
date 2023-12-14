import { fetchDataWithAuthorization } from "@/lib/api";
import { FetchError } from "@/lib/api/errors";
import { TicketAlreadyReservedError } from "@/lib/api/tickets/errors";
import {
  mapReserveTicketToApi,
  mapTicketsFromApi,
} from "@/lib/api/tickets/mapper";
import { ReserveTicketPayload, Ticket } from "@/lib/api/tickets/types";

export async function getUserTickets(eventId?: number): Promise<Array<Ticket>> {
  let url = "/tickets/";
  if (eventId) url += "?event_id=" + eventId;
  try {
    const data = await fetchDataWithAuthorization(url, {
      cache: "no-store",
    });
    return mapTicketsFromApi(data);
  } catch (err) {
    return [];
  }
}

export async function reserveTicket(
  payload: ReserveTicketPayload
): Promise<void> {
  const apiPayload = mapReserveTicketToApi(payload);
  try {
    await fetchDataWithAuthorization(`/tickets/`, {
      method: "POST",
      body: JSON.stringify(apiPayload),
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    if (err instanceof FetchError && err?.code === 400) {
      throw new TicketAlreadyReservedError();
    }
    throw new Error("Failed to reserve ticket");
  }
}

export async function resignFromTicket(ticketId: number): Promise<void> {
  try {
    await fetchDataWithAuthorization(`/tickets/${ticketId}/`, {
      method: "DELETE",
      cache: "no-store",
    });
  } catch (err) {
    throw new Error("Failed to resign from ticket");
  }
}
