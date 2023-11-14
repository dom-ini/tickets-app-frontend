import { EventSearch } from "@/components/event-search";
import { SheetContent, SheetHeader } from "@/components/ui/sheet";

export function SearchDrawer() {
  return (
    <SheetContent side="top">
      <SheetHeader className="font-bold">Szukaj wydarzeń</SheetHeader>
      <EventSearch className="mt-10" />
    </SheetContent>
  );
}
