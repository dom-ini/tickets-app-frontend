"use client";

import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Ban, QrCode } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import { DataTable } from "@/components/data-table";
import { TicketQr } from "@/components/ticket-qr";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { getUserTickets, resignFromTicket } from "@/lib/api/tickets";
import { Ticket } from "@/lib/api/tickets/types";
import { ColumnDef } from "@tanstack/react-table";

export function TicketsTable() {
  const [tickets, setTickets] = useState<Array<Ticket>>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    const data = await getUserTickets();
    setTickets(data);
    setLoading(false);
  }, [setLoading, setTickets]);

  const columns: Array<ColumnDef<Ticket>> = useMemo(
    () => [
      {
        accessorKey: "eventName",
        header: "Nazwa wydarzenia",
        cell: ({ row }) => {
          const name = row.original.eventName;
          const slug = row.original.eventSlug;

          const eventUrl = `/wydarzenie/${slug}`;

          return (
            <Link
              href={eventUrl}
              className="text-primary dark:text-secondary hover:underline"
              data-test="tickets-event-url"
            >
              {name}
            </Link>
          );
        },
      },
      {
        accessorKey: "categoryName",
        header: "Rodzaj biletu",
      },
      {
        accessorKey: "createdAt",
        header: "Data rezerwacji",
        cell: ({ row }) => {
          const createdAt = row.original.createdAt;
          const formattedDate = format(createdAt, "dd-MM-yyyy", { locale: pl });
          return formattedDate;
        },
      },
      {
        id: "generateQrCode",
        header: "Akcje",
        cell: ({ row }) => {
          const token = row.original.token;
          const downloadQr = () => {
            const qrImage = document.querySelector(
              `[data-token="${token}"] img`
            ) as Element;
            const qrSrc = qrImage.getAttribute("src");
            if (!qrSrc) return;
            const downloadLink = document.createElement("a");
            downloadLink.href = qrSrc;
            downloadLink.download = "bilet_" + token;
            downloadLink.click();
          };
          const deleteTicket = async () => {
            try {
              await resignFromTicket(row.original.id);
              toast({
                title: "Rezygnacja z biletu pomyślna",
                description: "Operacja rezygnacji z biletu powiodła się",
              });
              await fetchTickets();
            } catch {
              toast({
                title: "Rezygnacja z biletu nieudana",
                description:
                  "Operacja rezygnacji z biletu nie powiodła się. Spróbuj ponownie",
              });
            }
          };

          return (
            <>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Wygeneruj kod QR"
                    data-test="generate-qr-btn"
                  >
                    <QrCode size="1.25rem" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Wygenerowany kod QR</DialogTitle>
                    <DialogDescription>
                      Pobierz swój unikalny kod QR - służy on jako bilet wstępu
                      na wydarzenie.
                    </DialogDescription>
                  </DialogHeader>
                  <div
                    className="w-52 mx-auto"
                    data-token={token}
                    data-test="qr-code"
                  >
                    <TicketQr token={token} />
                  </div>
                  <Button onClick={downloadQr}>Zapisz kod QR</Button>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    title="Zrezygnuj z biletu"
                    className="text-destructive hover:text-destructive"
                    data-test="cancel-ticket-btn"
                  >
                    <Ban size="1.25rem" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Rezygnacja z biletu</DialogTitle>
                    <DialogDescription>
                      Czy na pewno chcesz zrezygnować ze swojego biletu?
                      <br />
                      <b>Uwaga - ta akcja jest nieodwracalna</b>.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button type="button" variant="outline">
                        Anuluj
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={deleteTicket}
                        data-test="cancel-ticket-confirm-btn"
                      >
                        Zrezygnuj z biletu
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          );
        },
      },
    ],
    [fetchTickets]
  );

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return <DataTable columns={columns} isLoading={isLoading} data={tickets} />;
}
