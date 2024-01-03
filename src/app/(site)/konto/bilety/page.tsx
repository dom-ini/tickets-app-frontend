import { Metadata } from "next";

import { TicketsTable } from "@/components/tickets-table";

export const metadata: Metadata = {
  title: "Moje bilety",
};

export default function TicketsPage() {
  return <TicketsTable />;
}
