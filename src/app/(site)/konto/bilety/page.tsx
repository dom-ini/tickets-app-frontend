"use client";

import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Ban, QrCode } from "lucide-react";
import Link from "next/link";

import { TicketQr } from "@/components/ticket-qr";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type Ticket = {
  eventName: string;
  eventSlug: string;
  createdAt: Date;
  token: string;
};

const columns: Array<ColumnDef<Ticket>> = [
  {
    accessorKey: "eventName",
    header: "Nazwa wydarzenia",
    cell: ({ row }) => {
      const name = row.original.eventName;
      const slug = row.original.eventSlug;
      const eventUrl = `/wydarzenia/${slug}`;

      return (
        <Link
          href={eventUrl}
          className="text-primary dark:text-secondary hover:underline"
        >
          {name}
        </Link>
      );
    },
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
          `[data-token="${token}"] img`,
        ) as Element;
        const qrSrc = qrImage.getAttribute("src");
        if (!qrSrc) return;
        const downloadLink = document.createElement("a");
        downloadLink.href = qrSrc;
        downloadLink.download = "bilet_" + token;
        downloadLink.click();
      };

      return (
        <>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" title="Wygeneruj kod QR">
                <QrCode size="1.25rem" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Wygenerowany kod QR</DialogTitle>
                <DialogDescription>
                  Pobierz swój unikalny kod QR - służy on jako bilet wstępu na
                  wydarzenie.
                </DialogDescription>
              </DialogHeader>
              <div className="w-52 mx-auto" data-token={token}>
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
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];

const tickets: Array<Ticket> = [
  {
    eventName: "Event One",
    eventSlug: "event-one",
    createdAt: new Date(),
    token: "asdasd-dsadsa-dassaddsa",
  },
  {
    eventName: "Event Two",
    eventSlug: "event-two",
    createdAt: new Date(),
    token: "asdasd-dsadsa-dassaddsa",
  },
  {
    eventName: "Event Three",
    eventSlug: "event-three",
    createdAt: new Date(),
    token: "asdasd-dsadsa-dassaddsa",
  },
  {
    eventName: "Event Four",
    eventSlug: "event-four",
    createdAt: new Date(),
    token: "asdasd-dsadsa-dassaddsa",
  },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-sm border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Brak wyników.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default function TicketsPage() {
  return <DataTable columns={columns} data={tickets} />;
}
