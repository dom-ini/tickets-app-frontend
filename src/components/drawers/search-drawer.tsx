import { EventSearch } from "@/components/event-search";
import { Button } from "@/components/ui/button";
import { SheetClose, SheetContent, SheetHeader } from "@/components/ui/sheet";

export function SearchDrawer() {
  return (
    <SheetContent side="top">
      <SheetHeader className="font-bold">Szukaj wydarzeń</SheetHeader>
      <EventSearch
        className="mt-10"
        submitButton={
          <SheetClose asChild>
            <Button className="rounded-s-none" type="submit">
              Szukaj
            </Button>
          </SheetClose>
        }
      />
    </SheetContent>
  );
}
