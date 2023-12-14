"use client";

import { Ban, CalendarCheck2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import useUser from "@/hooks/use-user";
import { getTicketCategoriesByEvent } from "@/lib/api/ticket-categories";
import { TicketCategory } from "@/lib/api/ticket-categories/types";
import { getUserTickets, reserveTicket } from "@/lib/api/tickets";
import { TicketAlreadyReservedError } from "@/lib/api/tickets/errors";
import { cn } from "@/lib/utils";

import { Button } from "./ui/button";
import { toast } from "./ui/use-toast";

type TicketCategoryCardProps = {
  category: TicketCategory;
  isLoading: boolean;
  handleReserveTicket: (categoryId: number) => Promise<void>;
};

type TicketCategoriesPresenterProps = {
  categories: Array<TicketCategory>;
  handleReserveTicket: (categoryId: number) => Promise<void>;
  isLoading: boolean;
  isReserveLoading: boolean;
  isTicketReservedForEvent: boolean;
};

type TicketCategoriesPickerProps = {
  eventId: number;
};

function isTicketAvailable(category: TicketCategory): boolean {
  return category.ticketsLeft > 0;
}

function TicketCategoryCard({
  category,
  handleReserveTicket,
  isLoading,
}: TicketCategoryCardProps) {
  const { isAuthenticated } = useUser();

  return (
    <div className="flex flex-col justify-between gap-4 px-6 py-4 border w-60">
      <span className="text-lg text-center font-medium">{category.name}</span>
      <div className="text-center">
        <span
          className={cn(
            "block text-6xl",
            isTicketAvailable(category) ? "text-primary" : "text-destructive"
          )}
        >
          {category.ticketsLeft}
        </span>
        <span className="text-muted-foreground text-sm">pozostało</span>
      </div>
      {isAuthenticated ? (
        <Button
          variant="outline"
          type="button"
          disabled={!isTicketAvailable(category) || isLoading}
          onClick={() => handleReserveTicket(category.id)}
        >
          {isTicketAvailable(category) ? (
            <>
              <CalendarCheck2 size="1.25rem" />
              <span className="ms-2">Zarezerwuj</span>
            </>
          ) : (
            <>
              <Ban size="1.25rem" />
              <span className="ms-2">Niedostępne</span>
            </>
          )}
        </Button>
      ) : (
        <Button variant="outline" type="button" asChild>
          <Link href="/logowanie">
            <CalendarCheck2 size="1.25rem" />
            <span className="ms-2">Zaloguj się</span>
          </Link>
        </Button>
      )}
    </div>
  );
}

function TicketCategoriesPresenter({
  handleReserveTicket,
  isLoading,
  isReserveLoading,
  isTicketReservedForEvent,
  categories,
}: TicketCategoriesPresenterProps) {
  const { isAuthenticated } = useUser();

  if (isLoading)
    return (
      <div className="mt-8">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <div className="mt-8">
      {!isAuthenticated && (
        <p className="text-sm font-bold mb-6">
          Aby zarezerwować bilet, musisz się{" "}
          <Link href="/logowanie" className="text-primary">
            zalogować!
          </Link>
        </p>
      )}
      {isTicketReservedForEvent ? (
        <p className="text-sm font-bold mb-6">
          Posiadasz już bilet na to wydarzenie. Wejdź w zakładkę{" "}
          <Link href="/konto/bilety" className="text-primary">
            &quot;Moje bilety&quot;
          </Link>
          , aby zobaczyć szczegóły.
        </p>
      ) : (
        <div className="flex flex-col sm:flex-row items-center flex-wrap gap-6">
          {categories.length > 0
            ? categories.map((category) => (
                <TicketCategoryCard
                  category={category}
                  key={category.name}
                  handleReserveTicket={handleReserveTicket}
                  isLoading={isReserveLoading}
                />
              ))
            : "Brak dostępnych opcji"}
        </div>
      )}
    </div>
  );
}

export function TicketCategoriesPicker({
  eventId,
}: TicketCategoriesPickerProps) {
  const [categories, setCategories] = useState<Array<TicketCategory>>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isReserveLoading, setIsReserveLoading] = useState(false);
  const [isTicketReservedForEvent, setIsTicketReservedForEvent] =
    useState(false);
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    const fetchPickerData = async () => {
      const ticketCategories = await getTicketCategoriesByEvent(eventId);
      setCategories(ticketCategories);
      const reservedTickets = await getUserTickets(eventId);
      if (reservedTickets.length > 0) setIsTicketReservedForEvent(true);
      setIsLoading(false);
    };
    fetchPickerData();
  }, [setIsLoading, setIsTicketReservedForEvent, setCategories, eventId]);

  async function handleReserveTicket(categoryId: number) {
    if (!user?.email) {
      toast({
        title: "Rezerwacja nie powiodła się",
        description: "Coś poszło nie tak. Odśwież stronę i spróbuj ponownie",
      });
      return;
    }
    setIsReserveLoading(true);
    try {
      await reserveTicket({ categoryId, email: user.email });
      toast({
        title: "Rezerwacja powiodła się",
        description: 'Twój bilet jest dostępny w zakładce "Moje bilety"',
      });
      router.replace("/konto/bilety");
    } catch (err) {
      if (err instanceof TicketAlreadyReservedError) {
        toast({
          title: "Rezerwacja nie powiodła się",
          description: "Rezerwacja biletu na to wydarzenie nie jest dostępna",
        });
        return;
      }
      toast({
        title: "Rezerwacja nie powiodła się",
        description: "Coś poszło nie tak. Odśwież stronę i spróbuj ponownie",
      });
    } finally {
      setIsReserveLoading(false);
    }
  }

  return (
    <TicketCategoriesPresenter
      categories={categories}
      handleReserveTicket={handleReserveTicket}
      isLoading={isLoading}
      isReserveLoading={isReserveLoading}
      isTicketReservedForEvent={isTicketReservedForEvent}
    />
  );
}
