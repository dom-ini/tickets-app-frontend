export type Ticket = {
  email: string;
  token: string;
  createdAt: Date;
  id: number;
  eventName: string;
  eventSlug: string;
  categoryName: string;
};

export type ReserveTicketPayload = {
  categoryId: number;
  email: string;
};
